
import util from '../index.js';

window.addEventListener('load', () => {
    let e = util.createNS('svg');
    console.log(util.encodeHTML(e));
}, false);

