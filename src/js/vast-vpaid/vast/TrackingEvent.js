import xml from '../utils/xml';
import vastUtil from './vastUtil';

class TrackingEvent {
    constructor(trackingJTree, duration) {
        this.name = trackingJTree.attr('event');
        this.uri = xml.keyValue(trackingJTree);

        if('progress' === this.name) {
            this.offset = vastUtil.parseOffset(trackingJTree.attr('offset'), duration);
        }
    }
}

export default TrackingEvent;