import {log} from 'playercore';
import * as utilities from '../../utils/utilityFunctions';
import dom from '../../utils/dom';
import { ERROR } from '../../enum';
import VPAIDHTML5Client from 'vpaid-html5-client';


class VPAIDHTML5Tech {
    constructor(mediaFile) {
        if (!mediaFile || !utilities.isString(mediaFile.src)) {
            throw ERROR.VPAIDHTML5TECH_INVALID_MEDIA_FILE;
        }

        this.name = 'vpaid-html5';
        this.containerEl = null;
        this.videoEl = null;
        this.vpaidHTMLClient = null;

        this.mediaFile = mediaFile;
    }

    loadAdUnit(containerEl, videoEl, callback) {
        if (!dom.isDomElement(containerEl)) {
            throw ERROR.VPAIDHTML5TECH_INVALID_DOM_CONTAINER_EL;
        }

        if (!dom.isDomElement(videoEl) || videoEl.tagName.toLowerCase() !== 'video') {
            throw ERROR.VPAIDHTML5TECH_INVALID_DOM_CONTAINER_EL;
        }

        if (!utilities.isFunction(callback)) {
            throw ERROR.VPAIDHTML5TECH_MISSING_CALLBACK;
        }

        this.containerEl = containerEl;
        this.videoEl = videoEl;
        this.vpaidHTMLClient = new VPAIDHTML5Client(containerEl, videoEl, {});
        this.vpaidHTMLClient.loadAdUnit(this.mediaFile.src, callback);
    }

    unloadAdUnit() {
        if (this.vpaidHTMLClient) {
            try {
                this.vpaidHTMLClient.destroy();
            } catch (e) {
                log.error('VAST ERROR: trying to unload the VPAID adunit');
            }

            this.vpaidHTMLClient = null;
        }

        if (this.containerEl) {
            dom.remove(this.containerEl);
            this.containerEl = null;
        }
    }

    static types = [
        'text/javascript',
        'text/javascript1.0',
        'text/javascript1.2',
        'text/javascript1.4',
        'text/jscript',
        'application/javascript',
        'application/x-javascript',
        'text/ecmascript',
        'text/ecmascript1.0',
        'text/ecmascript1.2',
        'text/ecmascript1.4',
        'text/livescript',
        'application/ecmascript',
        'application/x-ecmascript'
    ]

    static supports(type) {
        return !utilities.isOldIE() && this.types.indexOf(type) > -1;
    }
}

export default VPAIDHTML5Tech;