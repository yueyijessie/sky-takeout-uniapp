(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/historyOrder/historyOrder"],{"0a5d":function(t,e,n){"use strict";n.r(e);var r=n("851b"),i=n("4e76");for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("de82");var o=n("f0c5"),s=Object(o["a"])(i["default"],r["b"],r["c"],!1,null,"09e7cafa",null,!1,r["a"],void 0);e["default"]=s.exports},"4e76":function(t,e,n){"use strict";n.r(e);var r=n("60d1"),i=n.n(r);for(var a in r)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},"60d1":function(t,e,n){"use strict";(function(t){var r=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("2eee")),a=r(n("c973")),o=r(n("9523")),s=n("4d84"),u=n("26cb"),c=n("b194");function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){(0,o.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var l={components:{Empty:function(){n.e("components/empty/empty").then(function(){return resolve(n("824e"))}.bind(null,n)).catch(n.oe)}},data:function(){return{recentOrdersList:[],pageInfo:{page:1,pageSize:10,total:0},status:"",payStatus:"",loadingType:0,showTitle:!1,scrollinto:"tab0",scrollH:0,tabIndex:0,tabBars:["全部订单","待付款","退款"],urlMap:{0:{fn:s.getOrderPage,key:"status"},1:{fn:s.getOrderPage,key:"status"},2:{fn:s.queryOrdersCheckStatus,key:"payStatus"}},textTip:"",showConfirm:!1,isEmpty:!1}},onLoad:function(){this.getList()},onUnload:function(){this.showTitle=!1},onReady:function(){var e=this;t.getSystemInfo({success:function(n){e.scrollH=n.windowHeight-t.upx2px(100)}})},onPullDownRefresh:function(){this.pageInfo.page=1,this.loadingType=0,this.recentOrdersList=[],this.finished=!1,this.getList(),t.stopPullDownRefresh(),this.showTitle=!0},onReachBottom:function(){this.recentOrdersList.length<Number(this.pageInfo.total)&&(this.pageInfo.page++,this.loadingStatus="loading",this.getList(this.status),this.showTitle=!0)},methods:f(f({},(0,u.mapMutations)(["setAddressBackUrl"])),{},{numes:function(t){var e=0,n=0;return t.length>0&&t.forEach((function(t){e+=Number(t.number),n+=Number(t.number)*Number(t.amount)})),{count:e,total:n}},statusWord:function(t){return(0,c.statusWord)(t)},getOvertime:function(t){return(0,c.getOvertime)(t)},getList:function(){var e=this,n=this.urlMap[this.tabIndex].key,r=this.urlMap[this.tabIndex].fn,i={pageSize:10,page:this.pageInfo.page};i[n]=this[n],t.showLoading({title:"加载中",mask:!0}),r(i).then((function(n){1===n.code&&(setTimeout((function(){t.hideLoading()}),100),e.recentOrdersList=e.recentOrdersList.concat(n.data.records),e.pageInfo.total=n.data.total,e.isEmpty=!0)}))},oneMoreOrder:function(e){return(0,a.default)(i.default.mark((function n(){var r,a;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=getCurrentPages(),a=r.findIndex((function(t){return"pages/index/index"===t.route})),n.next=4,(0,s.delShoppingCart)();case 4:(0,s.repetitionOrder)(e).then((function(e){1===e.code&&t.navigateBack({delta:a>-1?r.length-a:1})}));case 5:case"end":return n.stop()}}),n)})))()},changeTab:function(t){this.tabIndex!=t&&(this.tabIndex=t,1===t?(this.status=1,this.payStatus=0):2===t?(this.status=6,this.payStatus=2):(this.status="",this.payStatus=""),this.pageInfo.page=1,this.recentOrdersList=[],this.getList(),this.scrollinto="tab"+t)},onChangeSwiperTab:function(t){this.changeTab(t.detail.current)},dataAdd:function(){var t=Math.ceil(this.pageInfo.total/10);this.pageInfo.page===t?(this.loadingText="没有更多了",this.loading=!0):(this.pageInfo.page++,this.getList())},lower:function(){this.loadingText="数据加载中...",this.loading=!0,this.dataAdd()},goDetail:function(e){this.setAddressBackUrl("/pages/historyOrder/historyOrder"),t.navigateTo({url:"/pages/details/index?orderId="+e})},handleReminder:function(t,e){var n=this;(0,s.reminderOrder)(e).then((function(e){1===e.code&&(n.showConfirm=!0,n.textTip="您的催单信息已发出！",n.$refs.commonPopup.open(t),n.getList(n.status))}))},closePopup:function(t){this.$refs.commonPopup.close(t)},goBack:function(){t.redirectTo({url:"/pages/my/my"})}})};e.default=l}).call(this,n("543d")["default"])},"851b":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={uniNavBar:function(){return n.e("components/uni-nav-bar/uni-nav-bar").then(n.bind(null,"4221"))},uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"bef6a"))}},i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.recentOrdersList&&t.recentOrdersList.length>0),r=t.__map(t.tabBars,(function(e,r){var i=t.__get_orig(e),a=n?t.__map(t.recentOrdersList,(function(e,n){var r=t.__get_orig(e),i=Number(n),a=t.recentOrdersList.length,o=t.statusWord(e.status),s=e.amount.toFixed(2),u=t.numes(e.orderDetailList),c=1===e.status&&t.getOvertime(e.orderTime)>0;return{$orig:r,m0:i,g1:a,m1:o,g2:s,m2:u,m3:c}})):null;return{$orig:i,l0:a}}));t.$mp.data=Object.assign({},{$root:{g0:n,l1:r}})},a=[]},"8f0c":function(t,e,n){"use strict";(function(t,e){var r=n("4ea4");n("f373");r(n("66fd"));var i=r(n("0a5d"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},de82:function(t,e,n){"use strict";var r=n("f031"),i=n.n(r);i.a},f031:function(t,e,n){}},[["8f0c","common/runtime","common/vendor"]]]);