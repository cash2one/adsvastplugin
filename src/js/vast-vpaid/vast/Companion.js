import {log} from 'playercore';
import TrackingEvent from './TrackingEvent';

import xml from '../utils/xml';
import * as utilities from '../utils/utilityFunctions';

class Companion {
    constructor(companionJTree) {
        log.info('<Companion> found companion ad');
        log.debug('<Companion>  companionJTree:', companionJTree);

        //Required Elements
        this.creativeType = xml.attr(companionJTree.staticResource, 'creativeType');
        this.staticResource = xml.keyValue(companionJTree.staticResource);

        log.info('<Companion>  creativeType: ' + this.creativeType);
        log.info('<Companion>  staticResource: ' + this.staticResource);

        // Weird bug when the JXON tree is built it doesn't handle casing properly in this situation...
        var htmlResource = null;
        if (xml.keyValue(companionJTree.HTMLResource)) {
            htmlResource = xml.keyValue(companionJTree.HTMLResource);
        } else if (xml.keyValue(companionJTree.hTMLResource)) {
            htmlResource = xml.keyValue(companionJTree.hTMLResource);
        }

        if (htmlResource !== null)
        {
            log.info('<Companion> found html resource', htmlResource);
        }

        this.htmlResource = htmlResource;

        var iframeResource = null;
        if (xml.keyValue(companionJTree.IFrameResource)) {
            iframeResource = xml.keyValue(companionJTree.IFrameResource);
        } else if (xml.keyValue(companionJTree.iFrameresource)) {
            iframeResource = xml.keyValue(companionJTree.iFrameresource);
        }

        if (iframeResource !== null) {
            log.info ('<Companion> found iframe resource', iframeResource);
        }

        this.iframeResource = iframeResource;

        //Optional fields
        this.id = xml.attr(companionJTree, 'id');
        this.width = xml.attr(companionJTree, 'width');
        this.height = xml.attr(companionJTree, 'height');
        this.expandedWidth = xml.attr(companionJTree, 'expandedWidth');
        this.expandedHeight = xml.attr(companionJTree, 'expandedHeight');
        this.scalable = xml.attr(companionJTree, 'scalable');
        this.maintainAspectRatio = xml.attr(companionJTree, 'maintainAspectRatio');
        this.minSuggestedDuration = xml.attr(companionJTree, 'minSuggestedDuration');
        this.apiFramework = xml.attr(companionJTree, 'apiFramework');
        this.companionClickThrough = xml.keyValue(companionJTree.companionClickThrough);
        this.trackingEvents = this._parseTrackingEvents(companionJTree.trackingEvents && companionJTree.trackingEvents.tracking);

        log.info('<Companion>  companionClickThrough: ' + this.companionClickThrough);
    }

    _parseTrackingEvents(trackingEvents) {
        var trackings = [];
        if (utilities.isDefined(trackingEvents)) {
            trackingEvents = utilities.isArray(trackingEvents) ? trackingEvents : [trackingEvents];
            trackingEvents.forEach(function (trackingData) {
                trackings.push(new TrackingEvent(trackingData));
            });
        }
        return trackings;
    }
}

export default Companion;