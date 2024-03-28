"use strict";(globalThis.webpackChunk_wonderflow_react_components=globalThis.webpackChunk_wonderflow_react_components||[]).push([[7074],{"./src/examples/charts/storybook/stack-bar-chart.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,PositiveAndNegative:()=>PositiveAndNegative,WithMenu:()=>WithMenu,WithinCard:()=>WithinCard,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__,withAscendingOrder:()=>withAscendingOrder,withBackground:()=>withBackground,withBrush:()=>withBrush,withCategoriesOnIndex:()=>withCategoriesOnIndex,withCustomBarStyle:()=>withCustomBarStyle,withDescendingOrder:()=>withDescendingOrder,withMissingData:()=>withMissingData,withMultipleOverlay:()=>withMultipleOverlay,withMultipleSeries:()=>withMultipleSeries,withNestedData:()=>withNestedData,withOverlay:()=>withOverlay,withVerticalFixedBars:()=>withVerticalFixedBars});var _wonderflow_charts__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../charts/dist/index.js"),_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/index.ts"),_mock_data__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/examples/charts/mock-data/index.ts"),_mock_data_positiveNegative__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/examples/charts/mock-data/positiveNegative.ts"),_line_chart_stories__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/examples/charts/storybook/line-chart.stories.tsx"),_sb_charts_module_css__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/examples/charts/storybook/sb-charts.module.css"),_sb_charts_module_css__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_sb_charts_module_css__WEBPACK_IMPORTED_MODULE_5__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Charts/Stacked Bar Chart",component:_wonderflow_charts__WEBPACK_IMPORTED_MODULE_0__.vz,args:{title:"Stacked Bar Chart",subtitle:"with a single series od data",sortBy:"as-is",isStacked:!0,showLabel:!1,isLoading:!1,showAverage:!1,showTrendline:!1,showBrush:!1,showBackground:!1,hideLegend:!1,hidePadding:!1,preventTooltipDisplay:!1,preventResponsive:!1,layout:_wonderflow_charts__WEBPACK_IMPORTED_MODULE_0__.yU.HORIZONTAL,theme:"light",reverseIndex:!1,mirrorDomains:!1,fixedBarSize:!1,data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ZY,index:{dataKey:"date",label:"Year"},series:{dataKey:["feedback count"],label:"Feedback Count"},overlay:void 0,menu:void 0},argTypes:{layout:{options:["horizontal","vertical"],control:{type:"radio"}},sortBy:{options:["descending-key","ascending-key","descending-value","ascending-value","as-is"],control:{type:"select"}},theme:{options:["light","dark"],control:{type:"radio"}}}};var Template=function(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wonderflow_charts__WEBPACK_IMPORTED_MODULE_0__.vz,Object.assign({},args))};Template.displayName="Template";var Default=Template.bind({});Default.args={};var withOverlay=Template.bind({});withOverlay.args={subtitle:"with a series and one overlay",overlay:{dataKey:["overlay"],label:"Overlay"}};var withMultipleOverlay=Template.bind({});withMultipleOverlay.args={subtitle:"with one series and two overlay",series:{dataKey:["feedback count"],label:"Feedback Count",domain:[0,12e3]},overlay:{dataKey:["overlay","overlayB"],rename:function(o,i){return 0===i?"OverlayA":o},label:"Overlay",domain:[0,1]},data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ZY.slice(11)};var withMultipleSeries=Template.bind({});withMultipleSeries.args={subtitle:"with multiple series and trendlines",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ry,showTrendline:!0,index:{dataKey:"date",label:"Time"},series:{domain:[0,140],dataKey:["positive","negative","neutral"],label:"Pros & cons",style:[void 0,void 0,{fill:"gray"}]}};var withCategoriesOnIndex=Template.bind({});withCategoriesOnIndex.args={subtitle:"with categories on index axis",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ZW,index:{dataKey:"channel",label:"Channels"},series:{dataKey:["1 star","2 stars","3 stars","4 stars","5 stars"],label:"Stars count"}};var withNestedData=Template.bind({});withNestedData.args={subtitle:"rendered from nested data, showing average lines and values",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.FK,showAverage:!0,index:{dataKey:"channel",label:"Channels"},series:{dataKey:["1 star.value","2 stars.value","3 stars.value","4 stars.value","5 stars.value"],extraData:function(datum){return`${datum.percentage}%`},label:"Stars count",domain:[0,4e3]},overlay:{dataKey:["overlay.value"],extraData:function(datum){return`${datum.percentage}%`},rename:function(_){return"Fanta KPI"},label:"Fanta KPI",domain:[0,5]},tooltipExtraContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{children:"some extra content"})};var withBackground=Template.bind({});withBackground.args={subtitle:"with a background",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ry,showBackground:!0,index:{dataKey:"date",label:"Time"},series:{domain:[0,140],dataKey:["positive","negative","neutral"],label:"Pros & cons",style:[void 0,void 0,{fill:"gray"}]}};var withAscendingOrder=Template.bind({});withAscendingOrder.args={subtitle:"with values sorted in ascending order",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ry,sortBy:"ascending-value",index:{dataKey:"date",label:"Time"},series:{domain:[0,140],dataKey:["positive","negative","neutral"],label:"Pros & cons",style:[void 0,void 0,{fill:"gray"}]}};var withDescendingOrder=Template.bind({});withDescendingOrder.args={subtitle:"with values sorted in descending order",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ry,sortBy:"descending-value",index:{dataKey:"date",label:"Time"},series:{domain:[0,140],dataKey:["positive","negative","neutral"],label:"Pros & cons",style:[void 0,void 0,{fill:"gray"}]}};var PositiveAndNegative=Template.bind({});PositiveAndNegative.args={subtitle:"with positive and negative values and mirrored domains",data:_mock_data_positiveNegative__WEBPACK_IMPORTED_MODULE_3__.X,series:{dataKey:["feedback count"],label:"Feedback Count"},overlay:{dataKey:["overlay"],label:"Overlay"},mirrorDomains:!0};var withVerticalFixedBars=Template.bind({});withVerticalFixedBars.args={subtitle:"with vertical layout and fixed thickness bars",overlay:{dataKey:["overlay"],label:"Overlay",domain:[0,1]},fixedBarSize:!0,layout:_wonderflow_charts__WEBPACK_IMPORTED_MODULE_0__.yU.VERTICAL};var withMissingData=Template.bind({});withMissingData.args={data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.G0,subtitle:"with missing values",overlay:{dataKey:["overlay"],label:"Overlay"}};var withCustomBarStyle=Template.bind({});withCustomBarStyle.args={subtitle:"with multiple series and custom colors",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ry,index:{dataKey:"date",label:"Time"},series:{dataKey:["positive","negative","neutral"],label:"Pros & cons",style:[{fill:"slateGray"},{fill:"salmon"},{fill:"lightBlue"}]}};var withBrush=Template.bind({});withBrush.args={data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.RB,subtitle:"with brush and twelve series, one for each color of the default theme",sortBy:"descending-value",showBackground:!0,showBrush:!0,index:{dataKey:"date",label:"Year"},series:{dataKey:["QN95B Neo QLED 4K TV","Q800A Neo QLED 4K TV","Q60A QLED 4K TV","C2 OLED 4K TV","G2 OLED Evo 4K TV","B2 OLED 4K TV","A95K QD-OLED 4K TV","X95J LED 4K TV","X85J LED 4K TV","R6485Q Mini-LED QLED 4K TV","S546Q 4K QLED TV","S435 4K Roku TV"],label:"Product Units",tickFormat:function(l){return`${l}K`},domain:[0,1e3],hideZero:!0}};var WithMenu=Template.bind({});WithMenu.args={subtitle:"with custom style and menu",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ry,index:{dataKey:"date",label:"Time"},series:{dataKey:["positive","negative","neutral"],label:"Pros & cons",style:[{fill:"slateGray"},{fill:"salmon"},{fill:"lightBlue"}]},menu:_line_chart_stories__WEBPACK_IMPORTED_MODULE_4__.FakeMenu};var WithinCardTemplate=function(args){var theme=args.theme;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.Zb,{bordered:!0,className:_sb_charts_module_css__WEBPACK_IMPORTED_MODULE_5___default().Card,style:{backgroundColor:"dark"===theme?"#202227":void 0},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wonderflow_charts__WEBPACK_IMPORTED_MODULE_0__.vz,Object.assign({},args))})};WithinCardTemplate.displayName="WithinCardTemplate";var WithinCard=WithinCardTemplate.bind({});WithinCard.args={subtitle:"within a card 75vh and width 100%",series:{dataKey:["feedback count"],label:"Feedback Count",domain:[0,12e3]},overlay:{dataKey:["overlay","overlayB"],rename:function(o,i){return 0===i?"OverlayA":o},label:"Overlay",domain:[0,1]},data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ZY.slice(10,15),hidePadding:!0,theme:"dark"},Default.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},Default.parameters),withOverlay.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},withOverlay.parameters),withMultipleOverlay.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},withMultipleOverlay.parameters),withMultipleSeries.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},withMultipleSeries.parameters),withCategoriesOnIndex.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},withCategoriesOnIndex.parameters),withNestedData.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},withNestedData.parameters),withBackground.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},withBackground.parameters),withAscendingOrder.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},withAscendingOrder.parameters),withDescendingOrder.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},withDescendingOrder.parameters),PositiveAndNegative.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},PositiveAndNegative.parameters),withVerticalFixedBars.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},withVerticalFixedBars.parameters),withMissingData.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},withMissingData.parameters),withCustomBarStyle.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},withCustomBarStyle.parameters),withBrush.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},withBrush.parameters),WithMenu.parameters=Object.assign({storySource:{source:"(args: BarChartProps) => <BarChart {...args} />"}},WithMenu.parameters),WithinCard.parameters=Object.assign({storySource:{source:"(args) => {\n  const { theme } = args;\n  return (\n    <Card\n      bordered\n      className={styles.Card}\n      style={{ backgroundColor: theme === 'dark' ? '#202227' : undefined }}\n    >\n      <BarChart {...args} />\n    </Card>\n  );\n}"}},WithinCard.parameters);var __namedExportsOrder=["Default","withOverlay","withMultipleOverlay","withMultipleSeries","withCategoriesOnIndex","withNestedData","withBackground","withAscendingOrder","withDescendingOrder","PositiveAndNegative","withVerticalFixedBars","withMissingData","withCustomBarStyle","withBrush","WithMenu","WithinCard"];try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/examples/charts/storybook/stack-bar-chart.stories.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"src/examples/charts/storybook/stack-bar-chart.stories.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}},"./src/examples/charts/mock-data/positiveNegative.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function cov_15lbqloqt2(){var path="/Users/patrick/Workspace/wanda/packages/react-components/src/examples/charts/mock-data/positiveNegative.ts",global=new Function("return this")(),gcv="__coverage__",coverage=global[gcv]||(global[gcv]={});coverage[path]&&"fed728927c9eee0733e6758c6a6e0658eee732df"===coverage[path].hash||(coverage[path]={path:"/Users/patrick/Workspace/wanda/packages/react-components/src/examples/charts/mock-data/positiveNegative.ts",statementMap:{0:{start:{line:17,column:32},end:{line:172,column:1}}},fnMap:{},branchMap:{},s:{0:0},f:{},b:{},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"fed728927c9eee0733e6758c6a6e0658eee732df"});var actualCoverage=coverage[path];return cov_15lbqloqt2=function(){return actualCoverage},actualCoverage}__webpack_require__.d(__webpack_exports__,{X:()=>positiveNegative}),cov_15lbqloqt2();var positiveNegative=(cov_15lbqloqt2().s[0]++,[{date:"2002",overlay:.1,"feedback count":16,extraData:null,overlayB:.31},{date:"2003",overlay:-.21,"feedback count":30,extraData:null,overlayB:.1},{date:"2004",overlay:-.14,"feedback count":20,extraData:null,overlayB:.43},{date:"2005",overlay:.3,"feedback count":52,extraData:null,overlayB:.33},{date:"2006",overlay:.14,"feedback count":131,extraData:null,overlayB:.24},{date:"2007",overlay:-.18,"feedback count":462,extraData:null,overlayB:.12},{date:"2008",overlay:.16,"feedback count":419,extraData:null,overlayB:.27},{date:"2009",overlay:.13,"feedback count":266,extraData:null,overlayB:.31},{date:"2010",overlay:.15,"feedback count":273,extraData:null,overlayB:.75},{date:"2011",overlay:.21,"feedback count":491,extraData:null,overlayB:.72},{date:"2012",overlay:.22,"feedback count":558,extraData:null,overlayB:.58},{date:"2013",overlay:.31,"feedback count":2414,extraData:null,overlayB:.61},{date:"2014",overlay:.12,"feedback count":8031,extraData:null,overlayB:.27},{date:"2015",overlay:.27,"feedback count":9196,extraData:null,overlayB:.36},{date:"2016",overlay:-.14,"feedback count":5869,extraData:null,overlayB:.35},{date:"2017",overlay:-.24,"feedback count":8786,extraData:null,overlayB:.64},{date:"2018",overlay:-.32,"feedback count":4182,extraData:null,overlayB:.62},{date:"2019",overlay:.1,"feedback count":8303,extraData:null,overlayB:.5},{date:"2020",overlay:.34,"feedback count":11490,extraData:null,overlayB:.47},{date:"2021",overlay:.53,"feedback count":5539,extraData:null,overlayB:.34},{date:"2022",overlay:.75,"feedback count":2952,extraData:null,overlayB:.45},{date:"2023",overlay:.74,"feedback count":1746,extraData:null,overlayB:.29}])}}]);