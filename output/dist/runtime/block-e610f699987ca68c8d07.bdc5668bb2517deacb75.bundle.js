
(window['dojoWebpackJsonplearn_dojo'] = window['dojoWebpackJsonplearn_dojo'] || []).push([['runtime/block-e610f699987ca68c8d07'],{
/***/ 'runtime/block-e610f699987ca68c8d07.js':
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"content":{"tag":"div","children":[{"tag":"p","children":["If you haven't heard, ",{"tag":"a","children":["dojo"],"properties":{"href":"https://dojo.io/","target":"_blank","rel":"nofollow","key":3},"type":"__VNODE_TYPE"}," has gotten an upgrade! The latest version of dojo has some pretty awesome features, not just to build widgets, but it also includes a robust ",{"tag":"a","children":["i18n"],"properties":{"href":"https://dojo.io/docs/index.html#doc--dojo__framework__v3_0_0__src__i18n__README_md","target":"_blank","rel":"nofollow","key":4},"type":"__VNODE_TYPE"}," package for your internationalization needs, a nice selection of ",{"tag":"a","children":["out-of-the-box widgets"],"properties":{"href":"https://dojo.io/tutorials/005_form_widgets/","target":"_blank","rel":"nofollow","key":5},"type":"__VNODE_TYPE"}," and a pretty nice way to ",{"tag":"a","children":["theme your applications"],"properties":{"href":"https://dojo.io/tutorials/007_theming/","target":"_blank","rel":"nofollow","key":6},"type":"__VNODE_TYPE"},"."],"properties":{"key":7},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["A key tool provided by dojo is the ",{"tag":"a","children":["@dojo/cli"],"properties":{"href":"https://dojo.io/tutorials/000_local_installation/","target":"_blank","rel":"nofollow","key":8},"type":"__VNODE_TYPE"},"."],"properties":{"key":9},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["To get started you will want to use npm to install it globally."],"properties":{"key":10},"type":"__VNODE_TYPE"},"\n",{"tag":"pre","children":[{"tag":"code","children":[{"tag":"span","children":["npm"],"properties":{"class":"token function","key":11},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["install"],"properties":{"class":"token function","key":12},"type":"__VNODE_TYPE"}," -g @dojo/cli @dojo/cli-create-app\n"],"properties":{"class":"language-bash","key":13},"type":"__VNODE_TYPE"}],"properties":{"class":"language-bash","key":14},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["Once it's installed, you can type ",{"tag":"code","children":["dojo --help"],"properties":{"key":15},"type":"__VNODE_TYPE"}," into your command line and you should get this spiffy help message."],"properties":{"key":16},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":[{"tag":"img","properties":{"src":"/assets/blog/dojo-cli.png","key":17},"type":"__VNODE_TYPE"}],"properties":{"key":18},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":[{"tag":"em","children":["Nice"],"properties":{"key":19},"type":"__VNODE_TYPE"}],"properties":{"key":20},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["You're one step closer to world domination."],"properties":{"key":21},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["Now you want to actually create an application, which you do with the following."],"properties":{"key":22},"type":"__VNODE_TYPE"},"\n",{"tag":"pre","children":[{"tag":"code","children":["dojo create app --name awesome-dojo-app\n"],"properties":{"class":"language-bash","key":23},"type":"__VNODE_TYPE"}],"properties":{"class":"language-bash","key":24},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["This will take about a minute or so to create your application directory and install all the dependencies for your scaffold application."],"properties":{"key":25},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["Once it's done, you ",{"tag":"code","children":["cd"],"properties":{"key":26},"type":"__VNODE_TYPE"}," into your application directory and use the following command to run it."],"properties":{"key":27},"type":"__VNODE_TYPE"},"\n",{"tag":"pre","children":[{"tag":"code","children":["dojo build --mode dev --watch --serve\n"],"properties":{"class":"language-bash","key":28},"type":"__VNODE_TYPE"}],"properties":{"class":"language-bash","key":29},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["Under the hood, the ",{"tag":"code","children":["@dojo/cli"],"properties":{"key":30},"type":"__VNODE_TYPE"}," is using ",{"tag":"a","children":["webpack"],"properties":{"href":"https://webpack.js.org/","target":"_blank","rel":"nofollow","key":31},"type":"__VNODE_TYPE"}," to build and bundle your application. What we're doing here is:"],"properties":{"key":32},"type":"__VNODE_TYPE"},"\n",{"tag":"ul","children":["\n",{"tag":"li","children":[{"tag":"code","children":["build"],"properties":{"key":33},"type":"__VNODE_TYPE"}," - command to build the application"],"properties":{"key":34},"type":"__VNODE_TYPE"},"\n",{"tag":"li","children":[{"tag":"code","children":["--mode dev"],"properties":{"key":35},"type":"__VNODE_TYPE"}," - use ",{"tag":"code","children":["dev"],"properties":{"key":36},"type":"__VNODE_TYPE"}," mode so that the builds are quicker and not production optimized"],"properties":{"key":37},"type":"__VNODE_TYPE"},"\n",{"tag":"li","children":[{"tag":"code","children":["--watch"],"properties":{"key":38},"type":"__VNODE_TYPE"}," - watch for any file changes and recompile"],"properties":{"key":39},"type":"__VNODE_TYPE"},"\n",{"tag":"li","children":[{"tag":"code","children":["--serve"],"properties":{"key":40},"type":"__VNODE_TYPE"}," - serve the application in a local server for us"],"properties":{"key":41},"type":"__VNODE_TYPE"},"\n"],"properties":{"key":42},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["You should be able to open your browser to ",{"tag":"code","children":["http://localhost:9999/"],"properties":{"key":43},"type":"__VNODE_TYPE"}," and you would see the following"],"properties":{"key":44},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":[{"tag":"img","properties":{"src":"/assets/blog/dojo2.gif","key":45},"type":"__VNODE_TYPE"}],"properties":{"key":46},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":[{"tag":"em","children":["Success"],"properties":{"key":47},"type":"__VNODE_TYPE"}],"properties":{"key":48},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["I'll let you peruse the application provided, but let us take a look at the widget code real quick."],"properties":{"key":49},"type":"__VNODE_TYPE"},"\n",{"tag":"pre","children":[{"tag":"code","children":[{"tag":"span","children":["// src/widgets/HelloWorld.ts"],"properties":{"class":"token comment","key":50},"type":"__VNODE_TYPE"},"\n",{"tag":"span","children":["import"],"properties":{"class":"token keyword","key":51},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["WidgetBase"],"properties":{"class":"token maybe-class-name","key":52},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["from"],"properties":{"class":"token keyword","key":53},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["'@dojo/framework/widget-core/WidgetBase'"],"properties":{"class":"token string","key":54},"type":"__VNODE_TYPE"},{"tag":"span","children":[";"],"properties":{"class":"token punctuation","key":55},"type":"__VNODE_TYPE"},"\n",{"tag":"span","children":["import"],"properties":{"class":"token keyword","key":56},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["{"],"properties":{"class":"token punctuation","key":57},"type":"__VNODE_TYPE"}," v ",{"tag":"span","children":["}"],"properties":{"class":"token punctuation","key":58},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["from"],"properties":{"class":"token keyword","key":59},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["'@dojo/framework/widget-core/d'"],"properties":{"class":"token string","key":60},"type":"__VNODE_TYPE"},{"tag":"span","children":[";"],"properties":{"class":"token punctuation","key":61},"type":"__VNODE_TYPE"},"\n\n",{"tag":"span","children":["import"],"properties":{"class":"token keyword","key":62},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["*"],"properties":{"class":"token operator","key":63},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["as"],"properties":{"class":"token keyword","key":64},"type":"__VNODE_TYPE"}," css ",{"tag":"span","children":["from"],"properties":{"class":"token keyword","key":65},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["'./styles/helloWorld.m.css'"],"properties":{"class":"token string","key":66},"type":"__VNODE_TYPE"},{"tag":"span","children":[";"],"properties":{"class":"token punctuation","key":67},"type":"__VNODE_TYPE"},"\n\n",{"tag":"span","children":["const"],"properties":{"class":"token keyword","key":68},"type":"__VNODE_TYPE"}," logo ",{"tag":"span","children":["="],"properties":{"class":"token operator","key":69},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["require"],"properties":{"class":"token keyword","key":70},"type":"__VNODE_TYPE"},{"tag":"span","children":["("],"properties":{"class":"token punctuation","key":71},"type":"__VNODE_TYPE"},{"tag":"span","children":["'./../img/logo.svg'"],"properties":{"class":"token string","key":72},"type":"__VNODE_TYPE"},{"tag":"span","children":[")"],"properties":{"class":"token punctuation","key":73},"type":"__VNODE_TYPE"},{"tag":"span","children":[";"],"properties":{"class":"token punctuation","key":74},"type":"__VNODE_TYPE"},"\n\n",{"tag":"span","children":["export"],"properties":{"class":"token keyword","key":75},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["class"],"properties":{"class":"token keyword","key":76},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["HelloWorld"],"properties":{"class":"token class-name","key":77},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["extends"],"properties":{"class":"token keyword","key":78},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["WidgetBase"],"properties":{"class":"token class-name","key":79},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["{"],"properties":{"class":"token punctuation","key":80},"type":"__VNODE_TYPE"},"\n    ",{"tag":"span","children":["protected"],"properties":{"class":"token keyword","key":81},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["render"],"properties":{"class":"token function","key":82},"type":"__VNODE_TYPE"},{"tag":"span","children":["("],"properties":{"class":"token punctuation","key":83},"type":"__VNODE_TYPE"},{"tag":"span","children":[")"],"properties":{"class":"token punctuation","key":84},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["{"],"properties":{"class":"token punctuation","key":85},"type":"__VNODE_TYPE"},"\n        ",{"tag":"span","children":["return"],"properties":{"class":"token keyword","key":86},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["v"],"properties":{"class":"token function","key":87},"type":"__VNODE_TYPE"},{"tag":"span","children":["("],"properties":{"class":"token punctuation","key":88},"type":"__VNODE_TYPE"},{"tag":"span","children":["'div'"],"properties":{"class":"token string","key":89},"type":"__VNODE_TYPE"},{"tag":"span","children":[","],"properties":{"class":"token punctuation","key":90},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["{"],"properties":{"class":"token punctuation","key":91},"type":"__VNODE_TYPE"}," classes",{"tag":"span","children":[":"],"properties":{"class":"token punctuation","key":92},"type":"__VNODE_TYPE"}," css",{"tag":"span","children":["."],"properties":{"class":"token punctuation","key":93},"type":"__VNODE_TYPE"},{"tag":"span","children":["root"],"properties":{"class":"token property-access","key":94},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["}"],"properties":{"class":"token punctuation","key":95},"type":"__VNODE_TYPE"},{"tag":"span","children":[","],"properties":{"class":"token punctuation","key":96},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["["],"properties":{"class":"token punctuation","key":97},"type":"__VNODE_TYPE"},"\n            ",{"tag":"span","children":["v"],"properties":{"class":"token function","key":98},"type":"__VNODE_TYPE"},{"tag":"span","children":["("],"properties":{"class":"token punctuation","key":99},"type":"__VNODE_TYPE"},{"tag":"span","children":["'img'"],"properties":{"class":"token string","key":100},"type":"__VNODE_TYPE"},{"tag":"span","children":[","],"properties":{"class":"token punctuation","key":101},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["{"],"properties":{"class":"token punctuation","key":102},"type":"__VNODE_TYPE"}," src",{"tag":"span","children":[":"],"properties":{"class":"token punctuation","key":103},"type":"__VNODE_TYPE"}," logo",{"tag":"span","children":[","],"properties":{"class":"token punctuation","key":104},"type":"__VNODE_TYPE"}," classes",{"tag":"span","children":[":"],"properties":{"class":"token punctuation","key":105},"type":"__VNODE_TYPE"}," css",{"tag":"span","children":["."],"properties":{"class":"token punctuation","key":106},"type":"__VNODE_TYPE"},{"tag":"span","children":["logo"],"properties":{"class":"token property-access","key":107},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["}"],"properties":{"class":"token punctuation","key":108},"type":"__VNODE_TYPE"},{"tag":"span","children":[")"],"properties":{"class":"token punctuation","key":109},"type":"__VNODE_TYPE"},{"tag":"span","children":[","],"properties":{"class":"token punctuation","key":110},"type":"__VNODE_TYPE"},"\n            ",{"tag":"span","children":["v"],"properties":{"class":"token function","key":111},"type":"__VNODE_TYPE"},{"tag":"span","children":["("],"properties":{"class":"token punctuation","key":112},"type":"__VNODE_TYPE"},{"tag":"span","children":["'div'"],"properties":{"class":"token string","key":113},"type":"__VNODE_TYPE"},{"tag":"span","children":[","],"properties":{"class":"token punctuation","key":114},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["{"],"properties":{"class":"token punctuation","key":115},"type":"__VNODE_TYPE"}," classes",{"tag":"span","children":[":"],"properties":{"class":"token punctuation","key":116},"type":"__VNODE_TYPE"}," css",{"tag":"span","children":["."],"properties":{"class":"token punctuation","key":117},"type":"__VNODE_TYPE"},{"tag":"span","children":["label"],"properties":{"class":"token property-access","key":118},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["}"],"properties":{"class":"token punctuation","key":119},"type":"__VNODE_TYPE"},{"tag":"span","children":[","],"properties":{"class":"token punctuation","key":120},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["["],"properties":{"class":"token punctuation","key":121},"type":"__VNODE_TYPE"},{"tag":"span","children":["'Hello, Dojo 2 World!'"],"properties":{"class":"token string","key":122},"type":"__VNODE_TYPE"},{"tag":"span","children":["]"],"properties":{"class":"token punctuation","key":123},"type":"__VNODE_TYPE"},{"tag":"span","children":[")"],"properties":{"class":"token punctuation","key":124},"type":"__VNODE_TYPE"},"\n        ",{"tag":"span","children":["]"],"properties":{"class":"token punctuation","key":125},"type":"__VNODE_TYPE"},{"tag":"span","children":[")"],"properties":{"class":"token punctuation","key":126},"type":"__VNODE_TYPE"},{"tag":"span","children":[";"],"properties":{"class":"token punctuation","key":127},"type":"__VNODE_TYPE"},"\n    ",{"tag":"span","children":["}"],"properties":{"class":"token punctuation","key":128},"type":"__VNODE_TYPE"},"\n",{"tag":"span","children":["}"],"properties":{"class":"token punctuation","key":129},"type":"__VNODE_TYPE"},"\n\n",{"tag":"span","children":["export"],"properties":{"class":"token keyword","key":130},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["default"],"properties":{"class":"token keyword","key":131},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["HelloWorld"],"properties":{"class":"token maybe-class-name","key":132},"type":"__VNODE_TYPE"},{"tag":"span","children":[";"],"properties":{"class":"token punctuation","key":133},"type":"__VNODE_TYPE"},"\n"],"properties":{"class":"language-ts","key":134},"type":"__VNODE_TYPE"}],"properties":{"class":"language-ts","key":135},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["You may not notice right away, but it's all ",{"tag":"a","children":["TypeScript"],"properties":{"href":"http://www.typescriptlang.org/","target":"_blank","rel":"nofollow","key":136},"type":"__VNODE_TYPE"},". Notice, in this widget their are no types or interfaces defined, that's because it's all ",{"tag":"em","children":["inferred"],"properties":{"key":137},"type":"__VNODE_TYPE"}," by the TypeScript compiler to make sure it's valid. The ",{"tag":"em","children":["power of TypeScript!"],"properties":{"key":138},"type":"__VNODE_TYPE"}],"properties":{"key":139},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["Dojo has it's own virtual dom engine for building widgets and uses ",{"tag":"em","children":["hyperscript"],"properties":{"key":140},"type":"__VNODE_TYPE"}," as the default for creating your apps. If you are familiar with ",{"tag":"a","children":["React"],"properties":{"href":"https://reactjs.org/","target":"_blank","rel":"nofollow","key":141},"type":"__VNODE_TYPE"},", hyperscript is what it's like writing it ",{"tag":"a","children":["without the JSX"],"properties":{"href":"https://reactjs.org/docs/react-without-jsx.html","target":"_blank","rel":"nofollow","key":142},"type":"__VNODE_TYPE"},". But the ",{"tag":"code","children":["v"],"properties":{"key":143},"type":"__VNODE_TYPE"}," method is much shorter for dev purposes."],"properties":{"key":144},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["I really like writing my widgets this way, and I won't go into too much detail on building a widget, I'll cover that in another post and you can read more ",{"tag":"a","children":["in the dojo tutorials"],"properties":{"href":"https://dojo.io/tutorials/003_creating_widgets/","target":"_blank","rel":"nofollow","key":145},"type":"__VNODE_TYPE"},"."],"properties":{"key":146},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["But I do realize, some people really love their JSX, so no worries, you can still use JSX if you want."],"properties":{"key":147},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["Just change the ",{"tag":"code","children":[".ts"],"properties":{"key":148},"type":"__VNODE_TYPE"}," file extension to ",{"tag":"code","children":[".tsx"],"properties":{"key":149},"type":"__VNODE_TYPE"}," and convert the hyperscript to JSX like this."],"properties":{"key":150},"type":"__VNODE_TYPE"},"\n",{"tag":"pre","children":[{"tag":"code","children":[{"tag":"span","children":["// src/widgets/HelloWorld.tsx"],"properties":{"class":"token comment","key":151},"type":"__VNODE_TYPE"},"\n",{"tag":"span","children":["import"],"properties":{"class":"token keyword","key":152},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["WidgetBase"],"properties":{"class":"token maybe-class-name","key":153},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["from"],"properties":{"class":"token keyword","key":154},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["'@dojo/framework/widget-core/WidgetBase'"],"properties":{"class":"token string","key":155},"type":"__VNODE_TYPE"},{"tag":"span","children":[";"],"properties":{"class":"token punctuation","key":156},"type":"__VNODE_TYPE"},"\n",{"tag":"span","children":["// tslint:disable-next-line"],"properties":{"class":"token comment","key":157},"type":"__VNODE_TYPE"},"\n",{"tag":"span","children":["import"],"properties":{"class":"token keyword","key":158},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["{"],"properties":{"class":"token punctuation","key":159},"type":"__VNODE_TYPE"}," tsx ",{"tag":"span","children":["}"],"properties":{"class":"token punctuation","key":160},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["from"],"properties":{"class":"token keyword","key":161},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["\"@dojo/framework/widget-core/tsx\""],"properties":{"class":"token string","key":162},"type":"__VNODE_TYPE"},{"tag":"span","children":[";"],"properties":{"class":"token punctuation","key":163},"type":"__VNODE_TYPE"},"\n",{"tag":"span","children":["import"],"properties":{"class":"token keyword","key":164},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["*"],"properties":{"class":"token operator","key":165},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["as"],"properties":{"class":"token keyword","key":166},"type":"__VNODE_TYPE"}," css ",{"tag":"span","children":["from"],"properties":{"class":"token keyword","key":167},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["'./styles/helloWorld.m.css'"],"properties":{"class":"token string","key":168},"type":"__VNODE_TYPE"},{"tag":"span","children":[";"],"properties":{"class":"token punctuation","key":169},"type":"__VNODE_TYPE"},"\n\n",{"tag":"span","children":["const"],"properties":{"class":"token keyword","key":170},"type":"__VNODE_TYPE"}," logo ",{"tag":"span","children":["="],"properties":{"class":"token operator","key":171},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["require"],"properties":{"class":"token keyword","key":172},"type":"__VNODE_TYPE"},{"tag":"span","children":["("],"properties":{"class":"token punctuation","key":173},"type":"__VNODE_TYPE"},{"tag":"span","children":["'./../img/logo.svg'"],"properties":{"class":"token string","key":174},"type":"__VNODE_TYPE"},{"tag":"span","children":[")"],"properties":{"class":"token punctuation","key":175},"type":"__VNODE_TYPE"},{"tag":"span","children":[";"],"properties":{"class":"token punctuation","key":176},"type":"__VNODE_TYPE"},"\n\n",{"tag":"span","children":["export"],"properties":{"class":"token keyword","key":177},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["class"],"properties":{"class":"token keyword","key":178},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["HelloWorld"],"properties":{"class":"token class-name","key":179},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["extends"],"properties":{"class":"token keyword","key":180},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["WidgetBase"],"properties":{"class":"token class-name","key":181},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["{"],"properties":{"class":"token punctuation","key":182},"type":"__VNODE_TYPE"},"\n    ",{"tag":"span","children":["protected"],"properties":{"class":"token keyword","key":183},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["render"],"properties":{"class":"token function","key":184},"type":"__VNODE_TYPE"},{"tag":"span","children":["("],"properties":{"class":"token punctuation","key":185},"type":"__VNODE_TYPE"},{"tag":"span","children":[")"],"properties":{"class":"token punctuation","key":186},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["{"],"properties":{"class":"token punctuation","key":187},"type":"__VNODE_TYPE"},"\n        ",{"tag":"span","children":["return"],"properties":{"class":"token keyword","key":188},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["("],"properties":{"class":"token punctuation","key":189},"type":"__VNODE_TYPE"},"\n            ",{"tag":"span","children":[{"tag":"span","children":[{"tag":"span","children":["<"],"properties":{"class":"token punctuation","key":190},"type":"__VNODE_TYPE"},"div"],"properties":{"class":"token tag","key":191},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["classes"],"properties":{"class":"token attr-name","key":192},"type":"__VNODE_TYPE"},{"tag":"span","children":[{"tag":"span","children":["="],"properties":{"class":"token script-punctuation punctuation","key":193},"type":"__VNODE_TYPE"},{"tag":"span","children":["{"],"properties":{"class":"token punctuation","key":194},"type":"__VNODE_TYPE"},"css",{"tag":"span","children":["."],"properties":{"class":"token punctuation","key":195},"type":"__VNODE_TYPE"},{"tag":"span","children":["root"],"properties":{"class":"token property-access","key":196},"type":"__VNODE_TYPE"},{"tag":"span","children":["}"],"properties":{"class":"token punctuation","key":197},"type":"__VNODE_TYPE"}],"properties":{"class":"token script language-javascript","key":198},"type":"__VNODE_TYPE"},{"tag":"span","children":[">"],"properties":{"class":"token punctuation","key":199},"type":"__VNODE_TYPE"}],"properties":{"class":"token tag","key":200},"type":"__VNODE_TYPE"},{"tag":"span","children":["\n                "],"properties":{"class":"token plain-text","key":201},"type":"__VNODE_TYPE"},{"tag":"span","children":[{"tag":"span","children":[{"tag":"span","children":["<"],"properties":{"class":"token punctuation","key":202},"type":"__VNODE_TYPE"},"img"],"properties":{"class":"token tag","key":203},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["src"],"properties":{"class":"token attr-name","key":204},"type":"__VNODE_TYPE"},{"tag":"span","children":[{"tag":"span","children":["="],"properties":{"class":"token script-punctuation punctuation","key":205},"type":"__VNODE_TYPE"},{"tag":"span","children":["{"],"properties":{"class":"token punctuation","key":206},"type":"__VNODE_TYPE"},"logo",{"tag":"span","children":["}"],"properties":{"class":"token punctuation","key":207},"type":"__VNODE_TYPE"}],"properties":{"class":"token script language-javascript","key":208},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["classes"],"properties":{"class":"token attr-name","key":209},"type":"__VNODE_TYPE"},{"tag":"span","children":[{"tag":"span","children":["="],"properties":{"class":"token script-punctuation punctuation","key":210},"type":"__VNODE_TYPE"},{"tag":"span","children":["{"],"properties":{"class":"token punctuation","key":211},"type":"__VNODE_TYPE"},"css",{"tag":"span","children":["."],"properties":{"class":"token punctuation","key":212},"type":"__VNODE_TYPE"},{"tag":"span","children":["logo"],"properties":{"class":"token property-access","key":213},"type":"__VNODE_TYPE"},{"tag":"span","children":["}"],"properties":{"class":"token punctuation","key":214},"type":"__VNODE_TYPE"}],"properties":{"class":"token script language-javascript","key":215},"type":"__VNODE_TYPE"},{"tag":"span","children":[">"],"properties":{"class":"token punctuation","key":216},"type":"__VNODE_TYPE"}],"properties":{"class":"token tag","key":217},"type":"__VNODE_TYPE"},{"tag":"span","children":[{"tag":"span","children":[{"tag":"span","children":["</"],"properties":{"class":"token punctuation","key":218},"type":"__VNODE_TYPE"},"img"],"properties":{"class":"token tag","key":219},"type":"__VNODE_TYPE"},{"tag":"span","children":[">"],"properties":{"class":"token punctuation","key":220},"type":"__VNODE_TYPE"}],"properties":{"class":"token tag","key":221},"type":"__VNODE_TYPE"},{"tag":"span","children":["\n                "],"properties":{"class":"token plain-text","key":222},"type":"__VNODE_TYPE"},{"tag":"span","children":[{"tag":"span","children":[{"tag":"span","children":["<"],"properties":{"class":"token punctuation","key":223},"type":"__VNODE_TYPE"},"div"],"properties":{"class":"token tag","key":224},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["classes"],"properties":{"class":"token attr-name","key":225},"type":"__VNODE_TYPE"},{"tag":"span","children":[{"tag":"span","children":["="],"properties":{"class":"token script-punctuation punctuation","key":226},"type":"__VNODE_TYPE"},{"tag":"span","children":["{"],"properties":{"class":"token punctuation","key":227},"type":"__VNODE_TYPE"},"css",{"tag":"span","children":["."],"properties":{"class":"token punctuation","key":228},"type":"__VNODE_TYPE"},{"tag":"span","children":["label"],"properties":{"class":"token property-access","key":229},"type":"__VNODE_TYPE"},{"tag":"span","children":["}"],"properties":{"class":"token punctuation","key":230},"type":"__VNODE_TYPE"}],"properties":{"class":"token script language-javascript","key":231},"type":"__VNODE_TYPE"},{"tag":"span","children":[">"],"properties":{"class":"token punctuation","key":232},"type":"__VNODE_TYPE"}],"properties":{"class":"token tag","key":233},"type":"__VNODE_TYPE"},{"tag":"span","children":["Hello Dojo!"],"properties":{"class":"token plain-text","key":234},"type":"__VNODE_TYPE"},{"tag":"span","children":[{"tag":"span","children":[{"tag":"span","children":["</"],"properties":{"class":"token punctuation","key":235},"type":"__VNODE_TYPE"},"div"],"properties":{"class":"token tag","key":236},"type":"__VNODE_TYPE"},{"tag":"span","children":[">"],"properties":{"class":"token punctuation","key":237},"type":"__VNODE_TYPE"}],"properties":{"class":"token tag","key":238},"type":"__VNODE_TYPE"},{"tag":"span","children":["\n            "],"properties":{"class":"token plain-text","key":239},"type":"__VNODE_TYPE"},{"tag":"span","children":[{"tag":"span","children":[{"tag":"span","children":["</"],"properties":{"class":"token punctuation","key":240},"type":"__VNODE_TYPE"},"div"],"properties":{"class":"token tag","key":241},"type":"__VNODE_TYPE"},{"tag":"span","children":[">"],"properties":{"class":"token punctuation","key":242},"type":"__VNODE_TYPE"}],"properties":{"class":"token tag","key":243},"type":"__VNODE_TYPE"},"\n        ",{"tag":"span","children":[")"],"properties":{"class":"token punctuation","key":244},"type":"__VNODE_TYPE"},{"tag":"span","children":[";"],"properties":{"class":"token punctuation","key":245},"type":"__VNODE_TYPE"},"\n    ",{"tag":"span","children":["}"],"properties":{"class":"token punctuation","key":246},"type":"__VNODE_TYPE"},"\n",{"tag":"span","children":["}"],"properties":{"class":"token punctuation","key":247},"type":"__VNODE_TYPE"},"\n\n",{"tag":"span","children":["export"],"properties":{"class":"token keyword","key":248},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["default"],"properties":{"class":"token keyword","key":249},"type":"__VNODE_TYPE"}," ",{"tag":"span","children":["HelloWorld"],"properties":{"class":"token maybe-class-name","key":250},"type":"__VNODE_TYPE"},{"tag":"span","children":[";"],"properties":{"class":"token punctuation","key":251},"type":"__VNODE_TYPE"},"\n"],"properties":{"class":"language-tsx","key":252},"type":"__VNODE_TYPE"}],"properties":{"class":"language-tsx","key":253},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["We need to import the ",{"tag":"code","children":["tsx"],"properties":{"key":254},"type":"__VNODE_TYPE"}," module so that the JSX can be compiled and the default ",{"tag":"code","children":["tslint"],"properties":{"key":255},"type":"__VNODE_TYPE"}," doesn't like unused modules, so you'll also need to add a comment for ",{"tag":"code","children":["tslint"],"properties":{"key":256},"type":"__VNODE_TYPE"}," to ignore that line."],"properties":{"key":257},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["But there you go, you still use JSX in your Dojo widgets!"],"properties":{"key":258},"type":"__VNODE_TYPE"},"\n",{"tag":"p","children":["Be sure to check out the ",{"tag":"a","children":["dojo tutorials"],"properties":{"href":"https://dojo.io/tutorials/","target":"_blank","rel":"nofollow","key":259},"type":"__VNODE_TYPE"}," for more great lessons and also the ",{"tag":"a","children":["docs"],"properties":{"href":"https://dojo.io/docs.html","target":"_blank","rel":"nofollow","key":260},"type":"__VNODE_TYPE"}," if you really want to dig in!"],"properties":{"key":261},"type":"__VNODE_TYPE"}],"properties":{"key":262},"type":"__VNODE_TYPE"},"meta":{"title":"Up and running with @dojo/cli","date":"2018-08-31T00:00:00.000Z","author":"Rene Rubalcava","description":"Get started with the @dojo/cli to build your applications!","tags":"javascript, dojo, typescript, webdev","cover_image":"/assets/blog/up-and-running-with-dojo-cli.jpg","published":true}});
/***/ })
}]);