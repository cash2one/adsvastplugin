/**
 * Chuyển đổi H:MM:SS hoặc M:SS hoặc % time content về định dạng second
 * @param {string} hms
 *        Định dạng hms hoặc phần trăm duration mà cần chuyển đổi định sang giây
 *
 * @param {number} duration
 *        thời lượng của video content
 *
 * @return {string}
 *         Thời gian đã được định dạng H:MM:SS hoặc M:SS
 */
function formatTime(hms, duration) {
    var a, seconds ;
    if( hms.indexOf(':') > -1){
        a = hms.split(':'); // split it at the colons
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    } else if (hms.indexOf('%') > -1){
        a = hms.split('%');
        seconds = (+a[0] / 100) * duration;
    } else if (+hms < 1){
        seconds = +hms * duration;
    } else if (+hms > 1){
        seconds = +hms;
    }

    return seconds;
}

export default formatTime;
