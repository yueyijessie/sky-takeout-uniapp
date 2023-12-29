<template>
	<view style="flex:1;background-color: #f1f2f5;">
		<scroll-view scroll-y="true" :style="{height:swiperHeight+'px',width:swiperWidth+'px'}">
			 <block v-for="(tab,index) in tabBars" :key="tab.id">
				<view 
				class="swiper-tab-list" 
				:class="{'active':(tabIndexShow===index)}" 
				@tap="tabtap(index)">
					{{tab.name}} {{tab.num?tab.num:''}}
					<view class="swiper-tab-line"></view>
				</view>
			 </block>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		props:{
			tabBars:Array,
			tabIndexShow:Number,
			swiperHeight:Number,
			swiperWidth:Number
		},
		methods: {
			// tab点击事件
			tabtap(index) {
				this.$emit('tabtap',index)
				// 子组件相同名称的属性值改变后，父组件的对应监听事件结束后，将修改父组件的该属性和子属性一样
				// this.tabIndex = index;
			},
		}
	}
</script>

<style scoped>
	.swiper-tab-list{
		width: 100%;text-align: center;
		color: #808080;
		font-size: 36upx;
		height: 160upx;
		line-height: 160upx;
	}
	.active {
		color: #000000;
		font-weight: bold;
		background-color: #FFFFFF;
	}
</style>
