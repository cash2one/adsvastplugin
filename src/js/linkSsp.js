// try {
//     if ('undefined' != typeof window.NewsInZone) {
//         var arrTags = window.NewsInZone;
//         strTags = arrTags.split(';');
//     }
// } catch (err) {
//     console.log(err);
// }
// import playercore from 'playercore';
// const player = playercore.getComponent('Player');

class sspAds {
    // if (player.mediaInfo.vast != 'undefined' && player.mediaInfo.vast != '' && player.mediaInfo.vast != undefined) {
    //     return decodeURIComponent(player.mediaInfo.vast);
    // }

    getLinkAds(player, options) {
        let _admParamTVC = '', checkPrLink = false, pid = -1, admtvcPgid = '', vtype = -1, position = -1;

        if ('undefined' != typeof window._chkPrLink) {
            checkPrLink = window._chkPrLink;
        }

        if ('undefined' != typeof window.admtvcPgid) {
            admtvcPgid = window.admtvcPgid();
        }

        let arrZoneIDMobile = [];
        arrZoneIDMobile['dantri'] = 5939;
        arrZoneIDMobile['kenh14'] = 5938;
        arrZoneIDMobile['genk'] = 5940;
        arrZoneIDMobile['gamek'] = 475198;
        arrZoneIDMobile['afamily'] = 5942;
        arrZoneIDMobile['autopro'] = 5944;
        arrZoneIDMobile['cafef'] = 5943;
        arrZoneIDMobile.linkhay = 5941;
        arrZoneIDMobile.giadinh = 5945;
        arrZoneIDMobile['71'] = 2657;
        arrZoneIDMobile.sohanews = 5818;
        arrZoneIDMobile.soha = 5818;
        arrZoneIDMobile.channelvn = 2657;
        arrZoneIDMobile.cafebiz = 5943;
        arrZoneIDMobile.vcmedia = 'vcmedia';
        arrZoneIDMobile.thegioivanhoa = 6703;
        arrZoneIDMobile.phim14 = 7692;
        arrZoneIDMobile['beta.autopro'] = 5944;
        arrZoneIDMobile.vtv = 23260;
        arrZoneIDMobile.ttvn = 25438;
        arrZoneIDMobile.thanhnien = 37079;
        arrZoneIDMobile.docbao = 7493;
        arrZoneIDMobile.thethaovanhoa = 502991;
        arrZoneIDMobile.anninhthudo = 16834;
        arrZoneIDMobile.bongda24h = 32159;
        arrZoneIDMobile.bongdanet = 11227;
        arrZoneIDMobile.laodong = 10698;
        arrZoneIDMobile.vtc = 6300;
        arrZoneIDMobile.tuoitre = 488052;
        arrZoneIDMobile.webtretho = 501452;
        arrZoneIDMobile.toquoc = 512260;

        this.arrZoneIDMobile = arrZoneIDMobile;

        let arrZoneID = [];
        arrZoneID.webtretho = 501451;
        arrZoneID.kenh14 = 2656;
        arrZoneID.dantri = 2657;
        arrZoneID.autopro = 2760;
        arrZoneID.afamily = 2763;
        arrZoneID.genk = 2658;
        arrZoneID.gamek = 475197;
        arrZoneID.cafef = 2661;
        arrZoneID.cafebiz = 2661;
        arrZoneID.giadinh = 2971;
        arrZoneID.libero = 4298;
        arrZoneID.nld = 2790;
        arrZoneID.phapluattp = 2787;
        arrZoneID.phapluattp = 2787;
        arrZoneID.sannhac = 2762;
        arrZoneID.socnhi = 3034;
        arrZoneID.sohanews = 2761;
        arrZoneID.soha = 2761;
        arrZoneID.suckhoedoisong = 2972;
        arrZoneID.vneconomy = 3385;
        arrZoneID['beta.autopro'] = 2760;
        arrZoneID.vtv = 6301;
        arrZoneID.ttvn = 25437;
        arrZoneID.thanhnien = 37079;
        arrZoneID.docbao = 7493;
        arrZoneID.thethaovanhoa = 502990;
        arrZoneID.anninhthudo = 16834;
        arrZoneID.bongda24h = 32159;
        arrZoneID.bongdanet = 11227;
        arrZoneID.laodong = 10698;
        arrZoneID.ole = 42329;
        arrZoneID.go = 42341;
        arrZoneID.tintuc = 42331;
        arrZoneID.lichthidau = 42334;
        arrZoneID.docbaogiay = 42337;
        arrZoneID.vntinnhanh = 42338;
        arrZoneID.tuoitre = 488051;
        arrZoneID.ale = 42340;
        arrZoneID.bongda = 42333;
        arrZoneID.vtc = 6300;
        arrZoneID.sggp = 475266;
        arrZoneID.saigondautu = 477879;
        arrZoneID.sggpnews = 477878;
        arrZoneID.toquoc = 512259;

        this.arrZoneID = arrZoneID;

        let zoneID = this.createZoneId(player);
        let admTvcParam = '0;0;0;0';
        let tag = 0;
        let domain = player.mediaInfo.domain;
        let videoID = player.mediaInfo.vid;
        let pathname = player.mediaInfo.pathname;
        let vast, admBannerID;

        console.log(options);

        position = options.position;

        if (typeof player.mediaInfo._admParamTvc != 'undefined' && player.mediaInfo._admParamTvc != '') {
            admTvcParam = player.mediaInfo._admParamTvc;
        }

        if (typeof player.mediaInfo.tag != 'undefined' && player.mediaInfo.tag != '') {
            tag = player.mediaInfo.tag;
        }

        if (typeof player.mediaInfo.domain == 'undefined' && player.mediaInfo.domain == '') {
            domain = location.hostname;
        }

        if (typeof player.mediaInfo.vid == 'undefined' && player.mediaInfo.vid == '') {
            videoID = player.mediaInfo.file;
        }

        if (typeof player.mediaInfo.pathname == 'undefined' && player.mediaInfo.pathname == '') {
            pathname = location.pathname;
        }

        if (player.mediaInfo.pid) pid = player.mediaInfo.pid;

        if (typeof player.options().params.vtype != undefined && player.options().params.vtype != null && player.options().params.vtype != '') {
            vtype = player.options().params.vtype;
        }

        if (_admParamTVC != '' && _admParamTVC != null) admTvcParam = _admParamTVC;

        if (!tag || typeof tag == 'undefined') {
            player.on('updateMediaInfo', function () {
                tag = player.mediaInfo.tag;
            });
        }

        if (checkPrLink != false) {
            return;
        }

        admTvcParam = admTvcParam.split(';');
        admBannerID = admTvcParam[0];
        if (admBannerID == 0) {
            admBannerID = -1;
        }

        if (this.getQueryVariable('_bid') != false) {
            admBannerID = this.getQueryVariable('_bid');
        }

        vast = this.createLinkSpp({
            domain: domain,
            pathname: pathname,
            zoneID: zoneID,
            pgid: admtvcPgid,
            pid: pid,
            tag: tag,
            adstype: position,
            vtype: vtype,
            vid: videoID,
            bannerid: admBannerID
        });

        if (typeof player.mediaInfo.vast != 'undefined') {
            vast = decodeURIComponent(player.mediaInfo.vast);
        }

        return encodeURIComponent(vast);
    }

    createZoneId(player) {
        let hostname = location.hostname;

        let domainKey = hostname.replace('http://', '');
        domainKey = domainKey.replace('https://', '');
        domainKey = domainKey.replace('http://www.', '');
        domainKey = domainKey.replace('https://www.', '');
        domainKey = domainKey.replace('.com', '');
        domainKey = domainKey.replace('.vn', '');
        domainKey = domainKey.replace('.net', '');
        domainKey = domainKey.replace('.org', '');
        domainKey = domainKey.replace('.info', '');
        domainKey = domainKey.replace('.edu', '');

        let arr = domainKey.split('.');

        if (arr.length > 1) {
            domainKey = arr[1];
        }

        if (player.mediaInfo.isMobile) {
            if (this.arrZoneIDMobile[domainKey]) {
                return this.arrZoneIDMobile[domainKey];
            } else return '0';
        } else {
            if (this.arrZoneID[domainKey]) {
                return this.arrZoneID[domainKey];
            } else return '0';
        }
    }

    createLinkSpp(params) {
        let {domain, pathname, zoneID, pgid, pid, tag, adstype, vtype, vid, bannerid} = params;
        return '//sspapi.admicro.vn/ssp_request/video?u=' + domain + pathname + '&z=' + zoneID + '&p=1&w=650&h=300' + pgid + '&pid=' + pid + '&tags=' + tag + '&adstype=' + adstype + '&vtype=' + vtype + '&vid=' + vid + '&bannerlimit=2&bannerid=' + bannerid;
    }

    // isEpl() {
    //     var e = player.mediaInfo.siteid;
    //     if (location.hostname == 'dantri.com.vn' && strTags.indexOf('406') != -1) {
    //         return true;
    //     }
    //     if (location.hostname == 'kenh14.vn' && strTags.indexOf('193') != -1) {
    //         return true;
    //     }
    //     if (location.hostname == 'soha.vn' && strTags.indexOf('10071') != -1) {
    //         return true;
    //     }
    //     if (location.hostname == 'sport5.vn' && strTags.indexOf('9') != -1) {
    //         return true;
    //     }
    //     return !(!e || '23' != e);
    // }

    getQueryVariable(variable) {
        let query = window.location.search.substring(1);
        let vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }
}

export default new sspAds();