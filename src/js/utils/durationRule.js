
function durationRule({ duration, durationValue, durationLogical }) {
    let array = durationValue.match(/\d+/g).map(Number);
    if (array.length > 2) {
        return true;
    }
    array.sort(function (a, b) {
        return a - b;
    });

    switch (durationLogical) {
    case '>=':
        if (duration >= array[0]) {
            return true;
        }
        break;
    case '>':
        if (duration > array[0]) {
            return true;
        }
        break;
    case '<=':
        if (duration <= array[0]) {
            return true;
        }
        break;
    case '<':
        if (duration < array[0]) {
            return true;
        }
        break;
    case 'range':
        if (duration >= array[0] && duration < array[1]) {
            return true;
        }
        break;
    }

    return false;

}

export default durationRule;
