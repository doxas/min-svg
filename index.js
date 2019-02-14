
const THIS_NAME         = 'svg-utils';
const SVG_NS            = 'http://www.w3.org/2000/svg';
const SVG_SCHEME        = 'data:image/svg+xml;charset=utf-8,';
const SVG_SCHEME_BASE64 = 'data:image/svg+xml;charset=utf-8;base64,';

/**
 * @class
 */
export default class SVGUtils {
    static createPathData(){
        return new PathData();
    }
    /**
     * create namespace element
     * @static
     * @param {string} elementName - name of element
     * @return {Element}
     */
    static createNS(elementName){
        if(document == null || elementName == null){
            throw genError('invalid arguments', 'createNS');
        }
        let element = document.createElementNS(SVG_NS, elementName);
        if(elementName.toLowerCase() === 'svg'){
            element.setAttribute('xmlns', SVG_NS);
        }
        return element;
    }

    /**
     * attribute set to target from object
     * @static
     * @param {Element} element - target element
     * @param {object} properties - any object
     */
    static setAttribute(element, properties){
        if(element == null || properties == null){
            throw genError('invalid arguments', 'setAttribute');
        }
        for(let p in properties){
            element.setAttribute(p, properties[p]);
        }
    }

    /**
     * style set to target from object
     * @static
     * @param {Element} element - target element
     * @param {object} style - any object
     */
    static setStyle(element, style){
        if(element == null || style == null){
            throw genError('invalid arguments', 'setStyle');
        }
        for(let s in style){
            element.style[s] = style[s]);
        }
    }

    /**
     * encode plane html sentence
     * @static
     * @param {Element} element - any element
     * @return {string}
     */
    static encodeHTML(element){
        return element.outerHTML;
    }

    /**
     * encode to base64
     * @static
     * @param {string} str - target string
     * @return {string}
     */
    static encodeBase64(str){
        return btoa(unescape(encodeURIComponent(str)));
    }

    /**
     * decode from base64
     * @static
     * @param {string} str - target string
     * @return {string}
     */
    static decodeBase64(str){
        return decodeURIComponent(escape(atob(str)));
    }

    /**
     * encode data uri from element
     * @static
     * @param {Element} element - target element
     * @return {string}
     */
    static toDataURI(element){
        let str = SVGUtils.encodeHTML(element);
        return `${SVG_SCHEME}${encodeURIComponent(str)}`;
    }

    /**
     * encode base64 from element
     * @static
     * @param {Element} element - target element
     * @return {string}
     */
    static toDataURI64(element){
        let str = SVGUtils.encodeHTML(element);
        return `${SVG_SCHEME_BASE64}${SVGUtils.encodeBase64(str)}`;
    }
}

class PathData {
    constructor(){
        this.data = '';
    }
    get d(){return this.data;}
    moveTo(x, y){
        if(isNumber(x) !== true || isNumber(y) !== true){
            throw genError('arguments should be number value', 'PathData.moveTo');
        }
        this.data += `M${x},${y}`;
        return this;
    }
    lineTo(...coord){
        if(coord == null || Array.isArray(coord) !== true || coord.length === 0){
            throw genError('invalid arguments', 'PathData.lineTo');
        }
        let length = coord.length - (coord.length % 2);
        if(length === 0){
            throw genError('invalid arguments', 'PathData.lineTo');
        }
        let p = [];
        for(let i = 0; i < length; i += 2){
            p.push(`${coord[i]},${coord[i + 1]}`);
        }
        this.data += `L${p.join(',')}`;
        return this;
    }
    closePath(){
        this.data += 'Z';
        return this;
    }
}

function isNumber(value){
    return value != null && Object.prototype.toString.call(value) === '[object Number]';
}

/**
 * generate error object
 * @param {string} message - error message
 * @param {string} [method] - method name
 * @return {Error}
 */
function genError(message, methodName){
    let method = '';
    if(
        methodName != null &&
        Object.prototype.toString.call(methodName) === '[object String]' &&
        methodName !== ''
    ){
        method = `:${methodName}`;
    }
    return new Error(`[${THIS_NAME}${method}] ${message}`);
}

