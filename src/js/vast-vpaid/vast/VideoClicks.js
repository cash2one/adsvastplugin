import xml from '../utils/xml';
import * as utilities from '../utils/utilityFunctions';

class VideoClicks {
    constructor(videoClickJTree) {
        this.clickThrough = xml.keyValue(videoClickJTree.clickThrough);
        this.clickTrackings = this._parseClickTrackings(videoClickJTree.clickTracking);
        this.customClicks = this._parseClickTrackings(videoClickJTree.customClick);
    }

    _parseClickTrackings(trackingData) {
        var clickTrackings = [];
        if (trackingData) {
            trackingData = utilities.isArray(trackingData) ? trackingData : [trackingData];
            trackingData.forEach(function (clickTrackingData) {
                clickTrackings.push(xml.keyValue(clickTrackingData));
            });
        }
        return clickTrackings;
    }
}

export default VideoClicks;