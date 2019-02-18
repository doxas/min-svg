
import util from '../index.js';

window.addEventListener('load', () => {
    // create PathData instance and generate data string for path
    let d = util.createPathData()
                .moveTo(50, 50)
                .lineTo(100, 100, 150, 75)
                .moveTo(250, 50)
                .lineTo(175, 50, 200, 175)
                .quadraticCurveTo(300, 0, 250, 200)
                .bezierCurveTo(0, 200, 200, 0, 50, 250)
                .closePath()
                .rect(75, 75, 50, 50)
                .roundRect(125, 125, 100, 100, 25)
                .polygon(225, 225, 275, 225, 225, 275)
                .circle(50, 250, 25, 8)
                .reset();

    // gradation
    let linearDefs = util.createLinearGradient(
        'lineargradation',
        Math.PI / 2.0,
        ['0%', '50%', '100%'],
        ['magenta', 'rgba(255, 255, 0, 0.1)', 'lightblue'],
    );
    let radialDefs = util.createRadialGradient(
        'radialgradation',
        0.3,
        0.5, 0.5,
        0.7, 0.7,
        ['0%', '50%', '100%'],
        ['magenta', 'rgba(255, 255, 0, 0.1)', 'lightblue'],
        'reflect'
    );

    // create element with namespace
    let svg = util.createNS('svg', 300, 300);
    svg.appendChild(linearDefs);
    svg.appendChild(radialDefs);
    util.setAttribute(svg, {
        fill: 'url(#radialgradation)',
        stroke: 'url(#lineargradation)',
    });
    let path = util.createNS('path');
    util.setAttribute(path, {
        'stroke-width': 3,
        d: d
    });
    util.setStyle(path, {
        'stroke-dasharray': '5, 2'
    });
    svg.appendChild(path);
    let text = util.createText('path drawing', 25, 25);
    svg.appendChild(text);

    // encode base64 from svg element
    let uri = util.toDataURI64(svg);
    let i = new Image();
    i.src = uri;
    document.body.appendChild(i);
    document.body.appendChild(svg);

}, false);

