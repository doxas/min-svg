
const THIS_NAME         = 'svg-utils';
const SVG_NS            = 'http://www.w3.org/2000/svg';
const SVG_SCHEME        = 'data:image/svg+xml;charset=utf-8,';
const SVG_SCHEME_BASE64 = 'data:image/svg+xml;charset=utf-8;base64,';

/**
 * @class
 */
export default class SVGUtils {
    /**
     * create PathData instance
     * @return {PathData}
     */
    static createPathData(){
        return new PathData();
    }

    /**
     * create namespace element
     * @static
     * @param {string} elementName - name of element
     * @param {number} [width] - width (only svg element)
     * @param {number} [height] - height (only svg element)
     * @return {Element}
     */
    static createNS(elementName, width, height){
        if(document == null || elementName == null){
            throw genError('invalid arguments', 'createNS');
        }
        let element = document.createElementNS(SVG_NS, elementName);
        if(elementName.toLowerCase() === 'svg'){
            element.setAttribute('xmlns', SVG_NS);
            if(isNumber(width) === true){
                element.setAttribute('width', width);
            }
            if(isNumber(height) === true){
                element.setAttribute('height', width);
            }
        }
        return element;
    }

    /**
     * create text element and add text content
     * @param {string} text - additional text
     * @param {number} [x=0] - offset coordinate x
     * @param {number} [y=0] - offset coordinate y
     * @return {SVGTextElement}
     */
    static createText(text, x = 0, y = 0){
        if(text == null || isString(text) !== true){
            throw genError('invalid arguments', 'createText');
        }
        let txt = SVGUtils.createNS('text');
        txt.textContent = text;
        SVGUtils.setAttribute(txt, {x: x, y: y});
        return txt;
    }

    /**
     * create linearGradient element in defs element
     * @param {string} id - id
     * @param {number} angle - rotate angle (radians)
     * @param {Array<string>} stop - between '0%' to '100%'
     * @param {Array<string>} color - css style color value
     * @return {SVGDefsElement}
     */
    static createLinearGradient(id, angle, stop, color){
        if(id == null || angle == null || stop == null || color == null){
            throw genError('invalid arguments', 'createLinearGradient');
        }
        if(
            isString(id) !== true || id === '' ||
            isNumber(angle) !== true ||
            Array.isArray(stop) !== true || stop.length === 0 ||
            Array.isArray(color) !== true || color.length === 0 ||
            stop.length !== color.length
        ){
            throw genError('invalid arguments', 'createLinearGradient');
        }
        let defs = SVGUtils.createNS('defs');
        let lg = SVGUtils.createNS('linearGradient');
        let s = Math.sin(angle);
        let c = Math.cos(angle);
        SVGUtils.setAttribute(lg, {id: id, x1: 0, y1: 0, x2: c, y2: s});
        defs.appendChild(lg);
        stop.map((v, i) => {
            let st = SVGUtils.createNS('stop');
            SVGUtils.setAttribute(st, {
                offset: v,
                'stop-color': color[i]
            });
            lg.appendChild(st);
        });
        return defs;
    }

    /**
     * create radialGradient element in defs element
     * @param {string} id - id
     * @param {number} radius - gradient radius
     * @param {number} originX - gradient origin coordinate x
     * @param {number} originY - gradient origin coordinate y
     * @param {number} focusX - gradient focus coordinate x
     * @param {number} focusY - gradient focus coordinate y
     * @param {Array<string>} stop - between '0%' to '100%'
     * @param {Array<string>} color - css style color value
     * @param {string} [spread='pad'] - pad or reflect or repeat
     * @return {SVGDefsElement}
     */
    static createRadialGradient(id, radius, originX, originY, focusX, focusY, stop, color, spread = 'pad'){
        if(
            id == null ||
            radius == null ||
            originX == null ||
            originY == null ||
            focusX == null ||
            focusY == null ||
            stop == null ||
            color == null ||
            spread == null
        ){
            throw genError('invalid arguments', 'createRadialGradient');
        }
        if(
            isString(id) !== true || id === '' ||
            isNumber(radius) !== true ||
            isNumber(originX) !== true || isNumber(originY) !== true ||
            isNumber(focusX) !== true || isNumber(focusY) !== true ||
            Array.isArray(stop) !== true || stop.length === 0 ||
            Array.isArray(color) !== true || color.length === 0 ||
            stop.length !== color.length ||
            isString(spread) !== true || spread === ''
        ){
            throw genError('invalid arguments', 'createRadialGradient');
        }
        let defs = SVGUtils.createNS('defs');
        let rg = SVGUtils.createNS('radialGradient');
        SVGUtils.setAttribute(rg, {
            id: id,
            r: radius,
            cx: originX,
            cy: originY,
            fx: focusX,
            fy: focusY,
            spreadMethod: spread
        });
        defs.appendChild(rg);
        stop.map((v, i) => {
            let st = SVGUtils.createNS('stop');
            SVGUtils.setAttribute(st, {
                offset: v,
                'stop-color': color[i]
            });
            rg.appendChild(st);
        });
        return defs;
    }

    /**
     * attribute set to target from object
     * @static
     * @param {Element} element - target element
     * @param {object} properties - any object
     * @return {Element}
     */
    static setAttribute(element, properties){
        if(element == null || properties == null){
            throw genError('invalid arguments', 'setAttribute');
        }
        for(let p in properties){
            element.setAttribute(p, properties[p]);
        }
        return element;
    }

    /**
     * style set to target from object
     * @static
     * @param {Element} element - target element
     * @param {object} style - any object
     * @return {Element}
     */
    static setStyle(element, style){
        if(element == null || style == null){
            throw genError('invalid arguments', 'setStyle');
        }
        for(let s in style){
            element.style[s] = style[s];
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
}

/**
 * @class
 */
class PathData {
    /**
     * @constructor
     */
    constructor(){
        this.data = '';
    }
    /**
     * @type {string}
     */
    get d(){return this.data;}
    /**
     * like a Canvas2DRenderingContext.moveTo method
     * @param {number} x - coordinate x
     * @param {number} y - coordinate y
     * @return {PathData} self
     */
    moveTo(x, y){
        if(isNumber(x) !== true || isNumber(y) !== true){
            throw genError('arguments should be number value', 'PathData.moveTo');
        }
        this.data += `M${x},${y}`;
        return this;
    }
    /**
     * like a Canvas2DRenderingContext.lineTo method
     * @param {...number} coord - coordinates (x, y, x, y...)
     * @return {PathData} self
     */
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
    /**
     * like a Canvas2DRenderingContext.quadraticCurveTo method
     * @param {number} cx - control x
     * @param {number} cy - control y
     * @param {number} x - coord x
     * @param {number} y - coord y
     * @return {PathData} self
     */
    quadraticCurveTo(cx, cy, x, y){
        if(
            isNumber(cx) !== true ||
            isNumber(cy) !== true ||
            isNumber(x)  !== true ||
            isNumber(y)  !== true
        ){
            throw genError('invalid arguments', 'PathData.quadraticCurveTo');
        }
        this.data += `Q${cx},${cy},${x},${y}`;
        return this;
    }
    /**
     * like a Canvas2DRenderingContext.bezierCurveTo method
     * @param {number} cx1 - control1 x
     * @param {number} cy1 - control1 y
     * @param {number} cx2 - control2 x
     * @param {number} cy2 - control2 y
     * @param {number} x - coord x
     * @param {number} y - coord y
     * @return {PathData} self
     */
    bezierCurveTo(cx1, cy1, cx2, cy2, x, y){
        if(
            isNumber(cx1) !== true ||
            isNumber(cy1) !== true ||
            isNumber(cx2) !== true ||
            isNumber(cy2) !== true ||
            isNumber(x)   !== true ||
            isNumber(y)   !== true
        ){
            throw genError('invalid arguments', 'PathData.bezierCurveTo');
        }
        this.data += `C${cx1},${cy1},${cx2},${cy2},${x},${y}`;
        return this;
    }
    /**
     * like a Canvas2DRenderingContext.rect method
     * @param {number} x - coordinate x
     * @param {number} y - coordinate y
     * @param {number} width - width
     * @param {number} height - height
     * @return {PathData} self
     */
    rect(x, y, width, height){
        if(
            isNumber(x)      !== true ||
            isNumber(y)      !== true ||
            isNumber(width)  !== true ||
            isNumber(height) !== true
        ){
            throw genError('invalid arguments', 'PathData.rect');
        }
        this.moveTo(x, y)
        .lineTo(
            x + width, y,
            x + width, y + height,
            x,         y + height
        )
        .closePath();
        return this;
    }
    /**
     * round corner rect (use quadraticCurveTo)
     * @param {number} x - coordinate x
     * @param {number} y - coordinate y
     * @param {number} width - width
     * @param {number} height - height
     * @param {number} radius - round corner radius
     * @return {PathData} self
     */
    roundRect(x, y, width, height, radius){
        if(
            isNumber(x)      !== true ||
            isNumber(y)      !== true ||
            isNumber(width)  !== true ||
            isNumber(height) !== true ||
            isNumber(radius) !== true
        ){
            throw genError('invalid arguments', 'PathData.roundRect');
        }
        let rad = Math.min(Math.min(width, height) / 2, radius);
        this.moveTo(x + rad, y)
        .lineTo(x + width - rad, y)               .quadraticCurveTo(x + width, y,          x + width,       y + rad)
        .lineTo(x + width,       y + height - rad).quadraticCurveTo(x + width, y + height, x + width - rad, y + height)
        .lineTo(x + rad,         y + height)      .quadraticCurveTo(x,         y + height, x,               y + height - rad)
        .lineTo(x,               y + rad)         .quadraticCurveTo(x,         y,          x + rad,         y)
        .closePath();
        return this;
    }
    /**
     * like a Canvas2DRenderingContext.lineTo method
     * @param {...number} coord - coordinates (x, y, x, y...)
     * @return {PathData} self
     */
    polygon(...coord){
        if(coord == null || Array.isArray(coord) !== true || coord.length === 0){
            throw genError('invalid arguments', 'PathData.polygon');
        }
        let length = coord.length - (coord.length % 2);
        if(length < 4){
            throw genError('invalid arguments', 'PathData.polygon');
        }
        this.data += `M${coord[0]},${coord[1]}`;
        let p = [];
        for(let i = 2; i < length; i += 2){
            p.push(`${coord[i]},${coord[i + 1]}`);
        }
        this.data += `L${p.join(',')}Z`;
        return this;
    }
    /**
     * circle of using path
     * @param {number} x - circle origin coordinate x
     * @param {number} y - circle origin coordinate y
     * @param {number} radius - circle radius
     * @param {number} [detail=3] - circle split
     */
    circle(x, y, radius, detail = 3){
        if(x == null || y == null || radius == null || detail == null){
            throw genError('invalid arguments', 'PathData.circle');
        }
        if(
            isNumber(x) !== true ||
            isNumber(y) !== true ||
            isNumber(radius) !== true ||
            isNumber(detail) !== true ||
            detail < 3
        ){
            throw genError('invalid arguments', 'PathData.circle');
        }
        const PI = Math.PI * 2.0;
        const SP = PI / detail;
        this.moveTo(x + radius, y);
        for(let i = 1; i < detail; ++i){
            let rad = SP * i;
            let s = Math.sin(rad);
            let c = Math.cos(rad);
            this.lineTo(x + c * radius, y + s * radius);
        }
        this.closePath();
        return this;
    }
    /**
     * like a Canvas2DRenderingContext.closePath method
     * @return {PathData} self
     */
    closePath(){
        this.data += 'Z';
        return this;
    }
    /**
     * reset
     */
    reset(){
        let d = this.data
        this.data = '';
        return d;
    }
    /**
     * @alias reset
     */
    clear(){return this.reset();}
    /**
     * @alias reset
     */
    clean(){return this.reset();}
}

/**
 * is value of number
 * @param {mixed} value - check value
 * @return {boolean}
 */
function isNumber(value){
    return value != null && Object.prototype.toString.call(value) === '[object Number]';
}

/**
 * is value of string
 * @param {mixed} value - check value
 * @return {boolean}
 */
function isString(value){
    return value != null && Object.prototype.toString.call(value) === '[object String]';
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

