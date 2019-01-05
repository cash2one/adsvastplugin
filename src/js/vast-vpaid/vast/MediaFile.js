import xml from '../utils/xml';
import vastUtil from './vastUtil';

const attributesList = [
    //Required attributes
    'delivery',
    'type',
    'width',
    'height',
    //Optional attributes
    'codec',
    'id',
    'bitrate',
    'minBitrate',
    'maxBitrate',
    'scalable',
    'maintainAspectRatio',
    'apiFramework'
];

class MediaFile {
    constructor(mediaFileJTree) {
        //Required attributes
        this.src = xml.keyValue(mediaFileJTree);

        for(var x=0; x<attributesList.length; x++) {
            var attribute = attributesList[x];
            this[attribute] = mediaFileJTree.attr(attribute);
        }

        if (this['type'] === 'video/x-mp4') {
            this['type'] = 'video/mp4';
        }
    }

    isSupported() {
        if(vastUtil.isVPAID(this)) {
            return !!vastUtil.findSupportedVPAIDTech(this.type);
        }

        if (this.type === 'video/x-flv') {
            return vastUtil.isFlashSupported();
        }

        return true;
    }
}

export default MediaFile;