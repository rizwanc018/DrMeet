function u(e,t,a){return function(o,s){s===void 0&&(s=a);var v=e(o)+s;return t(v)}}function i(e){return function(a){return new Date(e(a).getTime()-1)}}function c(e,t){return function(r){return[e(r),t(r)]}}function n(e){if(e instanceof Date)return e.getFullYear();if(typeof e=="number")return e;var t=parseInt(e,10);if(typeof e=="string"&&!isNaN(t))return t;throw new Error("Failed to get year from date: ".concat(e,"."))}function y(e){if(e instanceof Date)return e.getMonth();throw new Error("Failed to get month from date: ".concat(e,"."))}function f(e){if(e instanceof Date)return e.getDate();throw new Error("Failed to get year from date: ".concat(e,"."))}function h(e){var t=n(e),a=t+(-t+1)%100,r=new Date;return r.setFullYear(a,0,1),r.setHours(0,0,0,0),r}var C=u(n,h,-100),F=u(n,h,100),Y=i(F),H=u(n,Y,-100),I=c(h,Y);function d(e){var t=n(e),a=t+(-t+1)%10,r=new Date;return r.setFullYear(a,0,1),r.setHours(0,0,0,0),r}var R=u(n,d,-10),M=u(n,d,10),w=i(M),O=u(n,w,-10),j=c(d,w);function l(e){var t=n(e),a=new Date;return a.setFullYear(t,0,1),a.setHours(0,0,0,0),a}var q=u(n,l,-1),P=u(n,l,1),N=i(P),z=u(n,N,-1),A=c(l,N);function m(e,t){return function(r,o){o===void 0&&(o=t);var s=n(r),v=y(r)+o,g=new Date;return g.setFullYear(s,v,1),g.setHours(0,0,0,0),e(g)}}function E(e){var t=n(e),a=y(e),r=new Date;return r.setFullYear(t,a,1),r.setHours(0,0,0,0),r}var B=m(E,-1),G=m(E,1),S=i(G),T=m(S,-1),J=c(E,S);function b(e,t){return function(r,o){o===void 0&&(o=t);var s=n(r),v=y(r),g=f(r)+o,D=new Date;return D.setFullYear(s,v,g),D.setHours(0,0,0,0),e(D)}}function k(e){var t=n(e),a=y(e),r=f(e),o=new Date;return o.setFullYear(t,a,r),o.setHours(0,0,0,0),o}var p=b(k,1),x=i(p),K=c(k,x);function L(e){return f(S(e))}export{K as A,J as B,A as C,L as D,f as E,E as a,l as b,d as c,h as d,B as e,q as f,k as g,R as h,C as i,G as j,P as k,M as l,F as m,x as n,S as o,N as p,w as q,Y as r,T as s,z as t,O as u,H as v,n as w,y as x,I as y,j as z};