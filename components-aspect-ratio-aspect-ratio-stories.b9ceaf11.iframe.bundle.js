/*! For license information please see components-aspect-ratio-aspect-ratio-stories.b9ceaf11.iframe.bundle.js.LICENSE.txt */
"use strict";(globalThis.webpackChunk_wonderflow_react_components=globalThis.webpackChunk_wonderflow_react_components||[]).push([[7712],{"./src/components/aspect-ratio/aspect-ratio.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _aspect_ratio__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/aspect-ratio/aspect-ratio.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Widgets/Aspect ratio",component:_aspect_ratio__WEBPACK_IMPORTED_MODULE_1__.o};var Template=function(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_aspect_ratio__WEBPACK_IMPORTED_MODULE_1__.o,Object.assign({},args,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{padding:32,background:"var(--dimmed-4)"},children:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, unde."})}))};Template.displayName="Template";var Default=Template.bind({});Default.args={ratio:"1"},Default.parameters=Object.assign({storySource:{source:"args => (\n  <AspectRatio {...args}>\n    <div style={{ padding: 32, background: 'var(--dimmed-4)' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, unde.</div>\n  </AspectRatio>\n)"}},Default.parameters);var __namedExportsOrder=["Default"];try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/aspect-ratio/aspect-ratio.stories.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"src/components/aspect-ratio/aspect-ratio.stories.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/aspect-ratio/aspect-ratio.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{o:()=>AspectRatio});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),AspectRatio=function(_ref){var children=_ref.children,ratio=_ref.ratio;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children,(function(child){return(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child)&&(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child,{style:Object.assign({},child.props.style,{aspectRatio:ratio})})}))})}},"../../node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{__webpack_require__("../../node_modules/object-assign/index.js");var f=__webpack_require__("../../node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"../../node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("../../node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);