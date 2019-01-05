import Ad from './Ad';
import VideoClicks from './VideoClicks';
import Linear from './Linear';
import InLine from './InLine';
import Wrapper from './Wrapper';

import * as utilities from '../utils/utilityFunctions';
import xml, {JXONTree} from '../utils/xml';

class VASTResponse {
    constructor() {
        this._linearAdded = false;
        this.ads = [];
        this.errorURLMacros = [];
        this.impressions = [];
        this.clickTrackings = [];
        this.customClicks = [];
        this.trackingEvents = {};
        this.mediaFiles = [];
        this.clickThrough = undefined;
        this.adTitle = '';
        this.duration = undefined;
        this.skipoffset = undefined;
    }

    addAd(ad) {
        var inLine, wrapper;
        if (ad instanceof Ad) {
            inLine = ad.inLine;
            wrapper = ad.wrapper;

            this.ads.push(ad);

            if (inLine) {
                this._addInLine(inLine);
            }

            if (wrapper) {
                this._addWrapper(wrapper);
            }
        }
    }

    _addErrorTrackUrl(error) {
        var errorURL = error instanceof JXONTree ? xml.keyValue(error) : error;
        if (errorURL) {
            this.errorURLMacros.push(errorURL);
        }
    }

    _addImpressions(impressions) {
        utilities.isArray(impressions) && appendToArray(this.impressions, impressions);
    }

    _addClickThrough(clickThrough) {
        if (utilities.isNotEmptyString(clickThrough)) {
            this.clickThrough = clickThrough;
        }
    }

    _addClickTrackings(clickTrackings) {
        utilities.isArray(clickTrackings) && appendToArray(this.clickTrackings, clickTrackings);
    }

    _addCustomClicks(customClicks) {
        utilities.isArray(customClicks) && appendToArray(this.customClicks, customClicks);
    }

    _addTrackingEvents(trackingEvents) {
        var eventsMap = this.trackingEvents;

        if (trackingEvents) {
            trackingEvents = utilities.isArray(trackingEvents) ? trackingEvents : [trackingEvents];
            trackingEvents.forEach(function (trackingEvent) {
                if (!eventsMap[trackingEvent.name]) {
                    eventsMap[trackingEvent.name] = [];
                }
                eventsMap[trackingEvent.name].push(trackingEvent);
            });
        }
    }

    _addTitle(title) {
        if (utilities.isNotEmptyString(title)) {
            this.adTitle = title;
        }
    }

    _addDuration (duration) {
        if (utilities.isNumber(duration)) {
            this.duration = duration;
        }
    }

    _addVideoClicks(videoClicks) {
        if (videoClicks instanceof VideoClicks) {
            this._addClickThrough(videoClicks.clickThrough);
            this._addClickTrackings(videoClicks.clickTrackings);
            this._addCustomClicks(videoClicks.customClicks);
        }
    }

    _addMediaFiles(mediaFiles) {
        utilities.isArray(mediaFiles) && appendToArray(this.mediaFiles, mediaFiles);
    }

    _addSkipoffset(offset) {
        if (offset) {
            this.skipoffset = offset;
        }
    }

    _addAdParameters(adParameters) {
        if (adParameters) {
            this.adParameters = adParameters;
        }
    }

    _addLinear(linear) {
        if (linear instanceof Linear) {
            this._addDuration(linear.duration);
            this._addTrackingEvents(linear.trackingEvents);
            this._addVideoClicks(linear.videoClicks);
            this._addMediaFiles(linear.mediaFiles);
            this._addSkipoffset(linear.skipoffset);
            this._addAdParameters(linear.adParameters);
            this._linearAdded = true;
        }
    }

    _addInLine(inLine) {
        var that = this;

        if (inLine instanceof InLine) {
            this._addTitle(inLine.adTitle);
            this._addErrorTrackUrl(inLine.error);
            this._addImpressions(inLine.impressions);

            inLine.creatives.forEach(function (creative) {
                if (creative.linear) {
                    that._addLinear(creative.linear);
                }
            });
        }
    }

    _addWrapper(wrapper) {
        var that = this;

        if (wrapper instanceof Wrapper) {
            this._addErrorTrackUrl(wrapper.error);
            this._addImpressions(wrapper.impressions);

            wrapper.creatives.forEach(function (creative) {
                var linear = creative.linear;
                if (linear) {
                    that._addVideoClicks(linear.videoClicks);
                    that.clickThrough = undefined;//We ensure that no clickThrough has been added
                    that._addTrackingEvents(linear.trackingEvents);
                }
            });
        }
    }

    hasLinear() {
        return this._linearAdded;
    }
}

function appendToArray(array, items) {
    items.forEach(function (item) {
        array.push(item);
    });
}


export default VASTResponse;