/**
 * class VastError
 */
class VastError {
    constructor(code = 0, msg = '', data) {
        this.code = code;
        this.msg = msg;
        if (data) {
            this.data = data;
        }
    }

    extendsWithData(data) {
        var code = this.code;
        var msg = this.msg;

        return new Error(code, msg, data);
    }
}

const generateError = function (code, msg) {
    return new VastError(code, msg);
};

/**
 * Danh sách các lỗi
 * @type {Object}
 */
const error = {
    ERROR_DF_99: generateError(99, 'timeout while waiting for the video to start playing'),
    ERROR_100: generateError(100, 'VASTClient, error parsing xml'),
    ERROR_102: generateError(102, 'VASTClient, not supported VAST version'),
    ERROR_301: generateError(301, 'VASTClient, request ad tag url error'),
    ERROR_303: generateError(303, 'VASTClient, no Ad in VAST tree'),
    ERROR_402: generateError(402, 'timeout while waiting for the video to start playing'),

    VPAIDHTML5TECH_INVALID_MEDIA_FILE: generateError(700, 'Invalid MediaFile'),
    VPAIDHTML5TECH_INVALID_DOM_CONTAINER_EL: generateError(701, 'Invalid container HtmlElement'),
    VPAIDHTML5TECH_INVALID_DOM_VIDEO_EL: generateError(702, 'Invalid HTMLVideoElement'),
    VPAIDHTML5TECH_MISSING_CALLBACK: generateError(702, 'Missing valid callback'),

    VASTTRACKER_ASSET_URI: generateError(110, 'VASTTracker, missing required the URI of the ad asset being played'),
    VASTTRACKER_VAST_RESPONSE: generateError(111, 'VASTTracker, missing required VAST response'),

    VASTClIENT_MISS_AD_TAG_URL: generateError(120, 'VASTClient, missing ad tag URL'),
    VASTClIENT_RESQUEST_AD_TAG_URL_ERROR: generateError(121, 'VASTClient, request ad tag url error'),
    VASTClIENT_NO_AD_IN_VAST_TREE: generateError(303, 'VASTClient, no Ad in VAST tree'),
    VASTClIENT_NOT_SUPPORT_VAST_VERSION: generateError(102, 'VASTClient, not supported VAST version'),
    VASTClIENT_PARSING_XML_ERROR: generateError(100, 'VASTClient, error parsing xml'),
    VASTClIENT_WRAPPER_LIMIT_REACHED: generateError(302, 'VASTClient, players wrapper limit reached'),
    VASTClIENT_AD_TYPE_NOT_SUPPORT: generateError(200, 'VASTClient, received an Ad type that is not supported'),
    VASTClIENT_MISSING_DURATION: generateError(101, 'VASTClient, missing duration field in VAST response'),
    VASTClIENT_MISSING_OFFSET_TRACKING: generateError(101, 'VASTClient, missing or wrong offset attribute on progress tracking event'),
    
    VALID_AD_ERROR_1: generateError(101, 'VASTClient, InLine and Wrapper both found on the same Ad'),
    VALID_AD_ERROR_2: generateError(101, 'VASTClient, nor wrapper nor inline elements found on the Ad'),
    VALID_AD_ERROR_3: generateError(403, 'VASTClient, could not find MediaFile that is supported by this video player'),
    VALID_AD_ERROR_4: generateError(133, 'VASTClient, missing "VASTAdTagURI" in wrapper'),

    VAST_INTEGRATOR_SOURCE_ERROR: generateError(403, 'VASTIntegrator, Could not find Ad mediafile supported by this player'),

    VPAID_INTEGRATOR_NOT_SUPPORT_MEDIAFILE: generateError(150, 'VPAIDIntegrator, Could not find a supported mediaFile'),
    VPAID_INTEGRATOR_HANDSHAKE_NOT_SUPPORT_VERSION: generateError(151, 'VPAIDIntegrator handshake, unsupported version'),
    VPAID_INTEGRATOR_ERROR_WHILE_WAITING_FINISH: generateError(152, ' VPAIDIntegrator, error while waiting for the adUnit to finish playing'),
    VPAID_INTEGRATOR_ERROR_WHILE_INIT: generateError(153, ' VPAIDIntegrator, error while waiting init adUnit'),

    VPAID_AD_UNIT_WRAPPER_AD_UNIT_NOT_FULLY: generateError(160, 'VPAIDAdUnitWrapper, the passed VPAID adUnit does not fully implement the VPAID interface'),
    VPAID_AD_UNIT_WRAPPER_METHOD_TIMEOUT: generateError(161, ' VPAIDAdUnitWrapper, timeout while waiting for a response on call method'),
    VPAID_AD_UNIT_WRAPPER_INVALID_METHOD_NAME: generateError(162, ' VPAIDAdUnitWrapper, invalid method name'),
    VPAID_AD_UNIT_WRAPPER_MISSING_CALLBACK: generateError(163, ' VPAIDAdUnitWrapper, missing callback'),

    VPAID_AD_UNIT_WRAPPER_EVENT_TIMEOUT: generateError(601, ' VPAIDAdUnitWrapper, timeout while waiting for event'),
    VPAID_AD_UNIT_WRAPPER_MISSING_EVENT_NAME: generateError(165, ' VPAIDAdUnitWrapper, missing event name'),
    VPAID_AD_UNIT_WRAPPER_MISSING_EVENT_CALLBACK: generateError(166, ' VPAIDAdUnitWrapper, missing event callback'),
};

export default error;