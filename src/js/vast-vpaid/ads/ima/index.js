import { autobind, log, playerconfig } from 'playercore';
import VCPlayerObject from '../../../VCPlayerObject';
import dom from '../../utils/dom';

import ImaAdUnit from './ImaAdUnit';
const { DEFAULT } = playerconfig;

/* global google */

if (!window.google && !window.___firstLoadGoogle__) {
    window.___firstLoadGoogle__ = true;
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//imasdk.googleapis.com/js/sdkloader/ima3.js';
    head.appendChild(script);
}

class ImaIntegrator extends VCPlayerObject {
    constructor(props) {
        super(props);
        let { player } = this.props;
        this.containerEl = this._createImaContainerEl(player);
        player.one(DEFAULT.EVENT.AD_END, this._handleAdEnd);
    }

    _createImaContainerEl() {
        let { player } = this.props;
        let containerEl = document.createElement('div');
        dom.addClass(containerEl, 'ima-container');

        player.overlay.append(containerEl);
        return containerEl;
    }

    @autobind
    _handleAdEnd() {
        log.debug('<VPAIDIntegrator._handleAdEnd>');
        if (this.containerEl) {
            dom.remove(this.containerEl);
            this.containerEl = null;
        }
    }

    playAd(vastResponse) {
        let self = this;
        this.setState({
            vastResponse
        });

        return Promise.resolve().then(() => {
            return self._loadAdUnit();
        }).then(() => {
            return self._setupEvents();
        }).then(() => {
            return self._playAdUnit();
        }).then(() => {
            return self._finishPlaying();
        }).catch(e => {
            throw e;
        });
    }

    pauseAd() {
        let { player } = this.props;
        let { adUnit } = this.state;
        player.pause(true);

        if (!adUnit) {
            return;
        }
        adUnit.pauseAd();
    }

    resumeAd() {
        let { adUnit } = this.state;
        if (!adUnit) {
            return;
        }
        adUnit.resumeAd();
    }

    _loadAdUnit() {
        let { player } = this.props;
        let { vastResponse } = this.state;
        let vjsTechEl = player.el().querySelector('.vjs-tech');
        return new Promise((resolve, reject) => {
            let adUnit = new ImaAdUnit({ player, ...vastResponse });
            adUnit.loadAdUnit(this.containerEl, vjsTechEl, err => {
                if (err) {
                    return reject(err);
                }

                this.setState({ adUnit });
                resolve();
            });
        });
    }

    _setupEvents() {
        log.debug('<ImaIntegrator._setupEvents>');
        let { adUnit } = this.state;
        let { player } = this.props;

        adUnit.on(google.ima.AdEvent.Type.STARTED, function () {
            player.trigger(DEFAULT.EVENT.IMA_AD_STARTED);
        });
    }

    _playAdUnit() {
        let { adUnit } = this.state;
        let { player } = this.props;
        adUnit.startAd();
        player.trigger(DEFAULT.EVENT.IMA_AD_START);
    }

    _finishPlaying() {
        log.debug('<ImaIntegrator._finishPlaying>');
        let { adUnit } = this.state;

        return new Promise((resolve, reject) => {

            function adStopped(error) {
                //adUnit.off(google.ima.AdEvent.Type.ALL_ADS_COMPLETED);

                if (error) {
                    return reject(error);
                }
                resolve();
            }

            adUnit.on(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, function () {
                adStopped();
            });

            adUnit.on(google.ima.AdErrorEvent.Type.AD_ERROR, function (err) {
                adStopped(err);
            });

            adUnit.onAdError(function (err) {
                adStopped(err);
            });
        });
    }
}

export default ImaIntegrator;