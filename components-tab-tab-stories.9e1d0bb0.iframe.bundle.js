"use strict";(globalThis.webpackChunk_wonderflow_react_components=globalThis.webpackChunk_wonderflow_react_components||[]).push([[832],{"./src/components/tab/tab.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ChangeEvent:()=>ChangeEvent,ConditionalTab:()=>ConditionalTab,Default:()=>Default,DisabledTab:()=>DisabledTab,InitialTab:()=>InitialTab,ProgrammaticTab:()=>ProgrammaticTab,WithIcons:()=>WithIcons,WithTables:()=>WithTables,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/index.ts"),_table_mocked_data__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/table/mocked-data.tsx"),_tab__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/tab/tab.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}const __WEBPACK_DEFAULT_EXPORT__={title:"Navigation/Tab",component:_tab__WEBPACK_IMPORTED_MODULE_3__.O,args:{defaultValue:"1",dimension:"regular"},argTypes:{dimension:{options:["regular","big"],control:{type:"select"}}}};var Template=function(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tab__WEBPACK_IMPORTED_MODULE_3__.O,Object.assign({},args,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"1",label:"Tab 1",children:"Panel 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"2",label:"Tab mid long 2",children:"Panel 2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"3",label:"Tab short 3",children:"Panel 3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"4",label:"Tab veryy long 4",children:"Panel 4"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"5",label:"Tab 5",children:"Panel 5"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"6",label:"Tab 6",children:"Panel 6"})]}))};Template.displayName="Template";var Default=Template.bind({}),InitialTab=Template.bind({});InitialTab.args={defaultValue:"3"};var ProgrammaticTab=function(){var _useState2=_slicedToArray((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("1"),2),state=_useState2[0],setState=_useState2[1];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tab__WEBPACK_IMPORTED_MODULE_3__.O,{value:state,onValueChange:function(val){return setState(val)},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"1",label:"Tab 1",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p",{children:"Tab panel 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.zx,{icon:"sun-bright",dimension:"small",onClick:function(){return setState("3")},children:"Go to tab 3"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"2",label:"Tab 2",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p",{children:"Tab panel 2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.zx,{icon:"sun-bright",dimension:"small",onClick:function(){return setState("1")},children:"Go to tab 1"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"3",label:"Tab 3",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p",{children:"Tab panel 3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.zx,{icon:"sun-bright",dimension:"small",onClick:function(){return setState("2")},children:"Go to tab 2"})]})]})};ProgrammaticTab.displayName="ProgrammaticTab";var ChangeEvent=Template.bind({});ChangeEvent.args={onValueChange:function(current){return alert(`current is ${current}`)}};var ConditionalTab=function(){var _useState4=_slicedToArray((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),2),isVisible=_useState4[0],setIsVisible=_useState4[1];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tab__WEBPACK_IMPORTED_MODULE_3__.O,{defaultValue:"1",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"1",label:"Tab 1",children:"Tab panel 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"2",label:"Tab 2",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.zx,{icon:"sun-bright",onClick:function(){return setIsVisible(!isVisible)},children:"Toggle new tab"})}),isVisible&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"3",label:"Tab 3",children:"Tab panel 3"})]})};ConditionalTab.displayName="ConditionalTab";var DisabledTab=function(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tab__WEBPACK_IMPORTED_MODULE_3__.O,Object.assign({defaultValue:"1"},args,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"1",label:"Tab 1",children:"Panel 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"2",label:"Tab mid long 2",children:"Panel 2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"3",label:"Tab short 3",children:"Panel 3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{disabled:!0,value:"4",label:"Tab veryy long 4",children:"Panel 4"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"5",label:"Tab 5",children:"Panel 5"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"6",label:"Tab 6",children:"Panel 6"})]}))};DisabledTab.displayName="DisabledTab";var WithIcons=function(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tab__WEBPACK_IMPORTED_MODULE_3__.O,Object.assign({defaultValue:"1"},args,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{icon:"star",value:"1",label:"Tab 1",children:"Panel 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{icon:"eye",value:"2",label:"Tab mid long 2",children:"Panel 2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{icon:"sun-bright",value:"3",label:"Tab short 3",children:"Panel 3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{icon:"moon",disabled:!0,value:"4",label:"Tab veryy long 4",children:"Panel 4"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{icon:"magnifying-glass",value:"5",label:"Tab 5",children:"Panel 5"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{icon:"check",value:"6",label:"Tab 6",children:"Panel 6"})]}))};WithIcons.displayName="WithIcons";var WithTables=function(){var _useState6=_slicedToArray((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("Table1"),2),activeTab=_useState6[0],setActiveTab=_useState6[1],_useState8=_slicedToArray((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({Table1:{pageSize:5,pageIndex:0},Table2:{pageSize:10,pageIndex:0}}),2),pagination=_useState8[0],setPagination=_useState8[1],handlePagination=function(_ref){var pageIndex=_ref.pageIndex,pageSize=_ref.pageSize;if(pageIndex!==pagination[activeTab].pageIndex||pageSize!==pagination[activeTab].pageSize){var newPagination=Object.assign({},pagination,{[activeTab]:{pageIndex,pageSize}});setPagination(newPagination)}};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tab__WEBPACK_IMPORTED_MODULE_3__.O,{defaultValue:activeTab,onValueChange:function(tab){setActiveTab(tab)},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"Table1",label:"Table 1",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.iA,{background:"seashell",stripes:!0,showSeparators:!0,columns:_table_mocked_data__WEBPACK_IMPORTED_MODULE_2__.mj,data:_table_mocked_data__WEBPACK_IMPORTED_MODULE_2__.S1,showPagination:!0,itemsPerPage:pagination.Table1.pageSize,initialPageIndex:pagination.Table1.pageIndex,onPaginationChange:handlePagination})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tab__WEBPACK_IMPORTED_MODULE_3__.O.Panel,{value:"Table2",label:"Table 2",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.iA,{background:"honeydew",stripes:!0,showSeparators:!0,columns:_table_mocked_data__WEBPACK_IMPORTED_MODULE_2__.mj,data:_table_mocked_data__WEBPACK_IMPORTED_MODULE_2__.S1,showPagination:!0,itemsPerPage:pagination.Table2.pageSize,initialPageIndex:pagination.Table2.pageIndex,onPaginationChange:handlePagination})})]})};WithTables.displayName="WithTables",Default.parameters=Object.assign({storySource:{source:'args => (\n  <Tab {...args}>\n    <Tab.Panel value="1" label="Tab 1">Panel 1</Tab.Panel>\n    <Tab.Panel value="2" label="Tab mid long 2">Panel 2</Tab.Panel>\n    <Tab.Panel value="3" label="Tab short 3">Panel 3</Tab.Panel>\n    <Tab.Panel value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>\n    <Tab.Panel value="5" label="Tab 5">Panel 5</Tab.Panel>\n    <Tab.Panel value="6" label="Tab 6">Panel 6</Tab.Panel>\n  </Tab>\n)'}},Default.parameters),InitialTab.parameters=Object.assign({storySource:{source:'args => (\n  <Tab {...args}>\n    <Tab.Panel value="1" label="Tab 1">Panel 1</Tab.Panel>\n    <Tab.Panel value="2" label="Tab mid long 2">Panel 2</Tab.Panel>\n    <Tab.Panel value="3" label="Tab short 3">Panel 3</Tab.Panel>\n    <Tab.Panel value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>\n    <Tab.Panel value="5" label="Tab 5">Panel 5</Tab.Panel>\n    <Tab.Panel value="6" label="Tab 6">Panel 6</Tab.Panel>\n  </Tab>\n)'}},InitialTab.parameters),ProgrammaticTab.parameters=Object.assign({storySource:{source:'() => {\n  const [state, setState] = useState(\'1\');\n\n  return (\n    <Tab value={state} onValueChange={val => setState(val)}>\n      <Tab.Panel value="1" label="Tab 1">\n        <p>Tab panel 1</p>\n        <Button icon="sun-bright" dimension="small" onClick={() => setState(\'3\')}>Go to tab 3</Button>\n      </Tab.Panel>\n\n      <Tab.Panel value="2" label="Tab 2">\n        <p>Tab panel 2</p>\n        <Button icon="sun-bright" dimension="small" onClick={() => setState(\'1\')}>Go to tab 1</Button>\n      </Tab.Panel>\n\n      <Tab.Panel value="3" label="Tab 3">\n        <p>Tab panel 3</p>\n        <Button icon="sun-bright" dimension="small" onClick={() => setState(\'2\')}>Go to tab 2</Button>\n      </Tab.Panel>\n    </Tab>\n  );\n}'}},ProgrammaticTab.parameters),ChangeEvent.parameters=Object.assign({storySource:{source:'args => (\n  <Tab {...args}>\n    <Tab.Panel value="1" label="Tab 1">Panel 1</Tab.Panel>\n    <Tab.Panel value="2" label="Tab mid long 2">Panel 2</Tab.Panel>\n    <Tab.Panel value="3" label="Tab short 3">Panel 3</Tab.Panel>\n    <Tab.Panel value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>\n    <Tab.Panel value="5" label="Tab 5">Panel 5</Tab.Panel>\n    <Tab.Panel value="6" label="Tab 6">Panel 6</Tab.Panel>\n  </Tab>\n)'}},ChangeEvent.parameters),ConditionalTab.parameters=Object.assign({storySource:{source:'() => {\n  const [isVisible, setIsVisible] = useState(false);\n\n  return (\n    <Tab defaultValue="1">\n      <Tab.Panel value="1" label="Tab 1">\n        Tab panel 1\n      </Tab.Panel>\n      <Tab.Panel value="2" label="Tab 2">\n        <Button icon="sun-bright" onClick={() => setIsVisible(!isVisible)}>Toggle new tab</Button>\n      </Tab.Panel>\n      {isVisible && <Tab.Panel value="3" label="Tab 3">Tab panel 3</Tab.Panel>}\n    </Tab>\n  );\n}'}},ConditionalTab.parameters),DisabledTab.parameters=Object.assign({storySource:{source:'args => (\n  <Tab defaultValue="1" {...args}>\n    <Tab.Panel value="1" label="Tab 1">Panel 1</Tab.Panel>\n    <Tab.Panel value="2" label="Tab mid long 2">Panel 2</Tab.Panel>\n    <Tab.Panel value="3" label="Tab short 3">Panel 3</Tab.Panel>\n    <Tab.Panel disabled value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>\n    <Tab.Panel value="5" label="Tab 5">Panel 5</Tab.Panel>\n    <Tab.Panel value="6" label="Tab 6">Panel 6</Tab.Panel>\n  </Tab>\n)'}},DisabledTab.parameters),WithIcons.parameters=Object.assign({storySource:{source:'args => (\n  <Tab defaultValue="1" {...args}>\n    <Tab.Panel icon="star" value="1" label="Tab 1">Panel 1</Tab.Panel>\n    <Tab.Panel icon="eye" value="2" label="Tab mid long 2">Panel 2</Tab.Panel>\n    <Tab.Panel icon="sun-bright" value="3" label="Tab short 3">Panel 3</Tab.Panel>\n    <Tab.Panel icon="moon" disabled value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>\n    <Tab.Panel icon="magnifying-glass" value="5" label="Tab 5">Panel 5</Tab.Panel>\n    <Tab.Panel icon="check" value="6" label="Tab 6">Panel 6</Tab.Panel>\n  </Tab>\n)'}},WithIcons.parameters),WithTables.parameters=Object.assign({storySource:{source:'() => {\n  type TableTab = \'Table1\' | \'Table2\';\n  type TablePagination = { pageSize: number; pageIndex: number };\n  type Pagination = Record<TableTab, TablePagination>\n\n  const [activeTab, setActiveTab] = useState<TableTab>(\'Table1\');\n  const [pagination, setPagination] = useState<Pagination>({\n    Table1: {\n      pageSize: 5,\n      pageIndex: 0,\n    },\n    Table2: {\n      pageSize: 10,\n      pageIndex: 0,\n    },\n  });\n\n  const handleTab = (tab: TableTab) => {\n    setActiveTab(tab);\n  };\n\n  const handlePagination = ({ pageIndex, pageSize }: TablePagination) => {\n    if (pageIndex !== pagination[activeTab].pageIndex\n      || pageSize !== pagination[activeTab].pageSize) {\n      const newPagination = { ...pagination, [activeTab]: { pageIndex, pageSize } };\n      setPagination(newPagination);\n    }\n  };\n\n  return (\n    <Tab defaultValue={activeTab} onValueChange={handleTab as ((value: string) => void)}>\n      <Tab.Panel value="Table1" label="Table 1">\n        <Table\n          background="seashell"\n          stripes\n          showSeparators\n          columns={mockedColumns}\n          data={mockedData}\n          showPagination\n          itemsPerPage={pagination.Table1.pageSize}\n          initialPageIndex={pagination.Table1.pageIndex}\n          onPaginationChange={handlePagination}\n        />\n      </Tab.Panel>\n\n      <Tab.Panel value="Table2" label="Table 2">\n        <Table\n          background="honeydew"\n          stripes\n          showSeparators\n          columns={mockedColumns}\n          data={mockedData}\n          showPagination\n          itemsPerPage={pagination.Table2.pageSize}\n          initialPageIndex={pagination.Table2.pageIndex}\n          onPaginationChange={handlePagination}\n        />\n      </Tab.Panel>\n    </Tab>\n  );\n}'}},WithTables.parameters);var __namedExportsOrder=["Default","InitialTab","ProgrammaticTab","ChangeEvent","ConditionalTab","DisabledTab","WithIcons","WithTables"];try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/tab/tab.stories.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"src/components/tab/tab.stories.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}}}]);