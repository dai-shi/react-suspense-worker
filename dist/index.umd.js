!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("comlink")):"function"==typeof define&&define.amd?define(["exports","comlink"],n):n((e=e||self).reactSuspenseWorker={},e.comlink)}(this,function(e,n){var t=function(e){return!!e&&"function"==typeof e.then},r=function(e){return"object"==typeof e&&null!==e};e.expose=n.expose,e.wrap=function(e){return function e(n){var o=new Map,f=new Map;return new Proxy(n,{get:function(n,f){if(o.has(f)){var i=o.get(f);return r(i)?e(i):i}var u=n[f];if(t(u))throw u.then(function(e){o.set(f,e)});return r(u)?e(u):u},apply:function(n,o,i){var u=JSON.stringify(i);if(f.has(u)){var p=f.get(u);return r(p)?e(p):p}var c=n.apply(o,i);if(t(c))throw c.then(function(e){f.set(u,e)});return r(c)?e(c):c}})}(n.wrap(e))}});
//# sourceMappingURL=index.umd.js.map
