
const SVG_NS = 'http://www.w3.org/2000/svg';

export default class SVGUtils {
    static createNS(elementName){
        if(document == null){return null;}
        return document.createElementNS(SVG_NS, elementName);
    }
    static encodeHTML(element){
        return element.outerHTML;
    }
}
