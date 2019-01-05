/*var serialize = function(obj, prefix) {
    var str = [], p;
    for(p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
            str.push((v !== null && typeof v === 'object') ?
                serialize(v, k) :
                encodeURIComponent(k) + '=' + encodeURIComponent(v));
        }
    }
    return str.join('&');
};

function track(url, queries) {
    var _qr = serialize(queries);

    var img = new Image();
    img.src = url + _qr;
}*/

/*function trackgammaplatform(params) {
    track('//lg1.logging.admicro.vn/video_track_err?', params);
}*/

function trackgammaplatform() {
    //track('//lg1.logging.admicro.vn/video_track_err?', params);
}

export default trackgammaplatform;