(globalThis.webpackChunk_wonderflow_react_components=globalThis.webpackChunk_wonderflow_react_components||[]).push([[6426],{"./src/examples/shell.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Shell:()=>Shell,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var clsx__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/clsx/dist/clsx.m.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),react_uid__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/react-uid/dist/es2015/hooks.js"),_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/index.ts"),_shell_module_css__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/examples/shell.module.css"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}const __WEBPACK_DEFAULT_EXPORT__={title:"Examples/Wireframe",component:_components__WEBPACK_IMPORTED_MODULE_1__.W2};var Template=function(){var _useState2=_slicedToArray((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),2),isLeftOpen=_useState2[0],setIsLeftOpen=_useState2[1],_useState4=_slicedToArray((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),2),isRightOpen=_useState4[0],setIsRightOpen=_useState4[1],ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),seed=(0,react_uid__WEBPACK_IMPORTED_MODULE_4__.H)(),isBrowser=(0,_components__WEBPACK_IMPORTED_MODULE_1__.NS)().isBrowser,_useBreakpoints=(0,_components__WEBPACK_IMPORTED_MODULE_1__.kC)(),matches=_useBreakpoints.matches,size=_useBreakpoints.size,linkIcons=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){return["accessibility","astronomy","crown","megaphone","thumbs-up"]}),[]),_useBreakpointsConfig=(0,_components__WEBPACK_IMPORTED_MODULE_1__.hK)({sm:{gutter:16,col:2,dimension:"extra-large"},md:{gutter:24,col:3,dimension:"extra-large"},lg:{gutter:24,col:4,dimension:"extra-large"},xl:{gutter:32,col:6,dimension:"extra-large"},fallback:{gutter:16,col:1,dimension:"extra-large"}},ref),containerValue=_useBreakpointsConfig.value,containerMatches=_useBreakpointsConfig.matches,containerSize=_useBreakpointsConfig.size;return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){if(isBrowser)return document.body.style.padding="0px",function(){document.body.style.padding="1rem"}}),[isBrowser]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.W2,{dimension:"full",padding:!1,className:_shell_module_css__WEBPACK_IMPORTED_MODULE_2__.MainContainer,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_1__.Kq,{direction:"row",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_1__.Kq,{id:"LeftMenu",rowGap:16,className:_shell_module_css__WEBPACK_IMPORTED_MODULE_2__.LeftMenu,"data-is-open":isLeftOpen,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{className:_shell_module_css__WEBPACK_IMPORTED_MODULE_2__.LeftMenuInner,"data-is-open":isLeftOpen}),isLeftOpen?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{children:linkIcons.map((function(e,i){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.v2.Item,{disabled:!0,value:`${e}`,icon:linkIcons[i],children:e},seed(`linkMenu${i}`))}))}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.Kq,{inline:!0,hAlign:"center",rowGap:8,children:linkIcons.map((function(e,i){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.hU,{disabled:!0,icon:linkIcons[i],kind:"flat"},`${e} ${seed(`icons${i}`)}`)}))})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_1__.Kq,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_1__.Kq,{id:"MainMenu",direction:"row",vAlign:"center",hAlign:"space-between",columnGap:16,className:_shell_module_css__WEBPACK_IMPORTED_MODULE_2__.MainMenu,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.Kq,{inline:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.zx,{kind:"secondary",dimension:"regular",fullWidth:!1,onClick:function(){return setIsLeftOpen(!isLeftOpen)},children:"Menu"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.Kq,{inline:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.zx,{kind:"secondary",dimension:"regular",fullWidth:!1,onClick:function(){return setIsRightOpen(!isRightOpen)},children:"Filters"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.W2,{ref,dimension:containerValue.dimension,className:(0,clsx__WEBPACK_IMPORTED_MODULE_5__.Z)(_shell_module_css__WEBPACK_IMPORTED_MODULE_2__.Container,"ContainerEx"),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_1__.Kq,{rowGap:32,vPadding:32,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_1__.A9,{title:"Product Card Container",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.xv,{as:"span",variant:"body-2",children:`Window Width: ${size}px - Breakpoints Match: ${matches.toUpperCase()}`}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.xv,{as:"span",variant:"body-2",children:`Container Width: ${containerSize}px - Grid Columns: ${containerValue.col} -  Grid Gutter: ${containerValue.gutter}px`}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.xv,{as:"span",variant:"body-2",children:`useBreakpointsConfig.value: ${JSON.stringify(containerValue)} - useBreakpointsConfig.matches: ${containerMatches.toUpperCase()}`})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.rj,{colMinWidth:"1rem",columns:containerValue.col,rowGap:containerValue.gutter,columnGap:containerValue.gutter,filling:!1,children:Array(12).fill("Card").map((function(e,i){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.rj.Item,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.Il,{source:["https://storage.googleapis.com/wonderflow-product-images/KITCHENAID%20CLASSIC%20SERIES.png"],subtitle:"brand name",title:`Product-${e} ${i+1}`,sentiment:.51,rating:4.51,feedbackCount:3251,footer:"01 Aug 2023",menuActions:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.v2,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.v2.Item,{autoFocus:!0,icon:"news",value:"1",children:"Stats"})}),highlightOnHover:!0})},seed(`cards${i}`))}))})]})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_1__.Kq,{id:"RightMenu",className:_shell_module_css__WEBPACK_IMPORTED_MODULE_2__.RightMenu,"data-is-open":isRightOpen,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{className:_shell_module_css__WEBPACK_IMPORTED_MODULE_2__.RightMenuInner}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{className:_shell_module_css__WEBPACK_IMPORTED_MODULE_2__.Filter,children:Array(10).fill("Filter").map((function(e,i){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_1__.pJ,{summary:`${e} ${String.fromCharCode(i+65)}`,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.v2.Item,{value:"1",subtext:"Hint Text",children:"Menu Item 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.v2.Item,{value:"2",subtext:"Hint Text",children:"Menu Item 2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.v2.Item,{value:"3",subtext:"Hint Text",children:"Menu Item 3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.v2.Item,{value:"4",subtext:"Hint Text",children:"Menu Item 4"})]},seed(`filters${i}`))}))})]})]})})};Template.displayName="Template";var Shell=Template.bind({});Shell.parameters=Object.assign({storySource:{source:'() => {\n  const [isLeftOpen, setIsLeftOpen] = useState<boolean>(false);\n  const [isRightOpen, setIsRightOpen] = useState<boolean>(false);\n\n  const ref = useRef<HTMLDivElement>(null);\n\n  const seed = useUIDSeed();\n  const { isBrowser } = useSSR();\n  const { matches, size } = useBreakpoints();\n\n  const linkIcons: Array<Partial<SymbolNames>> = useMemo(() => [\'accessibility\', \'astronomy\', \'crown\', \'megaphone\', \'thumbs-up\'], []);\n\n  const {\n    value: containerValue,\n    matches: containerMatches,\n    size: containerSize,\n  } = useBreakpointsConfig<Config>(\n    {\n      sm: { gutter: 16, col: 2, dimension: \'extra-large\' },\n      md: { gutter: 24, col: 3, dimension: \'extra-large\' },\n      lg: { gutter: 24, col: 4, dimension: \'extra-large\' },\n      xl: { gutter: 32, col: 6, dimension: \'extra-large\' },\n      fallback: { gutter: 16, col: 1, dimension: \'extra-large\' },\n    },\n    ref,\n  );\n\n  useEffect(\n    () => {\n      if (isBrowser) {\n        document.body.style.padding = \'0px\';\n\n        return () => {\n          document.body.style.padding = \'1rem\';\n        };\n      }\n\n      return undefined;\n    }, [isBrowser],\n  );\n\n  return (\n    <Container dimension="full" padding={false} className={style.MainContainer}>\n      <Stack direction="row">\n        <Stack\n          id="LeftMenu"\n          rowGap={16}\n          className={style.LeftMenu}\n          data-is-open={isLeftOpen}\n        >\n          <div className={style.LeftMenuInner} data-is-open={isLeftOpen} />\n\n          {isLeftOpen\n            ? (\n              <div>\n                {linkIcons.map((e, i) => (<Menu.Item key={seed(`linkMenu${i}`)} disabled value={`${e}`} icon={linkIcons[i]}>{e}</Menu.Item>))}\n              </div>\n            )\n            : (\n              <Stack inline hAlign="center" rowGap={8}>\n                {linkIcons.map((e, i) => (<IconButton key={`${e} ${seed(`icons${i}`)}`} disabled icon={linkIcons[i]} kind="flat" />))}\n              </Stack>\n            )}\n        </Stack>\n\n        <Stack>\n          <Stack\n            id="MainMenu"\n            direction="row"\n            vAlign="center"\n            hAlign="space-between"\n            columnGap={16}\n            className={style.MainMenu}\n          >\n            <Stack inline>\n              <Button kind="secondary" dimension="regular" fullWidth={false} onClick={() => setIsLeftOpen(!isLeftOpen)}>Menu</Button>\n            </Stack>\n            <Stack inline>\n              <Button kind="secondary" dimension="regular" fullWidth={false} onClick={() => setIsRightOpen(!isRightOpen)}>Filters</Button>\n            </Stack>\n          </Stack>\n\n          <Container\n            ref={ref}\n            dimension={containerValue.dimension}\n            className={clsx(style.Container, \'ContainerEx\')}\n          >\n            <Stack rowGap={32} vPadding={32}>\n              <Snackbar title="Product Card Container">\n                <Text as="span" variant="body-2">{`Window Width: ${size}px - Breakpoints Match: ${matches.toUpperCase()}`}</Text>\n                <Text as="span" variant="body-2">{`Container Width: ${containerSize}px - Grid Columns: ${containerValue.col} -  Grid Gutter: ${containerValue.gutter}px`}</Text>\n                <Text as="span" variant="body-2">{`useBreakpointsConfig.value: ${JSON.stringify(containerValue)} - useBreakpointsConfig.matches: ${containerMatches.toUpperCase()}`}</Text>\n              </Snackbar>\n\n              <Grid\n                colMinWidth="1rem"\n                columns={containerValue.col}\n                rowGap={containerValue.gutter}\n                columnGap={containerValue.gutter}\n                filling={false}\n              >\n                {Array(12).fill(\'Card\').map((e, i) => (\n                  <Grid.Item key={seed(`cards${i}`)}>\n                    <ProductCard\n                      source={[\'https://storage.googleapis.com/wonderflow-product-images/KITCHENAID%20CLASSIC%20SERIES.png\']}\n                      subtitle="brand name"\n                      title={`Product-${e} ${i + 1}`}\n                      sentiment={0.51}\n                      rating={4.51}\n                      feedbackCount={3251}\n                      footer="01 Aug 2023"\n                      menuActions={(\n                        <Menu>\n                          <Menu.Item\n                            autoFocus\n                            icon="news"\n                            value="1"\n                          >\n                            Stats\n                          </Menu.Item>\n                        </Menu>\n                      )}\n                      highlightOnHover\n                    />\n                  </Grid.Item>\n                ))}\n              </Grid>\n            </Stack>\n\n          </Container>\n\n        </Stack>\n\n        <Stack\n          id="RightMenu"\n          className={style.RightMenu}\n          data-is-open={isRightOpen}\n        >\n          <div className={style.RightMenuInner} />\n\n          <div className={style.Filter}>\n            {Array(10).fill(\'Filter\').map((e, i) => (\n              <Disclosure key={seed(`filters${i}`)} summary={`${e} ${String.fromCharCode(i + 65)}`}>\n                <Menu.Item value="1" subtext="Hint Text">Menu Item 1</Menu.Item>\n                <Menu.Item value="2" subtext="Hint Text">Menu Item 2</Menu.Item>\n                <Menu.Item value="3" subtext="Hint Text">Menu Item 3</Menu.Item>\n                <Menu.Item value="4" subtext="Hint Text">Menu Item 4</Menu.Item>\n              </Disclosure>\n            ))}\n          </div>\n\n        </Stack>\n      </Stack>\n    </Container>\n  );\n}'}},Shell.parameters);var __namedExportsOrder=["Shell"];try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/examples/shell.stories.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"src/examples/shell.stories.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}},"../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].use[2]!./src/examples/shell.module.css":(module,exports,__webpack_require__)=>{(exports=__webpack_require__("../../node_modules/css-loader/dist/runtime/api.js")(!1)).push([module.id,"@layer components{.shell-module__MainContainer__2oAdE{background-color:#f9fafb}.shell-module__LeftMenu__1EXN_{background-color:var(--global-background);border-right:1px solid var(--dimmed-1);max-width:63px;min-width:63px}.shell-module__LeftMenu__1EXN_[data-is-open=true]{max-width:279px;min-width:279px}.shell-module__LeftMenuInner__2Lj8b{wordbreak:break-all;background-color:var(--dimmed-1);border-bottom:1px solid var(--dimmed-1);height:64px;max-height:64px;padding:.5rem}.shell-module__LeftMenuInner__2Lj8b[data-is-open=true]{background-color:var(--global-background);height:250px;max-height:250px}.shell-module__MainMenu__39Y0Z{maxheight:64px;border-bottom:1px solid var(--dimmed-1);height:64px;padding:0 2rem}.shell-module__MainMenu__39Y0Z,.shell-module__RightMenu__vccqQ{background-color:var(--global-background)}.shell-module__RightMenu__vccqQ{border-left:1px solid var(--dimmed-1);max-width:0;min-width:0;overflow:hidden}.shell-module__RightMenu__vccqQ[data-is-open=true]{max-width:299px;min-width:299px}.shell-module__RightMenuInner__PQ2y5{wordbreak:break-all;background-color:var(--global-background);border-bottom:1px solid var(--dimmed-1);height:4rem;max-height:4rem;padding:.5rem}.shell-module__Container__EyxNQ{height:calc(100vh - 64px);overflow:auto}.shell-module__Filter__2gTgm{max-height:calc(100vh - 64px);overflow-y:scroll}}",""]),exports.locals={MainContainer:"shell-module__MainContainer__2oAdE",LeftMenu:"shell-module__LeftMenu__1EXN_",LeftMenuInner:"shell-module__LeftMenuInner__2Lj8b",MainMenu:"shell-module__MainMenu__39Y0Z",RightMenu:"shell-module__RightMenu__vccqQ",RightMenuInner:"shell-module__RightMenuInner__PQ2y5",Container:"shell-module__Container__EyxNQ",Filter:"shell-module__Filter__2gTgm"},module.exports=exports},"./src/examples/shell.module.css":(module,__unused_webpack_exports,__webpack_require__)=>{var api=__webpack_require__("../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),content=__webpack_require__("../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].use[2]!./src/examples/shell.module.css");"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.id,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}}}]);