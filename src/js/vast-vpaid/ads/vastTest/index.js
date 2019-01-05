import { log, playerconfig} from 'playercore';
import VCPlayerObject from '../../../VCPlayerObject';
import dom from '../../utils/dom';
import { ERROR } from '../../enum';

import VASTTracker from '../../vast/VASTTracker';
import playerUtils from '../../utils/playerUtils';
import vastUtil from '../../vast/vastUtil';
import PlayerAdUnit from '../../utils/PlayerAdUnit';

const { DEFAULT } = playerconfig;

class VastTest extends VCPlayerObject {


    type = 'VAST';

    state = {
        tracker: null,
        duration: null,
        orderPlay: false,
        firstAdVideoStart: false,
        canPlay: false,
    }

    constructor(props) {
        super(props);
        let { player } = this.props;
        player.one(DEFAULT.EVENT.AD_END, this._handleAdEnd);
    }

    _handleAdEnd() {

    }

    playAd(vastResponse) {
        let self = this;
        this.setState({
            vastResponse
        });

        return this._start().then(() => {
            return self._createAdPlayer();
        }).then(() => {
            return self._selectAdSource();
        }).then(() => {
            return self._createVASTTracker();
        }).then(() => {
            return self._addClickThrough();
        }).then(() => {
            return self._addSkipButton();
        }).then(() => {
            return self._setupEvents();
        }).then(() => {
            return self._playSelectedAd();
        }).catch(e => {
            self._trackError(e);
            throw e;
        });
    }

    // playSelectedAd(){
    //     return this._playSelectedAd();
    // }
    _createAdPlayer(){
        let self = this;
        let {player} = this.props;

        return new Promise((resolve) =>{
            let playerAd = new PlayerAdUnit({ player });
            self.setState({
                playerAdUnit: playerAd.getPlayerAdUnit()
            });
            resolve();
        });
    }

    getPlayerAdUnit() {
        let { playerAdUnit } = this.state;
        return playerAdUnit;
    }

    _start() {
        return new Promise((resolve) => {
            resolve();
        });
    }

    _selectAdSource() {
        let source;
        let { player } = this.props;
        let { vastResponse } = this.state;

        let playerWidth = dom.getDimension(player.el()).width;
        vastResponse.mediaFiles.sort(function compareTo(a, b) {
            let deltaA = Math.abs(playerWidth - a.width);
            let deltaB = Math.abs(playerWidth - b.width);
            return deltaA - deltaB;
        });

        source = player.selectSource(vastResponse.mediaFiles).source;

        if (source) {
            log.info('selected source: ', source);
            if (this._adUnit) {
                this._adUnit._src = source;
            }
            this.setState({ source });
            return;
        }

        throw ERROR.VAST_INTEGRATOR_SOURCE_ERROR;
    }

    _createVASTTracker() {
        let { source, vastResponse } = this.state;
        let tracker = new VASTTracker(source.src, vastResponse);
        this.setState({ tracker });
    }

    _addClickThrough() {
        let { player } = this.props;
        let { source, vastResponse, playerAdUnit } = this.state;
        let updateBlocker = updateBlockerURL.bind(null, vastResponse, playerAdUnit, player);

        playerAdUnit.on('timeupdate', updateBlocker);

        // player.on(DEFAULT.EVENT.VAST_AD_TIMEUPDATE, updateBlocker);
        // videoEl.ontimeupdate = updateBlocker;

        function updateBlockerURL(response, playerAdUnit, player) {
            try {
                let href = generateClickThroughURL(response.clickThrough, playerAdUnit);
                player.container.ad.clickThrough.updateBlocker(href);
            } catch (e) {
                // ignore
            }
        }

        function generateClickThroughURL(clickThroughMacro, playerAdUnit) {
            let variables = {
                ASSETURI: source.src,
                CONTENTPLAYHEAD: vastUtil.formatProgress(playerAdUnit.currentTime() * 1000)
            };

            return clickThroughMacro ? vastUtil.parseURLMacro(clickThroughMacro, variables) : '#';
        }
    }

    _addSkipButton() {

    }

    _setupEvents() {
        let { player } = this.props;
        let { tracker, playerAdUnit } = this.state;
        function unbindEvents() {
            player.off('fullscreenchange', trackFullscreenChange);
            player.off(DEFAULT.EVENT.VAST_AD_VIDEO_START, trackImpressions);
            playerAdUnit.off('pause', trackPause);
            playerAdUnit.off('timeupdate', trackProgress);
            playerAdUnit.off('volumechange', trackVolumeChange);
            playerAdUnit.off('durationchange', onDurationChange);

        }

        function unbindDurationChange() {
            playerAdUnit.off('durationchange', onDurationChange);
        }

        function trackFullscreenChange() {
            if (player.isFullscreen()) {
                tracker.trackFullscreen();
            } else {
                tracker.trackExitFullscreen();
            }
        }

        function trackPause() {
            //NOTE: whenever a video ends the video Element triggers a 'pause' event before the 'ended' event.
            //      We should not track this pause event because it makes the VAST tracking confusing again we use a
            //      Threshold of 2 seconds to prevent false positives on IOS.
            if (Math.abs(playerAdUnit.duration() - playerAdUnit.currentTime()) < 2) {
                return;
            }
            tracker.trackPause();
            playerUtils.once(player, [DEFAULT.EVENT.VAST_AD_RESUME, DEFAULT.EVENT.AD_END, DEFAULT.EVENT.AD_CANCEL], function (evt) {
                if (evt.type === DEFAULT.EVENT.VAST_AD_RESUME) {
                    tracker.trackResume();
                }
            });
        }

        function trackProgress() {
            let currentTimeInMs = playerAdUnit.currentTime() * 1000;
            tracker.trackProgress(currentTimeInMs);
        }

        function trackImpressions() {
            tracker.trackImpressions();
            tracker.trackCreativeView();
        }

        function trackVolumeChange() {
            let volume_ = playerAdUnit.volume();
            let mute_ = playerAdUnit.muted();
            if (volume_ === 0 || mute_) {
                tracker.trackMute();
            } else {
                tracker.trackUnmute();
            }
        }

        function onDurationChange() {
            let duration = playerAdUnit.duration();
            if (isNaN(duration)) {
                return;
            }
            tracker.durationChange(duration * 1000);
        }

        player.on('fullscreenchange', trackFullscreenChange);
        player.on(DEFAULT.EVENT.VAST_AD_VIDEO_START, trackImpressions);
        player.on(DEFAULT.EVENT.VAST_AD_START, unbindDurationChange);

        /* Setup Event tracker   */

        
        /* Setup Event cho Player */
        
        playerAdUnit.on('durationchange' ,function () {
            playerAdUnit.on('pause', trackPause);
            playerAdUnit.on('timeupdate', trackProgress);
            playerAdUnit.on('volumechange', trackVolumeChange);
            playerAdUnit.on('durationchange', onDurationChange);

            playerAdUnit.on('play' ,function () {
                player.trigger(DEFAULT.EVENT.VAST_AD_RESUME);
            });

            // player.on('pause', trackPause);
            // player.on('timeupdate', trackProgress);
            // player.on('volumechange', trackVolumeChange);
            // player.on('durationchange', onDurationChange);
            onDurationChange();
        });

        playerUtils.once(player, [DEFAULT.EVENT.AD_END, DEFAULT.EVENT.AD_CANCEL, DEFAULT.EVENT.AD_SKIP], unbindEvents);
        playerUtils.once(player, [DEFAULT.EVENT.AD_END, DEFAULT.EVENT.AD_CANCEL, DEFAULT.EVENT.AD_SKIP], function (evt) {
            if (evt.type === DEFAULT.EVENT.AD_END) {
                tracker.trackComplete();
            }
        });

        /*** Local Functions ***/
    }

    _playSelectedAd() {
        let self = this;
        let { player, type, preLoaded } = this.props;
        var { playerAdUnit, orderPlay, firstAdVideoStart, canPlay, source } = this.state;
        let {vastAd} = player;

        return new Promise((resolve, reject) => {
            function unbindEvents() {
                player.off(DEFAULT.EVENT.AD_SKIP, proceed);
                player.off('play', _preroll);
                player.off('timeupdate', _playAd);
                player.off(DEFAULT.EVENT.AD_ORDER_START_MIDROLL, _snapshotPlayer);
                player.off(DEFAULT.EVENT.AD_ORDER_START_POSTROLL, _snapshotPlayer);
                playerAdUnit.off('ended', proceed);

            }

            function proceed(evt) {
                if (evt.type === 'ended' && (playerAdUnit.duration() - playerAdUnit.currentTime()) > 3) {
                    // Ignore ended event if the Ad time was not 'near' the end
                    // avoids issues where IOS controls could skip the Ad
                    return;
                }

                unbindEvents();

                //NOTE: if the ads get cancel we do nothing apart removing the listners
                if (evt.type === 'ended' || evt.type === DEFAULT.EVENT.AD_SKIP) {
                    player.trigger(DEFAULT.EVENT.VAST_AD_VIDEO_COMPLETE);
                    resolve();
                }
            }

            function playAd() {
                if (!canPlay) {
                    orderPlay = true;
                    return;
                }
                player.trigger(DEFAULT.EVENT.AD_PLAY, vastAd.state.vastResponse);
                player.trigger(DEFAULT.EVENT.VAST_AD_START);
                player.trigger(DEFAULT.EVENT.AD_START, vastAd);
                player.play();
            }

            function _playAd() {
                player.vastAd._prepareForAd();

                player.vastAd.firstAd = true;
                playAd();
            }

            playerAdUnit.on('error', function () {
                unbindEvents();
                reject('Error! Something went wrong');
            });

            playerAdUnit.on('loadedmetadata' , function () {
                if (orderPlay && !canPlay) {
                    canPlay = true;
                    playAd();
                }
                canPlay = true;
            });

            playerAdUnit.on('playing' ,function () {
                if (!firstAdVideoStart) {
                    self._vastAdVideoStart();
                    firstAdVideoStart = true;
                }
            });

            playerAdUnit.on('ended', proceed);
            player.on(DEFAULT.EVENT.AD_CANCEL, proceed);
            player.on(DEFAULT.EVENT.AD_SKIP, proceed);

            if (!preLoaded && !player.vastAd.firstAd) {
                player.vastAd._setUpRestorePlayer();
                player.trigger('snapshotPlayer');
                playerAdUnit.preload('auto');
                playerAdUnit.src(source);
                _playAd();
                return;
            }

            if (player.vastAd.firstAd) {
                playAd();
                return;
            }

            function _preroll() {
                player.one('timeupdate', _snapshotPlayer);
            }
            /**
             * Check thuộc loại ads nào để load trước mediafile Ads
             */

            function _snapshotPlayer(){
                player.trigger('snapshotPlayer');
                _playAd();
            }

            player.vastAd._setUpRestorePlayer();
            playerAdUnit.preload('auto');
            playerAdUnit.src(source);

            if (type === 'preroll') {
                playerAdUnit.load();
                player.one('play', _preroll);
            } else if (type === 'midroll') {
                playerAdUnit.load();
                player.one(DEFAULT.EVENT.AD_ORDER_START_MIDROLL, _snapshotPlayer);
                player.trigger('prepareMidrollVastSuccess');

            } else if (type === 'postroll') {
                playerAdUnit.load();
                player.one(DEFAULT.EVENT.AD_ORDER_START_POSTROLL, _snapshotPlayer);
                player.trigger('preparePostrollSuccess');
            }


        });
    }

    _vastAdVideoStart() {
        let { player } = this.props;
        player.trigger(DEFAULT.EVENT.VAST_AD_VIDEO_START);
    }


    getAdDuration() {
        let { playerAdUnit } = this.state;
        let duration = playerAdUnit.duration();
        return Promise.resolve(duration);
    }

    getSkipOffSet() {
        let { skipoffset } = this.props;

        if (!skipoffset) {
            return;
        }

        return skipoffset;
    }

    _trackError(error) {
        let { vastResponse } = this.state;
        vastUtil.track(vastResponse.errorURLMacros, { ERRORCODE: error.code || 900 });
    }

    getAdRemainingTime() {
        // let { player } = this.props;
        let { playerAdUnit } = this.state;
        let remainingTime = playerAdUnit.duration() - playerAdUnit.currentTime();
        return Promise.resolve(remainingTime);
    }

    getAdVolume() {
        // let { player } = this.props;
        let { playerAdUnit } = this.state;
        let volume = playerAdUnit.volume();
        return Promise.resolve(volume);
    }

    skipAd() {
        let { player } = this.props;
        let { tracker } = this.state;

        if (!player || !tracker) {
            return;
        }
        tracker.trackSkip();
        player.trigger(DEFAULT.EVENT.AD_SKIP);
    }

    pauseAd() {
        let { player } = this.props;
        let { playerAdUnit } = this.state;
        playerAdUnit.pause(true);
        player.trigger(DEFAULT.EVENT.AD_PAUSE_AD);
    }

    resumeAd() {
        let { player } = this.props;
        let { playerAdUnit } = this.state;
        playerAdUnit.play(true);
        player.trigger(DEFAULT.EVENT.AD_RESUME_AD);
    }

    clickThrough() {
        let { player } = this.props;
        let { tracker } = this.state;

        if (!player || !tracker) {
            return;
        }
        player.trigger(DEFAULT.EVENT.VAST_AD_CLICK_THRU);
        tracker.trackClick();
    }

    setAdVolume(volume) {
        let { playerAdUnit } = this.state;
        playerAdUnit.volume(volume);
    }

    isPaused() {
        let { playerAdUnit } = this.state;
        return playerAdUnit.paused();
    }
}

export default VastTest;