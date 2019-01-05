import { log, playerconfig } from 'playercore';
import VCPlayerObject from '../../../VCPlayerObject';
import dom from '../../utils/dom';
import playerUtils from '../../utils/playerUtils';
//import * as utilities from '../../utils/utilityFunctions';
import { ERROR } from '../../enum';

import VASTTracker from '../../vast/VASTTracker';
import vastUtil from '../../vast/vastUtil';

const { DEFAULT } = playerconfig;

class VASTIntegrator extends VCPlayerObject {

    type = 'VAST';

    state = {
        tracker: null,
        duration: null
    }

    constructor(props) {
        super(props);
        this._vastAdVideoStart = this._vastAdVideoStart.bind(this);
    }

    pauseAd() {
        let { player } = this.props;
        player.pause(true);
        player.trigger(DEFAULT.EVENT.AD_PAUSE_AD);
    }

    resumeAd() {
        let { player } = this.props;
        player.play(true);
        player.trigger(DEFAULT.EVENT.AD_RESUME_AD);
    }

    playAd(vastResponse) {
        let self = this;
        this.setState({
            vastResponse
        });

        return this._start().then(() => {
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

    getSkipOffSet() {
        let { skipoffset } = this.props;

        if (!skipoffset) {
            return;
        }

        return skipoffset;
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

    clickThrough() {
        let { player } = this.props;
        let { tracker } = this.state;

        if (!player || !tracker) {
            return;
        }
        player.trigger(DEFAULT.EVENT.VAST_AD_CLICK_THRU);
        tracker.trackClick();
    }

    getAdVolume() {
        let { player } = this.props;
        let volume = player.volume();
        return Promise.resolve(volume);
    }

    setAdVolume(volume) {
        let { player } = this.props;
        player.volume(volume);
    }

    getAdRemainingTime() {
        let { player } = this.props;

        let remainingTime = player.duration() - player.currentTime();
        return Promise.resolve(remainingTime);
    }

    getAdDuration() {
        let { player } = this.props;

        let duration = player.duration();
        return Promise.resolve(duration);
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
        let { source, vastResponse } = this.state;
        let updateBlocker = updateBlockerURL.bind(null, vastResponse, player);

        player.on('timeupdate', updateBlocker);

        function updateBlockerURL(response, player) {
            try {
                let href = generateClickThroughURL(response.clickThrough, player);
                player.container.ad.clickThrough.updateBlocker(href);
            } catch (e) {
                // ignore
            }
        }

        function generateClickThroughURL(clickThroughMacro, player) {
            let variables = {
                ASSETURI: source.src,
                CONTENTPLAYHEAD: vastUtil.formatProgress(player.currentTime() * 1000)
            };

            return clickThroughMacro ? vastUtil.parseURLMacro(clickThroughMacro, variables) : '#';
        }
    }

    _addSkipButton() {

    }

    _setupEvents() {
        let { player } = this.props;
        let { tracker } = this.state;

        player.on('fullscreenchange', trackFullscreenChange);
        player.on(DEFAULT.EVENT.VAST_AD_VIDEO_START, trackImpressions);
        player.on(DEFAULT.EVENT.VAST_AD_START, unbindDurationChange);
        player.one('durationchange', function () {
            player.on('pause', trackPause);
            player.on('timeupdate', trackProgress);
            player.on('volumechange', trackVolumeChange);
            player.on('durationchange', onDurationChange);
            onDurationChange();
        });

        playerUtils.once(player, [DEFAULT.EVENT.AD_END, DEFAULT.EVENT.AD_CANCEL], unbindEvents);
        playerUtils.once(player, [DEFAULT.EVENT.AD_END, DEFAULT.EVENT.AD_CANCEL, DEFAULT.EVENT.AD_SKIP], function (evt) {
            if (evt.type === DEFAULT.EVENT.AD_END) {
                tracker.trackComplete();
            }
        });

        /*** Local Functions ***/
        function unbindEvents() {
            player.off('fullscreenchange', trackFullscreenChange);
            player.off(DEFAULT.EVENT.VAST_AD_VIDEO_START, trackImpressions);
            player.off('pause', trackPause);
            player.off('timeupdate', trackProgress);
            player.off('volumechange', trackVolumeChange);
            player.off('durationchange', onDurationChange);
        }

        function unbindDurationChange() {
            player.off('durationchange', onDurationChange);
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
            if (Math.abs(player.duration() - player.currentTime()) < 2) {
                return;
            }

            tracker.trackPause();
            playerUtils.once(player, ['play', DEFAULT.EVENT.AD_END, DEFAULT.EVENT.AD_CANCEL], function (evt) {
                if (evt.type === 'play') {
                    tracker.trackResume();
                }
            });
        }

        function trackProgress() {
            let currentTimeInMs = player.currentTime() * 1000;
            tracker.trackProgress(currentTimeInMs);
        }

        function trackImpressions() {
            tracker.trackImpressions();
            tracker.trackCreativeView();
        }

        let previouslyMuted;
        function trackVolumeChange() {
            let muted = player.muted();
            if (muted) {
                tracker.trackMute();
            } else if (previouslyMuted) {
                tracker.trackUnmute();
            }
            previouslyMuted = muted;
        }

        function onDurationChange() {
            let duration = player.duration();
            if (isNaN(duration)) {
                return;
            }
            tracker.durationChange(duration * 1000);
        }
    }

    _vastAdVideoStart() {
        let { player } = this.props;
        player.trigger(DEFAULT.EVENT.VAST_AD_VIDEO_START);
    }

    _playSelectedAd() {
        let self = this;
        return new Promise((resolve, reject) => {
            let { player } = this.props;
            let { source } = this.state;
            player.preload('auto'); //without preload=auto the durationchange event is never fired
            player.src(source);


            function _playAdError(evt) {
                var errorTxt;
                var mediaError = evt.currentTarget.error;
                switch (mediaError.code) {
                case mediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    // Nếu lỗi không load được ads video thì reject 
                    player.off('loadedmetadata', self._vastAdVideoStart);
                    errorTxt = 'The video could not be loaded, either because the server or network failed or because the format is not supported';
                    reject(errorTxt);
                    player.tech_.el().removeEventListener('error', _playAdError);
                    break;
                }
            }

            //  Lắng nghe sự kiện nếu load lỗi video ads;
            player.tech_.el().addEventListener('error', _playAdError);

            function _playAd() {
                log.debug('<VASTIntegrator._playSelectedAd> got durationchange; calling playAd()');
                playAd();
            }

            function playAd() {
                log.debug('<VASTIntegrator._playSelectedAd/playAd> got playing event; triggering vast.adStart...');

                player.trigger(DEFAULT.EVENT.VAST_AD_START);
                player.one('loadedmetadata', self._vastAdVideoStart);
                player.on('ended', proceed);
                player.on(DEFAULT.EVENT.AD_CANCEL, proceed);
                player.on(DEFAULT.EVENT.AD_SKIP, proceed);

                function proceed(evt) {

                    if (evt.type === 'ended' && (player.duration() - player.currentTime()) > 3) {
                        // Ignore ended event if the Ad time was not 'near' the end
                        // avoids issues where IOS controls could skip the Ad
                        return;
                    }
                    player.off('loadedmetadata', self._vastAdVideoStart);
                    player.off('ended', proceed);
                    player.off(DEFAULT.EVENT.AD_CANCEL, proceed);
                    player.off(DEFAULT.EVENT.AD_SKIP, proceed);

                    //NOTE: if the ads get cancel we do nothing apart removing the listners
                    if (evt.type === 'ended' || evt.type === DEFAULT.EVENT.AD_SKIP) {
                        resolve();
                    }
                }
            }
            _playAd();

            player.play();
        });
    }

    _trackError(error) {
        let { vastResponse } = this.state;
        vastUtil.track(vastResponse.errorURLMacros, { ERRORCODE: error.code || 900 });
    }
}

export default VASTIntegrator;