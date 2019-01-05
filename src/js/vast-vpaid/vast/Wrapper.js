import Creative from './Creative';

import vastUtil from './vastUtil';

import xml from '../utils/xml';
import * as utilities from '../utils/utilityFunctions';

class Wrapper {
    constructor(wrapperJTree) {
        //Required elements
        this.adSystem = xml.keyValue(wrapperJTree.adSystem);
        this.impressions = vastUtil.parseImpressions(wrapperJTree.impression);
        this.VASTAdTagURI = xml.keyValue(wrapperJTree.vASTAdTagURI);

        //Optional elements
        this.creatives = Creative.parseCreatives(wrapperJTree.creatives);
        this.error = xml.keyValue(wrapperJTree.error);
        this.extensions = wrapperJTree.extensions;

        //Optional attrs
        this.followAdditionalWrappers = utilities.isDefined(xml.attr(wrapperJTree, 'followAdditionalWrappers'))? xml.attr(wrapperJTree, 'followAdditionalWrappers'): true;
        this.allowMultipleAds = xml.attr(wrapperJTree, 'allowMultipleAds');
        this.fallbackOnNoAd = xml.attr(wrapperJTree, 'fallbackOnNoAd');
    }
}

export default Wrapper;