import * as utilities from '../utils/utilityFunctions';
import VPAIDHTML5Tech from '../ads/vpaid/VPAIDHTML5Tech';

class VastUtil {
    static track(URLMacros, variables) {
        let sources = this.parseURLMacros(URLMacros, variables);
        let trackImgs = [];
        sources.forEach(function (src) {
            let img = new Image();
            img.src = src;
            trackImgs.push(img);
        });
        return trackImgs;
    }

    static parseURLMacros(URLMacros, variables) {
        let self = this;
        let parsedURLs = [];

        variables = variables || {};

        if (!(variables['CACHEBUSTING'])) {
            variables['CACHEBUSTING'] = Math.round(Math.random() * 1.0e+10);
        }

        URLMacros.forEach(function (URLMacro) {
            URLMacro && parsedURLs.push(self._parseURLMacro(URLMacro, variables));
        });

        return parsedURLs;
    }

    static parseURLMacro(URLMacro, variables) {
        variables = variables || {};

        if (!(variables['CACHEBUSTING'])) {
            variables['CACHEBUSTING'] = Math.round(Math.random() * 1.0e+10);
        }

        return this._parseURLMacro(URLMacro, variables);
    }

    static parseDuration(durationStr) {
        var durationRegex = /(\d\d):(\d\d):(\d\d)(\.(\d\d\d))?/;
        var match, durationInMs;

        if (utilities.isString(durationStr)) {
            match = durationStr.match(durationRegex);
            if (match) {
                durationInMs = parseHoursToMs(match[1]) + parseMinToMs(match[2]) + parseSecToMs(match[3]) + parseInt(match[5] || 0);
            }
        }

        return isNaN(durationInMs) ? null : durationInMs;

        /*** local functions ***/
        function parseHoursToMs(hourStr) {
            return parseInt(hourStr, 10) * 60 * 60 * 1000;
        }

        function parseMinToMs(minStr) {
            return parseInt(minStr, 10) * 60 * 1000;
        }

        function parseSecToMs(secStr) {
            return parseInt(secStr, 10) * 1000;
        }
    }

    static parseImpressions(impressions) {
        if (impressions) {
            impressions = utilities.isArray(impressions) ? impressions : [impressions];
            return utilities.transformArray(impressions, function (impression) {
                if (utilities.isNotEmptyString(impression.keyValue)) {
                    return impression.keyValue;
                }
                return undefined;
            });
        }
        return [];
    }

    //We assume that the progress is going to arrive in milliseconds
    static formatProgress(progress) {
        var hours, minutes, seconds, milliseconds;
        hours = progress / (60 * 60 * 1000);
        hours = Math.floor(hours);
        minutes = (progress / (60 * 1000)) % 60;
        minutes = Math.floor(minutes);
        seconds = (progress / 1000) % 60;
        seconds = Math.floor(seconds);
        milliseconds = progress % 1000;
        return utilities.toFixedDigits(hours, 2) + ':' + utilities.toFixedDigits(minutes, 2) + ':' + utilities.toFixedDigits(seconds, 2) + '.' + utilities.toFixedDigits(milliseconds, 3);
    }

    static parseOffset(offset, duration) {
        if (isPercentage(offset)) {
            return calculatePercentage(offset, duration);
        }
        return this.parseDuration(offset);

        /*** Local function ***/
        function isPercentage(offset) {
            var percentageRegex = /^\d+(\.\d+)?%$/g;
            return percentageRegex.test(offset);
        }

        function calculatePercentage(percentStr, duration) {
            if (duration) {
                return calcPercent(duration, parseFloat(percentStr.replace('%', '')));
            }
            return null;
        }

        function calcPercent(quantity, percent) {
            return quantity * percent / 100;
        }
    }

    static  VPAID_techs = [
        VPAIDHTML5Tech
    ]

    static isVPAID(mediaFile) {
        return !!mediaFile && mediaFile.apiFramework === 'VPAID';
    }

    static findSupportedVPAIDTech(mimeType) {
        var i, len, VPAIDTech;

        for (i = 0, len = this.VPAID_techs.length; i < len; i += 1) {
            VPAIDTech = this.VPAID_techs[i];
            if (VPAIDTech.supports(mimeType)) {
                return VPAIDTech;
            }
        }
        return null;
    }

    static isFlashSupported() {
        return false;
    }

    static _parseURLMacro(URLMacro, variables) {
        variables = variables || {};

        utilities.forEach(variables, function (value, key) {
            URLMacro = URLMacro.replace(new RegExp('\\[' + key + '\\]', 'gm'), value);
        });

        return URLMacro;
    }
}

export default VastUtil;