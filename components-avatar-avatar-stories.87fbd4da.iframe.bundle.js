/*! For license information please see components-avatar-avatar-stories.87fbd4da.iframe.bundle.js.LICENSE.txt */
(globalThis.webpackChunk_wonderflow_react_components=globalThis.webpackChunk_wonderflow_react_components||[]).push([[5770],{"./src/components/avatar/avatar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _avatar__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/avatar/avatar.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Widgets/Avatar",component:_avatar__WEBPACK_IMPORTED_MODULE_1__.q,args:{dimension:"regular",src:"https://xsgames.co/randomusers/avatar.php?g=male"},argTypes:{dimension:{options:["small","regular","big"],control:{type:"radio"}}}};var Template=function(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_avatar__WEBPACK_IMPORTED_MODULE_1__.q,Object.assign({},args))};Template.displayName="Template";var Default=Template.bind({});Default.parameters=Object.assign({storySource:{source:"args => <Avatar {...args} />"}},Default.parameters);var __namedExportsOrder=["Default"];try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/avatar/avatar.stories.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"src/components/avatar/avatar.stories.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/avatar/avatar.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{q:()=>Avatar});var clsx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/clsx/dist/clsx.m.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_avatar_module_css__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/avatar/avatar.module.css"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_excluded=["className","src","dimension"];function cov_1qb95ui8wa(){var path="/Users/andreafrancescopavia/projects/wanda/packages/react-components/src/components/avatar/avatar.tsx",global=new Function("return this")(),gcv="__coverage__",coverage=global[gcv]||(global[gcv]={});coverage[path]&&"3982ad83d83fd8acb4bdf211f8e098372f52adf9"===coverage[path].hash||(coverage[path]={path:"/Users/andreafrancescopavia/projects/wanda/packages/react-components/src/components/avatar/avatar.tsx",statementMap:{0:{start:{line:33,column:22},end:{line:75,column:2}},1:{start:{line:39,column:2},end:{line:74,column:12}},2:{start:{line:77,column:0},end:{line:77,column:30}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:33,column:64},end:{line:33,column:65}},loc:{start:{line:39,column:2},end:{line:74,column:12}},line:39}},branchMap:{0:{loc:{start:{line:36,column:2},end:{line:36,column:23}},type:"default-arg",locations:[{start:{line:36,column:14},end:{line:36,column:23}}],line:36},1:{loc:{start:{line:44,column:5},end:{line:72,column:7}},type:"cond-expr",locations:[{start:{line:46,column:8},end:{line:51,column:10}},{start:{line:54,column:8},end:{line:71,column:14}}],line:44}},s:{0:0,1:0,2:0},f:{0:0},b:{0:[0],1:[0,0]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"3982ad83d83fd8acb4bdf211f8e098372f52adf9"});var actualCoverage=coverage[path];return cov_1qb95ui8wa=function(){return actualCoverage},actualCoverage}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}cov_1qb95ui8wa();var Avatar=(cov_1qb95ui8wa().s[0]++,(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((function(_ref,forwardedRef){var className=_ref.className,src=_ref.src,_ref$dimension=_ref.dimension,dimension=void 0===_ref$dimension?(cov_1qb95ui8wa().b[0][0]++,"regular"):_ref$dimension,otherProps=_objectWithoutProperties(_ref,_excluded);return cov_1qb95ui8wa().f[0]++,cov_1qb95ui8wa().s[1]++,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("picture",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.Z)(_avatar_module_css__WEBPACK_IMPORTED_MODULE_1__.Avatar,className),"data-avatar-dimension":dimension,children:src?(cov_1qb95ui8wa().b[1][0]++,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img",Object.assign({ref:forwardedRef,alt:"",src},otherProps))):(cov_1qb95ui8wa().b[1][1]++,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("svg",{"aria-hidden":"true",className:_avatar_module_css__WEBPACK_IMPORTED_MODULE_1__.Placeholder,height:18,viewBox:"0 0 12 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path",{opacity:.7,d:"M6 0C3.795 0 2 1.794 2 4s1.795 4 4 4 4-1.794 4-4-1.795-4-4-4z",fill:"var(--highlight-blue-foreground)"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path",{d:"M8.4 9H3.6C1.612 9 0 10.575 0 12.531v5.126C1.814 18.517 3.85 19 6 19s4.186-.483 6-1.343v-5.126C12 10.581 10.394 9 8.4 9z",fill:"var(--highlight-blue-foreground)"})]}))})})));cov_1qb95ui8wa().s[2]++,Avatar.displayName="Avatar";try{Avatar.displayName="Avatar",Avatar.__docgenInfo={description:"",displayName:"Avatar",props:{dimension:{defaultValue:{value:"regular"},description:"Define the size of the avatar",name:"dimension",required:!1,type:{name:"enum",value:[{value:'"big"'},{value:'"small"'},{value:'"regular"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/avatar/avatar.tsx#Avatar"]={docgenInfo:Avatar.__docgenInfo,name:"Avatar",path:"src/components/avatar/avatar.tsx#Avatar"})}catch(__react_docgen_typescript_loader_error){}},"../../node_modules/clsx/dist/clsx.m.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}},"../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].use[2]!./src/components/avatar/avatar.module.css":(module,exports,__webpack_require__)=>{(exports=__webpack_require__("../../node_modules/css-loader/dist/runtime/api.js")(!1)).push([module.id,"@layer components{.avatar-module__Avatar__1wsZ3{--size:1.500rem;align-items:flex-end;aspect-ratio:1/1;background-color:var(--highlight-blue-background);border-radius:100%;display:flex;inline-size:var(--size);justify-content:center;overflow:hidden;position:relative}.avatar-module__Avatar__1wsZ3[data-avatar-dimension=regular]{--size:2.500rem}.avatar-module__Avatar__1wsZ3[data-avatar-dimension=big]{--size:3.000rem}.avatar-module__Avatar__1wsZ3 img{bottom:0;left:0;max-width:100%;object-fit:cover;position:absolute;right:0;top:0}.avatar-module__Placeholder__3qCN4{height:calc(var(--size) - 25%)}}",""]),exports.locals={Avatar:"avatar-module__Avatar__1wsZ3",Placeholder:"avatar-module__Placeholder__3qCN4"},module.exports=exports},"../../node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";__webpack_require__("../../node_modules/object-assign/index.js");var f=__webpack_require__("../../node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"../../node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("../../node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./src/components/avatar/avatar.module.css":(module,__unused_webpack_exports,__webpack_require__)=>{var api=__webpack_require__("../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),content=__webpack_require__("../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].use[2]!./src/components/avatar/avatar.module.css");"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.id,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}}}]);