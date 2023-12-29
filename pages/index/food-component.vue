<template>
	<view class="box">
		<image class="food_image" :src="item.food_image"></image>
		<view class="content">
			<view class="title">{{item.food_name}}</view>
			<view class="foodNum">月售{{item.num}}</view>
			<view class="money">￥{{item.food_price}}</view>
			<view class="search">挑选规格</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object
		},
		data() {
			return {
				
			}
		},
		methods: {
		}
	}
</script>

<style>
	.box{
		min-height: 190rpx;width: 100%;padding: 5rpx;display: flex;
		height: auto;
	}
	.box>.food_image{
		height: 160rpx;width: 160rpx;border-radius: 5%;margin:15rpx
	}
	.box>.content{
		padding: 5rpx;margin-left: 5rpx;width: calc(100% - 195rpx);position: relative;
	}
	.box>.content>.title{
		font-size: 36rpx;font-weight: 600;
	}
	.box>.content>.foodNum{
		font-size: 25rpx;color: #6D6D72;
	}
	.box>.content>.money{
		font-size: 40rpx;color: #FF0000;font-weight: 600;float: left;
	}
	.box>.content>.money{
		font-size: 40rpx;color: #FF0000;font-weight: 600;float: left;
	}
	.box>.content>.search{
		font-size: 32rpx;font-weight: 600;float: right;background-color: #FFA200;position: absolute;right: 40rpx;bottom: 20rpx;border-radius: 5%;padding: 0 5rpx;
	}
</style>
