"use strict";(globalThis.webpackChunk_wonderflow_react_components=globalThis.webpackChunk_wonderflow_react_components||[]).push([[7170],{"./src/examples/charts/storybook/line-chart.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,FakeMenu:()=>FakeMenu,WithMenu:()=>WithMenu,WithinCard:()=>WithinCard,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__,renderAsLines:()=>renderAsLines,renderAsSteps:()=>renderAsSteps,withAverage:()=>withAverage,withBrush:()=>withBrush,withCategoriesOnIndex:()=>withCategoriesOnIndex,withCustomDomain:()=>withCustomDomain,withCustomLineStyle:()=>withCustomLineStyle,withMissingData:()=>withMissingData,withMultipleOverlay:()=>withMultipleOverlay,withMultipleSeries:()=>withMultipleSeries,withNestedData:()=>withNestedData,withNoData:()=>withNoData,withOverlay:()=>withOverlay,withTrendline:()=>withTrendline,withVerticalLayout:()=>withVerticalLayout});var _wonderflow_charts__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../charts/dist/index.js"),_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/index.ts"),_mock_data__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/examples/charts/mock-data/index.ts"),_sb_charts_module_css__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/examples/charts/storybook/sb-charts.module.css"),_sb_charts_module_css__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_sb_charts_module_css__WEBPACK_IMPORTED_MODULE_3__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),FakeMenu=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_1__.v2,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.v2.Item,{autoFocus:!0,icon:"arrow-right",value:"1",description:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment,{children:"this is my description"}),children:"Sample long menu item"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.v2.ItemCheckbox,{onClick:function(){return{}},checked:!0,icon:"check",value:"2",children:"Checkbox item"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.v2.Item,{value:"3",icon:"right-from-bracket",children:"Item option 3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.v2.Separator,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.v2.Item,{value:"4",icon:"arrow-down-to-bracket",children:"Even shorter"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.v2.Item,{value:"5",disabled:!0,children:"Really?"})]});const __WEBPACK_DEFAULT_EXPORT__={title:"Charts/Line Chart",component:_wonderflow_charts__WEBPACK_IMPORTED_MODULE_0__.wW,args:{title:"Line Charts",subtitle:"A trend line chart",isLoading:!1,showMarker:!1,showMarkerLabel:!1,showAverage:!1,showTrendline:!1,showBrush:!1,hideMissingDataConnection:!1,hideLegend:!1,hidePadding:!1,preventTooltipDisplay:!1,preventResponsive:!1,layout:_wonderflow_charts__WEBPACK_IMPORTED_MODULE_0__.yU.HORIZONTAL,renderAs:"curves",theme:"light",mirrorDomains:!1,reverseIndex:!1,data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ZY,index:{dataKey:"date",label:"Year"},series:{dataKey:["feedback count"],label:"Feedback Count"},overlay:void 0,menu:void 0},argTypes:{layout:{options:["horizontal","vertical"],control:{type:"radio"}},renderAs:{options:["curves","lines","steps"],control:{type:"radio"}},theme:{options:["light","dark"],control:{type:"radio"}}}};var Template=function(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wonderflow_charts__WEBPACK_IMPORTED_MODULE_0__.wW,Object.assign({},args))};Template.displayName="Template";var Default=Template.bind({});Default.args={};var withOverlay=Template.bind({});withOverlay.args={subtitle:"A trend line chart with overlay",overlay:{dataKey:["overlay"],label:"Overlay"}};var withMultipleOverlay=Template.bind({});withMultipleOverlay.args={subtitle:"A trend line chart with overlay",overlay:{dataKey:["overlay","overlayB"],label:"Overlay"}};var withAverage=Template.bind({});withAverage.args={subtitle:"A trend line chart with average",showAverage:!0};var withTrendline=Template.bind({});withTrendline.args={subtitle:"A trend line chart with overlay and trendlines",overlay:{dataKey:["overlay"],label:"Overlay"},showTrendline:!0};var withMissingData=Template.bind({});withMissingData.args={data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.G0,subtitle:"A trend line chart with null values",overlay:{dataKey:["overlay"],label:"Overlay"}};var withMultipleSeries=Template.bind({});withMultipleSeries.args={title:"Multiple Series",subtitle:"A trend line chart with multiple series",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ry,index:{dataKey:"date",label:"Time"},series:{domain:[0,200],dataKey:["positive","negative","neutral"],label:"Pros & cons",style:[void 0,void 0,{stroke:"gray"}]}};var withCategoriesOnIndex=Template.bind({});withCategoriesOnIndex.args={title:"Multiple Series",subtitle:"A line chart with categories on index",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ZW,index:{dataKey:"channel",label:"Channels"},series:{dataKey:["1 star","2 stars","3 stars","4 stars","5 stars"],label:"Feedback count"}};var withNestedData=Template.bind({});withNestedData.args={title:"Multiple Series",subtitle:"A line chart rendered from nested data",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.FK,index:{dataKey:"channel",label:"Channels"},series:{dataKey:["1 star.value","2 stars.value","3 stars.value","4 stars.value","5 stars.value"],label:"Feedback count",rename:function(_,i){return Array(i+1).fill("⭐").join()}},overlay:{dataKey:["overlay.value"],label:"TGW",domain:[0,5],style:[{strokeDasharray:"2 4"}]},tooltip:{extraSeriesData:function(series){return`${series.percentage}%`},extraOverlayData:function(overlay){return`${overlay.percentage}%`},extraContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{children:"some extra content"})},renderAs:"lines",layout:_wonderflow_charts__WEBPACK_IMPORTED_MODULE_0__.yU.VERTICAL,showMarker:!0};var withCustomLineStyle=Template.bind({});withCustomLineStyle.args={title:"Multiple Series",subtitle:"A trend line chart with multiple series",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ry,index:{dataKey:"date",label:"Time"},series:{dataKey:["positive","negative","neutral"],label:"Pros & cons",style:[void 0,{stroke:"red",strokeDasharray:"6 8",strokeOpacity:"0.5",strokeWidth:"3"},{stroke:"grey",strokeDasharray:"2 4",strokeOpacity:"0.8",strokeWidth:"1.5"}]}};var withBrush=Template.bind({});withBrush.args={data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.RB,subtitle:"A trend line chart with twelve series",renderAs:"lines",showMarker:!0,showBrush:!0,index:{dataKey:"date",label:"Year"},series:{dataKey:["QN95B Neo QLED 4K TV","Q800A Neo QLED 4K TV","Q60A QLED 4K TV","C2 OLED 4K TV","G2 OLED Evo 4K TV","B2 OLED 4K TV","A95K QD-OLED 4K TV","X95J LED 4K TV","X85J LED 4K TV","R6485Q Mini-LED QLED 4K TV","S546Q 4K QLED TV","S435 4K Roku TV"],label:"Product Units",tickFormat:function(l){return`${l}K`},domain:[0,1e3],hideZero:!0}};var withCustomDomain=Template.bind({});withCustomDomain.args={subtitle:"A trend line chart with custom domain",series:{dataKey:["feedback count"],label:"Feedback Count",domain:[-12e3,12e3]},index:{dataKey:"date",label:"Year"}};var withVerticalLayout=Template.bind({});withVerticalLayout.args={layout:_wonderflow_charts__WEBPACK_IMPORTED_MODULE_0__.yU.VERTICAL,overlay:{dataKey:["overlay"],label:"Overlay"},index:{dataKey:"date",label:"Year"},series:{dataKey:["feedback count"],label:"Feedback Count"}};var withNoData=Template.bind({});withNoData.args={data:[],title:"Line Charts",subtitle:"A trend line chart w/o data",emptyStateMessage:"Please select items from the right menu to render the chart."};var WithMenu=Template.bind({});WithMenu.args={menu:FakeMenu};var renderAsLines=Template.bind({});renderAsLines.args={title:"Multiple Series",subtitle:"A trend line chart rendered with lines",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ry,renderAs:"lines",index:{dataKey:"date",label:"Time"},series:{domain:[0,200],dataKey:["positive","negative"],label:"Pros & cons"}};var renderAsSteps=Template.bind({});renderAsSteps.args={title:"Multiple Series",subtitle:"A trend line chart rendered with steps",data:_mock_data__WEBPACK_IMPORTED_MODULE_2__.ry,renderAs:"steps",index:{dataKey:"date",label:"Time"},series:{domain:[0,200],dataKey:["positive","negative"],label:"Pros & cons"}};var WithinCardTemplate=function(args){var theme=args.theme;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.Zb,{bordered:!0,className:_sb_charts_module_css__WEBPACK_IMPORTED_MODULE_3___default().Card,style:{backgroundColor:"dark"===theme?"#202227":void 0},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wonderflow_charts__WEBPACK_IMPORTED_MODULE_0__.wW,Object.assign({},args))})};WithinCardTemplate.displayName="WithinCardTemplate";var WithinCard=WithinCardTemplate.bind({});WithinCard.args={subtitle:"A trend line chart within a card 75vh and width 100%",hidePadding:!0},Default.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},Default.parameters),withOverlay.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},withOverlay.parameters),withMultipleOverlay.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},withMultipleOverlay.parameters),withAverage.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},withAverage.parameters),withTrendline.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},withTrendline.parameters),withMissingData.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},withMissingData.parameters),withMultipleSeries.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},withMultipleSeries.parameters),withCategoriesOnIndex.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},withCategoriesOnIndex.parameters),withNestedData.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},withNestedData.parameters),withCustomLineStyle.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},withCustomLineStyle.parameters),withBrush.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},withBrush.parameters),withCustomDomain.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},withCustomDomain.parameters),withVerticalLayout.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},withVerticalLayout.parameters),withNoData.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},withNoData.parameters),WithMenu.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},WithMenu.parameters),renderAsLines.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},renderAsLines.parameters),renderAsSteps.parameters=Object.assign({storySource:{source:"(args: LineChartProps) => <LineChart {...args} />"}},renderAsSteps.parameters),WithinCard.parameters=Object.assign({storySource:{source:"(args) => {\n  const { theme } = args;\n  return (\n    <Card\n      bordered\n      className={styles.Card}\n      style={{ backgroundColor: theme === 'dark' ? '#202227' : undefined }}\n    >\n      <LineChart {...args} />\n    </Card>\n  );\n}"}},WithinCard.parameters);var __namedExportsOrder=["FakeMenu","Default","withOverlay","withMultipleOverlay","withAverage","withTrendline","withMissingData","withMultipleSeries","withCategoriesOnIndex","withNestedData","withCustomLineStyle","withBrush","withCustomDomain","withVerticalLayout","withNoData","WithMenu","renderAsLines","renderAsSteps","WithinCard"];try{ComponentMeta.displayName="ComponentMeta",ComponentMeta.__docgenInfo={description:"For the common case where a component's stories are simple components that receives args as props:\n\n```tsx\nexport default { ... } as ComponentMeta<typeof Button>;\n```",displayName:"ComponentMeta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/examples/charts/storybook/line-chart.stories.tsx#ComponentMeta"]={docgenInfo:ComponentMeta.__docgenInfo,name:"ComponentMeta",path:"src/examples/charts/storybook/line-chart.stories.tsx#ComponentMeta"})}catch(__react_docgen_typescript_loader_error){}},"./src/examples/charts/mock-data/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function cov_2f5x90ujsp(){var path="/Users/patrick/Workspace/wanda/packages/react-components/src/examples/charts/mock-data/channels.ts",global=new Function("return this")(),gcv="__coverage__",coverage=global[gcv]||(global[gcv]={});coverage[path]&&"840ad18329f690172413eb6915fb4fedcf05f15c"===coverage[path].hash||(coverage[path]={path:"/Users/patrick/Workspace/wanda/packages/react-components/src/examples/charts/mock-data/channels.ts",statementMap:{0:{start:{line:17,column:24},end:{line:170,column:1}},1:{start:{line:172,column:25},end:{line:218,column:1}},2:{start:{line:220,column:30},end:{line:396,column:1}}},fnMap:{},branchMap:{},s:{0:0,1:0,2:0},f:{},b:{},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"840ad18329f690172413eb6915fb4fedcf05f15c"});var actualCoverage=coverage[path];return cov_2f5x90ujsp=function(){return actualCoverage},actualCoverage}__webpack_require__.d(__webpack_exports__,{ZW:()=>channels,FK:()=>channelsB,ZY:()=>feedbackCount,G0:()=>feedbackCountGaps,ry:()=>proCons,RB:()=>products}),cov_2f5x90ujsp();var channels=(cov_2f5x90ujsp().s[0]++,[{channel:"amazon.ca","1 star":159,"2 stars":51,"3 stars":66,"4 stars":157,"5 stars":150},{channel:"amazon.co.uk","1 star":33,"2 stars":8,"3 stars":18,"4 stars":18,"5 stars":241},{channel:"amazon.com","1 star":679,"2 stars":284,"3 stars":370,"4 stars":866,"5 stars":830},{channel:"amazon.com.au","1 star":0,"2 stars":0,"3 stars":1,"4 stars":0,"5 stars":3},{channel:"amazon.de","1 star":21,"2 stars":6,"3 stars":11,"4 stars":12,"5 stars":86},{channel:"amazon.es","1 star":0,"2 stars":0,"3 stars":0,"4 stars":0,"5 stars":6},{channel:"amazon.fr","1 star":18,"2 stars":3,"3 stars":9,"4 stars":10,"5 stars":78},{channel:"amazon.in","1 star":16,"2 stars":4,"3 stars":9,"4 stars":7,"5 stars":66},{channel:"amazon.it","1 star":22,"2 stars":4,"3 stars":9,"4 stars":11,"5 stars":98},{channel:"amazon.nl","1 star":4,"2 stars":0,"3 stars":1,"4 stars":3,"5 stars":23},{channel:"bedbathandbeyond.com","1 star":421,"2 stars":236,"3 stars":529,"4 stars":3217,"5 stars":3554},{channel:"bestbuy.ca","1 star":388,"2 stars":242,"3 stars":562,"4 stars":3548,"5 stars":3863},{channel:"canadiantire.ca","1 star":311,"2 stars":193,"3 stars":468,"4 stars":3108,"5 stars":3448},{channel:"darty.com","1 star":0,"2 stars":0,"3 stars":0,"4 stars":0,"5 stars":5},{channel:"myer.com.au","1 star":286,"2 stars":181,"3 stars":452,"4 stars":2984,"5 stars":3350},{channel:"otto.de","1 star":19,"2 stars":18,"3 stars":56,"4 stars":56,"5 stars":184},{channel:"productreview.com.au","1 star":19,"2 stars":13,"3 stars":9,"4 stars":20,"5 stars":130},{channel:"target.com","1 star":349,"2 stars":206,"3 stars":484,"4 stars":3264,"5 stars":3635},{channel:"wayfair.com","1 star":128,"2 stars":64,"3 stars":120,"4 stars":588,"5 stars":766}]),channelsB=(cov_2f5x90ujsp().s[1]++,[{channel:"bestbuy.ca","1 star":{value:388,percentage:10},"2 stars":{value:242,percentage:8},"3 stars":{value:562,percentage:12},"4 stars":{value:3548,percentage:21},"5 stars":{value:3863,percentage:87},overlay:{value:3.8,percentage:7}},{channel:"amazon.com","1 star":{value:339,percentage:10},"2 stars":{value:208,percentage:10},"3 stars":{value:418,percentage:24},"4 stars":{value:3218,percentage:18},"5 stars":{value:3637,percentage:67},overlay:{value:3.6,percentage:6}},{channel:"bedbathandbeyond.com","1 star":{value:421,percentage:13},"2 stars":{value:234,percentage:2},"3 stars":{value:529,percentage:0},"4 stars":{value:3216,percentage:28},"5 stars":{value:3541,percentage:76},overlay:{value:1,percentage:3}},{channel:"canadiant.ca","1 star":{value:310,percentage:1},"2 stars":{value:193,percentage:0},"3 stars":{value:468,percentage:2},"4 stars":{value:3109,percentage:41},"5 stars":{value:3444,percentage:54},overlay:{value:3.4,percentage:5}},{channel:"myer.max.au","1 star":{value:286,percentage:2},"2 stars":{value:181,percentage:0},"3 stars":{value:511,percentage:4},"4 stars":{value:2912,percentage:5},"5 stars":{value:3086,percentage:12},overlay:{value:1.8,percentage:1}}]);cov_2f5x90ujsp().s[2]++;function cov_ck5alfus4(){var path="/Users/patrick/Workspace/wanda/packages/react-components/src/examples/charts/mock-data/feedbackCount.ts",global=new Function("return this")(),gcv="__coverage__",coverage=global[gcv]||(global[gcv]={});coverage[path]&&"6cd4b8c147c8a1dba5be8b04443b2ccb1138ec47"===coverage[path].hash||(coverage[path]={path:"/Users/patrick/Workspace/wanda/packages/react-components/src/examples/charts/mock-data/feedbackCount.ts",statementMap:{0:{start:{line:17,column:29},end:{line:172,column:1}},1:{start:{line:174,column:33},end:{line:307,column:1}}},fnMap:{},branchMap:{},s:{0:0,1:0},f:{},b:{},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"6cd4b8c147c8a1dba5be8b04443b2ccb1138ec47"});var actualCoverage=coverage[path];return cov_ck5alfus4=function(){return actualCoverage},actualCoverage}cov_ck5alfus4();var feedbackCount=(cov_ck5alfus4().s[0]++,[{date:"2002",overlay:.1,"feedback count":16,extraData:null,overlayB:.31},{date:"2003",overlay:.11,"feedback count":30,extraData:null,overlayB:.1},{date:"2004",overlay:.14,"feedback count":20,extraData:null,overlayB:.43},{date:"2005",overlay:.13,"feedback count":52,extraData:null,overlayB:.33},{date:"2006",overlay:.14,"feedback count":131,extraData:null,overlayB:.24},{date:"2007",overlay:.18,"feedback count":462,extraData:null,overlayB:.12},{date:"2008",overlay:.16,"feedback count":419,extraData:null,overlayB:.27},{date:"2009",overlay:.13,"feedback count":266,extraData:null,overlayB:.31},{date:"2010",overlay:.15,"feedback count":273,extraData:null,overlayB:.75},{date:"2011",overlay:.21,"feedback count":491,extraData:null,overlayB:.72},{date:"2012",overlay:.22,"feedback count":558,extraData:null,overlayB:.58},{date:"2013",overlay:.11,"feedback count":2414,extraData:null,overlayB:.61},{date:"2014",overlay:.12,"feedback count":8031,extraData:null,overlayB:.27},{date:"2015",overlay:.17,"feedback count":9196,extraData:null,overlayB:.36},{date:"2016",overlay:.14,"feedback count":5869,extraData:null,overlayB:.35},{date:"2017",overlay:.24,"feedback count":8786,extraData:null,overlayB:.64},{date:"2018",overlay:.32,"feedback count":4182,extraData:null,overlayB:.62},{date:"2019",overlay:.31,"feedback count":8303,extraData:null,overlayB:.5},{date:"2020",overlay:.44,"feedback count":11490,extraData:null,overlayB:.47},{date:"2021",overlay:.53,"feedback count":5539,extraData:null,overlayB:.34},{date:"2022",overlay:.75,"feedback count":2952,extraData:null,overlayB:.45},{date:"2023",overlay:.74,"feedback count":1746,extraData:null,overlayB:.29}]),feedbackCountGaps=(cov_ck5alfus4().s[1]++,[{date:"2002",overlay:.1,"feedback count":16,extraData:null},{date:"2003",overlay:.11,"feedback count":30,extraData:null},{date:"2004",overlay:.14,"feedback count":20,extraData:null},{date:"2005",overlay:.13,"feedback count":52,extraData:null},{date:"2006",overlay:.14,"feedback count":131,extraData:null},{date:"2007",overlay:.18,"feedback count":462,extraData:null},{date:"2008",overlay:.16,"feedback count":419,extraData:null},{date:"2009",overlay:.13,"feedback count":null,extraData:null},{date:"2010",overlay:.15,"feedback count":null,extraData:null},{date:"2011",overlay:.21,"feedback count":null,extraData:null},{date:"2012",overlay:null,"feedback count":null,extraData:null},{date:"2013",overlay:null,"feedback count":2414,extraData:null},{date:"2014",overlay:null,"feedback count":8031,extraData:null},{date:"2015",overlay:null,"feedback count":9196,extraData:null},{date:"2016",overlay:.14,"feedback count":5869,extraData:null},{date:"2017",overlay:.24,"feedback count":8786,extraData:null},{date:"2018",overlay:.32,"feedback count":4182,extraData:null},{date:"2019",overlay:.31,"feedback count":null,extraData:null},{date:"2020",overlay:.44,"feedback count":null,extraData:null},{date:"2021",overlay:null,"feedback count":null,extraData:null},{date:"2022",overlay:.75,"feedback count":2952,extraData:null},{date:"2023",overlay:.74,"feedback count":1746,extraData:null}]);function cov_11l1torhgn(){var path="/Users/patrick/Workspace/wanda/packages/react-components/src/examples/charts/mock-data/products.ts",global=new Function("return this")(),gcv="__coverage__",coverage=global[gcv]||(global[gcv]={});coverage[path]&&"e53bc778ab162ab7bde4040ef878379f90285bff"===coverage[path].hash||(coverage[path]={path:"/Users/patrick/Workspace/wanda/packages/react-components/src/examples/charts/mock-data/products.ts",statementMap:{0:{start:{line:17,column:24},end:{line:338,column:1}}},fnMap:{},branchMap:{},s:{0:0},f:{},b:{},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"e53bc778ab162ab7bde4040ef878379f90285bff"});var actualCoverage=coverage[path];return cov_11l1torhgn=function(){return actualCoverage},actualCoverage}cov_11l1torhgn();var products=(cov_11l1torhgn().s[0]++,[{date:"2000",overlay:.65,"QN95B Neo QLED 4K TV":875,"Q800A Neo QLED 4K TV":715,"Q60A QLED 4K TV":184,"C2 OLED 4K TV":428,"G2 OLED Evo 4K TV":137,"B2 OLED 4K TV":117,"A95K QD-OLED 4K TV":738,"X95J LED 4K TV":811,"X85J LED 4K TV":101,"R6485Q Mini-LED QLED 4K TV":47,"S546Q 4K QLED TV":698,"S435 4K Roku TV":308},{date:"2001",overlay:.3,"QN95B Neo QLED 4K TV":859,"Q800A Neo QLED 4K TV":507,"Q60A QLED 4K TV":123,"C2 OLED 4K TV":322,"G2 OLED Evo 4K TV":146,"B2 OLED 4K TV":132,"A95K QD-OLED 4K TV":605,"X95J LED 4K TV":768,"X85J LED 4K TV":224,"R6485Q Mini-LED QLED 4K TV":61,"S546Q 4K QLED TV":741,"S435 4K Roku TV":259},{date:"2002",overlay:.68,"QN95B Neo QLED 4K TV":633,"Q800A Neo QLED 4K TV":413,"Q60A QLED 4K TV":237,"C2 OLED 4K TV":384,"G2 OLED Evo 4K TV":144,"B2 OLED 4K TV":530,"A95K QD-OLED 4K TV":833,"X95J LED 4K TV":605,"X85J LED 4K TV":316,"R6485Q Mini-LED QLED 4K TV":92,"S546Q 4K QLED TV":616,"S435 4K Roku TV":184},{date:"2003",overlay:.93,"QN95B Neo QLED 4K TV":506,"Q800A Neo QLED 4K TV":452,"Q60A QLED 4K TV":310,"C2 OLED 4K TV":226,"G2 OLED Evo 4K TV":196,"B2 OLED 4K TV":505,"A95K QD-OLED 4K TV":777,"X95J LED 4K TV":632,"X85J LED 4K TV":270,"R6485Q Mini-LED QLED 4K TV":63,"S546Q 4K QLED TV":825,"S435 4K Roku TV":155},{date:"2004",overlay:.81,"QN95B Neo QLED 4K TV":482,"Q800A Neo QLED 4K TV":662,"Q60A QLED 4K TV":275,"C2 OLED 4K TV":221,"G2 OLED Evo 4K TV":181,"B2 OLED 4K TV":579,"A95K QD-OLED 4K TV":679,"X95J LED 4K TV":509,"X85J LED 4K TV":271,"R6485Q Mini-LED QLED 4K TV":85,"S546Q 4K QLED TV":779,"S435 4K Roku TV":149},{date:"2005",overlay:.86,"QN95B Neo QLED 4K TV":503,"Q800A Neo QLED 4K TV":697,"Q60A QLED 4K TV":244,"C2 OLED 4K TV":216,"G2 OLED Evo 4K TV":139,"B2 OLED 4K TV":409,"A95K QD-OLED 4K TV":875,"X95J LED 4K TV":519,"X85J LED 4K TV":221,"R6485Q Mini-LED QLED 4K TV":56,"S546Q 4K QLED TV":789,"S435 4K Roku TV":116},{date:"2006",overlay:.06,"QN95B Neo QLED 4K TV":532,"Q800A Neo QLED 4K TV":658,"Q60A QLED 4K TV":214,"C2 OLED 4K TV":229,"G2 OLED Evo 4K TV":182,"B2 OLED 4K TV":486,"A95K QD-OLED 4K TV":782,"X95J LED 4K TV":503,"X85J LED 4K TV":252,"R6485Q Mini-LED QLED 4K TV":34,"S546Q 4K QLED TV":654,"S435 4K Roku TV":122},{date:"2007",overlay:.67,"QN95B Neo QLED 4K TV":584,"Q800A Neo QLED 4K TV":570,"Q60A QLED 4K TV":262,"C2 OLED 4K TV":183,"G2 OLED Evo 4K TV":176,"B2 OLED 4K TV":522,"A95K QD-OLED 4K TV":649,"X95J LED 4K TV":353,"X85J LED 4K TV":247,"R6485Q Mini-LED QLED 4K TV":41,"S546Q 4K QLED TV":526,"S435 4K Roku TV":266},{date:"2008",overlay:.92,"QN95B Neo QLED 4K TV":499,"Q800A Neo QLED 4K TV":629,"Q60A QLED 4K TV":130,"C2 OLED 4K TV":164,"G2 OLED Evo 4K TV":137,"B2 OLED 4K TV":682,"A95K QD-OLED 4K TV":664,"X95J LED 4K TV":488,"X85J LED 4K TV":156,"R6485Q Mini-LED QLED 4K TV":61,"S546Q 4K QLED TV":474,"S435 4K Roku TV":204},{date:"2009",overlay:.84,"QN95B Neo QLED 4K TV":447,"Q800A Neo QLED 4K TV":687,"Q60A QLED 4K TV":114,"C2 OLED 4K TV":236,"G2 OLED Evo 4K TV":225,"B2 OLED 4K TV":557,"A95K QD-OLED 4K TV":556,"X95J LED 4K TV":458,"X85J LED 4K TV":177,"R6485Q Mini-LED QLED 4K TV":89,"S546Q 4K QLED TV":380,"S435 4K Roku TV":253},{date:"2010",overlay:.34,"QN95B Neo QLED 4K TV":519,"Q800A Neo QLED 4K TV":406,"Q60A QLED 4K TV":155,"C2 OLED 4K TV":180,"G2 OLED Evo 4K TV":243,"B2 OLED 4K TV":445,"A95K QD-OLED 4K TV":555,"X95J LED 4K TV":380,"X85J LED 4K TV":160,"R6485Q Mini-LED QLED 4K TV":71,"S546Q 4K QLED TV":127,"S435 4K Roku TV":187},{date:"2011",overlay:.14,"QN95B Neo QLED 4K TV":500,"Q800A Neo QLED 4K TV":336,"Q60A QLED 4K TV":90,"C2 OLED 4K TV":221,"G2 OLED Evo 4K TV":252,"B2 OLED 4K TV":441,"A95K QD-OLED 4K TV":570,"X95J LED 4K TV":315,"X85J LED 4K TV":147,"R6485Q Mini-LED QLED 4K TV":77,"S546Q 4K QLED TV":237,"S435 4K Roku TV":169},{date:"2012",overlay:.3,"QN95B Neo QLED 4K TV":420,"Q800A Neo QLED 4K TV":374,"Q60A QLED 4K TV":82,"C2 OLED 4K TV":203,"G2 OLED Evo 4K TV":312,"B2 OLED 4K TV":439,"A95K QD-OLED 4K TV":439,"X95J LED 4K TV":385,"X85J LED 4K TV":184,"R6485Q Mini-LED QLED 4K TV":71,"S546Q 4K QLED TV":243,"S435 4K Roku TV":144},{date:"2013",overlay:.41,"QN95B Neo QLED 4K TV":519,"Q800A Neo QLED 4K TV":334,"Q60A QLED 4K TV":103,"C2 OLED 4K TV":192,"G2 OLED Evo 4K TV":474,"B2 OLED 4K TV":389,"A95K QD-OLED 4K TV":414,"X95J LED 4K TV":289,"X85J LED 4K TV":182,"R6485Q Mini-LED QLED 4K TV":40,"S546Q 4K QLED TV":314,"S435 4K Roku TV":241},{date:"2014",overlay:.94,"QN95B Neo QLED 4K TV":668,"Q800A Neo QLED 4K TV":255,"Q60A QLED 4K TV":121,"C2 OLED 4K TV":140,"G2 OLED Evo 4K TV":323,"B2 OLED 4K TV":321,"A95K QD-OLED 4K TV":520,"X95J LED 4K TV":274,"X85J LED 4K TV":207,"R6485Q Mini-LED QLED 4K TV":54,"S546Q 4K QLED TV":347,"S435 4K Roku TV":248},{date:"2015",overlay:.13,"QN95B Neo QLED 4K TV":583,"Q800A Neo QLED 4K TV":259,"Q60A QLED 4K TV":149,"C2 OLED 4K TV":155,"G2 OLED Evo 4K TV":229,"B2 OLED 4K TV":333,"A95K QD-OLED 4K TV":474,"X95J LED 4K TV":298,"X85J LED 4K TV":267,"R6485Q Mini-LED QLED 4K TV":78,"S546Q 4K QLED TV":302,"S435 4K Roku TV":310},{date:"2016",overlay:.88,"QN95B Neo QLED 4K TV":564,"Q800A Neo QLED 4K TV":291,"Q60A QLED 4K TV":101,"C2 OLED 4K TV":165,"G2 OLED Evo 4K TV":270,"B2 OLED 4K TV":345,"A95K QD-OLED 4K TV":463,"X95J LED 4K TV":233,"X85J LED 4K TV":293,"R6485Q Mini-LED QLED 4K TV":90,"S546Q 4K QLED TV":359,"S435 4K Roku TV":283},{date:"2017",overlay:.44,"QN95B Neo QLED 4K TV":631,"Q800A Neo QLED 4K TV":280,"Q60A QLED 4K TV":147,"C2 OLED 4K TV":185,"G2 OLED Evo 4K TV":106,"B2 OLED 4K TV":326,"A95K QD-OLED 4K TV":426,"X95J LED 4K TV":254,"X85J LED 4K TV":210,"R6485Q Mini-LED QLED 4K TV":89,"S546Q 4K QLED TV":216,"S435 4K Roku TV":294},{date:"2018",overlay:.76,"QN95B Neo QLED 4K TV":524,"Q800A Neo QLED 4K TV":231,"Q60A QLED 4K TV":196,"C2 OLED 4K TV":216,"G2 OLED Evo 4K TV":141,"B2 OLED 4K TV":361,"A95K QD-OLED 4K TV":476,"X95J LED 4K TV":246,"X85J LED 4K TV":267,"R6485Q Mini-LED QLED 4K TV":93,"S546Q 4K QLED TV":240,"S435 4K Roku TV":269},{date:"2019",overlay:.34,"QN95B Neo QLED 4K TV":415,"Q800A Neo QLED 4K TV":319,"Q60A QLED 4K TV":263,"C2 OLED 4K TV":275,"G2 OLED Evo 4K TV":223,"B2 OLED 4K TV":142,"A95K QD-OLED 4K TV":575,"X95J LED 4K TV":188,"X85J LED 4K TV":215,"R6485Q Mini-LED QLED 4K TV":82,"S546Q 4K QLED TV":185,"S435 4K Roku TV":321}]);function cov_8xo2h8tkw(){var path="/Users/patrick/Workspace/wanda/packages/react-components/src/examples/charts/mock-data/prosCons.ts",global=new Function("return this")(),gcv="__coverage__",coverage=global[gcv]||(global[gcv]={});coverage[path]&&"761ad25a026dda73a3a7a8d29f7134bdf6e3e8ec"===coverage[path].hash||(coverage[path]={path:"/Users/patrick/Workspace/wanda/packages/react-components/src/examples/charts/mock-data/prosCons.ts",statementMap:{0:{start:{line:17,column:23},end:{line:84,column:1}}},fnMap:{},branchMap:{},s:{0:0},f:{},b:{},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"761ad25a026dda73a3a7a8d29f7134bdf6e3e8ec"});var actualCoverage=coverage[path];return cov_8xo2h8tkw=function(){return actualCoverage},actualCoverage}cov_8xo2h8tkw();var proCons=(cov_8xo2h8tkw().s[0]++,[{date:"2013",positive:1,neutral:2,negative:1},{date:"2014",positive:8,neutral:2,negative:17},{date:"2015",positive:17,neutral:12,negative:33},{date:"2016",positive:30,neutral:7,negative:48},{date:"2017",positive:55,neutral:23,negative:92},{date:"2018",positive:53,neutral:31,negative:108},{date:"2019",positive:52,neutral:18,negative:112},{date:"2020",positive:79,neutral:5,negative:111},{date:"2021",positive:54,neutral:24,negative:77},{date:"2022",positive:24,neutral:6,negative:62},{date:"2023",positive:24,neutral:11,negative:34}]);function cov_2g1ywzi97k(){var path="/Users/patrick/Workspace/wanda/packages/react-components/src/examples/charts/mock-data/index.ts",global=new Function("return this")(),gcv="__coverage__",coverage=global[gcv]||(global[gcv]={});coverage[path]&&"126b75d4b4e8e62271cac25b7a16a75cae2b1c5f"===coverage[path].hash||(coverage[path]={path:"/Users/patrick/Workspace/wanda/packages/react-components/src/examples/charts/mock-data/index.ts",statementMap:{},fnMap:{},branchMap:{},s:{},f:{},b:{},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"126b75d4b4e8e62271cac25b7a16a75cae2b1c5f"});var actualCoverage=coverage[path];return cov_2g1ywzi97k=function(){return actualCoverage},actualCoverage}cov_2g1ywzi97k()}}]);