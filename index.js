
const THIS_NAME         = 'SVGUtils';
const SVG_NS            = 'http://www.w3.org/2000/svg';
const SVG_SCHEME        = 'data:image/svg+xml;charset=utf-8,';
const SVG_SCHEME_BASE64 = 'data:image/svg+xml;charset=utf-8;base64,';

/**
 * @class
 */
export default class SVGUtils {
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

