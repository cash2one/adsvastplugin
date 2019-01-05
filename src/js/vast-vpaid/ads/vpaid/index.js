import { autobind, log, playerconfig, agent } from 'playercore';
import VCPlayerObject from '../../../VCPlayerObject';
import dom from '../../utils/dom';
import * as utilities from '../../utils/utilityFunctions';
import { ERROR } from '../../enum';

import PlayerAdUnit from '../../utils/PlayerAdUnit';
import VASTTracker from '../../vast/VASTTracker';
import vastUtil from '../../vast/vastUtil';
import VPAIDAdUnitWrapper from './VPAIDAdUnitWrapper';
const { DEFAULT } = playerconfig;

class VPAIDIntegrator extends VCPlayerObject {

    type = 'VPAID';

    static defaultProps = {
        responseTimeout: 5000,
        VPAID_VERSION: '2.0',
        autoResize: true
    };

    VIEW_MODE = {
        NORMAL: 'normal',
        FULLSCREEN: 'fullscreen',
        THUMBNAIL: 'thumbnail'
    };

    state = {
        ended: false,
        duration: null
    }

    constructor(props) {
        super(props);
        let { player } = this.props;
        this.containerEl = this._createVPAIDContainerEl(player);

        player.one('vpaid:AdEnd', this._handleAdEnd);
        player.one(DEFAULT.EVENT.AD_END, this._handleAdEnd);
    }

    @autobind
    _handleAdEnd() {
        log.debug('<VPAIDIntegrator._handleAdEnd>');

        let { tech } = this.state;
        if (tech) {
            tech.unloadAdUnit();
        }

        if (this.containerEl) {
            dom.remove(this.containerEl);
            this.containerEl = null;
        }
    }

    playAd(vastResponse) {
        let self = this;
        let { player } = this.props;
        this.setState({
            vastResponse
        });

        return this._start().then(() => {
            return self._createAdPlayer();
        }).then(() => {
            return self._findSupportedTech();
        }).then(() => {
            return self._loadAdUnit();
        }).then(() => {
            return self._playAdUnit();
        }).then(() => {
            let { snapshot } = player.vastAd.state.restorePlayer.state;
            let volume = snapshot.muted ? 0 : snapshot.volume;
            self.setAdVolume(volume);
            return self._finishPlaying();
        }).catch(e => {
            self._trackError(e);
            throw e;
        });
    }

    _createAdPlayer() {
        let self = this;
        let { player } = this.props;

        return new Promise((resolve) => {
            let playerAd = new PlayerAdUnit({ player });
            self.setState({
                playerAdUnit: playerAd.getPlayerAdUnit()
            });
            resolve();
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
        let { tracker, adUnit } = this.state;

        if (!player || !tracker) {
            return;
        }

        tracker.trackSkip();
        adUnit.skipAd(function (error) {
            if (error) {
                player.trigger('vpaid-skip-ad-error', error);
            }
        });
    }

    getAdVolume() {
        let { adUnit } = this.state;
        return new Promise((resolve, reject) => {
            adUnit.getAdVolume(function (error, currentVolume) {
                if (error) {
                    return reject(error);
                }

                resolve(currentVolume);
            });
        });
    }

    getAdExpanded() {
        let { adUnit } = this.state;
        return new Promise((resolve, reject) => {
            adUnit.getAdExpanded(function (error, expandAd) {
                if (error) {
                    reject(error);
                }
                resolve(expandAd);
            });
        });
    }

    setAdVolume(volume) {
        let { adUnit } = this.state;
        adUnit.setAdVolume(volume, this._logError);
    }

    pauseAd() {
        let { player } = this.props;
        player.trigger('vpaid.pauseAd');
        player.pause(true);//we make sure that the video content gets stopped.
        player.trigger(DEFAULT.EVENT.AD_PAUSE_AD);
    }

    resumeAd() {
        let { player } = this.props;
        player.trigger('vpaid.resumeAd');
        player.trigger(DEFAULT.EVENT.AD_RESUME_AD);
    }

    isPaused() {
        let { paused } = this.state;
        return paused;
    }

    getSrc() {
        let { tech } = this.state;
        return tech.mediaFile;
    }

    techName() {
        let { tech } = this.state;
        return tech.name;
    }

    getAdRemainingTime() {
        let { adUnit } = this.state;
        return new Promise((resolve, reject) => {
            adUnit.getAdRemainingTime(function (error, remainingTime) {
                if (error) {
                    return reject(error);
                }

                resolve(remainingTime);
            });
        });
    }

    getAdDuration() {
        let { adUnit, duration } = this.state;
        if (duration) {
            return Promise.resolve(duration);
        }

        return new Promise((resolve, reject) => {
            adUnit.getAdDuration(function (error, duration) {
                if (error) {
                    return reject(error);
                }

                resolve(duration);
            });
        });
    }

    _createVPAIDContainerEl() {
        let { player } = this.props;
        let containerEl = document.createElement('div');
        containerEl.style.display = 'none';
        dom.addClass(containerEl, 'VPAID-container');

        player.overlay.append(containerEl);
        return containerEl;
    }

    _start() {
        return new Promise((resolve) => {
            resolve();
        });
    }

    _findSupportedTech() {
        let { vastResponse } = this.state;
        let vpaidMediaFiles = vastResponse.mediaFiles.filter(vastUtil.isVPAID);
        let skippedSupportTechs = [];
        let tech;

        for (let i = 0, len = vpaidMediaFiles.length; i < len; i += 1) {
            let mediaFile = vpaidMediaFiles[i];
            let VPAIDTech = vastUtil.findSupportedVPAIDTech(mediaFile.type);
            if (!VPAIDTech) {
                continue;
            }

            skippedSupportTechs.push({ mediaFile: mediaFile, tech: VPAIDTech });
        }

        if (skippedSupportTechs.length) {
            let firstTech = skippedSupportTechs[0];
            tech = new firstTech.tech(firstTech.mediaFile, this.props);
        }

        if (tech) {
            log.info('<VPAIDIntegrator.playAd> found tech: ', tech);
            this.setState({
                tech
            });
            return;
        }

        throw ERROR.VPAID_INTEGRATOR_NOT_SUPPORT_MEDIAFILE;
    }

    getPlayerAdUnit() {
        let { playerAdUnit } = this.state;
        return playerAdUnit;
    }

    _loadAdUnit() {
        log.debug('<VPAIDIntegrator._loadAdUnit>');

        let self = this;
        let { player, responseTimeout } = this.props;
        let { tech, playerAdUnit } = this.state;
        let videoEl;
        if (agent.isIOS) {
            videoEl = playerAdUnit.el().querySelector('.vjs-tech');
        } else {
            videoEl = playerAdUnit.state.videoEl;
        }
        // let vjsTechEl = player.el().querySelector('.vjs-tech');

        //player.reset();

        return new Promise((resolve, reject) => {
            tech.loadAdUnit(self.containerEl, videoEl, function (error, adUnit) {
                if (error) {
                    log.debug('<VPAIDIntegrator._loadAdUnit> error: ', error);
                    reject(error);
                    return;
                }

                try {
                    adUnit = self._createVPAIDAdUnitWrapper(adUnit, tech.mediaFile.src, responseTimeout);
                    player.trigger(tech.name + '-ad');
                    self.setState({
                        adUnit
                    });
                    log.debug('<VPAIDIntegrator._loadAdUnit> success');
                    resolve();
                } catch (e) {
                    log.debug('<VPAIDIntegrator._loadAdUnit> error: ', error);
                    reject(error);
                }
            });
        });
    }

    _playAdUnit() {
        log.debug('<VPAIDIntegrator._playAdUnit>');

        let self = this;
        return this._start().then(() => {
            return self._handshake();
        }).then(() => {
            return self._setupEvents();
        }).then(() => {
            return self._initAd();
        }).then(() => {
            return self._addSkipButton();
        }).then(() => {
            return self._addMuteButton();
        }).then(() => {
            return self._linkPlayerControls();
        }).then(() => {
            return self._playVideoEl();
        }).then(() => {
            return self._startAd();
        });
    }

    _playVideoEl() {
        let { preLoaded, type, player } = this.props;
        return new Promise((resolve) => {

            function playAd() {
                resolve();
            }

            function _playAd() {
                player.vastAd._setUpRestorePlayer();
                player.trigger('snapshotPlayer');
                player.vastAd._prepareForAd();
                player.trigger(DEFAULT.EVENT.AD_START, player.vastAd);
                player.vastAd.firstAd = true;
                playAd();
            }

            if (!preLoaded && !player.vastAd.firstAd) {
                _playAd();
                return;
            }

            if (player.vastAd.firstAd) {
                playAd();
                return;
            }

            if (type === 'preroll') {
                player.one('play', function () {
                    player.one('timeupdate', _playAd);
                });
            } else if (type === 'midroll') {
                player.one(DEFAULT.EVENT.AD_ORDER_START_MIDROLL, _playAd);
                player.trigger('prepareMidrollVastSuccess');
            } else if (type === 'postroll') {
                player.one(DEFAULT.EVENT.AD_ORDER_START_POSTROLL, _playAd);
                player.one(DEFAULT.EVENT.PLAYER_ENDED_CONTEND, function () {
                    player.trigger('preparePostrollSuccess');
                });
            }

        });
    }

    _handshake() {
        log.debug('<VPAIDIntegrator._handshake>');

        let { adUnit } = this.state;
        let { VPAID_VERSION } = this.props;

        function isSupportedVersion(version) {
            let majorNum = major(version);
            return majorNum >= 1 && majorNum <= 2;
        }

        function major(version) {
            let parts = version.split('.');
            return parseInt(parts[0], 10);
        }

        return new Promise((resolve, reject) => {
            adUnit.handshakeVersion(VPAID_VERSION, function (error, version) {
                if (error) {
                    reject(error);
                    return;
                }

                if (version && isSupportedVersion(version)) {
                    resolve();
                    return;
                }

                reject(ERROR.VPAID_INTEGRATOR_HANDSHAKE_NOT_SUPPORT_VERSION);
            });
        });
    }

    _initAd() {
        log.debug('<VPAIDIntegrator._initAd>');

        let self = this;
        let { adUnit, vastResponse } = this.state;
        let { player } = this.props;
        let tech = player.el().querySelector('.vjs-tech');
        // let videoEl_ = this.videoEl;

        let dimension = dom.getDimension(tech);

        return new Promise((resolve, reject) => {

            adUnit.initAd(dimension.width, dimension.height, self.VIEW_MODE.NORMAL, -1, {
                AdParameters: vastResponse.adParameters || '',
                playerID: player.id_
            }, function (error) {
                if (error) {
                    reject(ERROR.VPAID_INTEGRATOR_ERROR_WHILE_INIT.extendsWithData({
                        error
                    }));
                    return;
                }

                self.setState({
                    inited: true
                });

                resolve();
            });
        });

    }

    _setupEvents() {
        log.debug('<VPAIDIntegrator._setupEvents>');

        let self = this;
        let tracker = this._createVASTTracker();
        let { player } = this.props;
        let { adUnit, vastResponse } = this.state;

        this.setState({
            tracker
        });

        adUnit.on('AdSkipped', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdSkipped');

            player.trigger(DEFAULT.EVENT.VPAID_AD_SKIPPED);
            tracker.trackSkip();
        });

        adUnit.on('AdImpression', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdImpression');

            player.trigger(DEFAULT.EVENT.VPAID_AD_IMPRESSION);
            tracker.trackImpressions();
        });

        adUnit.on('AdStarted', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdStarted');

            player.trigger(DEFAULT.EVENT.VPAID_AD_STARTED);
            tracker.trackCreativeView();
            notifyPlayToPlayer();
        });

        adUnit.on('AdVideoStart', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdVideoStart');

            player.trigger(DEFAULT.EVENT.VPAID_AD_VIDEO_START);
            tracker.trackStart();
            notifyPlayToPlayer();
        });

        adUnit.on('AdPlaying', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdPlaying');

            player.trigger(DEFAULT.EVENT.VPAID_AD_PLAYING);
            tracker.trackResume();
            notifyPlayToPlayer();
        });

        adUnit.on('AdPaused', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdPaused');

            player.trigger(DEFAULT.EVENT.VPAID_AD_PAUSED);
            player.trigger(DEFAULT.EVENT.AD_PAUSE_AD);
            tracker.trackPause();
            notifyPauseToPlayer();
        });

        function notifyPlayToPlayer() {
            if (self.isPaused()) {
                self.setState({
                    paused: false
                });
            }
            player.trigger('play');

        }

        function notifyPauseToPlayer() {
            self.setState({
                paused: true
            });
            player.trigger('pause');
        }

        adUnit.on('AdVideoFirstQuartile', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdVideoFirstQuartile');

            player.trigger(DEFAULT.EVENT.VPAID_AD_VIDEO_FIRST_QUARTILE);
            tracker.trackFirstQuartile();
        });

        adUnit.on('AdVideoMidpoint', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdVideoMidpoint');

            player.trigger(DEFAULT.EVENT.VPAID_AD_VIDEO_MID_POINT);
            tracker.trackMidpoint();
        });

        adUnit.on('AdVideoThirdQuartile', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdVideoThirdQuartile');

            player.trigger(DEFAULT.EVENT.VPAID_AD_VIDEO_THIRD_QUARTILE);
            tracker.trackThirdQuartile();
        });

        adUnit.on('AdVideoComplete', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdVideoComplete');

            player.trigger(DEFAULT.EVENT.VPAID_AD_VIDEO_COMPLETE);
            tracker.trackComplete();
        });

        adUnit.on('AdClickThru', function (data) {
            log.trace('<VPAIDIntegrator Event>', 'AdClickThru');

            player.trigger(DEFAULT.EVENT.VPAID_AD_CLICK_THRU);
            var url = data.url;
            var playerHandles = data.playerHandles;
            var clickThruUrl = utilities.isNotEmptyString(url) ? url : generateClickThroughURL(vastResponse.clickThrough);
            //var clickThruUrl = utilities.isNotEmptyString(url) ? url : null;

            tracker.trackClick();
            if (playerHandles && clickThruUrl) {
                window.open(clickThruUrl, '_blank');
            }

            function generateClickThroughURL(clickThroughMacro) {
                var variables = {
                    //ASSETURI: adUnit.options.src,
                    CONTENTPLAYHEAD: 0 //In VPAID there is no method to know the current time from the adUnit
                };

                return clickThroughMacro ? vastUtil.parseURLMacro(clickThroughMacro, variables) : null;
            }
        });

        adUnit.on('AdUserAcceptInvitation', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdUserAcceptInvitation');

            player.trigger(DEFAULT.EVENT.VPAID_AD_USER_ACCEPT_INVITATION);
            tracker.trackAcceptInvitation();
            tracker.trackAcceptInvitationLinear();
        });

        adUnit.on('AdUserClose', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdUserClose');

            player.trigger(DEFAULT.EVENT.VPAID_AD_USER_CLOSE);
            tracker.trackClose();
            tracker.trackCloseLinear();
        });

        adUnit.on('AdUserMinimize', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdUserMinimize');

            player.trigger(DEFAULT.EVENT.VPAID_AD_USER_MINIMIZE);
            tracker.trackCollapse();
        });

        adUnit.on('AdError', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdError');

            player.trigger(DEFAULT.EVENT.VPAID_AD_ERROR);
            //NOTE: we track errors code 901, as noted in VAST 3.0
            tracker.trackErrorWithCode(901);
        });

        adUnit.on('AdVolumeChange', function () {
            log.trace('<VPAIDIntegrator Event>', 'AdVolumeChange');

            player.trigger(DEFAULT.EVENT.VPAID_AD_VOLUME_CHANGE);
            adUnit.getAdVolume(function (error, currentVolume) {
                if (currentVolume === 0) {
                    tracker.trackMute();
                }

                if (currentVolume > 0) {
                    tracker.trackUnmute();
                }
            });
        });

        adUnit.on('AdExpandedChange', function () {
            log.trace('< VPAIDIntegrator Event > ', 'AdExpandedChange');
            adUnit.getAdExpanded(function (error, expandAd) {
                if (expandAd) {
                    tracker.trackExpand();
                } else {
                    tracker.trackCollapse();
                }
            });
        });

        var updateViewSizeThrottled = utilities.throttle(this._resizeAd, 100);
        var { autoResize } = this.props;

        if (autoResize) {
            dom.addEventListener(window, 'resize', updateViewSizeThrottled);
            dom.addEventListener(window, 'orientationchange', updateViewSizeThrottled);
        }

        player.on('vast.resize', updateViewSizeThrottled);
        player.on('vpaid.pauseAd', pauseAdUnit);
        player.on('vpaid.resumeAd', resumeAdUnit);
        player.one(DEFAULT.EVENT.VPAID_AD_STARTED, updateViewSizeThrottled);
        player.one(DEFAULT.EVENT.VPAID_AD_IMPRESSION, updateViewSizeThrottled);

        player.one(DEFAULT.EVENT.AD_END, function () {
            player.off('vast.resize', updateViewSizeThrottled);
            player.off('vpaid.pauseAd', pauseAdUnit);
            player.off('vpaid.resumeAd', resumeAdUnit);
            player.off(DEFAULT.EVENT.VPAID_AD_STARTED, updateViewSizeThrottled);
            player.off(DEFAULT.EVENT.VPAID_AD_IMPRESSION, updateViewSizeThrottled);

            if (autoResize) {
                dom.removeEventListener(window, 'resize', updateViewSizeThrottled);
                dom.removeEventListener(window, 'orientationchange', updateViewSizeThrottled);
            }
        });

        /*** Local Functions ***/
        function pauseAdUnit() {
            adUnit.pauseAd(utilities.noop);
        }

        function resumeAdUnit() {
            adUnit.resumeAd(utilities.noop);
        }
    }

    _addSkipButton() {

    }

    _addMuteButton() {

    }

    _linkPlayerControls() {

    }

    _startAd() {
        log.debug('<VPAIDIntegrator._startAd>');
        let { player } = this.props;
        let { adUnit } = this.state;
        this.containerEl.style.display = '';

        return new Promise((resolve, reject) => {
            adUnit.startAd(function (error) {
                if (error) {
                    log.debug('<VPAIDIntegrator._startAd> error: ', error);
                    reject(error);
                    return;
                }

                log.debug('<VPAIDIntegrator._startAd> success');
                player.trigger(DEFAULT.EVENT.VPAID_AD_START);
                resolve();
            });
        });

    }

    _finishPlaying() {
        log.debug('<VPAIDIntegrator._finishPlaying>');

        let self = this;
        let { player } = this.props;
        let { adUnit } = this.state;

        return new Promise((resolve, reject) => {

            function adStopped(error) {
                let { ended } = self.state;

                if (ended) {
                    return;
                }

                player.off('vpaid-skip-ad-error');

                adUnit.off('AdStopped');
                adUnit.off('AdVideoComplete');
                adUnit.off('AdError');

                self.setState({
                    ended: true
                });

                player.trigger('vpaid:AdEnd');

                if (error) {
                    return reject(error);
                }
                resolve();
            }

            adUnit.on('AdStopped', function () {
                adStopped();
            });

            adUnit.on('AdVideoComplete', function () {
                adStopped();
            });

            adUnit.on('AdError', function (error) {
                adStopped(ERROR.VPAID_INTEGRATOR_ERROR_WHILE_WAITING_FINISH.extendsWithData({
                    error
                }));
            });

            player.one('vpaid-skip-ad-error', function (evt, error) {
                adStopped(error);
            });
        });
    }

    _createVPAIDAdUnitWrapper(adUnit, src, responseTimeout) {
        let { player } = this.props;
        return new VPAIDAdUnitWrapper({
            player,
            adUnit,
            src,
            responseTimeout
        });
    }

    _createVASTTracker() {
        let { tech, vastResponse } = this.state;
        return new VASTTracker(tech.mediaFile.src, vastResponse);
    }

    @autobind
    _resizeAd() {
        let { player } = this.props;
        let { adUnit } = this.state;
        let VIEW_MODE = this.VIEW_MODE;

        let tech = player.el().querySelector('.vjs-tech');
        // let videoEl_ = this.videoEl;
        let dimension = dom.getDimension(tech);

        let MODE = player.isFullscreen() ? VIEW_MODE.FULLSCREEN : VIEW_MODE.NORMAL;
        adUnit.resizeAd(dimension.width, dimension.height, MODE, this._logError);

        log.info('resizeAd', 'width:', dimension.width, 'height:', dimension.height);
    }

    @autobind
    _logError(error) {
        if (error) {
            log.error('ERROR: ' + error.message, error);
        }
    }

    expandAd() {
        let { player } = this.props;
        let { adUnit } = this.state;

        if (!player) {
            return;
        }

        adUnit.expandAd(function () {
            //ignore
        });
    }

    collapseAd() {
        let { player } = this.props;
        let { adUnit } = this.state;

        if (!player) {
            return;
        }

        adUnit.collapseAd(function () {
            //ignore
        });
    }

    _trackError(error) {
        let { vastResponse } = this.state;
        vastUtil.track(vastResponse.errorURLMacros, { ERRORCODE: error.code || 901 });
    }
}

export default VPAIDIntegrator;