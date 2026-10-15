function kr(d,i){for(var E=0;E<i.length;E++){const k=i[E];if(typeof k!="string"&&!Array.isArray(k)){for(const j in k)if(j!=="default"&&!(j in d)){const V=Object.getOwnPropertyDescriptor(k,j);V&&Object.defineProperty(d,j,V.get?V:{enumerable:!0,get:()=>k[j]})}}}return Object.freeze(Object.defineProperty(d,Symbol.toStringTag,{value:"Module"}))}function gr(d){return d&&d.__esModule&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d}var it={exports:{}},Ce={exports:{}};Ce.exports;var Vt;function br(){return Vt||(Vt=1,(function(d,i){/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var E="18.3.1",k=Symbol.for("react.element"),j=Symbol.for("react.portal"),V=Symbol.for("react.fragment"),Q=Symbol.for("react.strict_mode"),J=Symbol.for("react.profiler"),U=Symbol.for("react.provider"),K=Symbol.for("react.context"),G=Symbol.for("react.forward_ref"),X=Symbol.for("react.suspense"),te=Symbol.for("react.suspense_list"),H=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),ae=Symbol.for("react.offscreen"),C=Symbol.iterator,ue="@@iterator";function ie(e){if(e===null||typeof e!="object")return null;var t=C&&e[C]||e[ue];return typeof t=="function"?t:null}var de={current:null},ne={transition:null},I={current:null,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1},Z={current:null},se={},he=null;function xe(e){he=e}se.setExtraStackFrame=function(e){he=e},se.getCurrentStack=null,se.getStackAddendum=function(){var e="";he&&(e+=he);var t=se.getCurrentStack;return t&&(e+=t()||""),e};var We=!1,Be=!1,Ue=!1,He=!1,Ee=!1,re={ReactCurrentDispatcher:de,ReactCurrentBatchConfig:ne,ReactCurrentOwner:Z};re.ReactDebugCurrentFrame=se,re.ReactCurrentActQueue=I;function ce(e){{for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];ze("warn",e,n)}}function M(e){{for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];ze("error",e,n)}}function ze(e,t,n){{var o=re.ReactDebugCurrentFrame,c=o.getStackAddendum();c!==""&&(t+="%s",n=n.concat([c]));var y=n.map(function(u){return String(u)});y.unshift("Warning: "+t),Function.prototype.apply.call(console[e],console,y)}}var Re={};function r(e,t){{var n=e.constructor,o=n&&(n.displayName||n.name)||"ReactClass",c=o+"."+t;if(Re[c])return;M("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",t,o),Re[c]=!0}}var a={isMounted:function(e){return!1},enqueueForceUpdate:function(e,t,n){r(e,"forceUpdate")},enqueueReplaceState:function(e,t,n,o){r(e,"replaceState")},enqueueSetState:function(e,t,n,o){r(e,"setState")}},l=Object.assign,f={};Object.freeze(f);function p(e,t,n){this.props=e,this.context=t,this.refs=f,this.updater=n||a}p.prototype.isReactComponent={},p.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},p.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};{var m={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},b=function(e,t){Object.defineProperty(p.prototype,e,{get:function(){ce("%s(...) is deprecated in plain JavaScript React classes. %s",t[0],t[1])}})};for(var h in m)m.hasOwnProperty(h)&&b(h,m[h])}function g(){}g.prototype=p.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=f,this.updater=n||a}var D=x.prototype=new g;D.constructor=x,l(D,p.prototype),D.isPureReactComponent=!0;function z(){var e={current:null};return Object.seal(e),e}var S=Array.isArray;function $(e){return S(e)}function _(e){{var t=typeof Symbol=="function"&&Symbol.toStringTag,n=t&&e[Symbol.toStringTag]||e.constructor.name||"Object";return n}}function q(e){try{return Y(e),!1}catch{return!0}}function Y(e){return""+e}function W(e){if(q(e))return M("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",_(e)),Y(e)}function ee(e,t,n){var o=e.displayName;if(o)return o;var c=t.displayName||t.name||"";return c!==""?n+"("+c+")":n}function oe(e){return e.displayName||"Context"}function F(e){if(e==null)return null;if(typeof e.tag=="number"&&M("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case V:return"Fragment";case j:return"Portal";case J:return"Profiler";case Q:return"StrictMode";case X:return"Suspense";case te:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case K:var t=e;return oe(t)+".Consumer";case U:var n=e;return oe(n._context)+".Provider";case G:return ee(e,e.render,"ForwardRef");case H:var o=e.displayName||null;return o!==null?o:F(e.type)||"Memo";case A:{var c=e,y=c._payload,u=c._init;try{return F(u(y))}catch{return null}}}return null}var fe=Object.prototype.hasOwnProperty,De={key:!0,ref:!0,__self:!0,__source:!0},Se,ge,be;be={};function _e(e){if(fe.call(e,"ref")){var t=Object.getOwnPropertyDescriptor(e,"ref").get;if(t&&t.isReactWarning)return!1}return e.ref!==void 0}function Te(e){if(fe.call(e,"key")){var t=Object.getOwnPropertyDescriptor(e,"key").get;if(t&&t.isReactWarning)return!1}return e.key!==void 0}function Ye(e,t){var n=function(){Se||(Se=!0,M("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",t))};n.isReactWarning=!0,Object.defineProperty(e,"key",{get:n,configurable:!0})}function Pe(e,t){var n=function(){ge||(ge=!0,M("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",t))};n.isReactWarning=!0,Object.defineProperty(e,"ref",{get:n,configurable:!0})}function Oe(e){if(typeof e.ref=="string"&&Z.current&&e.__self&&Z.current.stateNode!==e.__self){var t=F(Z.current.type);be[t]||(M('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',t,e.ref),be[t]=!0)}}var ye=function(e,t,n,o,c,y,u){var v={$$typeof:k,type:e,key:t,ref:n,props:u,_owner:y};return v._store={},Object.defineProperty(v._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(v,"_self",{configurable:!1,enumerable:!1,writable:!1,value:o}),Object.defineProperty(v,"_source",{configurable:!1,enumerable:!1,writable:!1,value:c}),Object.freeze&&(Object.freeze(v.props),Object.freeze(v)),v};function Ke(e,t,n){var o,c={},y=null,u=null,v=null,w=null;if(t!=null){_e(t)&&(u=t.ref,Oe(t)),Te(t)&&(W(t.key),y=""+t.key),v=t.__self===void 0?null:t.__self,w=t.__source===void 0?null:t.__source;for(o in t)fe.call(t,o)&&!De.hasOwnProperty(o)&&(c[o]=t[o])}var R=arguments.length-2;if(R===1)c.children=n;else if(R>1){for(var T=Array(R),P=0;P<R;P++)T[P]=arguments[P+2];Object.freeze&&Object.freeze(T),c.children=T}if(e&&e.defaultProps){var O=e.defaultProps;for(o in O)c[o]===void 0&&(c[o]=O[o])}if(y||u){var L=typeof e=="function"?e.displayName||e.name||"Unknown":e;y&&Ye(c,L),u&&Pe(c,L)}return ye(e,y,u,v,w,Z.current,c)}function Ge(e,t){var n=ye(e.type,t,e.ref,e._self,e._source,e._owner,e.props);return n}function Mn(e,t,n){if(e==null)throw new Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o,c=l({},e.props),y=e.key,u=e.ref,v=e._self,w=e._source,R=e._owner;if(t!=null){_e(t)&&(u=t.ref,R=Z.current),Te(t)&&(W(t.key),y=""+t.key);var T;e.type&&e.type.defaultProps&&(T=e.type.defaultProps);for(o in t)fe.call(t,o)&&!De.hasOwnProperty(o)&&(t[o]===void 0&&T!==void 0?c[o]=T[o]:c[o]=t[o])}var P=arguments.length-2;if(P===1)c.children=n;else if(P>1){for(var O=Array(P),L=0;L<P;L++)O[L]=arguments[L+2];c.children=O}return ye(e.type,y,u,v,w,R,c)}function ve(e){return typeof e=="object"&&e!==null&&e.$$typeof===k}var ut=".",wn=":";function Cn(e){var t=/[=:]/g,n={"=":"=0",":":"=2"},o=e.replace(t,function(c){return n[c]});return"$"+o}var dt=!1,xn=/\/+/g;function ht(e){return e.replace(xn,"$&/")}function Ze(e,t){return typeof e=="object"&&e!==null&&e.key!=null?(W(e.key),Cn(""+e.key)):t.toString(36)}function $e(e,t,n,o,c){var y=typeof e;(y==="undefined"||y==="boolean")&&(e=null);var u=!1;if(e===null)u=!0;else switch(y){case"string":case"number":u=!0;break;case"object":switch(e.$$typeof){case k:case j:u=!0}}if(u){var v=e,w=c(v),R=o===""?ut+Ze(v,0):o;if($(w)){var T="";R!=null&&(T=ht(R)+"/"),$e(w,t,T,"",function(mr){return mr})}else w!=null&&(ve(w)&&(w.key&&(!v||v.key!==w.key)&&W(w.key),w=Ge(w,n+(w.key&&(!v||v.key!==w.key)?ht(""+w.key)+"/":"")+R)),t.push(w));return 1}var P,O,L=0,N=o===""?ut:o+wn;if($(e))for(var qe=0;qe<e.length;qe++)P=e[qe],O=N+Ze(P,qe),L+=$e(P,t,n,O,c);else{var ot=ie(e);if(typeof ot=="function"){var Lt=e;ot===Lt.entries&&(dt||ce("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),dt=!0);for(var pr=ot.call(Lt),It,vr=0;!(It=pr.next()).done;)P=It.value,O=N+Ze(P,vr++),L+=$e(P,t,n,O,c)}else if(y==="object"){var Ft=String(e);throw new Error("Objects are not valid as a React child (found: "+(Ft==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":Ft)+"). If you meant to render a collection of children, use an array instead.")}}return L}function Ae(e,t,n){if(e==null)return e;var o=[],c=0;return $e(e,o,"","",function(y){return t.call(n,y,c++)}),o}function En(e){var t=0;return Ae(e,function(){t++}),t}function zn(e,t,n){Ae(e,function(){t.apply(this,arguments)},n)}function Rn(e){return Ae(e,function(t){return t})||[]}function Dn(e){if(!ve(e))throw new Error("React.Children.only expected to receive a single React element child.");return e}function Sn(e){var t={$$typeof:K,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};t.Provider={$$typeof:U,_context:t};var n=!1,o=!1,c=!1;{var y={$$typeof:K,_context:t};Object.defineProperties(y,{Provider:{get:function(){return o||(o=!0,M("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")),t.Provider},set:function(u){t.Provider=u}},_currentValue:{get:function(){return t._currentValue},set:function(u){t._currentValue=u}},_currentValue2:{get:function(){return t._currentValue2},set:function(u){t._currentValue2=u}},_threadCount:{get:function(){return t._threadCount},set:function(u){t._threadCount=u}},Consumer:{get:function(){return n||(n=!0,M("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")),t.Consumer}},displayName:{get:function(){return t.displayName},set:function(u){c||(ce("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.",u),c=!0)}}}),t.Consumer=y}return t._currentRenderer=null,t._currentRenderer2=null,t}var Me=-1,Qe=0,ft=1,Tn=2;function Pn(e){if(e._status===Me){var t=e._result,n=t();if(n.then(function(y){if(e._status===Qe||e._status===Me){var u=e;u._status=ft,u._result=y}},function(y){if(e._status===Qe||e._status===Me){var u=e;u._status=Tn,u._result=y}}),e._status===Me){var o=e;o._status=Qe,o._result=n}}if(e._status===ft){var c=e._result;return c===void 0&&M(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,c),"default"in c||M(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,c),c.default}else throw e._result}function On(e){var t={_status:Me,_result:e},n={$$typeof:A,_payload:t,_init:Pn};{var o,c;Object.defineProperties(n,{defaultProps:{configurable:!0,get:function(){return o},set:function(y){M("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),o=y,Object.defineProperty(n,"defaultProps",{enumerable:!0})}},propTypes:{configurable:!0,get:function(){return c},set:function(y){M("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),c=y,Object.defineProperty(n,"propTypes",{enumerable:!0})}}})}return n}function $n(e){e!=null&&e.$$typeof===H?M("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof e!="function"?M("forwardRef requires a render function but was given %s.",e===null?"null":typeof e):e.length!==0&&e.length!==2&&M("forwardRef render functions accept exactly two parameters: props and ref. %s",e.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),e!=null&&(e.defaultProps!=null||e.propTypes!=null)&&M("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");var t={$$typeof:G,render:e};{var n;Object.defineProperty(t,"displayName",{enumerable:!1,configurable:!0,get:function(){return n},set:function(o){n=o,!e.name&&!e.displayName&&(e.displayName=o)}})}return t}var yt;yt=Symbol.for("react.module.reference");function pt(e){return!!(typeof e=="string"||typeof e=="function"||e===V||e===J||Ee||e===Q||e===X||e===te||He||e===ae||We||Be||Ue||typeof e=="object"&&e!==null&&(e.$$typeof===A||e.$$typeof===H||e.$$typeof===U||e.$$typeof===K||e.$$typeof===G||e.$$typeof===yt||e.getModuleId!==void 0))}function An(e,t){pt(e)||M("memo: The first argument must be a component. Instead received: %s",e===null?"null":typeof e);var n={$$typeof:H,type:e,compare:t===void 0?null:t};{var o;Object.defineProperty(n,"displayName",{enumerable:!1,configurable:!0,get:function(){return o},set:function(c){o=c,!e.name&&!e.displayName&&(e.displayName=c)}})}return n}function B(){var e=de.current;return e===null&&M(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`),e}function jn(e){var t=B();if(e._context!==void 0){var n=e._context;n.Consumer===e?M("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?"):n.Provider===e&&M("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?")}return t.useContext(e)}function Ln(e){var t=B();return t.useState(e)}function In(e,t,n){var o=B();return o.useReducer(e,t,n)}function Fn(e){var t=B();return t.useRef(e)}function Vn(e,t){var n=B();return n.useEffect(e,t)}function Nn(e,t){var n=B();return n.useInsertionEffect(e,t)}function qn(e,t){var n=B();return n.useLayoutEffect(e,t)}function Wn(e,t){var n=B();return n.useCallback(e,t)}function Bn(e,t){var n=B();return n.useMemo(e,t)}function Un(e,t,n){var o=B();return o.useImperativeHandle(e,t,n)}function Hn(e,t){{var n=B();return n.useDebugValue(e,t)}}function Yn(){var e=B();return e.useTransition()}function Kn(e){var t=B();return t.useDeferredValue(e)}function Gn(){var e=B();return e.useId()}function Zn(e,t,n){var o=B();return o.useSyncExternalStore(e,t,n)}var we=0,vt,mt,kt,gt,bt,_t,Mt;function wt(){}wt.__reactDisabledLog=!0;function Qn(){{if(we===0){vt=console.log,mt=console.info,kt=console.warn,gt=console.error,bt=console.group,_t=console.groupCollapsed,Mt=console.groupEnd;var e={configurable:!0,enumerable:!0,value:wt,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}we++}}function Xn(){{if(we--,we===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:l({},e,{value:vt}),info:l({},e,{value:mt}),warn:l({},e,{value:kt}),error:l({},e,{value:gt}),group:l({},e,{value:bt}),groupCollapsed:l({},e,{value:_t}),groupEnd:l({},e,{value:Mt})})}we<0&&M("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var Xe=re.ReactCurrentDispatcher,Je;function je(e,t,n){{if(Je===void 0)try{throw Error()}catch(c){var o=c.stack.trim().match(/\n( *(at )?)/);Je=o&&o[1]||""}return`
`+Je+e}}var et=!1,Le;{var Jn=typeof WeakMap=="function"?WeakMap:Map;Le=new Jn}function Ct(e,t){if(!e||et)return"";{var n=Le.get(e);if(n!==void 0)return n}var o;et=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var y;y=Xe.current,Xe.current=null,Qn();try{if(t){var u=function(){throw Error()};if(Object.defineProperty(u.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(u,[])}catch(N){o=N}Reflect.construct(e,[],u)}else{try{u.call()}catch(N){o=N}e.call(u.prototype)}}else{try{throw Error()}catch(N){o=N}e()}}catch(N){if(N&&o&&typeof N.stack=="string"){for(var v=N.stack.split(`
`),w=o.stack.split(`
`),R=v.length-1,T=w.length-1;R>=1&&T>=0&&v[R]!==w[T];)T--;for(;R>=1&&T>=0;R--,T--)if(v[R]!==w[T]){if(R!==1||T!==1)do if(R--,T--,T<0||v[R]!==w[T]){var P=`
`+v[R].replace(" at new "," at ");return e.displayName&&P.includes("<anonymous>")&&(P=P.replace("<anonymous>",e.displayName)),typeof e=="function"&&Le.set(e,P),P}while(R>=1&&T>=0);break}}}finally{et=!1,Xe.current=y,Xn(),Error.prepareStackTrace=c}var O=e?e.displayName||e.name:"",L=O?je(O):"";return typeof e=="function"&&Le.set(e,L),L}function er(e,t,n){return Ct(e,!1)}function tr(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function Ie(e,t,n){if(e==null)return"";if(typeof e=="function")return Ct(e,tr(e));if(typeof e=="string")return je(e);switch(e){case X:return je("Suspense");case te:return je("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case G:return er(e.render);case H:return Ie(e.type,t,n);case A:{var o=e,c=o._payload,y=o._init;try{return Ie(y(c),t,n)}catch{}}}return""}var xt={},Et=re.ReactDebugCurrentFrame;function Fe(e){if(e){var t=e._owner,n=Ie(e.type,e._source,t?t.type:null);Et.setExtraStackFrame(n)}else Et.setExtraStackFrame(null)}function ar(e,t,n,o,c){{var y=Function.call.bind(fe);for(var u in e)if(y(e,u)){var v=void 0;try{if(typeof e[u]!="function"){var w=Error((o||"React class")+": "+n+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw w.name="Invariant Violation",w}v=e[u](t,u,o,n,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(R){v=R}v&&!(v instanceof Error)&&(Fe(c),M("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",o||"React class",n,u,typeof v),Fe(null)),v instanceof Error&&!(v.message in xt)&&(xt[v.message]=!0,Fe(c),M("Failed %s type: %s",n,v.message),Fe(null))}}}function me(e){if(e){var t=e._owner,n=Ie(e.type,e._source,t?t.type:null);xe(n)}else xe(null)}var tt;tt=!1;function zt(){if(Z.current){var e=F(Z.current.type);if(e)return`

Check the render method of \``+e+"`."}return""}function nr(e){if(e!==void 0){var t=e.fileName.replace(/^.*[\\\/]/,""),n=e.lineNumber;return`

Check your code at `+t+":"+n+"."}return""}function rr(e){return e!=null?nr(e.__source):""}var Rt={};function or(e){var t=zt();if(!t){var n=typeof e=="string"?e:e.displayName||e.name;n&&(t=`

Check the top-level render call using <`+n+">.")}return t}function Dt(e,t){if(!(!e._store||e._store.validated||e.key!=null)){e._store.validated=!0;var n=or(t);if(!Rt[n]){Rt[n]=!0;var o="";e&&e._owner&&e._owner!==Z.current&&(o=" It was passed a child from "+F(e._owner.type)+"."),me(e),M('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',n,o),me(null)}}}function St(e,t){if(typeof e=="object"){if($(e))for(var n=0;n<e.length;n++){var o=e[n];ve(o)&&Dt(o,t)}else if(ve(e))e._store&&(e._store.validated=!0);else if(e){var c=ie(e);if(typeof c=="function"&&c!==e.entries)for(var y=c.call(e),u;!(u=y.next()).done;)ve(u.value)&&Dt(u.value,t)}}}function Tt(e){{var t=e.type;if(t==null||typeof t=="string")return;var n;if(typeof t=="function")n=t.propTypes;else if(typeof t=="object"&&(t.$$typeof===G||t.$$typeof===H))n=t.propTypes;else return;if(n){var o=F(t);ar(n,e.props,"prop",o,e)}else if(t.PropTypes!==void 0&&!tt){tt=!0;var c=F(t);M("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",c||"Unknown")}typeof t.getDefaultProps=="function"&&!t.getDefaultProps.isReactClassApproved&&M("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function ir(e){{for(var t=Object.keys(e.props),n=0;n<t.length;n++){var o=t[n];if(o!=="children"&&o!=="key"){me(e),M("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",o),me(null);break}}e.ref!==null&&(me(e),M("Invalid attribute `ref` supplied to `React.Fragment`."),me(null))}}function Pt(e,t,n){var o=pt(e);if(!o){var c="";(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(c+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var y=rr(t);y?c+=y:c+=zt();var u;e===null?u="null":$(e)?u="array":e!==void 0&&e.$$typeof===k?(u="<"+(F(e.type)||"Unknown")+" />",c=" Did you accidentally export a JSX literal instead of a component?"):u=typeof e,M("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",u,c)}var v=Ke.apply(this,arguments);if(v==null)return v;if(o)for(var w=2;w<arguments.length;w++)St(arguments[w],e);return e===V?ir(v):Tt(v),v}var Ot=!1;function sr(e){var t=Pt.bind(null,e);return t.type=e,Ot||(Ot=!0,ce("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")),Object.defineProperty(t,"type",{enumerable:!1,get:function(){return ce("Factory.type is deprecated. Access the class directly before passing it to createFactory."),Object.defineProperty(this,"type",{value:e}),e}}),t}function cr(e,t,n){for(var o=Mn.apply(this,arguments),c=2;c<arguments.length;c++)St(arguments[c],o.type);return Tt(o),o}function lr(e,t){var n=ne.transition;ne.transition={};var o=ne.transition;ne.transition._updatedFibers=new Set;try{e()}finally{if(ne.transition=n,n===null&&o._updatedFibers){var c=o._updatedFibers.size;c>10&&ce("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),o._updatedFibers.clear()}}}var $t=!1,Ve=null;function ur(e){if(Ve===null)try{var t=("require"+Math.random()).slice(0,7),n=d&&d[t];Ve=n.call(d,"timers").setImmediate}catch{Ve=function(c){$t===!1&&($t=!0,typeof MessageChannel>"u"&&M("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var y=new MessageChannel;y.port1.onmessage=c,y.port2.postMessage(void 0)}}return Ve(e)}var ke=0,At=!1;function jt(e){{var t=ke;ke++,I.current===null&&(I.current=[]);var n=I.isBatchingLegacy,o;try{if(I.isBatchingLegacy=!0,o=e(),!n&&I.didScheduleLegacyUpdate){var c=I.current;c!==null&&(I.didScheduleLegacyUpdate=!1,rt(c))}}catch(O){throw Ne(t),O}finally{I.isBatchingLegacy=n}if(o!==null&&typeof o=="object"&&typeof o.then=="function"){var y=o,u=!1,v={then:function(O,L){u=!0,y.then(function(N){Ne(t),ke===0?at(N,O,L):O(N)},function(N){Ne(t),L(N)})}};return!At&&typeof Promise<"u"&&Promise.resolve().then(function(){}).then(function(){u||(At=!0,M("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),v}else{var w=o;if(Ne(t),ke===0){var R=I.current;R!==null&&(rt(R),I.current=null);var T={then:function(O,L){I.current===null?(I.current=[],at(w,O,L)):O(w)}};return T}else{var P={then:function(O,L){O(w)}};return P}}}}function Ne(e){e!==ke-1&&M("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),ke=e}function at(e,t,n){{var o=I.current;if(o!==null)try{rt(o),ur(function(){o.length===0?(I.current=null,t(e)):at(e,t,n)})}catch(c){n(c)}else t(e)}}var nt=!1;function rt(e){if(!nt){nt=!0;var t=0;try{for(;t<e.length;t++){var n=e[t];do n=n(!0);while(n!==null)}e.length=0}catch(o){throw e=e.slice(t+1),o}finally{nt=!1}}}var dr=Pt,hr=cr,fr=sr,yr={map:Ae,forEach:zn,count:En,toArray:Rn,only:Dn};i.Children=yr,i.Component=p,i.Fragment=V,i.Profiler=J,i.PureComponent=x,i.StrictMode=Q,i.Suspense=X,i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=re,i.act=jt,i.cloneElement=hr,i.createContext=Sn,i.createElement=dr,i.createFactory=fr,i.createRef=z,i.forwardRef=$n,i.isValidElement=ve,i.lazy=On,i.memo=An,i.startTransition=lr,i.unstable_act=jt,i.useCallback=Wn,i.useContext=jn,i.useDebugValue=Hn,i.useDeferredValue=Kn,i.useEffect=Vn,i.useId=Gn,i.useImperativeHandle=Un,i.useInsertionEffect=Nn,i.useLayoutEffect=qn,i.useMemo=Bn,i.useReducer=In,i.useRef=Fn,i.useState=Ln,i.useSyncExternalStore=Zn,i.useTransition=Yn,i.version=E,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})()})(Ce,Ce.exports)),Ce.exports}var Nt;function _r(){return Nt||(Nt=1,it.exports=br()),it.exports}var le=_r();const Mr=gr(le),Or=kr({__proto__:null,default:Mr},[le]);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wr=d=>d==null?void 0:d.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Cr(d,i,E=[]){if(i==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:wr(d),size:24,node:i,...E.length>0?{aliases:E}:{}}}/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xr=d=>{let i="",E=!1;for(const k of d){if(k==="-"||k==="_"||k<=" "){E=i.length>0;continue}i.length===0?i+=k.toLowerCase():i+=E?k.toUpperCase():k,E=!1}return i};/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Er=d=>{const i=xr(d);return i.charAt(0).toUpperCase()+i.slice(1)};/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=(...d)=>d.filter((i,E,k)=>!!i&&i.trim()!==""&&k.indexOf(i)===E).join(" ").trim();/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function st(d){return d!=null}function zr(d,i={}){var te,H;const E=i.attributeNames??{},k=A=>E[A]??A,j=d.size??d.width??pe.width,V=d.size??d.height??pe.height,Q=((te=d.aliases)==null?void 0:te.filter(A=>typeof A=="string"&&A.trim()!=="").map(A=>`lucide-${A}`))??[],J=[...d.name?[`lucide-${d.name}`]:[],...Q],U=((H=i.className)==null?void 0:H.split(" ").filter(Boolean))??[],K=i.includeDefaultClasses===!1?ct(...U):ct("lucide",...J,...U),G=i.absoluteStrokeWidth?Number(i.strokeWidth??pe["stroke-width"])*Number(d.size??d.width??pe.width)/Number(i.size??i.width??pe.width):i.strokeWidth??pe["stroke-width"];return["svg",{...Object.entries(pe).reduce((A,[ae,C])=>(A[k(ae)]=C,A),{}),..."color"in i&&i.color&&{[k("stroke")]:i.color},..."size"in i&&st(i.size)&&{[k("width")]:i.size,[k("height")]:i.size},..."width"in i&&st(i.width)&&{[k("width")]:i.width},..."height"in i&&st(i.height)&&{[k("height")]:i.height},[k("stroke-width")]:G,...K&&{[k("class")]:K},[k("viewBox")]:`0 0 ${j} ${V}`,...i.hasA11yProp===!1?{[k("aria-hidden")]:"true"}:{},..."attributes"in i&&i.attributes},d.node.map(A=>{const[ae,C,ue]=A,ie=i.nonScalingStroke?{[k("vector-effect")]:"non-scaling-stroke",...C}:C;return ue?[ae,ie,ue]:[ae,ie]})]}/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Rr(d,i={}){return zr(d,{...i,attributeNames:{...i.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dr=d=>{for(const i in d)if(i.startsWith("aria-")||i==="role"||i==="title")return!0;return!1},Sr=le.createContext({}),Tr=()=>le.useContext(Sr),Pr=le.forwardRef(({color:d,size:i,width:E,height:k,strokeWidth:j,absoluteStrokeWidth:V,nonScalingStroke:Q,className:J="",children:U,iconNode:K=[],icon:G={node:K,aliases:[],size:24},...X},te)=>{const{size:H=24,strokeWidth:A=2,absoluteStrokeWidth:ae=!1,nonScalingStroke:C=!1,color:ue="currentColor",className:ie=""}=Tr()??{},de=!!U||Dr(X),[ne,I,Z=[]]=Rr(G,{color:d??ue,width:E??i??H,height:k??i??H,strokeWidth:j??A,absoluteStrokeWidth:V??ae,nonScalingStroke:Q??C,className:ct(ie,J),hasA11yProp:de,attributes:X});return le.createElement(ne,{ref:te,...I},[...Z.map(([se,he])=>le.createElement(se,he)),...Array.isArray(U)?U:[U]])});/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function s(d,i=[],E=[]){const k=typeof d=="string"?Cr(d,i,E):d,j=le.forwardRef(({className:V,...Q},J)=>le.createElement(Pr,{ref:J,icon:k,className:V,...Q}));return k.name&&(j.displayName=Er(k.name)),j}/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt={name:"activity",size:24,node:[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]};qt.node;const $r=s(qt);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wt={name:"arrow-left",size:24,node:[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]};Wt.node;const Ar=s(Wt);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};Bt.node;const jr=s(Bt);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut={name:"arrow-up-down",size:24,node:[["path",{d:"m21 16-4 4-4-4",key:"f6ql7i"}],["path",{d:"M17 20V4",key:"1ejh1v"}],["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}]]};Ut.node;const Lr=s(Ut);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht={name:"award",size:24,node:[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]};Ht.node;const Ir=s(Ht);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt={name:"book-open",size:24,node:[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]]};Yt.node;const Fr=s(Yt);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt={name:"bot",size:24,node:[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]};Kt.node;const Vr=s(Kt);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt={name:"briefcase",size:24,node:[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]};Gt.node;const Nr=s(Gt);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt={name:"building-complex",size:24,node:[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]],aliases:["building-2"]};Zt.node;const qr=s(Zt);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qt={name:"building",size:24,node:[["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3",key:"cabbwy"}],["rect",{x:"4",y:"2",width:"16",height:"20",rx:"2",key:"1uxh74"}]]};Qt.node;const Wr=s(Qt);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xt={name:"calculator",size:24,node:[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]};Xt.node;const Br=s(Xt);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jt={name:"calendar",size:24,node:[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}]]};Jt.node;const Ur=s(Jt);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ea={name:"camera",size:24,node:[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]};ea.node;const Hr=s(ea);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ta={name:"chart-column",size:24,node:[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],aliases:["bar-chart-3"]};ta.node;const Yr=s(ta);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aa={name:"chart-pie",size:24,node:[["path",{d:"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",key:"pzmjnu"}],["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}]],aliases:["pie-chart"]};aa.node;const Kr=s(aa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const na={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};na.node;const Gr=s(na);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ra={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};ra.node;const Zr=s(ra);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oa={name:"chevron-left",size:24,node:[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]};oa.node;const Qr=s(oa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ia={name:"chevron-right",size:24,node:[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]};ia.node;const Xr=s(ia);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sa={name:"circle-alert",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],aliases:["alert-circle"]};sa.node;const Jr=s(sa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ca={name:"circle-check",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],aliases:["check-circle-2"]};ca.node;const eo=s(ca);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const la={name:"circle-question-mark",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["help-circle","circle-help"]};la.node;const to=s(la);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ua={name:"circle-x",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],aliases:["x-circle"]};ua.node;const ao=s(ua);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const da={name:"clock",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]]};da.node;const no=s(da);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ha={name:"cloud-upload",size:24,node:[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]],aliases:["upload-cloud"]};ha.node;const ro=s(ha);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fa={name:"cog",size:24,node:[["path",{d:"M11 10.27 7 3.34",key:"16pf9h"}],["path",{d:"m11 13.73-4 6.93",key:"794ttg"}],["path",{d:"M12 22v-2",key:"1osdcq"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M14 12h8",key:"4f43i9"}],["path",{d:"m17 20.66-1-1.73",key:"eq3orb"}],["path",{d:"m17 3.34-1 1.73",key:"2wel8s"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"m20.66 17-1.73-1",key:"sg0v6f"}],["path",{d:"m20.66 7-1.73 1",key:"1ow05n"}],["path",{d:"m3.34 17 1.73-1",key:"nuk764"}],["path",{d:"m3.34 7 1.73 1",key:"1ulond"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["circle",{cx:"12",cy:"12",r:"8",key:"46899m"}]]};fa.node;const oo=s(fa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ya={name:"copy",size:24,node:[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]};ya.node;const io=s(ya);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa={name:"cpu",size:24,node:[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]]};pa.node;const so=s(pa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const va={name:"credit-card",size:24,node:[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}],["path",{d:"M6 14h2",key:"mk7k0u"}]]};va.node;const co=s(va);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ma={name:"database",size:24,node:[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]};ma.node;const lo=s(ma);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ka={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};ka.node;const uo=s(ka);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ga={name:"external-link",size:24,node:[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]};ga.node;const ho=s(ga);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ba={name:"eye",size:24,node:[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]};ba.node;const fo=s(ba);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _a={name:"file-check-corner",size:24,node:[["path",{d:"M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6",key:"g5mvt7"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"m14 20 2 2 4-4",key:"15kota"}]],aliases:["file-check-2"]};_a.node;const yo=s(_a);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ma={name:"file-check",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"m9 15 2 2 4-4",key:"1grp1n"}]]};Ma.node;const po=s(Ma);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wa={name:"file-text",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]};wa.node;const vo=s(wa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ca={name:"globe",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]};Ca.node;const mo=s(Ca);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xa={name:"graduation-cap",size:24,node:[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]};xa.node;const ko=s(xa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ea={name:"house",size:24,node:[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],aliases:["home"]};Ea.node;const go=s(Ea);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const za={name:"info",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]};za.node;const bo=s(za);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ra={name:"key-round",size:24,node:[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]};Ra.node;const _o=s(Ra);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Da={name:"key",size:24,node:[["path",{d:"m2 21 9.6-9.6",key:"9l79m3"}],["path",{d:"m7.5 15.5 2.3 2.3a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0L4 19",key:"fw8biw"}],["circle",{cx:"15.5",cy:"7.5",r:"5.5",key:"4wxmhb"}]]};Da.node;const Mo=s(Da);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sa={name:"layers",size:24,node:[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],aliases:["layers-3"]};Sa.node;const wo=s(Sa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ta={name:"layout-dashboard",size:24,node:[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]};Ta.node;const Co=s(Ta);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pa={name:"layout-grid",size:24,node:[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]};Pa.node;const xo=s(Pa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oa={name:"lightbulb",size:24,node:[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]};Oa.node;const Eo=s(Oa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $a={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};$a.node;const zo=s($a);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Aa={name:"lock",size:24,node:[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]};Aa.node;const Ro=s(Aa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ja={name:"log-out",size:24,node:[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]};ja.node;const Do=s(ja);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const La={name:"mail",size:24,node:[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]};La.node;const So=s(La);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ia={name:"map-pin",size:24,node:[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]};Ia.node;const To=s(Ia);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fa={name:"menu",size:24,node:[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]};Fa.node;const Po=s(Fa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Va={name:"moon",size:24,node:[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]]};Va.node;const Oo=s(Va);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Na={name:"newspaper",size:24,node:[["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",key:"39pd36"}],["rect",{width:"8",height:"4",x:"10",y:"6",rx:"1",key:"aywv1n"}]]};Na.node;const $o=s(Na);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qa={name:"panel-left-close",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m16 15-3-3 3-3",key:"14y99z"}]],aliases:["sidebar-close"]};qa.node;const Ao=s(qa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wa={name:"panel-left-open",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m14 9 3 3-3 3",key:"8010ee"}]],aliases:["sidebar-open"]};Wa.node;const jo=s(Wa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ba={name:"phone",size:24,node:[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]};Ba.node;const Lo=s(Ba);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ua={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};Ua.node;const Io=s(Ua);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ha={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};Ha.node;const Fo=s(Ha);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ya={name:"printer",size:24,node:[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]};Ya.node;const Vo=s(Ya);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ka={name:"qr-code",size:24,node:[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1",key:"1tu5fj"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1",key:"1v8r4q"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1",key:"1x03jg"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3",key:"177gqh"}],["path",{d:"M21 21v.01",key:"ents32"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7",key:"8crl2c"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M12 3h.01",key:"n36tog"}],["path",{d:"M12 16v.01",key:"133mhm"}],["path",{d:"M16 12h1",key:"1slzba"}],["path",{d:"M21 12v.01",key:"1lwtk9"}],["path",{d:"M12 21v-1",key:"1880an"}]]};Ka.node;const No=s(Ka);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ga={name:"radio",size:24,node:[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478",key:"1fwjs5"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134",key:"ehdyv1"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134",key:"1q22gi"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478",key:"r2q7qm"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]};Ga.node;const qo=s(Ga);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Za={name:"refresh-cw",size:24,node:[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]};Za.node;const Wo=s(Za);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qa={name:"rotate-ccw-clock",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],aliases:["history"]};Qa.node;const Bo=s(Qa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xa={name:"rotate-ccw",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]};Xa.node;const Uo=s(Xa);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ja={name:"search",size:24,node:[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]};Ja.node;const Ho=s(Ja);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const en={name:"send",size:24,node:[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]};en.node;const Yo=s(en);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tn={name:"shield-alert",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]};tn.node;const Ko=s(tn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const an={name:"shield-check",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]};an.node;const Go=s(an);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nn={name:"shield",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]};nn.node;const Zo=s(nn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rn={name:"sliders-horizontal",size:24,node:[["path",{d:"M10 5H3",key:"1qgfaw"}],["path",{d:"M12 19H3",key:"yhmn1j"}],["path",{d:"M14 3v4",key:"1sua03"}],["path",{d:"M16 17v4",key:"1q0r14"}],["path",{d:"M21 12h-9",key:"1o4lsq"}],["path",{d:"M21 19h-5",key:"1rlt1p"}],["path",{d:"M21 5h-7",key:"1oszz2"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M8 12H3",key:"a7s4jb"}]]};rn.node;const Qo=s(rn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const on={name:"sliders-vertical",size:24,node:[["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M12 21v-9",key:"17s77i"}],["path",{d:"M12 8V3",key:"13r4qs"}],["path",{d:"M17 16h4",key:"h1uq16"}],["path",{d:"M19 12V3",key:"o1uvq1"}],["path",{d:"M19 21v-5",key:"qua636"}],["path",{d:"M3 14h4",key:"bcjad9"}],["path",{d:"M5 10V3",key:"cb8scm"}],["path",{d:"M5 21v-7",key:"1w1uti"}]],aliases:["sliders"]};on.node;const Xo=s(on);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sn={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};sn.node;const Jo=s(sn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cn={name:"square-check-big",size:24,node:[["path",{d:"M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344",key:"2acyp4"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],aliases:["check-square"]};cn.node;const ei=s(cn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ln={name:"sun",size:24,node:[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]};ln.node;const ti=s(ln);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const un={name:"table",size:24,node:[["path",{d:"M12 3v18",key:"108xh3"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}]]};un.node;const ai=s(un);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dn={name:"trash",size:24,node:[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],aliases:["trash-2"]};dn.node;const ni=s(dn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hn={name:"trending-up",size:24,node:[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]};hn.node;const ri=s(hn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fn={name:"triangle-alert",size:24,node:[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["alert-triangle"]};fn.node;const oi=s(fn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yn={name:"tv",size:24,node:[["path",{d:"m17 2-5 5-5-5",key:"16satq"}],["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",key:"1e6viu"}]]};yn.node;const ii=s(yn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pn={name:"upload",size:24,node:[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]]};pn.node;const si=s(pn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vn={name:"user-check",size:24,node:[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]};vn.node;const ci=s(vn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mn={name:"user-plus",size:24,node:[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]};mn.node;const li=s(mn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kn={name:"user",size:24,node:[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]};kn.node;const ui=s(kn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gn={name:"users",size:24,node:[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]};gn.node;const di=s(gn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bn={name:"video",size:24,node:[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]};bn.node;const hi=s(bn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _n={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};_n.node;const fi=s(_n);var lt={};(function d(i,E,k,j){var V=!!(i.Worker&&i.Blob&&i.Promise&&i.OffscreenCanvas&&i.OffscreenCanvasRenderingContext2D&&i.HTMLCanvasElement&&i.HTMLCanvasElement.prototype.transferControlToOffscreen&&i.URL&&i.URL.createObjectURL),Q=typeof Path2D=="function"&&typeof DOMMatrix=="function",J=(function(){if(!i.OffscreenCanvas)return!1;try{var r=new OffscreenCanvas(1,1),a=r.getContext("2d");a.fillRect(0,0,1,1);var l=r.transferToImageBitmap();a.createPattern(l,"no-repeat")}catch{return!1}return!0})();function U(){}function K(r){var a=E.exports.Promise,l=a!==void 0?a:i.Promise;return typeof l=="function"?new l(r):(r(U,U),null)}var G=(function(r,a){return{transform:function(l){if(r)return l;if(a.has(l))return a.get(l);var f=new OffscreenCanvas(l.width,l.height),p=f.getContext("2d");return p.drawImage(l,0,0),a.set(l,f),f},clear:function(){a.clear()}}})(J,new Map),X=(function(){var r=Math.floor(16.666666666666668),a,l,f={},p=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(a=function(m){var b=Math.random();return f[b]=requestAnimationFrame(function h(g){p===g||p+r-1<g?(p=g,delete f[b],m()):f[b]=requestAnimationFrame(h)}),b},l=function(m){f[m]&&cancelAnimationFrame(f[m])}):(a=function(m){return setTimeout(m,r)},l=function(m){return clearTimeout(m)}),{frame:a,cancel:l}})(),te=(function(){var r,a,l={};function f(p){function m(b,h){p.postMessage({options:b||{},callback:h})}p.init=function(h){var g=h.transferControlToOffscreen();p.postMessage({canvas:g},[g])},p.fire=function(h,g,x){if(a)return m(h,null),a;var D=Math.random().toString(36).slice(2);return a=K(function(z){function S($){$.data.callback===D&&(delete l[D],p.removeEventListener("message",S),a=null,G.clear(),x(),z())}p.addEventListener("message",S),m(h,D),l[D]=S.bind(null,{data:{callback:D}})}),a},p.reset=function(){p.postMessage({reset:!0});for(var h in l)l[h](),delete l[h]}}return function(){if(r)return r;if(!k&&V){var p=["var CONFETTI, SIZE = {}, module = {};","("+d.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{r=new Worker(URL.createObjectURL(new Blob([p])))}catch(m){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",m),null}f(r)}return r}})(),H={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function A(r,a){return a?a(r):r}function ae(r){return r!=null}function C(r,a,l){return A(r&&ae(r[a])?r[a]:H[a],l)}function ue(r){return r<0?0:Math.floor(r)}function ie(r,a){return Math.floor(Math.random()*(a-r))+r}function de(r){return parseInt(r,16)}function ne(r){return r.map(I)}function I(r){var a=String(r).replace(/[^0-9a-f]/gi,"");return a.length<6&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),{r:de(a.substring(0,2)),g:de(a.substring(2,4)),b:de(a.substring(4,6))}}function Z(r){var a=C(r,"origin",Object);return a.x=C(a,"x",Number),a.y=C(a,"y",Number),a}function se(r){r.width=document.documentElement.clientWidth,r.height=document.documentElement.clientHeight}function he(r){var a=r.getBoundingClientRect();r.width=a.width,r.height=a.height}function xe(r){var a=document.createElement("canvas");return a.style.position="fixed",a.style.top="0px",a.style.left="0px",a.style.pointerEvents="none",a.style.zIndex=r,a}function We(r,a,l,f,p,m,b,h,g){r.save(),r.translate(a,l),r.rotate(m),r.scale(f,p),r.arc(0,0,1,b,h,g),r.restore()}function Be(r){var a=r.angle*(Math.PI/180),l=r.spread*(Math.PI/180);return{x:r.x,y:r.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:r.startVelocity*.5+Math.random()*r.startVelocity,angle2D:-a+(.5*l-Math.random()*l),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:r.color,shape:r.shape,tick:0,totalTicks:r.ticks,decay:r.decay,drift:r.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:r.gravity*3,ovalScalar:.6,scalar:r.scalar,flat:r.flat}}function Ue(r,a){a.x+=Math.cos(a.angle2D)*a.velocity+a.drift,a.y+=Math.sin(a.angle2D)*a.velocity+a.gravity,a.velocity*=a.decay,a.flat?(a.wobble=0,a.wobbleX=a.x+10*a.scalar,a.wobbleY=a.y+10*a.scalar,a.tiltSin=0,a.tiltCos=0,a.random=1):(a.wobble+=a.wobbleSpeed,a.wobbleX=a.x+10*a.scalar*Math.cos(a.wobble),a.wobbleY=a.y+10*a.scalar*Math.sin(a.wobble),a.tiltAngle+=.1,a.tiltSin=Math.sin(a.tiltAngle),a.tiltCos=Math.cos(a.tiltAngle),a.random=Math.random()+2);var l=a.tick++/a.totalTicks,f=a.x+a.random*a.tiltCos,p=a.y+a.random*a.tiltSin,m=a.wobbleX+a.random*a.tiltCos,b=a.wobbleY+a.random*a.tiltSin;if(r.fillStyle="rgba("+a.color.r+", "+a.color.g+", "+a.color.b+", "+(1-l)+")",r.beginPath(),Q&&a.shape.type==="path"&&typeof a.shape.path=="string"&&Array.isArray(a.shape.matrix))r.fill(M(a.shape.path,a.shape.matrix,a.x,a.y,Math.abs(m-f)*.1,Math.abs(b-p)*.1,Math.PI/10*a.wobble));else if(a.shape.type==="bitmap"){var h=Math.PI/10*a.wobble,g=Math.abs(m-f)*.1,x=Math.abs(b-p)*.1,D=a.shape.bitmap.width*a.scalar,z=a.shape.bitmap.height*a.scalar,S=new DOMMatrix([Math.cos(h)*g,Math.sin(h)*g,-Math.sin(h)*x,Math.cos(h)*x,a.x,a.y]);S.multiplySelf(new DOMMatrix(a.shape.matrix));var $=r.createPattern(G.transform(a.shape.bitmap),"no-repeat");$.setTransform(S),r.globalAlpha=1-l,r.fillStyle=$,r.fillRect(a.x-D/2,a.y-z/2,D,z),r.globalAlpha=1}else if(a.shape==="circle")r.ellipse?r.ellipse(a.x,a.y,Math.abs(m-f)*a.ovalScalar,Math.abs(b-p)*a.ovalScalar,Math.PI/10*a.wobble,0,2*Math.PI):We(r,a.x,a.y,Math.abs(m-f)*a.ovalScalar,Math.abs(b-p)*a.ovalScalar,Math.PI/10*a.wobble,0,2*Math.PI);else if(a.shape==="star")for(var _=Math.PI/2*3,q=4*a.scalar,Y=8*a.scalar,W=a.x,ee=a.y,oe=5,F=Math.PI/oe;oe--;)W=a.x+Math.cos(_)*Y,ee=a.y+Math.sin(_)*Y,r.lineTo(W,ee),_+=F,W=a.x+Math.cos(_)*q,ee=a.y+Math.sin(_)*q,r.lineTo(W,ee),_+=F;else r.moveTo(Math.floor(a.x),Math.floor(a.y)),r.lineTo(Math.floor(a.wobbleX),Math.floor(p)),r.lineTo(Math.floor(m),Math.floor(b)),r.lineTo(Math.floor(f),Math.floor(a.wobbleY));return r.closePath(),r.fill(),a.tick<a.totalTicks}function He(r,a,l,f,p){var m=a.slice(),b=r.getContext("2d"),h,g,x=K(function(D){function z(){h=g=null,b.clearRect(0,0,f.width,f.height),G.clear(),p(),D()}function S(){k&&!(f.width===j.width&&f.height===j.height)&&(f.width=r.width=j.width,f.height=r.height=j.height),!f.width&&!f.height&&(l(r),f.width=r.width,f.height=r.height),b.clearRect(0,0,f.width,f.height),m=m.filter(function($){return Ue(b,$)}),m.length?h=X.frame(S):z()}h=X.frame(S),g=z});return{addFettis:function(D){return m=m.concat(D),x},canvas:r,promise:x,reset:function(){h&&X.cancel(h),g&&g()}}}function Ee(r,a){var l=!r,f=!!C(a||{},"resize"),p=!1,m=C(a,"disableForReducedMotion",Boolean),b=V&&!!C(a||{},"useWorker"),h=b?te():null,g=l?se:he,x=r&&h?!!r.__confetti_initialized:!1,D=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,z;function S(_,q,Y){for(var W=C(_,"particleCount",ue),ee=C(_,"angle",Number),oe=C(_,"spread",Number),F=C(_,"startVelocity",Number),fe=C(_,"decay",Number),De=C(_,"gravity",Number),Se=C(_,"drift",Number),ge=C(_,"colors",ne),be=C(_,"ticks",Number),_e=C(_,"shapes"),Te=C(_,"scalar"),Ye=!!C(_,"flat"),Pe=Z(_),Oe=W,ye=[],Ke=r.width*Pe.x,Ge=r.height*Pe.y;Oe--;)ye.push(Be({x:Ke,y:Ge,angle:ee,spread:oe,startVelocity:F,color:ge[Oe%ge.length],shape:_e[ie(0,_e.length)],ticks:be,decay:fe,gravity:De,drift:Se,scalar:Te,flat:Ye}));return z?z.addFettis(ye):(z=He(r,ye,g,q,Y),z.promise)}function $(_){var q=m||C(_,"disableForReducedMotion",Boolean),Y=C(_,"zIndex",Number);if(q&&D)return K(function(F){F()});l&&z?r=z.canvas:l&&!r&&(r=xe(Y),document.body.appendChild(r)),f&&!x&&g(r);var W={width:r.width,height:r.height};h&&!x&&h.init(r),x=!0,h&&(r.__confetti_initialized=!0);function ee(){if(h){var F={getBoundingClientRect:function(){if(!l)return r.getBoundingClientRect()}};g(F),h.postMessage({resize:{width:F.width,height:F.height}});return}W.width=W.height=null}function oe(){z=null,f&&(p=!1,i.removeEventListener("resize",ee)),l&&r&&(document.body.contains(r)&&document.body.removeChild(r),r=null,x=!1)}return f&&!p&&(p=!0,i.addEventListener("resize",ee,!1)),h?h.fire(_,W,oe):S(_,W,oe)}return $.reset=function(){h&&h.reset(),z&&z.reset()},$}var re;function ce(){return re||(re=Ee(null,{useWorker:!0,resize:!0})),re}function M(r,a,l,f,p,m,b){var h=new Path2D(r),g=new Path2D;g.addPath(h,new DOMMatrix(a));var x=new Path2D;return x.addPath(g,new DOMMatrix([Math.cos(b)*p,Math.sin(b)*p,-Math.sin(b)*m,Math.cos(b)*m,l,f])),x}function ze(r){if(!Q)throw new Error("path confetti are not supported in this browser");var a,l;typeof r=="string"?a=r:(a=r.path,l=r.matrix);var f=new Path2D(a),p=document.createElement("canvas"),m=p.getContext("2d");if(!l){for(var b=1e3,h=b,g=b,x=0,D=0,z,S,$=0;$<b;$+=2)for(var _=0;_<b;_+=2)m.isPointInPath(f,$,_,"nonzero")&&(h=Math.min(h,$),g=Math.min(g,_),x=Math.max(x,$),D=Math.max(D,_));z=x-h,S=D-g;var q=10,Y=Math.min(q/z,q/S);l=[Y,0,0,Y,-Math.round(z/2+h)*Y,-Math.round(S/2+g)*Y]}return{type:"path",path:a,matrix:l}}function Re(r){var a,l=1,f="#000000",p='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof r=="string"?a=r:(a=r.text,l="scalar"in r?r.scalar:l,p="fontFamily"in r?r.fontFamily:p,f="color"in r?r.color:f);var m=10*l,b=""+m+"px "+p,h=new OffscreenCanvas(m,m),g=h.getContext("2d");g.font=b;var x=g.measureText(a),D=Math.ceil(x.actualBoundingBoxRight+x.actualBoundingBoxLeft),z=Math.ceil(x.actualBoundingBoxAscent+x.actualBoundingBoxDescent),S=2,$=x.actualBoundingBoxLeft+S,_=x.actualBoundingBoxAscent+S;D+=S+S,z+=S+S,h=new OffscreenCanvas(D,z),g=h.getContext("2d"),g.font=b,g.fillStyle=f,g.fillText(a,$,_);var q=1/l;return{type:"bitmap",bitmap:h.transferToImageBitmap(),matrix:[q,0,0,q,-D*q/2,-z*q/2]}}E.exports=function(){return ce().apply(this,arguments)},E.exports.reset=function(){ce().reset()},E.exports.create=Ee,E.exports.shapeFromPath=ze,E.exports.shapeFromText=Re})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),lt,!1);const yi=lt.exports;lt.exports.create;export{ci as $,Ir as A,Nr as B,Jr as C,uo as D,ho as E,vo as F,ko as G,to as H,Vo as I,Ho as J,Mo as K,zo as L,So as M,$o as N,Yo as O,Lo as P,Ro as Q,Or as R,Go as S,ri as T,ui as U,Ar as V,jr as W,fi as X,ro as Y,lo as Z,Zo as _,le as a,Ko as a0,Lr as a1,Mr as a2,oi as a3,Wo as a4,go as a5,Co as a6,Qo as a7,Bo as a8,ei as a9,Br as aA,Io as aB,Vr as aC,jo as aa,Ao as ab,_o as ac,Do as ad,Fo as ae,qo as af,$r as ag,ai as ah,xo as ai,io as aj,fo as ak,yi as al,Ur as am,Xo as an,ti as ao,Oo as ap,ao as aq,Wr as ar,bo as as,Uo as at,po as au,Hr as av,si as aw,No as ax,ni as ay,hi as az,qr as b,Po as c,Zr as d,Jo as e,li as f,gr as g,To as h,no as i,Gr as j,Fr as k,yo as l,di as m,eo as n,Qr as o,Xr as p,so as q,_r as r,mo as s,oo as t,Eo as u,ii as v,wo as w,Kr as x,Yr as y,co as z};
