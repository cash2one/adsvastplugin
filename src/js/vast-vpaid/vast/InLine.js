import vastUtil from './vastUtil';
import Creative from './Creative';

import * as utilities from '../utils/utilityFunctions';
import xml from '../utils/xml';

class InLine{
    constructor(inlineJTree) {
        //Required Fields
        this.adTitle = xml.keyValue(inlineJTree.adTitle);
        this.adSystem = xml.keyValue(inlineJTree.adSystem);
        this.impressions = vastUtil.parseImpressions(inlineJTree.impression);
        this.creatives = Creative.parseCreatives(inlineJTree.creatives);

        //Optional Fields
        this.description = xml.keyValue(inlineJTree.description);
        this.advertiser = xml.keyValue(inlineJTree.advertiser);
        this.surveys = this._parseSurveys(inlineJTree.survey);
        this.error = xml.keyValue(inlineJTree.error);
        this.pricing = xml.keyValue(inlineJTree.pricing);
        this.extensions = inlineJTree.extensions;
    }

    _parseSurveys(inlineSurveys) {
        if (inlineSurveys) {
            return utilities.transformArray(utilities.isArray(inlineSurveys) ? inlineSurveys : [inlineSurveys], function (survey) {
                if(utilities.isNotEmptyString(survey.keyValue)){
                    return {
                        uri: survey.keyValue,
                        type: survey.attr('type')
                    };
                }

                return undefined;
            });
        }
        return [];
    }

    isSupported() {
        var i,len;

        if(this.creatives.length === 0) {
            return false;
        }

        for(i = 0, len = this.creatives.length; i< len; i+=1){
            if(!this.creatives[i].isSupported()){
                return false;
            }
        }
        return true;
    }
}

export default InLine;