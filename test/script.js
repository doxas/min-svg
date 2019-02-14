
import util from '../index.js';

window.addEventListener('load', () => {
    // svg 要素など名前空間を必要とする要素の生成
    let svg = util.createNS('svg');
    // setAttribute で属性を付与
    util.setAttribute(svg, {
        fill: 'none',
        stroke: 'red',
        width: 200,
        height: 200,
    });
    // path 要素の d 属性値を作るためのオブジェクト
    let pathData = util.createPathData();
    pathData
    .moveTo(50, 50)
    .lineTo(100, 100, 150, 75)
    .moveTo(150, 150)
    .lineTo(150, 50, 175, 175)
    .closePath();

    let path = util.createNS('path');
    util.setAttribute(path, {
        'stroke-width': 3,
        d: pathData.d
    });
    svg.appendChild(path);

    let uri = util.toDataURI64(svg);
    let i = new Image();
    i.src = uri;
    document.body.appendChild(i);
}, false);

