import{h as O}from"./has-symbols-0e5b2b17.js";import{h as G}from"./has-proto-f7d0b240.js";import{f as T}from"./function-bind-22e7ee79.js";import{s as k}from"./has-26d28e02.js";var r,P=SyntaxError,N=Function,d=TypeError,R=function(i){try{return N('"use strict"; return ('+i+").constructor;")()}catch{}},c=Object.getOwnPropertyDescriptor;if(c)try{c({},"")}catch{c=null}var w=function(){throw new d},_=c?function(){try{return arguments.callee,w}catch{try{return c(arguments,"callee").get}catch{return w}}}():w,u=O(),$=G(),o=Object.getPrototypeOf||($?function(i){return i.__proto__}:null),A={},C=typeof Uint8Array>"u"||!o?r:o(Uint8Array),s={"%AggregateError%":typeof AggregateError>"u"?r:AggregateError,"%Array%":Array,"%ArrayBuffer%":typeof ArrayBuffer>"u"?r:ArrayBuffer,"%ArrayIteratorPrototype%":u&&o?o([][Symbol.iterator]()):r,"%AsyncFromSyncIteratorPrototype%":r,"%AsyncFunction%":A,"%AsyncGenerator%":A,"%AsyncGeneratorFunction%":A,"%AsyncIteratorPrototype%":A,"%Atomics%":typeof Atomics>"u"?r:Atomics,"%BigInt%":typeof BigInt>"u"?r:BigInt,"%BigInt64Array%":typeof BigInt64Array>"u"?r:BigInt64Array,"%BigUint64Array%":typeof BigUint64Array>"u"?r:BigUint64Array,"%Boolean%":Boolean,"%DataView%":typeof DataView>"u"?r:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":typeof Float32Array>"u"?r:Float32Array,"%Float64Array%":typeof Float64Array>"u"?r:Float64Array,"%FinalizationRegistry%":typeof FinalizationRegistry>"u"?r:FinalizationRegistry,"%Function%":N,"%GeneratorFunction%":A,"%Int8Array%":typeof Int8Array>"u"?r:Int8Array,"%Int16Array%":typeof Int16Array>"u"?r:Int16Array,"%Int32Array%":typeof Int32Array>"u"?r:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":u&&o?o(o([][Symbol.iterator]())):r,"%JSON%":typeof JSON=="object"?JSON:r,"%Map%":typeof Map>"u"?r:Map,"%MapIteratorPrototype%":typeof Map>"u"||!u||!o?r:o(new Map()[Symbol.iterator]()),"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":typeof Promise>"u"?r:Promise,"%Proxy%":typeof Proxy>"u"?r:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":typeof Reflect>"u"?r:Reflect,"%RegExp%":RegExp,"%Set%":typeof Set>"u"?r:Set,"%SetIteratorPrototype%":typeof Set>"u"||!u||!o?r:o(new Set()[Symbol.iterator]()),"%SharedArrayBuffer%":typeof SharedArrayBuffer>"u"?r:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":u&&o?o(""[Symbol.iterator]()):r,"%Symbol%":u?Symbol:r,"%SyntaxError%":P,"%ThrowTypeError%":_,"%TypedArray%":C,"%TypeError%":d,"%Uint8Array%":typeof Uint8Array>"u"?r:Uint8Array,"%Uint8ClampedArray%":typeof Uint8ClampedArray>"u"?r:Uint8ClampedArray,"%Uint16Array%":typeof Uint16Array>"u"?r:Uint16Array,"%Uint32Array%":typeof Uint32Array>"u"?r:Uint32Array,"%URIError%":URIError,"%WeakMap%":typeof WeakMap>"u"?r:WeakMap,"%WeakRef%":typeof WeakRef>"u"?r:WeakRef,"%WeakSet%":typeof WeakSet>"u"?r:WeakSet};if(o)try{null.error}catch(i){var M=o(o(i));s["%Error.prototype%"]=M}var j=function i(t){var n;if(t==="%AsyncFunction%")n=R("async function () {}");else if(t==="%GeneratorFunction%")n=R("function* () {}");else if(t==="%AsyncGeneratorFunction%")n=R("async function* () {}");else if(t==="%AsyncGenerator%"){var e=i("%AsyncGeneratorFunction%");e&&(n=e.prototype)}else if(t==="%AsyncIteratorPrototype%"){var a=i("%AsyncGenerator%");a&&o&&(n=o(a.prototype))}return s[t]=n,n},B={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},v=T,F=k,W=v.call(Function.call,Array.prototype.concat),D=v.call(Function.apply,Array.prototype.splice),x=v.call(Function.call,String.prototype.replace),b=v.call(Function.call,String.prototype.slice),J=v.call(Function.call,RegExp.prototype.exec),V=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,z=/\\(\\)?/g,q=function(t){var n=b(t,0,1),e=b(t,-1);if(n==="%"&&e!=="%")throw new P("invalid intrinsic syntax, expected closing `%`");if(e==="%"&&n!=="%")throw new P("invalid intrinsic syntax, expected opening `%`");var a=[];return x(t,V,function(p,l,y,m){a[a.length]=y?x(m,z,"$1"):l||p}),a},L=function(t,n){var e=t,a;if(F(B,e)&&(a=B[e],e="%"+a[0]+"%"),F(s,e)){var p=s[e];if(p===A&&(p=j(e)),typeof p>"u"&&!n)throw new d("intrinsic "+t+" exists, but is not available. Please file an issue!");return{alias:a,name:e,value:p}}throw new P("intrinsic "+t+" does not exist!")},X=function(t,n){if(typeof t!="string"||t.length===0)throw new d("intrinsic name must be a non-empty string");if(arguments.length>1&&typeof n!="boolean")throw new d('"allowMissing" argument must be a boolean');if(J(/^%?[^%]*%?$/,t)===null)throw new P("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var e=q(t),a=e.length>0?e[0]:"",p=L("%"+a+"%",n),l=p.name,y=p.value,m=!1,U=p.alias;U&&(a=U[0],D(e,W([0,1],U)));for(var S=1,g=!0;S<e.length;S+=1){var f=e[S],h=b(f,0,1),E=b(f,-1);if((h==='"'||h==="'"||h==="`"||E==='"'||E==="'"||E==="`")&&h!==E)throw new P("property names with quotes must have matching quotes");if((f==="constructor"||!g)&&(m=!0),a+="."+f,l="%"+a+"%",F(s,l))y=s[l];else if(y!=null){if(!(f in y)){if(!n)throw new d("base intrinsic for "+t+" exists, but the property is not available.");return}if(c&&S+1>=e.length){var I=c(y,f);g=!!I,g&&"get"in I&&!("originalValue"in I.get)?y=I.get:y=y[f]}else g=F(y,f),y=y[f];g&&!m&&(s[l]=y)}}return y};export{X as g};
