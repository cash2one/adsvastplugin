import Linear from './Linear';
import Companion from './Companion';
import * as utilities from '../utils/utilityFunctions';

class Creative {
    constructor(creativeJTree) {
        this.id = creativeJTree.attr('id');
        this.sequence = creativeJTree.attr('sequence');
        this.adId = creativeJTree.attr('adId');
        this.apiFramework = creativeJTree.attr('apiFramework');

        if(creativeJTree.linear) {
            this.linear = new Linear(creativeJTree.linear);
        }

        if (creativeJTree.companionAds) {
            var companions = [];
            var companionAds = creativeJTree.companionAds && creativeJTree.companionAds.companion;
            if (utilities.isDefined(companionAds)) {
                companionAds = utilities.isArray(companionAds) ? companionAds : [companionAds];
                companionAds.forEach(function (companionData) {
                    companions.push(new Companion(companionData));
                });
            }
            this.companionAds = companions;
        }
    }

    isSupported() {
        if(this.linear) {
            return this.linear.isSupported();
        }

        return true;
    }

    static parseCreatives(creativesJTree) {
        var creatives = [];
        var creativesData;
        if (utilities.isDefined(creativesJTree) && utilities.isDefined(creativesJTree.creative)) {
            creativesData = utilities.isArray(creativesJTree.creative) ? creativesJTree.creative : [creativesJTree.creative];
            creativesData.forEach(function (creative) {
                creatives.push(new Creative(creative));
            });
        }
        return creatives;
    }
}

export default Creative;