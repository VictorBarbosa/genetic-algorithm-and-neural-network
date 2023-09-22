"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4764],{4764:(A,y,p)=>{p.r(y),p.d(y,{ion_route:()=>D,ion_route_redirect:()=>L,ion_router:()=>tt,ion_router_link:()=>x});var f=p(5861),d=p(2364),b=p(839),C=p(3567),P=p(152);const D=class{constructor(t){(0,d.r)(this,t),this.ionRouteDataChanged=(0,d.d)(this,"ionRouteDataChanged",7),this.url="",this.component=void 0,this.componentProps=void 0,this.beforeLeave=void 0,this.beforeEnter=void 0}onUpdate(t){this.ionRouteDataChanged.emit(t)}onComponentProps(t,e){if(t===e)return;const n=t?Object.keys(t):[],r=e?Object.keys(e):[];if(n.length===r.length){for(const o of n)if(t[o]!==e[o])return void this.onUpdate(t)}else this.onUpdate(t)}connectedCallback(){this.ionRouteDataChanged.emit()}static get watchers(){return{url:["onUpdate"],component:["onUpdate"],componentProps:["onComponentProps"]}}},L=class{constructor(t){(0,d.r)(this,t),this.ionRouteRedirectChanged=(0,d.d)(this,"ionRouteRedirectChanged",7),this.from=void 0,this.to=void 0}propDidChange(){this.ionRouteRedirectChanged.emit()}connectedCallback(){this.ionRouteRedirectChanged.emit()}static get watchers(){return{from:["propDidChange"],to:["propDidChange"]}}},l="root",h="forward",_=t=>"/"+t.filter(n=>n.length>0).join("/"),m=t=>{let n,e=[""];if(null!=t){const r=t.indexOf("?");r>-1&&(n=t.substring(r+1),t=t.substring(0,r)),e=t.split("/").map(o=>o.trim()).filter(o=>o.length>0),0===e.length&&(e=[""])}return{segments:e,queryString:n}},T=function(){var t=(0,f.Z)(function*(e,n,r,o,s=!1,i){try{const a=N(e);if(o>=n.length||!a)return s;yield new Promise(v=>(0,b.c)(a,v));const u=n[o],c=yield a.setRouteId(u.id,u.params,r,i);return c.changed&&(r=l,s=!0),s=yield T(c.element,n,r,o+1,s,i),c.markVisible&&(yield c.markVisible()),s}catch(a){return console.error(a),!1}});return function(n,r,o,s){return t.apply(this,arguments)}}(),K=function(){var t=(0,f.Z)(function*(e){const n=[];let r,o=e;for(;r=N(o);){const s=yield r.getRouteId();if(!s)break;o=s.element,s.element=void 0,n.push(s)}return{ids:n,outlet:r}});return function(n){return t.apply(this,arguments)}}(),U=":not([no-router]) ion-nav, :not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet",N=t=>{if(!t)return;if(t.matches(U))return t;const e=t.querySelector(U);return null!=e?e:void 0},j=(t,e)=>e.find(n=>((t,e)=>{const{from:n,to:r}=e;if(void 0===r||n.length>t.length)return!1;for(let o=0;o<n.length;o++){const s=n[o];if("*"===s)return!0;if(s!==t[o])return!1}return n.length===t.length})(t,n)),q=(t,e)=>{const n=Math.min(t.length,e.length);let r=0;for(let o=0;o<n;o++){const s=t[o],i=e[o];if(s.id.toLowerCase()!==i.id)break;if(s.params){const a=Object.keys(s.params);if(a.length===i.segments.length){const u=a.map(c=>`:${c}`);for(let c=0;c<u.length&&u[c].toLowerCase()===i.segments[c];c++)r++}}r++}return r},J=(t,e)=>{const n=new Y(t);let o,r=!1;for(let i=0;i<e.length;i++){const a=e[i].segments;if(""===a[0])r=!0;else{for(const u of a){const c=n.next();if(":"===u[0]){if(""===c)return null;o=o||[],(o[i]||(o[i]={}))[u.slice(1)]=c}else if(c!==u)return null}r=!1}}return r&&r!==(""===n.next())?null:o?e.map((i,a)=>({id:i.id,segments:i.segments,params:I(i.params,o[a]),beforeEnter:i.beforeEnter,beforeLeave:i.beforeLeave})):e},I=(t,e)=>t||e?Object.assign(Object.assign({},t),e):void 0,O=(t,e)=>{let n=null,r=0;for(const o of e){const s=J(t,o);if(null!==s){const i=X(s);i>r&&(r=i,n=s)}}return n},X=t=>{let e=1,n=1;for(const r of t)for(const o of r.segments)":"===o[0]?e+=Math.pow(1,n):""!==o&&(e+=Math.pow(2,n)),n++;return e};class Y{constructor(e){this.segments=e.slice()}next(){return this.segments.length>0?this.segments.shift():""}}const w=(t,e)=>e in t?t[e]:t.hasAttribute(e)?t.getAttribute(e):null,k=t=>Array.from(t.children).filter(e=>"ION-ROUTE-REDIRECT"===e.tagName).map(e=>{const n=w(e,"to");return{from:m(w(e,"from")).segments,to:null==n?void 0:m(n)}}),S=t=>V(M(t)),M=t=>Array.from(t.children).filter(e=>"ION-ROUTE"===e.tagName&&e.component).map(e=>{const n=w(e,"component");return{segments:m(w(e,"url")).segments,id:n.toLowerCase(),params:e.componentProps,beforeLeave:e.beforeLeave,beforeEnter:e.beforeEnter,children:M(e)}}),V=t=>{const e=[];for(const n of t)W([],e,n);return e},W=(t,e,n)=>{if(t=[...t,{id:n.id,segments:n.segments,params:n.params,beforeLeave:n.beforeLeave,beforeEnter:n.beforeEnter}],0!==n.children.length)for(const r of n.children)W(t,e,r);else e.push(t)},tt=class{constructor(t){(0,d.r)(this,t),this.ionRouteWillChange=(0,d.d)(this,"ionRouteWillChange",7),this.ionRouteDidChange=(0,d.d)(this,"ionRouteDidChange",7),this.previousPath=null,this.busy=!1,this.state=0,this.lastState=0,this.root="/",this.useHash=!0}componentWillLoad(){var t=this;return(0,f.Z)(function*(){yield N(document.body)?Promise.resolve():new Promise(t=>{window.addEventListener("ionNavWillLoad",()=>t(),{once:!0})});const e=yield t.runGuards(t.getSegments());if(!0!==e){if("object"==typeof e){const{redirect:n}=e,r=m(n);t.setSegments(r.segments,l,r.queryString),yield t.writeNavStateRoot(r.segments,l)}}else yield t.onRoutesChanged()})()}componentDidLoad(){window.addEventListener("ionRouteRedirectChanged",(0,b.q)(this.onRedirectChanged.bind(this),10)),window.addEventListener("ionRouteDataChanged",(0,b.q)(this.onRoutesChanged.bind(this),100))}onPopState(){var t=this;return(0,f.Z)(function*(){const e=t.historyDirection();let n=t.getSegments();const r=yield t.runGuards(n);if(!0!==r){if("object"!=typeof r)return!1;n=m(r.redirect).segments}return t.writeNavStateRoot(n,e)})()}onBackButton(t){t.detail.register(0,e=>{this.back(),e()})}canTransition(){var t=this;return(0,f.Z)(function*(){const e=yield t.runGuards();return!0===e||"object"==typeof e&&e.redirect})()}push(t,e="forward",n){var r=this;return(0,f.Z)(function*(){var o;if(t.startsWith(".")){const a=null!==(o=r.previousPath)&&void 0!==o?o:"/",u=new URL(t,`https://host/${a}`);t=u.pathname+u.search}let s=m(t);const i=yield r.runGuards(s.segments);if(!0!==i){if("object"!=typeof i)return!1;s=m(i.redirect)}return r.setSegments(s.segments,e,s.queryString),r.writeNavStateRoot(s.segments,e,n)})()}back(){return window.history.back(),Promise.resolve(this.waitPromise)}printDebug(){var t=this;return(0,f.Z)(function*(){(t=>{console.group(`[ion-core] ROUTES[${t.length}]`);for(const e of t){const n=[];e.forEach(o=>n.push(...o.segments));const r=e.map(o=>o.id);console.debug(`%c ${_(n)}`,"font-weight: bold; padding-left: 20px","=>\t",`(${r.join(", ")})`)}console.groupEnd()})(S(t.el)),(t=>{console.group(`[ion-core] REDIRECTS[${t.length}]`);for(const e of t)e.to&&console.debug("FROM: ",`$c ${_(e.from)}`,"font-weight: bold"," TO: ",`$c ${_(e.to.segments)}`,"font-weight: bold");console.groupEnd()})(k(t.el))})()}navChanged(t){var e=this;return(0,f.Z)(function*(){if(e.busy)return console.warn("[ion-router] router is busy, navChanged was cancelled"),!1;const{ids:n,outlet:r}=yield K(window.document.body),s=((t,e)=>{let n=null,r=0;for(const o of e){const s=q(t,o);s>r&&(n=o,r=s)}return n?n.map((o,s)=>{var i;return{id:o.id,segments:o.segments,params:I(o.params,null===(i=t[s])||void 0===i?void 0:i.params)}}):null})(n,S(e.el));if(!s)return console.warn("[ion-router] no matching URL for ",n.map(a=>a.id)),!1;const i=(t=>{const e=[];for(const n of t)for(const r of n.segments)if(":"===r[0]){const o=n.params&&n.params[r.slice(1)];if(!o)return null;e.push(o)}else""!==r&&e.push(r);return e})(s);return i?(e.setSegments(i,t),yield e.safeWriteNavState(r,s,l,i,null,n.length),!0):(console.warn("[ion-router] router could not match path because some required param is missing"),!1)})()}onRedirectChanged(){const t=this.getSegments();t&&j(t,k(this.el))&&this.writeNavStateRoot(t,l)}onRoutesChanged(){return this.writeNavStateRoot(this.getSegments(),l)}historyDirection(){var t;const e=window;null===e.history.state&&(this.state++,e.history.replaceState(this.state,e.document.title,null===(t=e.document.location)||void 0===t?void 0:t.href));const n=e.history.state,r=this.lastState;return this.lastState=n,n>r||n>=r&&r>0?h:n<r?"back":l}writeNavStateRoot(t,e,n){var r=this;return(0,f.Z)(function*(){if(!t)return console.error("[ion-router] URL is not part of the routing set"),!1;const o=k(r.el),s=j(t,o);let i=null;if(s){const{segments:c,queryString:v}=s.to;r.setSegments(c,e,v),i=s.from,t=c}const a=S(r.el),u=O(t,a);return u?r.safeWriteNavState(document.body,u,e,t,i,0,n):(console.error("[ion-router] the path does not match any route"),!1)})()}safeWriteNavState(t,e,n,r,o,s=0,i){var a=this;return(0,f.Z)(function*(){const u=yield a.lock();let c=!1;try{c=yield a.writeNavState(t,e,n,r,o,s,i)}catch(v){console.error(v)}return u(),c})()}lock(){var t=this;return(0,f.Z)(function*(){const e=t.waitPromise;let n;return t.waitPromise=new Promise(r=>n=r),void 0!==e&&(yield e),n})()}runGuards(t=this.getSegments(),e){var n=this;return(0,f.Z)(function*(){if(void 0===e&&(e=m(n.previousPath).segments),!t||!e)return!0;const r=S(n.el),o=O(e,r),s=o&&o[o.length-1].beforeLeave,i=!s||(yield s());if(!1===i||"object"==typeof i)return i;const a=O(t,r),u=a&&a[a.length-1].beforeEnter;return!u||u()})()}writeNavState(t,e,n,r,o,s=0,i){var a=this;return(0,f.Z)(function*(){if(a.busy)return console.warn("[ion-router] router is busy, transition was cancelled"),!1;a.busy=!0;const u=a.routeChangeEvent(r,o);u&&a.ionRouteWillChange.emit(u);const c=yield T(t,e,n,s,!1,i);return a.busy=!1,u&&a.ionRouteDidChange.emit(u),c})()}setSegments(t,e,n){this.state++,((t,e,n,r,o,s,i)=>{const a=((t,e,n)=>{let r=_(t);return e&&(r="#"+r),void 0!==n&&(r+="?"+n),r})([...m(e).segments,...r],n,i);o===h?t.pushState(s,"",a):t.replaceState(s,"",a)})(window.history,this.root,this.useHash,t,e,this.state,n)}getSegments(){return((t,e,n)=>{const r=m(this.root).segments,o=n?t.hash.slice(1):t.pathname;return((t,e)=>{if(t.length>e.length)return null;if(t.length<=1&&""===t[0])return e;for(let n=0;n<t.length;n++)if(t[n]!==e[n])return null;return e.length===t.length?[""]:e.slice(t.length)})(r,m(o).segments)})(window.location,0,this.useHash)}routeChangeEvent(t,e){const n=this.previousPath,r=_(t);return this.previousPath=r,r===n?null:{from:n,redirectedFrom:e?_(e):null,to:r}}get el(){return(0,d.f)(this)}},x=class{constructor(t){(0,d.r)(this,t),this.onClick=e=>{(0,C.o)(this.href,e,this.routerDirection,this.routerAnimation)},this.color=void 0,this.href=void 0,this.rel=void 0,this.routerDirection="forward",this.routerAnimation=void 0,this.target=void 0}render(){const t=(0,P.b)(this),e={href:this.href,rel:this.rel,target:this.target};return(0,d.h)(d.H,{onClick:this.onClick,class:(0,C.c)(this.color,{[t]:!0,"ion-activatable":!0})},(0,d.h)("a",Object.assign({},e),(0,d.h)("slot",null)))}};x.style=":host{--background:transparent;--color:var(--ion-color-primary, #3880ff);background:var(--background);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}a{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}"},3567:(A,y,p)=>{p.d(y,{c:()=>b,g:()=>P,h:()=>d,o:()=>L});var f=p(5861);const d=(l,h)=>null!==h.closest(l),b=(l,h)=>"string"==typeof l&&l.length>0?Object.assign({"ion-color":!0,[`ion-color-${l}`]:!0},h):h,P=l=>{const h={};return(l=>void 0!==l?(Array.isArray(l)?l:l.split(" ")).filter(g=>null!=g).map(g=>g.trim()).filter(g=>""!==g):[])(l).forEach(g=>h[g]=!0),h},D=/^[a-z][a-z0-9+\-.]*:/,L=function(){var l=(0,f.Z)(function*(h,g,_,E){if(null!=h&&"#"!==h[0]&&!D.test(h)){const R=document.querySelector("ion-router");if(R)return null!=g&&g.preventDefault(),R.push(h,_,E)}return!1});return function(g,_,E,R){return l.apply(this,arguments)}}()}}]);