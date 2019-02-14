
import util from '../index.js';

window.addEventListener('load', () => {
    let svg = util.createNS('svg');
    util.setAttribute(svg, {
        fill: 'none',
        stroke: 'red',
        width: 200,
        height: 200,
    });
    let pathData = util.createPathData();
    pathData
    .moveTo(50, 50)
    .lineTo(100, 100, 150, 75)
    .closePath();
    let path = util.createNS('path');
    util.setAttribute(path, {
        'stroke-width': 5,
        d: pathData.d
    });
    svg.appendChild(path);

    let uri = util.toDataURI64(svg);
    let i = new Image();
    i.src = uri;
    document.body.appendChild(i);
}, false);

