import { PropTypes } from 'playercore';

import VCPlayerObject from '../../../VCPlayerObject';
import * as utilities from '../../utils/utilityFunctions';
import {ERROR} from '../../enum';

var EVENTS = [
    'AdLoaded',
    'AdStarted',
    'AdStopped',
    'AdSkipped',
    'AdSkippableStateChange', // VPAID 2.0 new event
    'AdSizeChange', // VPAID 2.0 new event
    'AdLinearChange',
    'AdDurationChange', // VPAID 2.0 new event
    'AdExpandedChange',
    'AdRemainingTimeChange', // [Deprecated in 2.0] but will be still fired for backwards compatibility
    'AdVolumeChange',
    'AdImpression',
    'AdVideoStart',
    'AdVideoFirstQuartile',
    'AdVideoMidpoint',
    'AdVideoThirdQuartile',
    'AdVideoComplete',
    'AdClickThru',
    'AdInteraction', // VPAID 2.0 new event
    'AdUserAcceptInvitation',
    'AdUserMinimize',
    'AdUserClose',
    'AdPaused',
    'AdPlaying',
    'AdLog',
    'AdError'
];

class VPAIDAdUnitWrapper extends  VCPlayerObject{

    /**
     * Định nghĩa kiểu của props
     * @type {Object}
     */
    static propTypes = {
        adUnit: PropTypes.object.isRequired,
        player: PropTypes.object.isRequired,
        responseTimeout: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        let {adUnit, player} = this.props;
        if (!adUnit || !this._checkVPAIDInterface(adUnit)) {
            throw ERROR.VPAID_AD_UNIT_WRAPPER_AD_UNIT_NOT_FULLY;
        }

        EVENTS.forEach(function (event) {
            this.on(event, function() {
                player.trigger('ads.log', event);
            });
        }.bind(this));
    }

    _checkVPAIDInterface(VPAIDAdUnit) {
        //NOTE: skipAd is not part of the method list because it only appears in VPAID 2.0 and we support VPAID 1.0
        let VPAIDInterfaceMethods = [
            'handshakeVersion', 'initAd', 'startAd', 'stopAd', 'resizeAd', 'pauseAd', 'expandAd', 'collapseAd'
        ];

        for (var i = 0, len = VPAIDInterfaceMethods.length; i < len; i++) {
            if (!VPAIDAdUnit || !utilities.isFunction(VPAIDAdUnit[VPAIDInterfaceMethods[i]])) {
                return false;
            }
        }


        return canSubscribeToEvents(VPAIDAdUnit) && canUnsubscribeFromEvents(VPAIDAdUnit);

        /*** Local Functions ***/

        function canSubscribeToEvents(adUnit) {
            return utilities.isFunction(adUnit.subscribe) || utilities.isFunction(adUnit.addEventListener) || utilities.isFunction(adUnit.on);
        }

        function canUnsubscribeFromEvents(adUnit) {
            return utilities.isFunction(adUnit.unsubscribe) || utilities.isFunction(adUnit.removeEventListener) || utilities.isFunction(adUnit.off);
        }
    }

    adUnitAsyncCall() {
        let {adUnit, responseTimeout} = this.props;
        var args = utilities.arrayLikeObjToArray(arguments);
        var method = args.shift();
        var cb = args.pop();
        var timeoutId;

        sanityCheck(method, cb, adUnit);
        args.push(wrapCallback());

        adUnit[method].apply(adUnit, args);
        timeoutId = setTimeout(function () {
            timeoutId = null;
            cb(ERROR.VPAID_AD_UNIT_WRAPPER_METHOD_TIMEOUT.extendsWithData({method}));
            cb = utilities.noop;
        }, responseTimeout);

        /*** Local functions ***/
        function sanityCheck(method, cb, adUnit) {
            if (!utilities.isString(method) || !utilities.isFunction(adUnit[method])) {
                throw ERROR.VPAID_AD_UNIT_WRAPPER_INVALID_METHOD_NAME.extendsWithData({method});
            }

            if (!utilities.isFunction(cb)) {
                throw ERROR.VPAID_AD_UNIT_WRAPPER_MISSING_CALLBACK.extendsWithData({method});
            }
        }

        function wrapCallback() {
            return function () {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                cb.apply(this, arguments);
            };
        }
    }

    on(evtName, handler) {
        let {adUnit} = this.props;
        let addEventListener = adUnit.addEventListener || adUnit.subscribe || adUnit.on;
        addEventListener.call(adUnit, evtName, handler);
    }

    off(evtName, handler) {
        let {adUnit} = this.props;
        let removeEventListener = adUnit.removeEventListener || adUnit.unsubscribe || adUnit.off;
        removeEventListener.call(adUnit, evtName, handler);
    }

    waitForEvent(evtName, cb, context, timeout) {
        let {responseTimeout} = this.props;
        let timeoutId;
        sanityCheck(evtName, cb);
        context = context || null;

        this.on(evtName, responseListener);

        timeoutId = setTimeout(function () {
            cb(ERROR.VPAID_AD_UNIT_WRAPPER_EVENT_TIMEOUT.extendsWithData({event: evtName}));
            timeoutId = null;
            cb = utilities.noop;
        }, timeout|| responseTimeout);

        /*** Local functions ***/
        function sanityCheck(evtName, cb) {
            if (!utilities.isString(evtName)) {
                throw ERROR.VPAID_AD_UNIT_WRAPPER_MISSING_EVENT_NAME.extendsWithData({event: evtName});
            }

            if (!utilities.isFunction(cb)) {
                throw ERROR.VPAID_AD_UNIT_WRAPPER_MISSING_EVENT_CALLBACK.extendsWithData({event: evtName});
            }
        }

        function responseListener() {
            var args = utilities.arrayLikeObjToArray(arguments);

            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }

            args.unshift(null);
            cb.apply(context, args);
        }
    }

    handshakeVersion(version, cb) {
        this.adUnitAsyncCall('handshakeVersion', version, cb);
    }

    initAd(width, height, viewMode, desiredBitrate, adUnitData, cb) {
        let {adUnit} = this.props;
        let isLoaded = false;
        let isError = false;

        this.waitForEvent('AdLoaded', function() {
            if (isError) {
                return;
            }
            isLoaded = true;
            cb.apply(null, arguments);
        });

        this.on('AdError', function(error) {
            if (isLoaded) {
                return;
            }

            isError = true;
            cb(error);
        });

        adUnit.initAd(width, height, viewMode, desiredBitrate, adUnitData, {iframe: adUnit._iframe});
    }

    resizeAd(width, height, viewMode, cb) {
        // NOTE: AdSizeChange event is only supported on VPAID 2.0 so for the moment we are not going to use it
        // and will assume that everything is fine after the async call
        this.adUnitAsyncCall('resizeAd', width, height, viewMode, cb);
    }

    startAd(cb) {
        let {adUnit} = this.props;
        this.waitForEvent('AdStarted', cb);
        adUnit.startAd();
    }

    stopAd(cb) {
        let {adUnit} = this.props;
        this.waitForEvent('AdStopped', cb, null, 300);
        adUnit.stopAd();
    }

    pauseAd(cb) {
        let {adUnit} = this.props;
        this.waitForEvent('AdPaused', cb);
        adUnit.pauseAd();
    }

    resumeAd(cb) {
        let {adUnit} = this.props;
        this.waitForEvent('AdPlaying', cb);
        adUnit.resumeAd();
    }

    expandAd(cb) {
        let {adUnit} = this.props;
        this.waitForEvent('AdExpandedChange', cb);
        adUnit.expandAd();
    }

    collapseAd(cb) {
        let {adUnit} = this.props;
        this.waitForEvent('AdExpandedChange', cb);
        adUnit.collapseAd();
    }

    skipAd(cb) {
        let {adUnit} = this.props;
        this.waitForEvent('AdSkipped', cb, null, 300);
        adUnit.skipAd();
    }

    setAdVolume(volume, cb){
        this.adUnitAsyncCall('setAdVolume',volume, cb);
    }
}

//VPAID property getters
[
    'adLinear',
    'adWidth',
    'adHeight',
    'adExpanded',
    'adSkippableState',
    'adRemainingTime',
    'adDuration',
    'adVolume',
    'adCompanions',
    'adIcons'
].forEach(function (property) {
    var getterName = 'get' + utilities.capitalize(property);

    VPAIDAdUnitWrapper.prototype[getterName] = function (cb) {
        this.adUnitAsyncCall(getterName, cb);
    };
});

export default VPAIDAdUnitWrapper;