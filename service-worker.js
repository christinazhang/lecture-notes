"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/lecture-notes/index.html","c29f973b783dd878ef630a704fd437a2"],["/lecture-notes/static/css/main.0c383192.css","7a0732c3e125955dc869659b686b6a18"],["/lecture-notes/static/js/main.c8775c52.js","ea5c80dfffdb6aef8d2c8338cf8f31bf"],["/lecture-notes/static/media/lecture-1.80113077.md","8011307784f031b0d0c11eefdc4210ef"],["/lecture-notes/static/media/lecture-10.229f3b54.md","229f3b544c1b1d6543f655f4afacab8a"],["/lecture-notes/static/media/lecture-11.216462b7.md","216462b7f43abcde88319440e4a4ef14"],["/lecture-notes/static/media/lecture-12.fc3cba74.md","fc3cba74ee07c1a148326d945a743ee1"],["/lecture-notes/static/media/lecture-2.aee6bf89.md","aee6bf89737f93b892170195397f3674"],["/lecture-notes/static/media/lecture-3.59862ae4.md","59862ae4a931deaf164f913e167b24eb"],["/lecture-notes/static/media/lecture-4.62983b07.md","62983b07f8a2b65be030d5d51a38c19b"],["/lecture-notes/static/media/lecture-5.394de9d7.md","394de9d7696f4427d5e16d3883f6be18"],["/lecture-notes/static/media/lecture-6.f19ba1f1.md","f19ba1f19780e6bcf97703d7496abe5c"],["/lecture-notes/static/media/lecture-7.2b2d22a2.md","2b2d22a231648330a147d4e5cb066391"],["/lecture-notes/static/media/lecture-8.8409c013.md","8409c0132f0e092675cd82b58d0ab719"],["/lecture-notes/static/media/lecture-9.238e5511.md","238e5511581a146cfb8c7c3ce5d02bfa"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,r){var a=new URL(e);return r&&a.pathname.match(r)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],r=new URL(t,self.location),a=createCacheKey(r,hashParamName,n,/\.\w{8}\./);return[r.toString(),a]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var r=new Request(n,{credentials:"same-origin"});return fetch(r).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL("/lecture-notes/index.html",self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});