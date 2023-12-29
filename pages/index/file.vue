<template>
	<view style="display: flex;">
		<!-- 菜单 -->
		<food-menu :tabBars="tabBars" :tabIndexShow="tabIndexShow" :swiperWidth="menuWidth" :swiperHeight="swiperHeight" @tabtap="tabtap"></food-menu>
		<!-- 商品 -->
		<scroll-view scroll-y="true" @scroll="scrollGet($event)" scroll-with-animation :scroll-into-view="'tab_'+tabIndex"
		 :style="{height:swiperHeight+'px',width:foodWidth+'px'}" style="padding-top: 20px;">
			<block v-for="(items,index) in foodsList" :key="index">
				<view :id="'tab_'+tabBars[index].id">
					<view style="font-size: 30upx;height: 40upx;margin-left: 20upx;">
						{{tabBars[index].name}}
					</view>
					<template v-if="items.list.length>0">
						<block v-for="(item,index1) in items.list" :key="index1">
							<food-component @showModal="showModal" :item="item"></food-component>
						</block>
					</template>
					<template v-else>
						该菜单尚未添加商品
					</template>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import foodComponent from "./food-component.vue"
	import foodMenu from "./food-menu.vue"

	export default {
		components: {
			foodComponent,
			foodMenu
		},
		data() {
			return {
				swiperHeight: 0,
				menuWidth: 0,
				foodWidth: 0,
				tabIndexShow: 0,
				tabIndex: 0,
				scroNum: [], //记录商品的高度
				tabBars: [{
						name: "粑粑",
						id: "0"
					},
					{
						name: "粥粥",
						id: "1"
					},
					{
						name: "包包",
						id: "2"
					},
					{
						name: "面面",
						id: "3"
					},
					{
						name: "粉粉",
						id: "4"
					},
					{
						name: "肉肉",
						id: "5"
					},
					{
						name: "套餐",
						id: "6"
					},

					{
						name: "苍穹",
						id: "7"
					}
					,
					{
						name: "肉肉2",
						id: "8"
					},{
						name: "肉肉3",
						id: "9"
					},{
						name: "肉肉4",
						id: "10"
					},
				],
				foodsList: [{
						list: [{
							food_name: "小米南瓜粥", //名字
							food_price: 13.5, //价格
							food_image: "../../static/logo.jpg",
							title: "我是标题",
							num: 100
						}, {
							food_name: "小米南瓜粥", //名字
							food_price: 13.5, //价格
							food_image: "../../static/logo.jpg",
							title: "我是标题",
							num: 100
						},{
							food_name: "小米南瓜粥", //名字
							food_price: 13.5, //价格
							food_image: "../../static/logo.jpg",
							title: "我是标题",
							num: 100
						},{
							food_name: "小米南瓜粥", //名字
							food_price: 13.5, //价格
							food_image: "../../static/logo.jpg",
							title: "我是标题",
							num: 100
						},{
							food_name: "小米南瓜粥", //名字
							food_price: 13.5, //价格
							food_image: "../../static/logo.jpg",
							title: "我是标题",
							num: 100
						},{
							food_name: "小米南瓜粥", //名字
							food_price: 13.5, //价格
							food_image: "../../static/logo.jpg",
							title: "我是标题",
							num: 100
						},{
							food_name: "小米南瓜粥", //名字
							food_price: 13.5, //价格
							food_image: "../../static/logo.jpg",
							title: "我是标题",
							num: 100
						},{
							food_name: "小米南瓜粥", //名字
							food_price: 13.5, //价格
							food_image: "../../static/logo.jpg",
							title: "我是标题",
							num: 100
							},{
							food_name: "小米南瓜粥", //名字
							food_price: 13.5, //价格
							food_image: "../../static/logo.jpg",
							title: "我是标题",
							num: 100
						}]
					},
					{
						list: [{
							food_name: "黑米粥", //名字
							food_price: 199, //价格
							food_image: "../../static/test.jpg",
							title: "我是标题",
							num: 100
						}, {
							food_name: "黑米粥", //名字
							food_price: 199, //价格
							food_image: "../../static/test.jpg",
							title: "我是标题",
							num: 100
						}, {
							food_name: "黑米粥", //名字
							food_price: 199, //价格
							food_image: "../../static/test.jpg",
							title: "我是标题",
							num: 100
						}, {
							food_name: "黑米粥", //名字
							food_price: 199, //价格
							food_image: "../../static/test.jpg",
							title: "我是标题",
							num: 100
						}, {
							food_name: "黑米粥", //名字
							food_price: 199, //价格
							food_image: "../../static/test.jpg",
							title: "我是标题",
							num: 100
						}, {
							food_name: "黑米粥", //名字
							food_price: 199, //价格
							food_image: "../../static/test.jpg",
							title: "我是标题",
							num: 100
						}, {
							food_name: "黑米粥", //名字
							food_price: 199, //价格
							food_image: "../../static/test.jpg",
							title: "我是标题",
							num: 100
						}, {
							food_name: "黑米粥", //名字
							food_price: 199, //价格
							food_image: "../../static/test.jpg",
							title: "我是标题",
							num: 100
						}, {
							food_name: "黑米粥", //名字
							food_price: 199, //价格
							food_image: "../../static/test.jpg",
							title: "我是标题",
							num: 100
						}, {
							food_name: "黑米粥", //名字
							food_price: 199, //价格
							food_image: "../../static/test.jpg",
							title: "我是标题",
							num: 100
						}, {
							food_name: "黑米粥", //名字
							food_price: 199, //价格
							food_image: "../../static/test.jpg",
							title: "我是标题",
							num: 100
						}, ]
					},
					{
						list: [{
							food_name: "白米粥", //名字
							food_price: 299, //价格
							food_image: "../../static/logo.jpg",
							title: "我是标题",
							num: 100,
							priority: 11, //优先级
							display: 1, //是否显示
						}, ]
					},
					{
						list: [{
							food_name: "包子", //名字
							food_price: 5, //价格
							food_image: "../../static/logo.jpg",
							title: "我是标题",
							num: 100
						}, ]
					},
					{
						list: [{
							food_name: "饺子", //名字
							food_price: 100, //价格
							food_image: "../../static/logo.jpg",
							title: "我是标题",
							num: 100
						}, ]
					},
					{
						list: [{
							food_name: "肉肉", //名字
							food_price: 999, //价格
							food_image: "../../static/logo.jpg",
							title: "我是标题",
							num: 100
						}, ]
					}
				]
			}
		},
		onLoad() {
			//初始化页面的组件大小
			uni.getSystemInfo({
				success: (res) => {
					// - uni.upx2px(100) 减去头部的列表
					let height = res.windowHeight
					let windowWidth = res.windowWidth
					this.swiperHeight = height - uni.upx2px(153)
					this.menuWidth = windowWidth / 5
					this.foodWidth = windowWidth * 4 / 5
				}
			});
		},
		mounted() {
			this.loadScroNum();
		},
		methods: {
			//初始化右边商品的高度、起始高度数组，便于右边滑动，左边跟着动
			loadScroNum() {
				for (var i = 0; i < this.tabBars.length; i++) {
					wx.createSelectorQuery().select('#tab_' + i).boundingClientRect(e => {
						this.scroNum.push({
							top: e.top,
							bot: e.top + e.height
						})
					}).exec()
				}
			},
			// 监听子组件的tab点击事件
			tabtap(index) {
				this.tabIndexShow = index;
				this.tabIndex = index;
			},
			//监听右侧商品栏滑动事件，如果当前滑动的长度达到某个个区间内，则该区间的菜单为高亮
			scrollGet(e) {
				var now = parseInt(e.detail.scrollTop) + 40
				for (var i = 0; i < this.tabBars.length; i++) {
					if (now > this.scroNum[i].top && now < this.scroNum[i].bot) {
						this.tabIndexShow = i
						return
					}
				}
			}
		}
	}
</script>

<style>
	.swiper-tab-list {
		width: 100%;
		text-align: center;
		color: #808080;
		font-size: 36upx;
		height: 160upx;
		line-height: 160upx;
	}

	.active {
		color: #FEDE33;
	}
</style>