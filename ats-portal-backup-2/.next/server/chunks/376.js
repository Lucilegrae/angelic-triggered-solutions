exports.id=376,exports.ids=[376],exports.modules={546:(a,b,c)=>{"use strict";c(30755)},3649:(a,b,c)=>{"use strict";c(546),c(96034)},17303:(a,b,c)=>{"use strict";c(59796),c(43619)},19691:(a,b,c)=>{"use strict";var d=c(53547);d.qg,d.lK},30755:(a,b,c)=>{"use strict";c(96034);let d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),e=" 	\n\r=".split(""),f=Array(128);for(let a=0;a<f.length;a+=1)f[a]=-1;for(let a=0;a<e.length;a+=1)f[e[a].charCodeAt(0)]=-2;for(let a=0;a<d.length;a+=1)f[d[a].charCodeAt(0)]=a},31377:()=>{},31458:(a,b,c)=>{"use strict";c(43619),c(19691)},43619:(a,b,c)=>{"use strict";c(59796)},46962:(a,b,c)=>{"use strict";c(30755),c(546)},53547:(a,b)=>{"use strict";let c;b.qg=function(a,b){let c=new i,d=a.length;if(d<2)return c;let e=b?.decode||l,f=0;do{let b=function(a,b,c){let d=a.indexOf("=",b);return d<c?d:-1}(a,f,d);if(-1===b)break;let g=function(a,b,c){let d=a.indexOf(";",b);return -1===d?c:d}(a,f,d);if(b>g){f=a.lastIndexOf(";",b-1)+1;continue}let h=k(a,f,b);void 0===c[h]&&(c[h]=e(k(a,b+1,g))),f=g+1}while(f<d);return c},b.lK=j,b.lK=j;let d=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,e=/^[\u0021-\u003A\u003C-\u007E]*$/,f=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,g=/^[\u0020-\u003A\u003D-\u007E]*$/,h=Object.prototype.toString,i=((c=function(){}).prototype=Object.create(null),c);function j(a,b,c){let i="object"==typeof a?a:{...c,name:a,value:String(b)},j=("object"==typeof b?b:c)?.encode||encodeURIComponent;if(!d.test(i.name))throw TypeError(`argument name is invalid: ${i.name}`);let k=i.value?j(i.value):"";if(!e.test(k))throw TypeError(`argument val is invalid: ${i.value}`);let l=i.name+"="+k;if(void 0!==i.maxAge){if(!Number.isInteger(i.maxAge))throw TypeError(`option maxAge is invalid: ${i.maxAge}`);l+="; Max-Age="+i.maxAge}if(i.domain){if(!f.test(i.domain))throw TypeError(`option domain is invalid: ${i.domain}`);l+="; Domain="+i.domain}if(i.path){if(!g.test(i.path))throw TypeError(`option path is invalid: ${i.path}`);l+="; Path="+i.path}if(i.expires){var m;if(m=i.expires,"[object Date]"!==h.call(m)||!Number.isFinite(i.expires.valueOf()))throw TypeError(`option expires is invalid: ${i.expires}`);l+="; Expires="+i.expires.toUTCString()}if(i.httpOnly&&(l+="; HttpOnly"),i.secure&&(l+="; Secure"),i.partitioned&&(l+="; Partitioned"),i.priority)switch("string"==typeof i.priority?i.priority.toLowerCase():void 0){case"low":l+="; Priority=Low";break;case"medium":l+="; Priority=Medium";break;case"high":l+="; Priority=High";break;default:throw TypeError(`option priority is invalid: ${i.priority}`)}if(i.sameSite)switch("string"==typeof i.sameSite?i.sameSite.toLowerCase():i.sameSite){case!0:case"strict":l+="; SameSite=Strict";break;case"lax":l+="; SameSite=Lax";break;case"none":l+="; SameSite=None";break;default:throw TypeError(`option sameSite is invalid: ${i.sameSite}`)}return l}function k(a,b,c){let d=b,e=c;do{let b=a.charCodeAt(d);if(32!==b&&9!==b)break}while(++d<e);for(;e>d;){let b=a.charCodeAt(e-1);if(32!==b&&9!==b)break;e--}return a.slice(d,e)}function l(a){if(-1===a.indexOf("%"))return a;try{return decodeURIComponent(a)}catch(b){return a}}},56829:(a,b,c)=>{"use strict";c(46962),c(3649);var d=c(76108);if(c.o(d,"SessionContextProvider")&&c.d(b,{SessionContextProvider:function(){return d.SessionContextProvider}}),c.o(d,"useSessionContext")&&c.d(b,{useSessionContext:function(){return d.useSessionContext}}),c(30755),"u">typeof process&&process.env?.npm_package_name){let a=process.env.npm_package_name;["@supabase/auth-helpers-nextjs","@supabase/auth-helpers-react","@supabase/auth-helpers-remix","@supabase/auth-helpers-sveltekit"].includes(a)&&console.warn(`
╔════════════════════════════════════════════════════════════════════════════╗
║ ⚠️  IMPORTANT: Package Consolidation Notice                                ║
║                                                                            ║
║ The ${a.padEnd(35)} package name is deprecated.  ║
║                                                                            ║
║ You are now using @supabase/ssr - a unified solution for all frameworks.  ║
║                                                                            ║
║ The auth-helpers packages have been consolidated into @supabase/ssr       ║
║ to provide better maintenance and consistent APIs across frameworks.      ║
║                                                                            ║
║ Please update your package.json to use @supabase/ssr directly:            ║
║   npm uninstall ${a.padEnd(42)} ║
║   npm install @supabase/ssr                                               ║
║                                                                            ║
║ For more information, visit:                                              ║
║ https://supabase.com/docs/guides/auth/server-side                         ║
╚════════════════════════════════════════════════════════════════════════════╝
    `)}},59796:(a,b,c)=>{"use strict";c(19691);let d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),e=" 	\n\r=".split(""),f=Array(128);for(let a=0;a<f.length;a+=1)f[a]=-1;for(let a=0;a<e.length;a+=1)f[e[a].charCodeAt(0)]=-2;for(let a=0;a<d.length;a+=1)f[d[a].charCodeAt(0)]=a},76108:()=>{},87620:(a,b,c)=>{"use strict";c(17303),c(31458);var d=c(31377);if(c.o(d,"createClientComponentClient")&&c.d(b,{createClientComponentClient:function(){return d.createClientComponentClient}}),c(59796),"u">typeof process&&process.env?.npm_package_name){let a=process.env.npm_package_name;["@supabase/auth-helpers-nextjs","@supabase/auth-helpers-react","@supabase/auth-helpers-remix","@supabase/auth-helpers-sveltekit"].includes(a)&&console.warn(`
╔════════════════════════════════════════════════════════════════════════════╗
║ ⚠️  IMPORTANT: Package Consolidation Notice                                ║
║                                                                            ║
║ The ${a.padEnd(35)} package name is deprecated.  ║
║                                                                            ║
║ You are now using @supabase/ssr - a unified solution for all frameworks.  ║
║                                                                            ║
║ The auth-helpers packages have been consolidated into @supabase/ssr       ║
║ to provide better maintenance and consistent APIs across frameworks.      ║
║                                                                            ║
║ Please update your package.json to use @supabase/ssr directly:            ║
║   npm uninstall ${a.padEnd(42)} ║
║   npm install @supabase/ssr                                               ║
║                                                                            ║
║ For more information, visit:                                              ║
║ https://supabase.com/docs/guides/auth/server-side                         ║
╚════════════════════════════════════════════════════════════════════════════╝
    `)}},96034:(a,b,c)=>{"use strict";var d=c(53547);d.qg,d.lK}};