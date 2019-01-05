import {log} from 'playercore';

import Ad from './Ad';
import VASTResponse from './VASTResponse';

import * as utilities from '../utils/utilityFunctions';
import xml from '../utils/xml';

import { ERROR } from '../enum';

import VCPlayerObject from '../../VCPlayerObject';
import pXhr from '../utils/p-xhr';
import trackJobGama from '../utils/trackJobGama';
//import { haveQuery } from '../../../util/url';


class VASTClient extends VCPlayerObject {

    static defaultProps = {
        WRAPPER_LIMIT: 5
    };

    isPassBack = false;
    errorURLMacros = [];

    constructor(props) {
        super(props);
    }

    async _filterAdChain(adChains) {
        let results = [];
        let err;
        while(adChains.length) {
            try {
                let vastResponse = this._buildVASTResponse(adChains.shift());
                results.push(vastResponse);
            } catch (e) {
                err = e;
            }
        } 
        
        if (results.length) {
            return results;
        }

        throw err;
    }

    async adgetVASTResponse(adTagUrl) {
        let self = this;
        return Promise.resolve().then(() => {
            return this._getVASTAd(adTagUrl);
        }).then((adChains) => {
            return self._filterAdChain(adChains);
        }).catch((e) => {
            if (e.ima) {
                if (!process.env.SUPPORT_IMA) {
                    throw 'Ima not support';
                }

                return [e];
            }

            throw e;
        });

    }

    async getVASTResponse(adTagUrl) {
        if (!adTagUrl) {
            throw ERROR.VASTClIENT_MISS_AD_TAG_URL;
        }
        //let prefix = haveQuery(adTagUrl) ? '&' : '?';

        let p_works = [];
        //let adUrl = [adTagUrl, adTagUrl + prefix + 'is_backfill=1'];
        let adUrl = [adTagUrl];
        for (let i in adUrl) {
            p_works.push(this.adgetVASTResponse(adUrl[i]));
        }

        return Promise.all(p_works
            .map(p => p.catch(() => [])))
            .then(items => {
                let adChains = [];
                //let results = [...items[0], ...items[1]];
                let results = [...items[0]];
                for (let i in results) {
                    if (results[i].ads) {
                        adChains.push(results[i]);
                    } else if (results[i].ima) {
                        return results[i];
                    }
                }

                if (adChains.length) {
                    return adChains;
                }

                throw results[0];
            });
    }

    /**
     * Error: 102, 303 ,301
     */
    validateVASTTree(vastTree) {
        var vastVersion = xml.attr(vastTree, 'version');
        // let vastTreeStr = JSON.stringify(vastTree);

        if (!vastTree.ad) {
            // Lỗi không có ad trong vast tree
            throw ERROR.ERROR_303;
        }

        if (vastVersion && (vastVersion != 3 && vastVersion != 2)) {
            // Lỗi không support vast version
            throw ERROR.ERROR_102;
        }

        // if (vastTreeStr.indexOf('vASTAdTagURI') !== -1) {
        //     if (vastTree.ad.wrapper.vASTAdTagURI.keyValue.indexOf('http') === -1) {
        //         throw ERROR.ERROR_301;
        //     }
        // }
    }

    _buildVASTResponse(adsChain) {
        let response = new VASTResponse();
        addAdsToResponse(response, adsChain);
        validateResponse(response);

        return response;

        //*** Local function ****
        function addAdsToResponse(response, ads) {
            ads.forEach(function (ad) {
                response.addAd(ad);
            });
        }

        function validateResponse(response) {

            if (!response.hasLinear()) {
                throw ERROR.VASTClIENT_AD_TYPE_NOT_SUPPORT;
            }

            if (response.duration === undefined) {
                throw ERROR.VASTClIENT_MISSING_DURATIOn;
            }

            // Không valid offset của progressEvents nữa do có thể null (ở jw null vẫn chấp nhận)
            /*var progressEvents = response.trackingEvents.progress;
            if (progressEvents) {
                progressEvents.forEach(function (progressEvent) {
                    if (!utilities.isNumber(progressEvent.offset)) {
                        throw ERROR.VASTClIENT_MISSING_OFFSET_TRACKING;
                    }
                });
            }*/
        }
    }

    /**
     * Error: 100, 102, 301, 303
     */
    async _getVastTree(adTagUrl) {
        if (adTagUrl.indexOf('googleads.g.doubleclick.net') !== -1) {
            throw { adTagUrl, adsResponse: null, ima: true };
        }

        // error 301
        let xmlStr = await this._requestVASTXml(adTagUrl);
        let vastTree;

        /* if (xmlStr.indexOf('googleads.g.doubleclick.net') !== -1) {
            throw { adTagUrl: null, adsResponse: xmlStr, ima: true };
        }*/

        try {
            vastTree = xml.toJXONTree(xmlStr);
            log.debug('built JXONTree from VAST response:', vastTree);

            if (utilities.isArray(vastTree.ad)) {
                vastTree.ads = vastTree.ad;
            } else if (vastTree.ad) {
                vastTree.ads = [vastTree.ad];
            } else {
                vastTree.ads = [];
            }
        } catch (e) {
            // Lỗi parse xml
            throw ERROR.ERROR_100;
        }

        // error 102, 303
        this.validateVASTTree(vastTree);
        return vastTree;

    }

    /**
     * Error: 100, 102, 301, 303
     * @param  {[type]} adTagUrl [description]
     * @return {[type]}          [description]
     */
    async _getVASTAd(adTagUrl) {
        // get nội dung của master xml

        trackJobGama({
            p: 1,
            url: adTagUrl
        });

        // error: 100, 102, 301, 303
        let vastTree;
        try {
            vastTree = await this._getVastTree(adTagUrl);
        } catch (e) {
            if (e.code === 301) {
                // rỗng hoặc sai định dạng
                trackJobGama({
                    p: 2,
                    url: adTagUrl
                });
            } else {
                // parser lỗi, không support version, không có ad trong vast tree
                trackJobGama({
                    p: 3,
                    url: adTagUrl
                });
            }

            throw e;
        }
        let waterfallAds = vastTree && utilities.isArray(vastTree.ads) ? vastTree.ads : null;
        return this._waterfallHandler(waterfallAds).catch(e => {
            if (e.ima) {
                // Bị lỗi nếu lấy adsResponse => chèn lại adTagUrl gốc để chạy ima
                throw {
                    adTagUrl: adTagUrl,
                    ima: true
                };
            }
        });
    }

    async _getAd(adTagUrl, adChain) {
        if (adChain.length >= this.props.WRAPPER_LIMIT) {
            throw ERROR.VASTClIENT_WRAPPER_LIMIT_REACHED;
        }

        let adJxonTree;
        if (utilities.isString(adTagUrl)) {
            let vastTree = await this._getVastTree(adTagUrl);
            adJxonTree = vastTree.ad;
        } else {
            adJxonTree = adTagUrl;
        }

        let ad = this._buildAd(adJxonTree);
        adChain.push(ad);

        if (ad.wrapper){
            if (ad.wrapper.VASTAdTagURI.indexOf('//') === -1){
                throw ERROR.ERROR_301;
            }    
        }

        if (ad.wrapper) {
            if (ad.wrapper.VASTAdTagURI.indexOf('googleads.g.doubleclick.net') !== -1) {
                throw { adTagUrl: null, adsResponse: adChain, ima: true };
            }
            return this._getAd(ad.wrapper.VASTAdTagURI, adChain);
        }

        return adChain;
    }

    _buildAd(adJxonTree) {
        var ad = new Ad(adJxonTree);
        this._validateAd(ad);
        return ad;
    }

    _validateAd(ad) {
        var wrapper = ad.wrapper;
        var inLine = ad.inLine;

        if (inLine && wrapper) {
            throw ERROR.VALID_AD_ERROR_1;
        }

        if (!inLine && !wrapper) {
            throw ERROR.VALID_AD_ERROR_2;
        }

        if (inLine && !inLine.isSupported()) {
            throw ERROR.VALID_AD_ERROR_3;
        }

        if (wrapper && !wrapper.VASTAdTagURI) {
            throw ERROR.VALID_AD_ERROR_4;
        }
    }

    async _waterfallHandler(waterfallAds) {
        /*this.adChain_ = [];
        try {
            let adChain = await this._getAd(waterfallAds.shift(), this.adChain_);
            return adChain;
        } catch (e) {
            if (waterfallAds.length > 0) {
                return this._waterfallHandler(waterfallAds);
            } else {
                throw e;
            }
        }*/

        let p_works = [];
        while (waterfallAds.length) {
            let promise = this._getAd(waterfallAds.shift(), []).catch(e => {
                return {error: e};
            });
            p_works.push(promise);
        }

        let result = await Promise.all(p_works);

        let realAd = result.filter(ad => !ad.error);

        if (realAd.length) {
            return realAd;
        }

        throw result[0].error;
    }

    /**
     * Error: 301
     */
    _requestVASTXml(adTagUrl) {
        let withCredentials = process.env.VAST_CREDENTIALS;

        return new Promise((resolve, reject) => {
            pXhr({
                uri: adTagUrl,
                withCredentials,
                method: 'GET'
            }, 0)
                .then((res) => {
                    if (!res) {
                        reject(ERROR.ERROR_301);
                        return;
                    }
                    resolve(res);
                })
                .catch(() => {
                    reject(ERROR.ERROR_301);
                });
        });

    }
}

export default VASTClient;