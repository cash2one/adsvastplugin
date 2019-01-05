import * as utilities from './utilityFunctions';

class Dom {

    static addClass(el, cssClass) {
        var classes;

        if (utilities.isNotEmptyString(cssClass)) {
            if (el.classList) {
                return el.classList.add(cssClass);
            }

            classes = utilities.isString(el.getAttribute('class')) ? el.getAttribute('class').split(/\s+/) : [];
            if (utilities.isString(cssClass) && utilities.isNotEmptyString(cssClass.replace(/\s+/, ''))) {
                classes.push(cssClass);
                el.setAttribute('class', classes.join(' '));
            }
        }
    }

    static addEventListener(el, type, handler) {
        if(utilities.isArray(el)){
            utilities.forEach(el, function(e) {
                Dom.addEventListener(e, type, handler);
            });
            return;
        }

        if(utilities.isArray(type)){
            utilities.forEach(type, function(t) {
                Dom.addEventListener(el, t, handler);
            });
            return;
        }

        if (el.addEventListener) {
            el.addEventListener(type, handler, false);
        } else if (el.attachEvent) {
            // WARNING!!! this is a very naive implementation !
            // the event object that should be passed to the handler
            // would not be there for IE8
            // we should use "window.event" and then "event.srcElement"
            // instead of "event.target"
            el.attachEvent('on' + type, handler);
        }
    }

    static remove(node) {
        if(node && node.parentNode){
            node.parentNode.removeChild(node);
        }
    }

    static removeEventListener(el, type, handler) {
        if (utilities.isArray(el)){
            utilities.forEach(el, function(e) {
                Dom.removeEventListener(e, type, handler);
            });
            return;
        }

        if (utilities.isArray(type)){
            utilities.forEach(type, function(t) {
                Dom.removeEventListener(el, t, handler);
            });
            return;
        }

        if (el.removeEventListener) {
            el.removeEventListener(type, handler, false);
        } else if (el.detachEvent) {
            el.detachEvent('on' + type, handler);
        } else {
            el['on' + type] = null;
        }
    }

    static isDomElement(ele) {
        return ele instanceof Element;
    }

    static getDimension(element) {
        var rect;

        //On IE9 and below getBoundingClientRect does not work consistently
        if(!utilities.isOldIE() && element.getBoundingClientRect) {
            rect = element.getBoundingClientRect();
            return {
                width: rect.width,
                height: rect.height
            };
        }

        return {
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    }
}

export default Dom;