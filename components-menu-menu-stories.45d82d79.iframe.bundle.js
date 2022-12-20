"use strict";(globalThis.webpackChunk_wonderflow_react_components=globalThis.webpackChunk_wonderflow_react_components||[]).push([[5386],{"./src/components/menu/menu.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AsLink:()=>AsLink,Default:()=>Default,WithCheckboxes:()=>WithCheckboxes,WithIcons:()=>WithIcons,WithMaxHeight:()=>WithMaxHeight,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/index.ts"),_menu__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/menu/menu.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null==_i)return;var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}const __WEBPACK_DEFAULT_EXPORT__={title:"Navigation/Menu",component:_menu__WEBPACK_IMPORTED_MODULE_2__.v};var Template=function(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_menu__WEBPACK_IMPORTED_MODULE_2__.v,Object.assign({},args,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"1",padding:!1,children:"List item text"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"2",padding:!1,children:"List item text"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"3",padding:!1,children:"List item text List item textList item textList item textList item text"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Separator,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"4",padding:!1,children:"List item text"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"5",padding:!1,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Dx,{level:"6",children:"Cutom item"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.xv,{size:14,dimmed:5,children:"Sub text example"})]})})]}))};Template.displayName="Template";var Default=Template.bind({}),WithMaxHeight=Template.bind({});WithMaxHeight.args={maxHeight:"100px"};var WithIconsTemplate=function(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_menu__WEBPACK_IMPORTED_MODULE_2__.v,Object.assign({},args,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"1",icon:"user",children:"List item text"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"2",icon:"message",children:"List item text List item"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Separator,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"3",children:"List item text"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"4",icon:"bell",children:"List item text"})]}))};WithIconsTemplate.displayName="WithIconsTemplate";var WithIcons=WithIconsTemplate.bind({}),WithCheckboxTemplate=function(args){var _useState2=_slicedToArray((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),2),isChecked=_useState2[0],setIsChecked=_useState2[1];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_menu__WEBPACK_IMPORTED_MODULE_2__.v,Object.assign({},args,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.ItemCheckbox,{value:"1",checked:isChecked,icon:isChecked?"check":void 0,onClick:function(){return setIsChecked((function(val){return!val}))},children:"Checkable item"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"2",icon:"compass",decoration:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Af,{dimension:"small",color:"blue",children:"Decoration"}),children:"List item text"})]}))};WithCheckboxTemplate.displayName="WithCheckboxTemplate";var WithCheckboxes=WithCheckboxTemplate.bind({}),LinksTemplate=function(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_menu__WEBPACK_IMPORTED_MODULE_2__.v,Object.assign({},args,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"1",as:"a",href:"https://design.wonderflow.ai",icon:"user",children:"List item text"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"2",icon:"message",children:"List item text List item"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Separator,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"3",children:"List item text"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_menu__WEBPACK_IMPORTED_MODULE_2__.v.Item,{value:"4",as:"a",href:"https://design.wonderflow.ai",icon:"bell",children:"List item text"})]}))};LinksTemplate.displayName="LinksTemplate";var AsLink=LinksTemplate.bind({});Default.parameters=Object.assign({storySource:{source:'args => (\n  <Menu {...args}>\n    <Menu.Item value="1" padding={false}>List item text</Menu.Item>\n    <Menu.Item value="2" padding={false}>List item text</Menu.Item>\n    <Menu.Item value="3" padding={false}>List item text List item textList item textList item textList item text</Menu.Item>\n    <Menu.Separator />\n    <Menu.Item value="4" padding={false}>List item text</Menu.Item>\n    <Menu.Item value="5" padding={false}>\n      <span>\n        <Title level="6">Cutom item</Title>\n        <Text size={14} dimmed={5}>Sub text example</Text>\n      </span>\n    </Menu.Item>\n  </Menu>\n)'}},Default.parameters),WithMaxHeight.parameters=Object.assign({storySource:{source:'args => (\n  <Menu {...args}>\n    <Menu.Item value="1" padding={false}>List item text</Menu.Item>\n    <Menu.Item value="2" padding={false}>List item text</Menu.Item>\n    <Menu.Item value="3" padding={false}>List item text List item textList item textList item textList item text</Menu.Item>\n    <Menu.Separator />\n    <Menu.Item value="4" padding={false}>List item text</Menu.Item>\n    <Menu.Item value="5" padding={false}>\n      <span>\n        <Title level="6">Cutom item</Title>\n        <Text size={14} dimmed={5}>Sub text example</Text>\n      </span>\n    </Menu.Item>\n  </Menu>\n)'}},WithMaxHeight.parameters),WithIcons.parameters=Object.assign({storySource:{source:'args => (\n  <Menu {...args}>\n    <Menu.Item value="1" icon="user">List item text</Menu.Item>\n    <Menu.Item value="2" icon="message">List item text List item</Menu.Item>\n    <Menu.Separator />\n    <Menu.Item value="3">List item text</Menu.Item>\n    <Menu.Item value="4" icon="bell">List item text</Menu.Item>\n  </Menu>\n)'}},WithIcons.parameters),WithCheckboxes.parameters=Object.assign({storySource:{source:'(args) => {\n  const [isChecked, setIsChecked] = useState<boolean>(false);\n\n  return (\n    <Menu {...args}>\n      <Menu.ItemCheckbox\n        value="1"\n        checked={isChecked}\n        icon={isChecked ? \'check\' : undefined}\n        onClick={() => setIsChecked(val => !val)}\n      >\n        Checkable item\n      </Menu.ItemCheckbox>\n      <Menu.Item\n        value="2"\n        icon="compass"\n        decoration={<Chip dimension="small" color="blue">Decoration</Chip>}\n      >\n        List item text\n      </Menu.Item>\n    </Menu>\n  );\n}'}},WithCheckboxes.parameters),AsLink.parameters=Object.assign({storySource:{source:'args => (\n  <Menu {...args}>\n    <Menu.Item value="1" as="a" href="https://design.wonderflow.ai" icon="user">List item text</Menu.Item>\n    <Menu.Item value="2" icon="message">List item text List item</Menu.Item>\n    <Menu.Separator />\n    <Menu.Item value="3">List item text</Menu.Item>\n    <Menu.Item value="4" as="a" href="https://design.wonderflow.ai" icon="bell">List item text</Menu.Item>\n  </Menu>\n)'}},AsLink.parameters);var __namedExportsOrder=["Default","WithMaxHeight","WithIcons","WithCheckboxes","AsLink"];try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/menu/menu.stories.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"src/components/menu/menu.stories.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}}}]);