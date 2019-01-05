import * as utilities from './utilityFunctions';

class JXONTree {
    constructor(oXMLParent) {
        var parseText = xml.parseText;

        //The document object is an especial object that it may miss some functions or attrs depending on the browser.
        //To prevent this problem with create the JXONTree using the root childNode which is a fully fleshed node on all supported
        //browsers.
        if(oXMLParent.documentElement){
            return new JXONTree(oXMLParent.documentElement);
        }

        if (oXMLParent.hasChildNodes()) {
            var sCollectedTxt = '';
            for (var oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
                oNode = oXMLParent.childNodes.item(nItem);
                /*jshint bitwise: false*/
                if ((oNode.nodeType - 1 | 1) === 3) { sCollectedTxt += oNode.nodeType === 3 ? oNode.nodeValue.trim() : oNode.nodeValue; }
                else if (oNode.nodeType === 1 && !oNode.prefix) {
                    sProp = utilities.decapitalize(oNode.nodeName);
                    vContent = new JXONTree(oNode);
                    if (this.hasOwnProperty(sProp)) {
                        if (this[sProp].constructor !== Array) { this[sProp] = [this[sProp]]; }
                        this[sProp].push(vContent);
                    } else { this[sProp] = vContent; }
                }
            }
            if (sCollectedTxt) { this.keyValue = parseText(sCollectedTxt); }
        }

        //IE8 Stupid fix
        var hasAttr = typeof oXMLParent.hasAttributes === 'undefined'? oXMLParent.attributes.length > 0: oXMLParent.hasAttributes();
        if (hasAttr) {
            var oAttrib;
            for (var nAttrib = 0; nAttrib < oXMLParent.attributes.length; nAttrib++) {
                oAttrib = oXMLParent.attributes.item(nAttrib);
                this['@' + utilities.decapitalize(oAttrib.name)] = parseText(oAttrib.value.trim());
            }
        }
    }

    attr(attr) {
        return this['@' + utilities.decapitalize(attr)];
    }
}

class xml {
    static strToXMLDoc(stringContainingXMLSource) {
        //IE 8
        if(typeof window.DOMParser === 'undefined'){
            var xmlDocument = new ActiveXObject('Microsoft.XMLDOM');
            xmlDocument.async = false;
            xmlDocument.loadXML(stringContainingXMLSource);
            return xmlDocument;
        }

        return parseString(stringContainingXMLSource);

        function parseString(stringContainingXMLSource){
            var parser = new DOMParser();
            var parsedDocument;

            //Note: This try catch is to deal with the fact that on IE parser.parseFromString does throw an error but the rest of the browsers don't.
            try {
                parsedDocument = parser.parseFromString(stringContainingXMLSource, 'application/xml');

                if(isParseError(parsedDocument) || utilities.isEmptyString(stringContainingXMLSource)){
                    throw new Error();
                }
            } catch(e){
                throw new Error(`xml.strToXMLDOC: Error parsing the string: ${stringContainingXMLSource}`);
            }

            return parsedDocument;
        }

        function isParseError(parsedDocument) {
            try { // parser and parsererrorNS could be cached on startup for efficiency
                var parser = new DOMParser(),
                    erroneousParse = parser.parseFromString('INVALID', 'text/xml'),
                    parsererrorNS = erroneousParse.getElementsByTagName('parsererror')[0].namespaceURI;

                if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
                    // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
                    return parsedDocument.getElementsByTagName('parsererror').length > 0;
                }

                return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
            } catch (e) {
                //Note on IE parseString throws an error by itself and it will never reach this code. Because it will have failed before
            }
        }
    }

    static parseText(sValue) {
        if (/^\s*$/.test(sValue)) { return null; }
        if (/^(?:true|false)$/i.test(sValue)) { return sValue.toLowerCase() === 'true'; }
        if (isFinite(sValue)) { return parseFloat(sValue); }
        if (utilities.isISO8601(sValue)) { return new Date(sValue); }
        return sValue.trim();
    }

    static toJXONTree(xmlString) {
        var xmlDoc = xml.strToXMLDoc(xmlString);
        return new JXONTree(xmlDoc);
    }

    static keyValue(xmlObj) {
        if(xmlObj){
            return xmlObj.keyValue;
        }
        return undefined;
    }

    static attr(xmlObj, attr) {
        if(xmlObj) {
            return xmlObj['@' + utilities.decapitalize(attr)];
        }
        return undefined;
    }

    static encode(str) {
        if (!utilities.isString(str)) return undefined;

        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    static decode(str) {
        if (!utilities.isString(str)) return undefined;

        return str.replace(/&apos;/g, '\'')
            .replace(/&quot;/g, '"')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&amp;/g, '&');
    }
}

export default xml;
export {
    JXONTree
};