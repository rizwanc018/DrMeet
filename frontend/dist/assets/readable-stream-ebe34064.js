import{b as Oe}from"./node-stdlib-browser-ff393b4c.js";import{i as oe}from"./@babel-6ae3dd9c.js";import{e as Ve}from"./events-f5832a60.js";import{u as Ye}from"./util-ca1ba59c.js";import{p as N}from"./process-78812e81.js";import{i as ee}from"./inherits-2c87d58f.js";import{b as nt}from"./util-deprecate-ed892499.js";import{r as Ne}from"./string_decoder-22417133.js";var Me={exports:{}},$e=Ve.EventEmitter,ve,Ce;function at(){if(Ce)return ve;Ce=1;function r(_,g){var s=Object.keys(_);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(_);g&&(c=c.filter(function(T){return Object.getOwnPropertyDescriptor(_,T).enumerable})),s.push.apply(s,c)}return s}function n(_){for(var g=1;g<arguments.length;g++){var s=arguments[g]!=null?arguments[g]:{};g%2?r(Object(s),!0).forEach(function(c){f(_,c,s[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(_,Object.getOwnPropertyDescriptors(s)):r(Object(s)).forEach(function(c){Object.defineProperty(_,c,Object.getOwnPropertyDescriptor(s,c))})}return _}function f(_,g,s){return g=S(g),g in _?Object.defineProperty(_,g,{value:s,enumerable:!0,configurable:!0,writable:!0}):_[g]=s,_}function b(_,g){if(!(_ instanceof g))throw new TypeError("Cannot call a class as a function")}function d(_,g){for(var s=0;s<g.length;s++){var c=g[s];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(_,S(c.key),c)}}function w(_,g,s){return g&&d(_.prototype,g),s&&d(_,s),Object.defineProperty(_,"prototype",{writable:!1}),_}function S(_){var g=P(_,"string");return typeof g=="symbol"?g:String(g)}function P(_,g){if(typeof _!="object"||_===null)return _;var s=_[Symbol.toPrimitive];if(s!==void 0){var c=s.call(_,g||"default");if(typeof c!="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return(g==="string"?String:Number)(_)}var h=Oe,m=h.Buffer,j=Ye,D=j.inspect,W=D&&D.custom||"inspect";function q(_,g,s){m.prototype.copy.call(_,g,s)}return ve=function(){function _(){b(this,_),this.head=null,this.tail=null,this.length=0}return w(_,[{key:"push",value:function(s){var c={data:s,next:null};this.length>0?this.tail.next=c:this.head=c,this.tail=c,++this.length}},{key:"unshift",value:function(s){var c={data:s,next:this.head};this.length===0&&(this.tail=c),this.head=c,++this.length}},{key:"shift",value:function(){if(this.length!==0){var s=this.head.data;return this.length===1?this.head=this.tail=null:this.head=this.head.next,--this.length,s}}},{key:"clear",value:function(){this.head=this.tail=null,this.length=0}},{key:"join",value:function(s){if(this.length===0)return"";for(var c=this.head,T=""+c.data;c=c.next;)T+=s+c.data;return T}},{key:"concat",value:function(s){if(this.length===0)return m.alloc(0);for(var c=m.allocUnsafe(s>>>0),T=this.head,v=0;T;)q(T.data,c,v),v+=T.data.length,T=T.next;return c}},{key:"consume",value:function(s,c){var T;return s<this.head.data.length?(T=this.head.data.slice(0,s),this.head.data=this.head.data.slice(s)):s===this.head.data.length?T=this.shift():T=c?this._getString(s):this._getBuffer(s),T}},{key:"first",value:function(){return this.head.data}},{key:"_getString",value:function(s){var c=this.head,T=1,v=c.data;for(s-=v.length;c=c.next;){var p=c.data,R=s>p.length?p.length:s;if(R===p.length?v+=p:v+=p.slice(0,s),s-=R,s===0){R===p.length?(++T,c.next?this.head=c.next:this.head=this.tail=null):(this.head=c,c.data=p.slice(R));break}++T}return this.length-=T,v}},{key:"_getBuffer",value:function(s){var c=m.allocUnsafe(s),T=this.head,v=1;for(T.data.copy(c),s-=T.data.length;T=T.next;){var p=T.data,R=s>p.length?p.length:s;if(p.copy(c,c.length-s,0,R),s-=R,s===0){R===p.length?(++v,T.next?this.head=T.next:this.head=this.tail=null):(this.head=T,T.data=p.slice(R));break}++v}return this.length-=v,c}},{key:W,value:function(s,c){return D(this,n(n({},c),{},{depth:0,customInspect:!1}))}}]),_}(),ve}function ft(r,n){var f=this,b=this._readableState&&this._readableState.destroyed,d=this._writableState&&this._writableState.destroyed;return b||d?(n?n(r):r&&(this._writableState?this._writableState.errorEmitted||(this._writableState.errorEmitted=!0,N.nextTick(Ae,this,r)):N.nextTick(Ae,this,r)),this):(this._readableState&&(this._readableState.destroyed=!0),this._writableState&&(this._writableState.destroyed=!0),this._destroy(r||null,function(w){!n&&w?f._writableState?f._writableState.errorEmitted?N.nextTick(fe,f):(f._writableState.errorEmitted=!0,N.nextTick(je,f,w)):N.nextTick(je,f,w):n?(N.nextTick(fe,f),n(w)):N.nextTick(fe,f)}),this)}function je(r,n){Ae(r,n),fe(r)}function fe(r){r._writableState&&!r._writableState.emitClose||r._readableState&&!r._readableState.emitClose||r.emit("close")}function ot(){this._readableState&&(this._readableState.destroyed=!1,this._readableState.reading=!1,this._readableState.ended=!1,this._readableState.endEmitted=!1),this._writableState&&(this._writableState.destroyed=!1,this._writableState.ended=!1,this._writableState.ending=!1,this._writableState.finalCalled=!1,this._writableState.prefinished=!1,this._writableState.finished=!1,this._writableState.errorEmitted=!1)}function Ae(r,n){r.emit("error",n)}function lt(r,n){var f=r._readableState,b=r._writableState;f&&f.autoDestroy||b&&b.autoDestroy?r.destroy(n):r.emit("error",n)}var Ke={destroy:ft,undestroy:ot,errorOrDestroy:lt},G={};function ut(r,n){r.prototype=Object.create(n.prototype),r.prototype.constructor=r,r.__proto__=n}var Xe={};function B(r,n,f){f||(f=Error);function b(w,S,P){return typeof n=="string"?n:n(w,S,P)}var d=function(w){ut(S,w);function S(P,h,m){return w.call(this,b(P,h,m))||this}return S}(f);d.prototype.name=f.name,d.prototype.code=r,Xe[r]=d}function Ie(r,n){if(Array.isArray(r)){var f=r.length;return r=r.map(function(b){return String(b)}),f>2?"one of ".concat(n," ").concat(r.slice(0,f-1).join(", "),", or ")+r[f-1]:f===2?"one of ".concat(n," ").concat(r[0]," or ").concat(r[1]):"of ".concat(n," ").concat(r[0])}else return"of ".concat(n," ").concat(String(r))}function dt(r,n,f){return r.substr(!f||f<0?0:+f,n.length)===n}function st(r,n,f){return(f===void 0||f>r.length)&&(f=r.length),r.substring(f-n.length,f)===n}function ht(r,n,f){return typeof f!="number"&&(f=0),f+n.length>r.length?!1:r.indexOf(n,f)!==-1}B("ERR_INVALID_OPT_VALUE",function(r,n){return'The value "'+n+'" is invalid for option "'+r+'"'},TypeError);B("ERR_INVALID_ARG_TYPE",function(r,n,f){var b;typeof n=="string"&&dt(n,"not ")?(b="must not be",n=n.replace(/^not /,"")):b="must be";var d;if(st(r," argument"))d="The ".concat(r," ").concat(b," ").concat(Ie(n,"type"));else{var w=ht(r,".")?"property":"argument";d='The "'.concat(r,'" ').concat(w," ").concat(b," ").concat(Ie(n,"type"))}return d+=". Received type ".concat(typeof f),d},TypeError);B("ERR_STREAM_PUSH_AFTER_EOF","stream.push() after EOF");B("ERR_METHOD_NOT_IMPLEMENTED",function(r){return"The "+r+" method is not implemented"});B("ERR_STREAM_PREMATURE_CLOSE","Premature close");B("ERR_STREAM_DESTROYED",function(r){return"Cannot call "+r+" after a stream was destroyed"});B("ERR_MULTIPLE_CALLBACK","Callback called multiple times");B("ERR_STREAM_CANNOT_PIPE","Cannot pipe, not readable");B("ERR_STREAM_WRITE_AFTER_END","write after end");B("ERR_STREAM_NULL_VALUES","May not write null values to stream",TypeError);B("ERR_UNKNOWN_ENCODING",function(r){return"Unknown encoding: "+r},TypeError);B("ERR_STREAM_UNSHIFT_AFTER_END_EVENT","stream.unshift() after end event");G.codes=Xe;var ct=G.codes.ERR_INVALID_OPT_VALUE;function bt(r,n,f){return r.highWaterMark!=null?r.highWaterMark:n?r[f]:null}function pt(r,n,f,b){var d=bt(n,b,f);if(d!=null){if(!(isFinite(d)&&Math.floor(d)===d)||d<0){var w=b?f:"highWaterMark";throw new ct(w,d)}return Math.floor(d)}return r.objectMode?16:16*1024}var ze={getHighWaterMark:pt},we,ke;function Je(){if(ke)return we;ke=1,we=L;function r(a){var i=this;this.next=null,this.entry=null,this.finish=function(){pe(i,a)}}var n;L.WritableState=M;var f={deprecate:nt},b=$e,d=Oe.Buffer,w=(typeof oe<"u"?oe:typeof window<"u"?window:typeof self<"u"?self:{}).Uint8Array||function(){};function S(a){return d.from(a)}function P(a){return d.isBuffer(a)||a instanceof w}var h=Ke,m=ze,j=m.getHighWaterMark,D=G.codes,W=D.ERR_INVALID_ARG_TYPE,q=D.ERR_METHOD_NOT_IMPLEMENTED,_=D.ERR_MULTIPLE_CALLBACK,g=D.ERR_STREAM_CANNOT_PIPE,s=D.ERR_STREAM_DESTROYED,c=D.ERR_STREAM_NULL_VALUES,T=D.ERR_STREAM_WRITE_AFTER_END,v=D.ERR_UNKNOWN_ENCODING,p=h.errorOrDestroy;ee(L,b);function R(){}function M(a,i,l){n=n||z(),a=a||{},typeof l!="boolean"&&(l=i instanceof n),this.objectMode=!!a.objectMode,l&&(this.objectMode=this.objectMode||!!a.writableObjectMode),this.highWaterMark=j(this,a,"writableHighWaterMark",l),this.finalCalled=!1,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1,this.destroyed=!1;var y=a.decodeStrings===!1;this.decodeStrings=!y,this.defaultEncoding=a.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(O){he(i,O)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.emitClose=a.emitClose!==!1,this.autoDestroy=!!a.autoDestroy,this.bufferedRequestCount=0,this.corkedRequestsFree=new r(this)}M.prototype.getBuffer=function(){for(var i=this.bufferedRequest,l=[];i;)l.push(i),i=i.next;return l},function(){try{Object.defineProperty(M.prototype,"buffer",{get:f.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.","DEP0003")})}catch{}}();var k;typeof Symbol=="function"&&Symbol.hasInstance&&typeof Function.prototype[Symbol.hasInstance]=="function"?(k=Function.prototype[Symbol.hasInstance],Object.defineProperty(L,Symbol.hasInstance,{value:function(i){return k.call(this,i)?!0:this!==L?!1:i&&i._writableState instanceof M}})):k=function(i){return i instanceof this};function L(a){n=n||z();var i=this instanceof n;if(!i&&!k.call(L,this))return new L(a);this._writableState=new M(a,this,i),this.writable=!0,a&&(typeof a.write=="function"&&(this._write=a.write),typeof a.writev=="function"&&(this._writev=a.writev),typeof a.destroy=="function"&&(this._destroy=a.destroy),typeof a.final=="function"&&(this._final=a.final)),b.call(this)}L.prototype.pipe=function(){p(this,new g)};function E(a,i){var l=new T;p(a,l),N.nextTick(i,l)}function x(a,i,l,y){var O;return l===null?O=new c:typeof l!="string"&&!i.objectMode&&(O=new W("chunk",["string","Buffer"],l)),O?(p(a,O),N.nextTick(y,O),!1):!0}L.prototype.write=function(a,i,l){var y=this._writableState,O=!1,e=!y.objectMode&&P(a);return e&&!d.isBuffer(a)&&(a=S(a)),typeof i=="function"&&(l=i,i=null),e?i="buffer":i||(i=y.defaultEncoding),typeof l!="function"&&(l=R),y.ending?E(this,l):(e||x(this,y,a,l))&&(y.pendingcb++,O=de(this,y,e,a,i,l)),O},L.prototype.cork=function(){this._writableState.corked++},L.prototype.uncork=function(){var a=this._writableState;a.corked&&(a.corked--,!a.writing&&!a.corked&&!a.bufferProcessing&&a.bufferedRequest&&Y(this,a))},L.prototype.setDefaultEncoding=function(i){if(typeof i=="string"&&(i=i.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((i+"").toLowerCase())>-1))throw new v(i);return this._writableState.defaultEncoding=i,this},Object.defineProperty(L.prototype,"writableBuffer",{enumerable:!1,get:function(){return this._writableState&&this._writableState.getBuffer()}});function J(a,i,l){return!a.objectMode&&a.decodeStrings!==!1&&typeof i=="string"&&(i=d.from(i,l)),i}Object.defineProperty(L.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}});function de(a,i,l,y,O,e){if(!l){var t=J(i,y,O);y!==t&&(l=!0,O="buffer",y=t)}var o=i.objectMode?1:y.length;i.length+=o;var u=i.length<i.highWaterMark;if(u||(i.needDrain=!0),i.writing||i.corked){var I=i.lastBufferedRequest;i.lastBufferedRequest={chunk:y,encoding:O,isBuf:l,callback:e,next:null},I?I.next=i.lastBufferedRequest:i.bufferedRequest=i.lastBufferedRequest,i.bufferedRequestCount+=1}else V(a,i,!1,o,y,O,e);return u}function V(a,i,l,y,O,e,t){i.writelen=y,i.writecb=t,i.writing=!0,i.sync=!0,i.destroyed?i.onwrite(new s("write")):l?a._writev(O,i.onwrite):a._write(O,e,i.onwrite),i.sync=!1}function se(a,i,l,y,O){--i.pendingcb,l?(N.nextTick(O,y),N.nextTick(H,a,i),a._writableState.errorEmitted=!0,p(a,y)):(O(y),a._writableState.errorEmitted=!0,p(a,y),H(a,i))}function te(a){a.writing=!1,a.writecb=null,a.length-=a.writelen,a.writelen=0}function he(a,i){var l=a._writableState,y=l.sync,O=l.writecb;if(typeof O!="function")throw new _;if(te(l),i)se(a,l,y,i,O);else{var e=ie(l)||a.destroyed;!e&&!l.corked&&!l.bufferProcessing&&l.bufferedRequest&&Y(a,l),y?N.nextTick(F,a,l,e,O):F(a,l,e,O)}}function F(a,i,l,y){l||re(a,i),i.pendingcb--,y(),H(a,i)}function re(a,i){i.length===0&&i.needDrain&&(i.needDrain=!1,a.emit("drain"))}function Y(a,i){i.bufferProcessing=!0;var l=i.bufferedRequest;if(a._writev&&l&&l.next){var y=i.bufferedRequestCount,O=new Array(y),e=i.corkedRequestsFree;e.entry=l;for(var t=0,o=!0;l;)O[t]=l,l.isBuf||(o=!1),l=l.next,t+=1;O.allBuffers=o,V(a,i,!0,i.length,O,"",e.finish),i.pendingcb++,i.lastBufferedRequest=null,e.next?(i.corkedRequestsFree=e.next,e.next=null):i.corkedRequestsFree=new r(i),i.bufferedRequestCount=0}else{for(;l;){var u=l.chunk,I=l.encoding,A=l.callback,C=i.objectMode?1:u.length;if(V(a,i,!1,C,u,I,A),l=l.next,i.bufferedRequestCount--,i.writing)break}l===null&&(i.lastBufferedRequest=null)}i.bufferedRequest=l,i.bufferProcessing=!1}L.prototype._write=function(a,i,l){l(new q("_write()"))},L.prototype._writev=null,L.prototype.end=function(a,i,l){var y=this._writableState;return typeof a=="function"?(l=a,a=null,i=null):typeof i=="function"&&(l=i,i=null),a!=null&&this.write(a,i),y.corked&&(y.corked=1,this.uncork()),y.ending||be(this,y,l),this},Object.defineProperty(L.prototype,"writableLength",{enumerable:!1,get:function(){return this._writableState.length}});function ie(a){return a.ending&&a.length===0&&a.bufferedRequest===null&&!a.finished&&!a.writing}function ce(a,i){a._final(function(l){i.pendingcb--,l&&p(a,l),i.prefinished=!0,a.emit("prefinish"),H(a,i)})}function ne(a,i){!i.prefinished&&!i.finalCalled&&(typeof a._final=="function"&&!i.destroyed?(i.pendingcb++,i.finalCalled=!0,N.nextTick(ce,a,i)):(i.prefinished=!0,a.emit("prefinish")))}function H(a,i){var l=ie(i);if(l&&(ne(a,i),i.pendingcb===0&&(i.finished=!0,a.emit("finish"),i.autoDestroy))){var y=a._readableState;(!y||y.autoDestroy&&y.endEmitted)&&a.destroy()}return l}function be(a,i,l){i.ending=!0,H(a,i),l&&(i.finished?N.nextTick(l):a.once("finish",l)),i.ended=!0,a.writable=!1}function pe(a,i,l){var y=a.entry;for(a.entry=null;y;){var O=y.callback;i.pendingcb--,O(l),y=y.next}i.corkedRequestsFree.next=a}return Object.defineProperty(L.prototype,"destroyed",{enumerable:!1,get:function(){return this._writableState===void 0?!1:this._writableState.destroyed},set:function(i){this._writableState&&(this._writableState.destroyed=i)}}),L.prototype.destroy=h.destroy,L.prototype._undestroy=h.undestroy,L.prototype._destroy=function(a,i){i(a)},we}var Re,We;function z(){if(We)return Re;We=1;var r=Object.keys||function(m){var j=[];for(var D in m)j.push(D);return j};Re=S;var n=Ze(),f=Je();ee(S,n);for(var b=r(f.prototype),d=0;d<b.length;d++){var w=b[d];S.prototype[w]||(S.prototype[w]=f.prototype[w])}function S(m){if(!(this instanceof S))return new S(m);n.call(this,m),f.call(this,m),this.allowHalfOpen=!0,m&&(m.readable===!1&&(this.readable=!1),m.writable===!1&&(this.writable=!1),m.allowHalfOpen===!1&&(this.allowHalfOpen=!1,this.once("end",P)))}Object.defineProperty(S.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),Object.defineProperty(S.prototype,"writableBuffer",{enumerable:!1,get:function(){return this._writableState&&this._writableState.getBuffer()}}),Object.defineProperty(S.prototype,"writableLength",{enumerable:!1,get:function(){return this._writableState.length}});function P(){this._writableState.ended||N.nextTick(h,this)}function h(m){m.end()}return Object.defineProperty(S.prototype,"destroyed",{enumerable:!1,get:function(){return this._readableState===void 0||this._writableState===void 0?!1:this._readableState.destroyed&&this._writableState.destroyed},set:function(j){this._readableState===void 0||this._writableState===void 0||(this._readableState.destroyed=j,this._writableState.destroyed=j)}}),Re}var qe=G.codes.ERR_STREAM_PREMATURE_CLOSE;function _t(r){var n=!1;return function(){if(!n){n=!0;for(var f=arguments.length,b=new Array(f),d=0;d<f;d++)b[d]=arguments[d];r.apply(this,b)}}}function gt(){}function yt(r){return r.setHeader&&typeof r.abort=="function"}function Qe(r,n,f){if(typeof n=="function")return Qe(r,null,n);n||(n={}),f=_t(f||gt);var b=n.readable||n.readable!==!1&&r.readable,d=n.writable||n.writable!==!1&&r.writable,w=function(){r.writable||P()},S=r._writableState&&r._writableState.finished,P=function(){d=!1,S=!0,b||f.call(r)},h=r._readableState&&r._readableState.endEmitted,m=function(){b=!1,h=!0,d||f.call(r)},j=function(_){f.call(r,_)},D=function(){var _;if(b&&!h)return(!r._readableState||!r._readableState.ended)&&(_=new qe),f.call(r,_);if(d&&!S)return(!r._writableState||!r._writableState.ended)&&(_=new qe),f.call(r,_)},W=function(){r.req.on("finish",P)};return yt(r)?(r.on("complete",P),r.on("abort",D),r.req?W():r.on("request",W)):d&&!r._writableState&&(r.on("end",w),r.on("close",w)),r.on("end",m),r.on("finish",P),n.error!==!1&&r.on("error",j),r.on("close",D),function(){r.removeListener("complete",P),r.removeListener("abort",D),r.removeListener("request",W),r.req&&r.req.removeListener("finish",P),r.removeListener("end",w),r.removeListener("close",w),r.removeListener("finish",P),r.removeListener("end",m),r.removeListener("error",j),r.removeListener("close",D)}}var Le=Qe,Ee,Be;function vt(){if(Be)return Ee;Be=1;var r;function n(v,p,R){return p=f(p),p in v?Object.defineProperty(v,p,{value:R,enumerable:!0,configurable:!0,writable:!0}):v[p]=R,v}function f(v){var p=b(v,"string");return typeof p=="symbol"?p:String(p)}function b(v,p){if(typeof v!="object"||v===null)return v;var R=v[Symbol.toPrimitive];if(R!==void 0){var M=R.call(v,p||"default");if(typeof M!="object")return M;throw new TypeError("@@toPrimitive must return a primitive value.")}return(p==="string"?String:Number)(v)}var d=Le,w=Symbol("lastResolve"),S=Symbol("lastReject"),P=Symbol("error"),h=Symbol("ended"),m=Symbol("lastPromise"),j=Symbol("handlePromise"),D=Symbol("stream");function W(v,p){return{value:v,done:p}}function q(v){var p=v[w];if(p!==null){var R=v[D].read();R!==null&&(v[m]=null,v[w]=null,v[S]=null,p(W(R,!1)))}}function _(v){N.nextTick(q,v)}function g(v,p){return function(R,M){v.then(function(){if(p[h]){R(W(void 0,!0));return}p[j](R,M)},M)}}var s=Object.getPrototypeOf(function(){}),c=Object.setPrototypeOf((r={get stream(){return this[D]},next:function(){var p=this,R=this[P];if(R!==null)return Promise.reject(R);if(this[h])return Promise.resolve(W(void 0,!0));if(this[D].destroyed)return new Promise(function(E,x){N.nextTick(function(){p[P]?x(p[P]):E(W(void 0,!0))})});var M=this[m],k;if(M)k=new Promise(g(M,this));else{var L=this[D].read();if(L!==null)return Promise.resolve(W(L,!1));k=new Promise(this[j])}return this[m]=k,k}},n(r,Symbol.asyncIterator,function(){return this}),n(r,"return",function(){var p=this;return new Promise(function(R,M){p[D].destroy(null,function(k){if(k){M(k);return}R(W(void 0,!0))})})}),r),s),T=function(p){var R,M=Object.create(c,(R={},n(R,D,{value:p,writable:!0}),n(R,w,{value:null,writable:!0}),n(R,S,{value:null,writable:!0}),n(R,P,{value:null,writable:!0}),n(R,h,{value:p._readableState.endEmitted,writable:!0}),n(R,j,{value:function(L,E){var x=M[D].read();x?(M[m]=null,M[w]=null,M[S]=null,L(W(x,!1))):(M[w]=L,M[S]=E)},writable:!0}),R));return M[m]=null,d(p,function(k){if(k&&k.code!=="ERR_STREAM_PREMATURE_CLOSE"){var L=M[S];L!==null&&(M[m]=null,M[w]=null,M[S]=null,L(k)),M[P]=k;return}var E=M[w];E!==null&&(M[m]=null,M[w]=null,M[S]=null,E(W(void 0,!0))),M[h]=!0}),p.on("readable",_.bind(null,M)),M};return Ee=T,Ee}var Se,xe;function wt(){return xe||(xe=1,Se=function(){throw new Error("Readable.from is not available in the browser")}),Se}var me,Ue;function Ze(){if(Ue)return me;Ue=1,me=E;var r;E.ReadableState=L,Ve.EventEmitter;var n=function(t,o){return t.listeners(o).length},f=$e,b=Oe.Buffer,d=(typeof oe<"u"?oe:typeof window<"u"?window:typeof self<"u"?self:{}).Uint8Array||function(){};function w(e){return b.from(e)}function S(e){return b.isBuffer(e)||e instanceof d}var P=Ye,h;P&&P.debuglog?h=P.debuglog("stream"):h=function(){};var m=at(),j=Ke,D=ze,W=D.getHighWaterMark,q=G.codes,_=q.ERR_INVALID_ARG_TYPE,g=q.ERR_STREAM_PUSH_AFTER_EOF,s=q.ERR_METHOD_NOT_IMPLEMENTED,c=q.ERR_STREAM_UNSHIFT_AFTER_END_EVENT,T,v,p;ee(E,f);var R=j.errorOrDestroy,M=["error","close","destroy","pause","resume"];function k(e,t,o){if(typeof e.prependListener=="function")return e.prependListener(t,o);!e._events||!e._events[t]?e.on(t,o):Array.isArray(e._events[t])?e._events[t].unshift(o):e._events[t]=[o,e._events[t]]}function L(e,t,o){r=r||z(),e=e||{},typeof o!="boolean"&&(o=t instanceof r),this.objectMode=!!e.objectMode,o&&(this.objectMode=this.objectMode||!!e.readableObjectMode),this.highWaterMark=W(this,e,"readableHighWaterMark",o),this.buffer=new m,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.paused=!0,this.emitClose=e.emitClose!==!1,this.autoDestroy=!!e.autoDestroy,this.destroyed=!1,this.defaultEncoding=e.defaultEncoding||"utf8",this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,e.encoding&&(T||(T=Ne().StringDecoder),this.decoder=new T(e.encoding),this.encoding=e.encoding)}function E(e){if(r=r||z(),!(this instanceof E))return new E(e);var t=this instanceof r;this._readableState=new L(e,this,t),this.readable=!0,e&&(typeof e.read=="function"&&(this._read=e.read),typeof e.destroy=="function"&&(this._destroy=e.destroy)),f.call(this)}Object.defineProperty(E.prototype,"destroyed",{enumerable:!1,get:function(){return this._readableState===void 0?!1:this._readableState.destroyed},set:function(t){this._readableState&&(this._readableState.destroyed=t)}}),E.prototype.destroy=j.destroy,E.prototype._undestroy=j.undestroy,E.prototype._destroy=function(e,t){t(e)},E.prototype.push=function(e,t){var o=this._readableState,u;return o.objectMode?u=!0:typeof e=="string"&&(t=t||o.defaultEncoding,t!==o.encoding&&(e=b.from(e,t),t=""),u=!0),x(this,e,t,!1,u)},E.prototype.unshift=function(e){return x(this,e,null,!0,!1)};function x(e,t,o,u,I){h("readableAddChunk",t);var A=e._readableState;if(t===null)A.reading=!1,he(e,A);else{var C;if(I||(C=de(A,t)),C)R(e,C);else if(A.objectMode||t&&t.length>0)if(typeof t!="string"&&!A.objectMode&&Object.getPrototypeOf(t)!==b.prototype&&(t=w(t)),u)A.endEmitted?R(e,new c):J(e,A,t,!0);else if(A.ended)R(e,new g);else{if(A.destroyed)return!1;A.reading=!1,A.decoder&&!o?(t=A.decoder.write(t),A.objectMode||t.length!==0?J(e,A,t,!1):Y(e,A)):J(e,A,t,!1)}else u||(A.reading=!1,Y(e,A))}return!A.ended&&(A.length<A.highWaterMark||A.length===0)}function J(e,t,o,u){t.flowing&&t.length===0&&!t.sync?(t.awaitDrain=0,e.emit("data",o)):(t.length+=t.objectMode?1:o.length,u?t.buffer.unshift(o):t.buffer.push(o),t.needReadable&&F(e)),Y(e,t)}function de(e,t){var o;return!S(t)&&typeof t!="string"&&t!==void 0&&!e.objectMode&&(o=new _("chunk",["string","Buffer","Uint8Array"],t)),o}E.prototype.isPaused=function(){return this._readableState.flowing===!1},E.prototype.setEncoding=function(e){T||(T=Ne().StringDecoder);var t=new T(e);this._readableState.decoder=t,this._readableState.encoding=this._readableState.decoder.encoding;for(var o=this._readableState.buffer.head,u="";o!==null;)u+=t.write(o.data),o=o.next;return this._readableState.buffer.clear(),u!==""&&this._readableState.buffer.push(u),this._readableState.length=u.length,this};var V=1073741824;function se(e){return e>=V?e=V:(e--,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e++),e}function te(e,t){return e<=0||t.length===0&&t.ended?0:t.objectMode?1:e!==e?t.flowing&&t.length?t.buffer.head.data.length:t.length:(e>t.highWaterMark&&(t.highWaterMark=se(e)),e<=t.length?e:t.ended?t.length:(t.needReadable=!0,0))}E.prototype.read=function(e){h("read",e),e=parseInt(e,10);var t=this._readableState,o=e;if(e!==0&&(t.emittedReadable=!1),e===0&&t.needReadable&&((t.highWaterMark!==0?t.length>=t.highWaterMark:t.length>0)||t.ended))return h("read: emitReadable",t.length,t.ended),t.length===0&&t.ended?l(this):F(this),null;if(e=te(e,t),e===0&&t.ended)return t.length===0&&l(this),null;var u=t.needReadable;h("need readable",u),(t.length===0||t.length-e<t.highWaterMark)&&(u=!0,h("length less than watermark",u)),t.ended||t.reading?(u=!1,h("reading or ended",u)):u&&(h("do read"),t.reading=!0,t.sync=!0,t.length===0&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1,t.reading||(e=te(o,t)));var I;return e>0?I=i(e,t):I=null,I===null?(t.needReadable=t.length<=t.highWaterMark,e=0):(t.length-=e,t.awaitDrain=0),t.length===0&&(t.ended||(t.needReadable=!0),o!==e&&t.ended&&l(this)),I!==null&&this.emit("data",I),I};function he(e,t){if(h("onEofChunk"),!t.ended){if(t.decoder){var o=t.decoder.end();o&&o.length&&(t.buffer.push(o),t.length+=t.objectMode?1:o.length)}t.ended=!0,t.sync?F(e):(t.needReadable=!1,t.emittedReadable||(t.emittedReadable=!0,re(e)))}}function F(e){var t=e._readableState;h("emitReadable",t.needReadable,t.emittedReadable),t.needReadable=!1,t.emittedReadable||(h("emitReadable",t.flowing),t.emittedReadable=!0,N.nextTick(re,e))}function re(e){var t=e._readableState;h("emitReadable_",t.destroyed,t.length,t.ended),!t.destroyed&&(t.length||t.ended)&&(e.emit("readable"),t.emittedReadable=!1),t.needReadable=!t.flowing&&!t.ended&&t.length<=t.highWaterMark,a(e)}function Y(e,t){t.readingMore||(t.readingMore=!0,N.nextTick(ie,e,t))}function ie(e,t){for(;!t.reading&&!t.ended&&(t.length<t.highWaterMark||t.flowing&&t.length===0);){var o=t.length;if(h("maybeReadMore read 0"),e.read(0),o===t.length)break}t.readingMore=!1}E.prototype._read=function(e){R(this,new s("_read()"))},E.prototype.pipe=function(e,t){var o=this,u=this._readableState;switch(u.pipesCount){case 0:u.pipes=e;break;case 1:u.pipes=[u.pipes,e];break;default:u.pipes.push(e);break}u.pipesCount+=1,h("pipe count=%d opts=%j",u.pipesCount,t);var I=(!t||t.end!==!1)&&e!==N.stdout&&e!==N.stderr,A=I?$:Q;u.endEmitted?N.nextTick(A):o.once("end",A),e.on("unpipe",C);function C(K,X){h("onunpipe"),K===o&&X&&X.hasUnpiped===!1&&(X.hasUnpiped=!0,it())}function $(){h("onend"),e.end()}var ae=ce(o);e.on("drain",ae);var Pe=!1;function it(){h("cleanup"),e.removeListener("close",ge),e.removeListener("finish",ye),e.removeListener("drain",ae),e.removeListener("error",_e),e.removeListener("unpipe",C),o.removeListener("end",$),o.removeListener("end",Q),o.removeListener("data",De),Pe=!0,u.awaitDrain&&(!e._writableState||e._writableState.needDrain)&&ae()}o.on("data",De);function De(K){h("ondata");var X=e.write(K);h("dest.write",X),X===!1&&((u.pipesCount===1&&u.pipes===e||u.pipesCount>1&&O(u.pipes,e)!==-1)&&!Pe&&(h("false write response, pause",u.awaitDrain),u.awaitDrain++),o.pause())}function _e(K){h("onerror",K),Q(),e.removeListener("error",_e),n(e,"error")===0&&R(e,K)}k(e,"error",_e);function ge(){e.removeListener("finish",ye),Q()}e.once("close",ge);function ye(){h("onfinish"),e.removeListener("close",ge),Q()}e.once("finish",ye);function Q(){h("unpipe"),o.unpipe(e)}return e.emit("pipe",o),u.flowing||(h("pipe resume"),o.resume()),e};function ce(e){return function(){var o=e._readableState;h("pipeOnDrain",o.awaitDrain),o.awaitDrain&&o.awaitDrain--,o.awaitDrain===0&&n(e,"data")&&(o.flowing=!0,a(e))}}E.prototype.unpipe=function(e){var t=this._readableState,o={hasUnpiped:!1};if(t.pipesCount===0)return this;if(t.pipesCount===1)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,t.flowing=!1,e&&e.emit("unpipe",this,o),this);if(!e){var u=t.pipes,I=t.pipesCount;t.pipes=null,t.pipesCount=0,t.flowing=!1;for(var A=0;A<I;A++)u[A].emit("unpipe",this,{hasUnpiped:!1});return this}var C=O(t.pipes,e);return C===-1?this:(t.pipes.splice(C,1),t.pipesCount-=1,t.pipesCount===1&&(t.pipes=t.pipes[0]),e.emit("unpipe",this,o),this)},E.prototype.on=function(e,t){var o=f.prototype.on.call(this,e,t),u=this._readableState;return e==="data"?(u.readableListening=this.listenerCount("readable")>0,u.flowing!==!1&&this.resume()):e==="readable"&&!u.endEmitted&&!u.readableListening&&(u.readableListening=u.needReadable=!0,u.flowing=!1,u.emittedReadable=!1,h("on readable",u.length,u.reading),u.length?F(this):u.reading||N.nextTick(H,this)),o},E.prototype.addListener=E.prototype.on,E.prototype.removeListener=function(e,t){var o=f.prototype.removeListener.call(this,e,t);return e==="readable"&&N.nextTick(ne,this),o},E.prototype.removeAllListeners=function(e){var t=f.prototype.removeAllListeners.apply(this,arguments);return(e==="readable"||e===void 0)&&N.nextTick(ne,this),t};function ne(e){var t=e._readableState;t.readableListening=e.listenerCount("readable")>0,t.resumeScheduled&&!t.paused?t.flowing=!0:e.listenerCount("data")>0&&e.resume()}function H(e){h("readable nexttick read 0"),e.read(0)}E.prototype.resume=function(){var e=this._readableState;return e.flowing||(h("resume"),e.flowing=!e.readableListening,be(this,e)),e.paused=!1,this};function be(e,t){t.resumeScheduled||(t.resumeScheduled=!0,N.nextTick(pe,e,t))}function pe(e,t){h("resume",t.reading),t.reading||e.read(0),t.resumeScheduled=!1,e.emit("resume"),a(e),t.flowing&&!t.reading&&e.read(0)}E.prototype.pause=function(){return h("call pause flowing=%j",this._readableState.flowing),this._readableState.flowing!==!1&&(h("pause"),this._readableState.flowing=!1,this.emit("pause")),this._readableState.paused=!0,this};function a(e){var t=e._readableState;for(h("flow",t.flowing);t.flowing&&e.read()!==null;);}E.prototype.wrap=function(e){var t=this,o=this._readableState,u=!1;e.on("end",function(){if(h("wrapped end"),o.decoder&&!o.ended){var C=o.decoder.end();C&&C.length&&t.push(C)}t.push(null)}),e.on("data",function(C){if(h("wrapped data"),o.decoder&&(C=o.decoder.write(C)),!(o.objectMode&&C==null)&&!(!o.objectMode&&(!C||!C.length))){var $=t.push(C);$||(u=!0,e.pause())}});for(var I in e)this[I]===void 0&&typeof e[I]=="function"&&(this[I]=function($){return function(){return e[$].apply(e,arguments)}}(I));for(var A=0;A<M.length;A++)e.on(M[A],this.emit.bind(this,M[A]));return this._read=function(C){h("wrapped _read",C),u&&(u=!1,e.resume())},this},typeof Symbol=="function"&&(E.prototype[Symbol.asyncIterator]=function(){return v===void 0&&(v=vt()),v(this)}),Object.defineProperty(E.prototype,"readableHighWaterMark",{enumerable:!1,get:function(){return this._readableState.highWaterMark}}),Object.defineProperty(E.prototype,"readableBuffer",{enumerable:!1,get:function(){return this._readableState&&this._readableState.buffer}}),Object.defineProperty(E.prototype,"readableFlowing",{enumerable:!1,get:function(){return this._readableState.flowing},set:function(t){this._readableState&&(this._readableState.flowing=t)}}),E._fromList=i,Object.defineProperty(E.prototype,"readableLength",{enumerable:!1,get:function(){return this._readableState.length}});function i(e,t){if(t.length===0)return null;var o;return t.objectMode?o=t.buffer.shift():!e||e>=t.length?(t.decoder?o=t.buffer.join(""):t.buffer.length===1?o=t.buffer.first():o=t.buffer.concat(t.length),t.buffer.clear()):o=t.buffer.consume(e,t.decoder),o}function l(e){var t=e._readableState;h("endReadable",t.endEmitted),t.endEmitted||(t.ended=!0,N.nextTick(y,t,e))}function y(e,t){if(h("endReadableNT",e.endEmitted,e.length),!e.endEmitted&&e.length===0&&(e.endEmitted=!0,t.readable=!1,t.emit("end"),e.autoDestroy)){var o=t._writableState;(!o||o.autoDestroy&&o.finished)&&t.destroy()}}typeof Symbol=="function"&&(E.from=function(e,t){return p===void 0&&(p=wt()),p(E,e,t)});function O(e,t){for(var o=0,u=e.length;o<u;o++)if(e[o]===t)return o;return-1}return me}var et=U,le=G.codes,Rt=le.ERR_METHOD_NOT_IMPLEMENTED,Et=le.ERR_MULTIPLE_CALLBACK,St=le.ERR_TRANSFORM_ALREADY_TRANSFORMING,mt=le.ERR_TRANSFORM_WITH_LENGTH_0,ue=z();ee(U,ue);function Tt(r,n){var f=this._transformState;f.transforming=!1;var b=f.writecb;if(b===null)return this.emit("error",new Et);f.writechunk=null,f.writecb=null,n!=null&&this.push(n),b(r);var d=this._readableState;d.reading=!1,(d.needReadable||d.length<d.highWaterMark)&&this._read(d.highWaterMark)}function U(r){if(!(this instanceof U))return new U(r);ue.call(this,r),this._transformState={afterTransform:Tt.bind(this),needTransform:!1,transforming:!1,writecb:null,writechunk:null,writeencoding:null},this._readableState.needReadable=!0,this._readableState.sync=!1,r&&(typeof r.transform=="function"&&(this._transform=r.transform),typeof r.flush=="function"&&(this._flush=r.flush)),this.on("prefinish",Mt)}function Mt(){var r=this;typeof this._flush=="function"&&!this._readableState.destroyed?this._flush(function(n,f){Fe(r,n,f)}):Fe(this,null,null)}U.prototype.push=function(r,n){return this._transformState.needTransform=!1,ue.prototype.push.call(this,r,n)};U.prototype._transform=function(r,n,f){f(new Rt("_transform()"))};U.prototype._write=function(r,n,f){var b=this._transformState;if(b.writecb=f,b.writechunk=r,b.writeencoding=n,!b.transforming){var d=this._readableState;(b.needTransform||d.needReadable||d.length<d.highWaterMark)&&this._read(d.highWaterMark)}};U.prototype._read=function(r){var n=this._transformState;n.writechunk!==null&&!n.transforming?(n.transforming=!0,this._transform(n.writechunk,n.writeencoding,n.afterTransform)):n.needTransform=!0};U.prototype._destroy=function(r,n){ue.prototype._destroy.call(this,r,function(f){n(f)})};function Fe(r,n,f){if(n)return r.emit("error",n);if(f!=null&&r.push(f),r._writableState.length)throw new mt;if(r._transformState.transforming)throw new St;return r.push(null)}var At=Z,tt=et;ee(Z,tt);function Z(r){if(!(this instanceof Z))return new Z(r);tt.call(this,r)}Z.prototype._transform=function(r,n,f){f(null,r)};var Te;function Ot(r){var n=!1;return function(){n||(n=!0,r.apply(void 0,arguments))}}var rt=G.codes,Lt=rt.ERR_MISSING_ARGS,Pt=rt.ERR_STREAM_DESTROYED;function He(r){if(r)throw r}function Dt(r){return r.setHeader&&typeof r.abort=="function"}function Nt(r,n,f,b){b=Ot(b);var d=!1;r.on("close",function(){d=!0}),Te===void 0&&(Te=Le),Te(r,{readable:n,writable:f},function(S){if(S)return b(S);d=!0,b()});var w=!1;return function(S){if(!d&&!w){if(w=!0,Dt(r))return r.abort();if(typeof r.destroy=="function")return r.destroy();b(S||new Pt("pipe"))}}}function Ge(r){r()}function Ct(r,n){return r.pipe(n)}function jt(r){return!r.length||typeof r[r.length-1]!="function"?He:r.pop()}function It(){for(var r=arguments.length,n=new Array(r),f=0;f<r;f++)n[f]=arguments[f];var b=jt(n);if(Array.isArray(n[0])&&(n=n[0]),n.length<2)throw new Lt("streams");var d,w=n.map(function(S,P){var h=P<n.length-1,m=P>0;return Nt(S,h,m,function(j){d||(d=j),j&&w.forEach(Ge),!h&&(w.forEach(Ge),b(d))})});return n.reduce(Ct)}var kt=It;(function(r,n){n=r.exports=Ze(),n.Stream=n,n.Readable=n,n.Writable=Je(),n.Duplex=z(),n.Transform=et,n.PassThrough=At,n.finished=Le,n.pipeline=kt})(Me,Me.exports);var Vt=Me.exports;export{Vt as r};
