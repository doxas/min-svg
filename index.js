
const THIS_NAME = 'SVGUtils';
const SVG_NS = 'http://www.w3.org/2000/svg';
const SVG_SCHEME = 'data:image/svg+xml;charset=utf-8,';
const SVG_SCHEME_BASE64 = 'data:image/svg+xml;charset=utf-8;base64,';

export default class SVGUtils {
    static createNS(elementName){
        if(document == null){return null;}
        let element = document.createElementNS(SVG_NS, elementName);
        if(elementName.toLowerCase() === 'svg'){
            element.setAttribute('xmlns', SVG_NS);
        }
        return element;
    }
    static encodeHTML(element){
        return element.outerHTML;
    }
    static encodeBase64(str){
        return btoa(unescape(encodeURIComponent(str)));
    }
    static decodeBase64(str){
        return decodeURIComponent(escape(atob(str)));
    }
    static toDataURI(svg){
        let str = SVGUtils.encodeHTML(svg);
        return `${SVG_SCHEME}${encodeURIComponent(str)}`;
    }
    static toDataURI64(svg){
        let str = SVGUtils.encodeHTML(svg);
        return `${SVG_SCHEME_BASE64}${SVGUtils.encodeBase64(str)}`;
    }
    static setAttribute(target, properties){
        if(target == null || properties == null){
            throw genError('invalid arguments');
        }
        for(let p in properties){
            target.setAttribute(p, properties[p]);
        }
    }
}

function genError(message){
    return new Error(`[${THIS_NAME}] ${message}`);
}

