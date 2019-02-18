
import util from '../index.js';

window.addEventListener('load', () => {
    // PathData は path 要素の d 属性値を作るためのオブジェクト
    // 全ての座標は絶対座標によって出力され、M, L, Z, Q, C のいずれかを利用して組み立てられる
    // メソッド名が ~To で終わるものはパスを明示的に閉じないしサブパスを開始することもない
    // そうでないものはサブパスを追加し自身でパスを閉じる
    // reset はそこまでに生成したパス文字列を返しつつ同時に自身のパス文字列を空にする
    let d = util.createPathData()
                .moveTo(50, 50)                         // サブパスを開始
                .lineTo(100, 100, 150, 75)              // パスを引く
                .moveTo(250, 50)
                .lineTo(175, 50, 200, 175)
                .quadraticCurveTo(300, 0, 250, 200)     // 二次ベジェ曲線
                .bezierCurveTo(0, 200, 200, 0, 50, 250) // 三次ベジェ曲線
                .closePath()                            // パスを閉じる
                .rect(75, 75, 50, 50)                   // 矩形のパス
                .roundRect(125, 125, 100, 100, 25)      // 角丸四角形のパス
                .polygon(225, 225, 275, 225, 225, 275)  // 任意の多角形のパス
                .circle(50, 250, 25, 8)                 // 任意の分割数で描く円のパス
                .reset();                               // 生成した文字列を返してからプロパティをリセット

    // 線形グラデーションを定義して defs 要素に入れて返すメソッドを使い
    // SVG に append することで id 指定でグラデーションを fill に設定できる
    let linearDefs = util.createLinearGradient(
        'lineargradation',
        Math.PI / 2.0,
        ['0%', '50%', '100%'],
        ['magenta', 'rgba(255, 255, 0, 0.1)', 'lightblue'],
    );
    // 円形グラデーションを定義して defs 要素に入れて返すメソッド
    let radialDefs = util.createRadialGradient(
        'radialgradation',
        0.3,
        0.5, 0.5,
        0.7, 0.7,
        ['0%', '50%', '100%'],
        ['magenta', 'rgba(255, 255, 0, 0.1)', 'lightblue'],
        'reflect'
    );

    // svg 要素など名前空間を必要とする要素の生成
    let svg = util.createNS('svg', 300, 300);
    svg.appendChild(linearDefs);
    svg.appendChild(radialDefs);
    // setAttribute で属性を付与
    util.setAttribute(svg, {
        fill: 'url(#radialgradation)',
        stroke: 'url(#lineargradation)',
    });
    let path = util.createNS('path');
    util.setAttribute(path, {
        'stroke-width': 3,
        d: d
    });
    // style として付与する
    util.setStyle(path, {
        'stroke-dasharray': '5, 2'
    });
    svg.appendChild(path);
    let text = util.createText('path drawing', 25, 25);
    svg.appendChild(text);

    // 確認のため append
    let uri = util.toDataURI64(svg);
    let i = new Image();
    i.src = uri;
    document.body.appendChild(i);
    document.body.appendChild(svg);

    // 大きさを変更した場合の動作確認用スタイル
    i.style.width = '500px';
    i.style.height = '500px';
    svg.style.width = '500px';
    svg.style.height = '500px';

}, false);

