import TrackingEvent from './TrackingEvent';
import MediaFile from './MediaFile';
import VideoClicks from './VideoClicks';

import vastUtil from './vastUtil';

import xml from '../utils/xml';
import * as utilities from '../utils/utilityFunctions';

class Linear {
    constructor(linearJTree) {
        this.duration = vastUtil.parseDuration(xml.keyValue(linearJTree.duration));
        this.mediaFiles = this._parseMediaFiles(linearJTree.mediaFiles && linearJTree.mediaFiles.mediaFile);

        //Optional fields
        this.trackingEvents = this._parseTrackingEvents(linearJTree.trackingEvents && linearJTree.trackingEvents.tracking, this.duration);
        this.skipoffset = vastUtil.parseOffset(xml.attr(linearJTree, 'skipoffset'), this.duration);

        if (linearJTree.videoClicks) {
            this.videoClicks = new VideoClicks(linearJTree.videoClicks);
        }

        if(linearJTree.adParameters) {
            this.adParameters = xml.keyValue(linearJTree.adParameters);

            if(xml.attr(linearJTree.adParameters, 'xmlEncoded')) {
                this.adParameters = xml.decode(this.adParameters);
            }
        }
    }

    _parseMediaFiles(mediaFilesJxonTree) {
        var mediaFiles = [];
        if (utilities.isDefined(mediaFilesJxonTree)) {
            mediaFilesJxonTree = utilities.isArray(mediaFilesJxonTree) ? mediaFilesJxonTree : [mediaFilesJxonTree];

            mediaFilesJxonTree.forEach(function (mfData) {
                mediaFiles.push(new MediaFile(mfData));
            });
        }
        return mediaFiles;
    }

    _parseTrackingEvents(trackingEvents, duration) {
        var trackings = [];
        if (utilities.isDefined(trackingEvents)) {
            trackingEvents = utilities.isArray(trackingEvents) ? trackingEvents : [trackingEvents];
            trackingEvents.forEach(function (trackingData) {
                trackings.push(new TrackingEvent(trackingData, duration));
            });
        }
        return trackings;
    }

    isSupported() {
        var i, len;
        for(i=0, len=this.mediaFiles.length; i<len; i+=1) {
            if(this.mediaFiles[i].isSupported()) {
                return true;
            }
        }

        return false;
    }
}

export default Linear;