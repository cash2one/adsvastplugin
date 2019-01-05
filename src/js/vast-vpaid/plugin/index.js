import { log, PropTypes, autobind, playerconfig } from 'playercore';

import VCPlayerObject from '../../VCPlayerObject';

import VastTest from '../ads/vastTest';
// import VASTIntegrator from '../ads/vast';
import VPAIDIntegrator from '../ads/vpaid';
import IMAIntegrator from '../ads/ima';

import VASTClient from '../vast/VASTClient';
import vastUtil from '../vast/vastUtil';

import RestorePlayer from '../utils/RestorePlayer';

const { DEFAULT } = playerconfig;
const vastClient = new VASTClient();

const AD_STATES = {
    INIT: 'INIT',
    PENDING: 'PENDING',
    WATING: 'WATING',
    DISPOSE: 'DISPOSE'
};

class VastPlugin extends VCPlayerObject {
    /**
     * Định nghĩa kiểu của props
     * @type {Object}
     */
    static propTypes = {
        player: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        adTagUrl: PropTypes.string,
        adTagXML: PropTypes.object,
        ima: PropTypes.string,
        preLoaded: PropTypes.bool,
        skipoffset: PropTypes.number,
        vastResponse: PropTypes.array,
    };

    static defaultProps = {
        timeout: 500,
        autostart: true
    };

    state = {
        adState: AD_STATES.INIT,
        adIntegrator: null,
        paused: false,
        restorePlayer : null,
    }

    constructor(props) {
        super(props);
        let { player } = this.props;
        player.vastAd = this;
        this.firstAd = false;

        // override play/pause;
        // this._prepareForAd();
        // setup restore play content when ad ended
        // this._setUpRestorePlayer();
        this._initAd();
    }

    /**
     * Vị trí chạy ad
     */
    adPosition() {
        let { type } = this.props;
        return type;
    }

    @autobind
    skipAd() {
        let { adIntegrator } = this.state;

        if (!adIntegrator) {
            return;
        }

        adIntegrator.skipAd();
    }

    @autobind
    clickThrough() {
        let { adIntegrator } = this.state;

        if (!adIntegrator) {
            return;
        }

        adIntegrator.clickThrough();
    }

    getAdVolume() {
        let { adIntegrator } = this.state;

        if (!adIntegrator) {
            return;
        }

        return adIntegrator.getAdVolume();
    }

    getAdExpanded() {
        let { adIntegrator } = this.state;

        if (!adIntegrator) {
            return;
        }

        return adIntegrator.getAdExpanded();
    }

    setAdVolume(volume) {
        let { adIntegrator } = this.state;

        if (!adIntegrator) {
            return;
        }

        adIntegrator.setAdVolume(volume);
    }

    adUnit() {
        let { adIntegrator } = this.state;

        if (!adIntegrator) {
            return;
        }

        return adIntegrator;
    }

    paused() {
        return this.state.paused;
    }

    getPlayerAdUnit() {
        let { adIntegrator } = this.state;
        return adIntegrator.getPlayerAdUnit();
    }

    isPaused() {
        let { adIntegrator } = this.state;
        return adIntegrator.isPaused();
    }

    vastResponse() {
        let { vastResponse } = this.state;
        return vastResponse;
    }

    _initAd() {
        let self = this;
        let { player } = this.props;

        // player.trigger(DEFAULT.EVENT.AD_START, this);
        player.on(DEFAULT.EVENT.USER_SKIP_AD, this.skipAd);

        Promise.resolve().then(() => {
            return self._setAdCancelTimeout();
        }).then(() => {
            return self._getVastResponse();
        }).then((vastResponse) => {
            return self.playAd(vastResponse);
        }).then(() => {
            let { restorePlayer, adIntegrator } = self.state;
            log.trace('VastPlugin > ad end');
            restorePlayer.snapshot().muted = adIntegrator.getPlayerAdUnit().muted();
            restorePlayer.snapshot().volume = adIntegrator.getPlayerAdUnit().volume();
            player.trigger(DEFAULT.EVENT.AD_END);
        }).catch(e => {
            log.trace('VastPlugin > end with error:', e);
            player.trigger(DEFAULT.EVENT.AD_END);
        });

    }

    prepareForPlayAd() {
        this._prepareForAd();
        this._setUpRestorePlayer();
    }

    _prepareForAd() {
        let self = this;
        let { player } = this.props;
        let origPlay = this.origPlay = player.play;
        let origPause = this.origPlay = player.pause;
        player.play = function (isOri) {
            let { adIntegrator } = self.state;

            if (isOri) {
                origPlay.apply(this, arguments);
                return;
            }

            if (!adIntegrator) {
                return;
            }

            self.setState({
                paused: false
            });

            adIntegrator.resumeAd();
        };

        player.pause = function (isOri) {
            let { adIntegrator } = self.state;

            if (isOri) {
                origPause.apply(this, arguments);
                return;
            }


            if (!adIntegrator) {
                return;
            }

            self.setState({
                paused: true
            });

            adIntegrator.pauseAd();
        };

        player.one(DEFAULT.EVENT.AD_END, function () {
            player.off(DEFAULT.EVENT.USER_SKIP_AD, self.skipAd);
            player.play = origPlay;
            player.pause = origPause;
        });
    }

    async playAd(adChains) {
        let { player } = this.props;
        let { adState } = this.state;
        let { adPod } = player.options().params;
        if (adState !== AD_STATES.INIT) {
            return;
        }

        if (adChains && adChains.length) {

            let error;
            let result;
            for (let i = 0; i < adChains.length; i++) {
                let vastResponse = adChains[i];
                try {
                    if (adPod === true) {
                        player.trigger(DEFAULT.EVENT.AD_VASTRESPONSE, vastResponse);
                        result = await this._playMutilAd(vastResponse);
                    } else {
                        player.trigger(DEFAULT.EVENT.AD_VASTRESPONSE, vastResponse);
                        result = await this._playOneAd(vastResponse);
                        return result;
                    }
                } catch (e) {
                    error = e;
                }
            }

            return error;
        }

        return this._playOneAd(adChains);
    }

    _playMutilAd(vastResponse) {
        let { player } = this.props;
        this.setState({
            vastResponse,
            adIntegrator: null,
        });
        let adIntegrator;
        if (IMAIntegrator && this._isIMA(vastResponse)) {
            adIntegrator = new IMAIntegrator(this.props);
        } else {
            adIntegrator = this._isVPAID(vastResponse) ? new VPAIDIntegrator(this.props) : new VastTest(this.props);
        }

        this.setState({
            adIntegrator
        });

        let vpaidStarted = false;
        player.one(DEFAULT.EVENT.VPAID_AD_START, function () {
            vpaidStarted = true;
        });

        return adIntegrator.playAd(vastResponse).catch(e => {
            if (!vpaidStarted) {
                throw e;
            }
        });
    }

    _playOneAd(vastResponse) {
        let { player } = this.props;
        this.setState({
            vastResponse
        });
        let adIntegrator;
        if (IMAIntegrator && this._isIMA(vastResponse)) {
            adIntegrator = new IMAIntegrator(this.props);
        } else {
            adIntegrator = this._isVPAID(vastResponse) ? new VPAIDIntegrator(this.props) : new VastTest(this.props);
        }

        this.setState({
            adIntegrator
        });
        player.trigger(DEFAULT.EVENT.AD_PLAY, vastResponse);

        let vpaidStarted = false;
        player.one(DEFAULT.EVENT.VPAID_AD_START, function () {
            vpaidStarted = true;
        });

        return adIntegrator.playAd(vastResponse).catch(e => {
            if (!vpaidStarted) {
                throw e;
            }
        });
    }

    snapshot() {
        return this.state.restorePlayer.snapshot();
    }

    _setUpRestorePlayer() {
        let { player, preLoaded} = this.props;
        let restorePlayer = new RestorePlayer({ player, vastAd: this, preLoaded});
        this.setState({ restorePlayer });
    }

    _setAdCancelTimeout() {

    }

    _getVastResponse() {
        let { adTagUrl, vastResponse, ima } = this.props;

        if (ima) {
            return Promise.resolve({ ima: true, adTagUrl: ima });
        }

        if (vastResponse) {
            return Promise.resolve(vastResponse);
        }
        return VastPlugin.getVASTResponse(adTagUrl);
    }

    _isVPAID(vastResponse) {
        var i, len;
        var mediaFiles = vastResponse.mediaFiles;
        for (i = 0, len = mediaFiles.length; i < len; i++) {
            if (vastUtil.isVPAID(mediaFiles[i]) && mediaFiles[i].isSupported()) {
                return true;
            }
        }
        return false;
    }

    _isIMA(vastResponse) {
        return !!vastResponse.ima;
    }

    static getVASTResponse(url) {
        return vastClient.getVASTResponse(url);
    }
}

export default VastPlugin;