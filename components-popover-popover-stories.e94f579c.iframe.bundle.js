"use strict";(globalThis.webpackChunk_wonderflow_react_components=globalThis.webpackChunk_wonderflow_react_components||[]).push([[4140],{"./src/components/popover/popover.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Controlled:()=>Controlled,CustomElement:()=>CustomElement,Default:()=>Default,WithField:()=>WithField,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/index.ts"),_popover__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/popover/popover.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}const __WEBPACK_DEFAULT_EXPORT__={title:"Dialogs/Popover",component:_popover__WEBPACK_IMPORTED_MODULE_2__.J,args:{placement:"auto-start",offset:8,closeOnOutsideClick:!0,matchTriggerWidth:!1,trigger:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.zx,{children:"Open Popover"})},argTypes:{placement:{options:["auto","auto-start","auto-end","top","bottom","right","left","top-start","top-end","bottom-start","bottom-end","right-start","right-end","left-start","left-end"],control:{type:"select"}}}};var DefaultTemplate=function(args){var _useState2=_slicedToArray((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),2),isChecked=_useState2[0],setIsChecked=_useState2[1];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_popover__WEBPACK_IMPORTED_MODULE_2__.J,Object.assign({},args,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.v2,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.v2.Item,{icon:"arrow-right",description:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:"Description for this item"}),value:"1",children:"Sample long menu item"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.v2.ItemCheckbox,{onClick:function(){return setIsChecked((function(val){return!val}))},checked:isChecked,icon:isChecked?"check":void 0,value:"2",children:"Checkbox item"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.v2.Item,{icon:"user",value:"3",description:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Dx,{as:"h2",level:"5",children:"Sample H2 Title longlonglonglonglonglonglonglonglonglonglong"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:"long text content placeholder to test wrapping and sizes"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img",{style:{width:"100%"},alt:"",src:"https://images.unsplash.com/photo-1593963171957-d87a6279226d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"})]}),children:"Short menu label"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.v2.Separator,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.v2.Item,{value:"4",icon:"arrow-down-to-bracket",children:"Even shorter"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.v2.Item,{value:"5",disabled:!0,children:"Really?"})]})}))};DefaultTemplate.displayName="DefaultTemplate";var Default=DefaultTemplate.bind({}),CustomTemplate=function(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.Kq,{direction:"row",columnGap:8,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_popover__WEBPACK_IMPORTED_MODULE_2__.J,Object.assign({},args,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{style:{background:"var(--global-vibrancy-background)",backdropFilter:"blur(10px)",border:"2px solid black",padding:24},children:"Lorem."})})),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_popover__WEBPACK_IMPORTED_MODULE_2__.J,Object.assign({},args,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{style:{background:"var(--global-vibrancy-background)",backdropFilter:"blur(10px)",border:"2px solid black",padding:24},children:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni error unde sapiente beatae! Nostrum praesentium similique veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?"})}))]})};CustomTemplate.displayName="CustomTemplate";var CustomElement=CustomTemplate.bind({});CustomElement.args={matchTriggerWidth:!0,placement:"bottom-start"};var WithField=function(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_popover__WEBPACK_IMPORTED_MODULE_2__.J,Object.assign({},args,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{style:{background:"var(--global-vibrancy-background)",backdropFilter:"blur(10px)",border:"2px solid black",padding:24},children:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni error unde sapiente beatae! Nostrum praesentium similique veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?"})}))})}.bind({});WithField.args={trigger:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.VK,{type:"search",icon:"magnifying-glass"}),matchTriggerWidth:!0,placement:"bottom-start"};var ControlledTemplate=function(args){var _useState4=_slicedToArray((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),2),isOpen=_useState4[0],setIsOpen=_useState4[1];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_popover__WEBPACK_IMPORTED_MODULE_2__.J,Object.assign({},args,{trigger:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.zx,{onClick:function(){return setIsOpen((function(val){return!val}))},children:(isOpen?"Close":"Open")+" Popover"}),onOpenChange:function(state){return setIsOpen(state)},open:isOpen,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div",{style:{background:"var(--global-vibrancy-background)",backdropFilter:"blur(10px)",border:"2px solid black",padding:24,maxWidth:"300px"},children:["Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni error unde sapiente beatae! Nostrum praesentium similique veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button",{type:"button",onClick:function(){return setIsOpen((function(val){return!val}))},children:"Close popover"})]})}))};ControlledTemplate.displayName="ControlledTemplate";var Controlled=ControlledTemplate.bind({});Controlled.args={},Default.parameters=Object.assign({storySource:{source:'(args) => {\n  const [isChecked, setIsChecked] = useState<boolean>(false);\n\n  return (\n    <Popover {...args}>\n      <Menu>\n        <Menu.Item\n          icon="arrow-right"\n          description={<>Description for this item</>}\n          value="1"\n        >\n          Sample long menu item\n        </Menu.Item>\n        <Menu.ItemCheckbox\n          onClick={() => setIsChecked(val => !val)}\n          checked={isChecked}\n          icon={isChecked ? \'check\' : undefined}\n          value="2"\n        >\n          Checkbox item\n        </Menu.ItemCheckbox>\n        <Menu.Item\n          icon="user"\n          value="3"\n          description={(\n            <>\n              <Title as="h2" level="5">Sample H2 Title longlonglonglonglonglonglonglonglonglonglong</Title>\n              <p>long text content placeholder to test wrapping and sizes</p>\n              <img style={{ width: \'100%\' }} alt="" src="https://images.unsplash.com/photo-1593963171957-d87a6279226d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />\n            </>\n          )}\n        >\n          Short menu label\n        </Menu.Item>\n        <Menu.Separator />\n        <Menu.Item value="4" icon="arrow-down-to-bracket">Even shorter</Menu.Item>\n        <Menu.Item value="5" disabled>Really?</Menu.Item>\n      </Menu>\n    </Popover>\n  );\n}'}},Default.parameters),CustomElement.parameters=Object.assign({storySource:{source:"args => (\n  <Stack direction=\"row\" columnGap={8}>\n    <Popover {...args}>\n      <div style={{\n        background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24,\n      }}\n      >\n        Lorem.\n      </div>\n    </Popover>\n    <Popover {...args}>\n      <div style={{\n        background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24,\n      }}\n      >\n        Lorem ipsum dolor, sit amet consectetur adipisicing elit.\n        Magni error unde sapiente beatae! Nostrum praesentium similique\n        veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?\n      </div>\n    </Popover>\n  </Stack>\n)"}},CustomElement.parameters),WithField.parameters=Object.assign({storySource:{source:"args => (\n  <>\n    <Popover\n      {...args}\n    >\n      <div style={{\n        background: 'var(--global-vibrancy-background)', backdropFilter: 'blur(10px)', border: '2px solid black', padding: 24,\n      }}\n      >\n        Lorem ipsum dolor, sit amet consectetur adipisicing elit.\n        Magni error unde sapiente beatae! Nostrum praesentium similique\n        veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?\n      </div>\n    </Popover>\n  </>\n)"}},WithField.parameters),Controlled.parameters=Object.assign({storySource:{source:"(args) => {\n  const [isOpen, setIsOpen] = useState<boolean>(false);\n\n  return (\n    <Popover\n      {...args}\n      trigger={(\n        <Button onClick={() => setIsOpen(val => !val)}>\n          {`${isOpen ? 'Close' : 'Open'} Popover`}\n        </Button>\n      )}\n      onOpenChange={state => setIsOpen(state)}\n      open={isOpen}\n    >\n      <div style={{\n        background: 'var(--global-vibrancy-background)',\n        backdropFilter: 'blur(10px)',\n        border: '2px solid black',\n        padding: 24,\n        maxWidth: '300px',\n      }}\n      >\n        Lorem ipsum dolor, sit amet consectetur adipisicing elit.\n        Magni error unde sapiente beatae! Nostrum praesentium similique\n        veniam non ut nulla, incidunt velit et, placeat cupiditate, aliquid saepe. Atque, provident perferendis?\n        <button type=\"button\" onClick={() => setIsOpen(val => !val)}>\n          Close popover\n        </button>\n      </div>\n    </Popover>\n  );\n}"}},Controlled.parameters);var __namedExportsOrder=["Default","CustomElement","WithField","Controlled"];try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/popover/popover.stories.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"src/components/popover/popover.stories.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}}}]);