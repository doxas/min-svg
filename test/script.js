
import util from '../index.js';

window.addEventListener('load', () => {
    let svg = util.createNS('svg');
    util.setAttribute(svg, {
        fill: 'none',
        stroke: 'red',
        width: 200,
        height: 200,
    });
    let path = util.createNS('path');
    util.setAttribute(path, {
        'stroke-width': 5,
        d: 'M50,50L100,100,150,75Z',
    });
    svg.appendChild(path);

    let uri = util.toDataURI(svg);
    let i = new Image();
    i.src = uri;
    document.body.appendChild(i);
    console.log(uri);

    let b64 = util.toDataURI64(svg);
    let j = new Image();
    j.src = b64;
    document.body.appendChild(j);
    console.log(b64);
}, false);

