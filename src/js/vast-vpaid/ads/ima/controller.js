import { PropTypes, log , agent} from 'playercore';
import dom from '../../utils/dom';

import VCPlayerObject from '../../../VCPlayerObject';

import SdkImpl from './sdk-impl.js';

class Controller extends VCPlayerObject{
    /**
     * Định nghĩa kiểu của props
     * @type {Object}
     */
    static propTypes = {
        player: PropTypes.object.isRequired
    };

    settings = {
        //autoPlayAdBreaks: false,
        locale: null,
        disableFlashAds: true,
        disableCustomPlaybackForIOS10Plus: true,
        adTagUrl: null,
        adsResponse: null,
        vpaidAllowed: true,
        vpaidMode: true,
        numRedirects: 5,
        forceNonLinearFullSlot: false,
        nonLinearWidth: null,
        nonLinearHeight: null,
        adsManagerLoadedCallback: null,
        adsRenderingSettings: null,

        debug: false,
        timeout: 5000,
        prerollTimeout: 1000,
        adLabel: 'Advertisement',
        showControlsForJSAds: true,

        AdContainer: null,
        videoEl: null
    };

    constructor(props) {
        super(props);
        this.settings = {
            ...this.settings,
            ...this.props
        };

        this.sdkImpl = new SdkImpl(this);
    }

    requestAds() {
        this.sdkImpl.requestAds();
    }

    onPlayerReadyForPreroll() {
        this.sdkImpl.onPlayerReadyForPreroll();
    }

    initializeAdDisplayContainer() {
        this.sdkImpl.initializeAdDisplayContainer();
    }

    playAdBreak() {
        this.sdkImpl.playAdBreak();
    }

    addEventListener(event, callback) {
        this.sdkImpl.addEventListener(event, callback);
    }

    removeEventListener(event, callback) {
        this.sdkImpl.removeEventListener(event, callback);
    }

    getAdsManager() {
        return this.sdkImpl.getAdsManager();
    }

    ////////////////////////////

    getSettings() {
        return this.settings;
    }

    getAdContainerDiv() {
        return this.settings.AdContainer;
    }

    getContentPlayer() {
        return this.settings.videoEl;
    }

    getPlayerWidth() {
        let {player} = this.props;
        let tech = player.el().querySelector('.vjs-tech');
        let dimension = dom.getDimension(tech);
        return dimension.width;
    }

    getPlayerHeight() {
        let {player} = this.props;
        let tech = player.el().querySelector('.vjs-tech');
        let dimension = dom.getDimension(tech);
        return dimension.height;
    }

    adsWillAutoplay() {

    }

    adsWillPlayMuted() {

    }

    getContentPlayheadTracker() {
        return {
            currentTime: 0,
            previousTime: 0,
            seeking: false,
            duration: 0,
        };
    }

    getIsMobile() {
        return agent.isMobile;
    }

    /**
     * abstract
     * @return {[type]} [description]
     */
    onAdsReady() {
        log.debug('<ImaController.onAdsReady>');
    }

    /**
     * abstract
     * @return {[type]} [description]
     */
    onErrorLoadingAds() {
        log.debug('<ImaController.onErrorLoadingAds>');
    }

    getPlayerVolume() {
        return 1;
    }

    onAdError(e) {
        log.debug('<ImaController.onAdError>', e);
    }

    onAdBreakStart() {
        log.debug('<ImaController.onAdBreakStart>');
    }

    onAdBreakEnd() {
        log.debug('<ImaController.onAdBreakEnd>');
    }

    onAllAdsCompleted() {
        log.debug('<ImaController.onAllAdsCompleted>');
    }

    onNonLinearAdLoad() {
        log.debug('<ImaController.onNonLinearAdLoad>');
    }

    onLinearAdStart() {
        log.debug('<ImaController.onLinearAdStart>');
    }

    onNonLinearAdStart() {
        log.debug('<ImaController.onNonLinearAdStart>');
    }

    onAdsPaused() {
        log.debug('<ImaController.onAdsPaused>');
    }

    onAdsResumed() {
        log.debug('<ImaController.onAdsResumed>');
    }

    onAdPlayheadUpdated() {
        log.debug('<ImaController.onAdPlayheadUpdated>');
    }

    onContentAndAdsCompleted() {
        log.debug('<ImaController.onContentAndAdsCompleted>');
    }

    onNoPostroll() {
        log.debug('<ImaController.onNoPostroll>');
    }

    showAdContainer() {
        log.debug('<ImaController.showAdContainer>');
    }

    playContent() {
        log.debug('<ImaController.playContent>');
    }

    /**
     * Pauses the ad.
     */
    pauseAd() {
        this.sdkImpl.pauseAds();
    }


    /**
     * Resumes the ad.
     */
    resumeAd() {
        this.sdkImpl.resumeAds();
    }
}

export default Controller;