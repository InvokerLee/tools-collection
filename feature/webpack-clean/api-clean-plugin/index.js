exports.ApiCleanPlugin=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const o=n(1),r=/(?<=const ).*(?= = `)/g,i=/(?<=const ).*(?= = ')/g,c=e=>e.match(r)?e.match(r)[0]:e.match(i)?e.match(i)[0]:"";e.exports=class{constructor(e){this.options=e,this.fileRows=[],this.apiArray=[]}apply(e){console.warn("api clean=======================================start");const{fileSrc:t}=this.options;o.readFile(t,(e,t)=>{const n=t.toString();this.fileRows=n.split("\n"),this.apiArray=(e=>{const t=e.match(r)||[],n=e.match(i)||[];return t.concat(n)})(n)}),e.hooks.make.tap("ApiClean",e=>{let t="";const n=[];e.hooks.succeedModule.tap("ApiClean",e=>{t+=e._source?e._source._value:""}),e.hooks.finishModules.tap("ApiClean",()=>{this.apiArray.forEach(e=>{t.includes("API."+e)&&n.push(e)});const e=n.join("\n"),r=this.fileRows.reduce((t,n)=>n&&!n.includes("export const ")||c(n)&&e.includes(c(n))?t.concat([n]):t,[]);o.writeFile("./api.js",r.join("\n"),()=>{}),console.warn("api clean=======================================end")})})}}},function(e,t){e.exports=require("fs")}]);