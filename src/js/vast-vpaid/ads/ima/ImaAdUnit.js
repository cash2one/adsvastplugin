import { PropTypes, log } from 'playercore';

import VCPlayerObject from '../../../VCPlayerObject';
import Controller from './controller';

class ImaAdUnit extends VCPlayerObject {
    /**
     * Định nghĩa kiểu của props
     * @type {Object}
     */
    static propTypes = {
        player: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    loadAdUnit(AdContainer, videoEl, callback) {
        log.debug('<ImaAdUnit.loadAdUnit>');
        let controller = this.controller = new Controller({...this.props, AdContainer, videoEl});
        controller.onAdsReady = () => {
            log.debug('<ImaAdUnit.loadAdUnit> success');
            callback();
        };

        controller.onErrorLoadingAds = (e) => {
            log.debug('<ImaAdUnit.loadAdUnit> error', e);
            callback(e);
        };
    }

    startAd() {
        log.debug('<ImaAdUnit.startAd>');
        this.controller.onPlayerReadyForPreroll();
    }
    pauseAd() {
        this.controller.pauseAd();
    }

    resumeAd() {
        this.controller.resumeAd();
    }

    onAdError(callback) {
        this.controller.onAdError = callback;
    }


    on(evt, handle) {
        this.controller.addEventListener(evt, handle);
    }

    off(evt, handle) {
        this.controller.removeEventListener(evt, handle);
    }
}

export default ImaAdUnit;