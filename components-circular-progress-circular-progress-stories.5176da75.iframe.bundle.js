/*! For license information please see components-circular-progress-circular-progress-stories.5176da75.iframe.bundle.js.LICENSE.txt */
(globalThis.webpackChunk_wonderflow_react_components=globalThis.webpackChunk_wonderflow_react_components||[]).push([[5393],{"./src/components/circular-progress/circular-progress.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Determinate:()=>Determinate,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _circular_progress__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/circular-progress/circular-progress.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Loading/Circular progress",component:_circular_progress__WEBPACK_IMPORTED_MODULE_1__.D,args:{max:100,dimension:"regular",showProgress:!0,showPercentSign:!1},argTypes:{value:{control:{type:"range",min:0,max:100}},dimension:{options:["small","regular","big"],control:{type:"inline-radio"}}}};var Template=function(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_circular_progress__WEBPACK_IMPORTED_MODULE_1__.D,Object.assign({},args))};Template.displayName="Template";var Determinate=Template.bind({});Determinate.args={value:2e3},Determinate.parameters=Object.assign({storySource:{source:"args => <CircularProgress {...args} />"}},Determinate.parameters);var __namedExportsOrder=["Determinate"];try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/circular-progress/circular-progress.stories.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"src/components/circular-progress/circular-progress.stories.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/circular-progress/circular-progress.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{D:()=>CircularProgress});var clsx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/clsx/dist/clsx.m.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_circular_progress_module_css__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/circular-progress/circular-progress.module.css"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_excluded=["className","value","max","dimension","showProgress","showPercentSign","style"];function cov_1q17zfor1w(){var path="/Users/patrick/Workspace/wanda/packages/react-components/src/components/circular-progress/circular-progress.tsx",global=new Function("return this")(),gcv="__coverage__",coverage=global[gcv]||(global[gcv]={});coverage[path]&&"2e413164178d4836b19f8afc3252d56b7a14f9c7"===coverage[path].hash||(coverage[path]={path:"/Users/patrick/Workspace/wanda/packages/react-components/src/components/circular-progress/circular-progress.tsx",statementMap:{0:{start:{line:50,column:32},end:{line:88,column:2}},1:{start:{line:60,column:24},end:{line:63,column:3}},2:{start:{line:61,column:11},end:{line:61,column:54}},3:{start:{line:65,column:15},end:{line:65,column:41}},4:{start:{line:67,column:16},end:{line:67,column:111}},5:{start:{line:67,column:30},end:{line:67,column:106}},6:{start:{line:67,column:73},end:{line:67,column:106}},7:{start:{line:69,column:38},end:{line:71,column:3}},8:{start:{line:73,column:2},end:{line:87,column:4}},9:{start:{line:90,column:0},end:{line:90,column:50}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:50,column:98},end:{line:50,column:99}},loc:{start:{line:59,column:20},end:{line:88,column:1}},line:59},1:{name:"(anonymous_1)",decl:{start:{line:61,column:4},end:{line:61,column:5}},loc:{start:{line:61,column:11},end:{line:61,column:54}},line:61},2:{name:"(anonymous_2)",decl:{start:{line:67,column:24},end:{line:67,column:25}},loc:{start:{line:67,column:30},end:{line:67,column:106}},line:67},3:{name:"(anonymous_3)",decl:{start:{line:67,column:30},end:{line:67,column:31}},loc:{start:{line:67,column:73},end:{line:67,column:106}},line:67}},branchMap:{0:{loc:{start:{line:53,column:2},end:{line:53,column:11}},type:"default-arg",locations:[{start:{line:53,column:8},end:{line:53,column:11}}],line:53},1:{loc:{start:{line:54,column:2},end:{line:54,column:23}},type:"default-arg",locations:[{start:{line:54,column:14},end:{line:54,column:23}}],line:54},2:{loc:{start:{line:56,column:2},end:{line:56,column:25}},type:"default-arg",locations:[{start:{line:56,column:20},end:{line:56,column:25}}],line:56},3:{loc:{start:{line:61,column:11},end:{line:61,column:54}},type:"cond-expr",locations:[{start:{line:61,column:19},end:{line:61,column:50}},{start:{line:61,column:53},end:{line:61,column:54}}],line:61},4:{loc:{start:{line:65,column:15},end:{line:65,column:41}},type:"cond-expr",locations:[{start:{line:65,column:33},end:{line:65,column:36}},{start:{line:65,column:39},end:{line:65,column:41}}],line:65}},s:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0},f:{0:0,1:0,2:0,3:0},b:{0:[0],1:[0],2:[0],3:[0,0],4:[0,0]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"2e413164178d4836b19f8afc3252d56b7a14f9c7"});var actualCoverage=coverage[path];return cov_1q17zfor1w=function(){return actualCoverage},actualCoverage}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}cov_1q17zfor1w();var CircularProgress=(cov_1q17zfor1w().s[0]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((function(_ref,forwardedRef){var className=_ref.className,value=_ref.value,_ref$max=_ref.max,max=void 0===_ref$max?(cov_1q17zfor1w().b[0][0]++,100):_ref$max,_ref$dimension=_ref.dimension,dimension=void 0===_ref$dimension?(cov_1q17zfor1w().b[1][0]++,"regular"):_ref$dimension,showProgress=_ref.showProgress,_ref$showPercentSign=_ref.showPercentSign,showPercentSign=void 0===_ref$showPercentSign?(cov_1q17zfor1w().b[2][0]++,!1):_ref$showPercentSign,style=_ref.style,otherProps=_objectWithoutProperties(_ref,_excluded);cov_1q17zfor1w().f[0]++;var getPercentage=(cov_1q17zfor1w().s[1]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(){return cov_1q17zfor1w().f[1]++,cov_1q17zfor1w().s[2]++,value?(cov_1q17zfor1w().b[3][0]++,Math.round(100*value/max)):(cov_1q17zfor1w().b[3][1]++,0)}),[max,value])),sign=(cov_1q17zfor1w().s[3]++,showPercentSign?(cov_1q17zfor1w().b[4][0]++,"%"):(cov_1q17zfor1w().b[4][1]++,"")),clamp=(cov_1q17zfor1w().s[4]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){return cov_1q17zfor1w().f[2]++,cov_1q17zfor1w().s[5]++,function(num,min,max){return cov_1q17zfor1w().f[3]++,cov_1q17zfor1w().s[6]++,Math.min(Math.max(num,min),max)}}),[])),dynamicStyle=(cov_1q17zfor1w().s[7]++,{"--progress":`${getPercentage()}%`});return cov_1q17zfor1w().s[8]++,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",Object.assign({ref:forwardedRef,role:"progressbar","aria-valuenow":value,"aria-valuemin":0,"aria-valuemax":max,className:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.Z)(_circular_progress_module_css__WEBPACK_IMPORTED_MODULE_1__.CircularProgress,className),"data-circular-progress":`${clamp(getPercentage(),0,100)}${sign}`,"data-circular-progress-dimension":dimension,"data-circular-progress-show-progress":showProgress,style:Object.assign({},dynamicStyle,style)},otherProps))})));cov_1q17zfor1w().s[9]++,CircularProgress.displayName="CircularProgress";try{CircularProgress.displayName="CircularProgress",CircularProgress.__docgenInfo={description:"",displayName:"CircularProgress",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/circular-progress/circular-progress.tsx#CircularProgress"]={docgenInfo:CircularProgress.__docgenInfo,name:"CircularProgress",path:"src/components/circular-progress/circular-progress.tsx#CircularProgress"})}catch(__react_docgen_typescript_loader_error){}},"../../node_modules/clsx/dist/clsx.m.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}},"../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].use[2]!./src/components/circular-progress/circular-progress.module.css":(module,exports,__webpack_require__)=>{(exports=__webpack_require__("../../node_modules/css-loader/dist/runtime/api.js")(!1)).push([module.id,'@layer components{.circular-progress-module__CircularProgress__2TzHK{--hue:220;--track-size:4px;--track-bg:var(--dimmed-1);aspect-ratio:1/1;display:grid;font-size:1rem;font-weight:token(--wds-wds-font-weight-bold);inline-size:4rem;min-inline-size:64px;place-items:center;position:relative}.circular-progress-module__CircularProgress__2TzHK[data-circular-progress-show-progress=true]:after{content:attr(data-circular-progress);display:block}.circular-progress-module__CircularProgress__2TzHK[data-circular-progress-dimension=regular]{--track-size:8px;font-size:1.75rem;inline-size:8.5rem}.circular-progress-module__CircularProgress__2TzHK[data-circular-progress-dimension=big]{--track-size:16px;font-size:2.5rem;inline-size:11.5rem}.circular-progress-module__CircularProgress__2TzHK:before{background:conic-gradient(var(--progress-color,var(--cta-default)),var(--progress-color,var(--cta-default)) var(--progress,0),var(--track-bg) var(--progress,0) 100%);border-radius:50%;bottom:0;content:"";left:0;-webkit-mask-image:radial-gradient(transparent calc(71% - var(--track-size)),#000 calc(71% - var(--track-size) + .5px));mask-image:radial-gradient(transparent calc(71% - var(--track-size)),#000 calc(71% - var(--track-size) + .5px));position:absolute;right:0;top:0;z-index:0}}',""]),exports.locals={CircularProgress:"circular-progress-module__CircularProgress__2TzHK"},module.exports=exports},"../../node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";__webpack_require__("../../node_modules/object-assign/index.js");var f=__webpack_require__("../../node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"../../node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("../../node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./src/components/circular-progress/circular-progress.module.css":(module,__unused_webpack_exports,__webpack_require__)=>{var api=__webpack_require__("../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),content=__webpack_require__("../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].use[2]!./src/components/circular-progress/circular-progress.module.css");"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.id,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}}}]);