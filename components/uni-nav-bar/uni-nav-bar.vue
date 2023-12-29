<!--导航标题-->
<template>
	<view class="uni-navbar">
		<view :class="{ 'uni-navbar--fixed': fixed, 'uni-navbar--shadow': shadow, 'uni-navbar--border': border }" :style="{ 'background-color': backgroundColor }"
		 class="uni-navbar__content">
			<uni-status-bar v-if="statusBar" />
			<view :style="{ color: color,backgroundColor: backgroundColor }" class="uni-navbar__header uni-navbar__content_view">
				<view @tap="onClickLeft" class="uni-navbar__header-btns uni-navbar__header-btns-left uni-navbar__content_view">
					<!-- 按钮 -->
					<view class="uni-navbar__content_view" v-if="leftIcon.length">
						<uni-icons :color="color" :type="leftIcon" size="24" />
					</view>
					<!-- end -->
					<view :class="{ 'uni-navbar-btn-icon-left': !leftIcon.length }" class="uni-navbar-btn-text uni-navbar__content_view"
					 v-if="leftText.length">
						<text :style="{ color: color, fontSize: '14px' }">{{ leftText }}</text>
					</view>
					<slot name="left" />
				</view>
				<view class="uni-navbar__header-container uni-navbar__content_view">
					<view class="uni-navbar__header-container-inner uni-navbar__content_view" v-if="title.length">
						<text class="uni-nav-bar-text" :style="{color: color }">{{ title }}</text>
					</view>
					<!-- 标题插槽 -->
					<slot />
				</view>
				<!-- 右侧内容与图标 -->
				<view :class="title.length ? 'uni-navbar__header-btns-right' : ''" @tap="onClickRight" class="uni-navbar__header-btns uni-navbar__content_view">
					<!-- 按钮 -->
					<view class="uni-navbar__content_view" v-if="rightIcon.length">
						<uni-icons :color="color" :type="rightIcon" size="24" />
					</view>
					<!--end-->
					<!-- 优先显示图标 -->
					<view class="uni-navbar-btn-text uni-navbar__content_view" v-if="rightText.length && !rightIcon.length">
						<text class="uni-nav-bar-right-text">{{ rightText }}</text>
					</view>
					<slot name="right" />
				</view>
				<!-- end -->
			</view>
		</view>
		<view class="uni-navbar__placeholder" v-if="fixed">
			<uni-status-bar v-if="statusBar" />
			<view class="uni-navbar__placeholder-view" />
		</view>
	</view>
</template>

<script>
	import uniStatusBar from "../uni-status-bar/uni-status-bar.vue";
	import uniIcons from "../uni-icons/uni-icons.vue";

	export default {
		name: "UniNavBar",
		components: {
			uniStatusBar,
			uniIcons
		},
		props: {
			// 标题
			title: {
				type: String,
				default: ""
			},
			// 导航左侧信息
			leftText: {
				type: String,
				default: ""
			},
			// 导航右侧信息
			rightText: {
				type: String,
				default: ""
			},
			// 左侧图标
			leftIcon: {
				type: String,
				default: ""
			},
			// 右侧图标
			rightIcon: {
				type: String,
				default: ""
			},
			// 定位信息
			fixed: {
				type: [Boolean, String],
				default: false
			},
			// 颜色
			color: {
				type: String,
				default: "#000000"
			},
			// 背景色
			backgroundColor: {
				type: String,
				default: "#FFFFFF"
			},
			// 状态
			statusBar: {
				type: [Boolean, String],
				default: false
			},
			// 是否有阴影
			shadow: {
				type: [String, Boolean],
				default: false
			},
			border: {
				type: [String, Boolean],
				default: true
			}
		},
        mounted() {
          if(uni.report && this.title !== '') {
              uni.report('title', this.title)
          }
        },
		methods: {
			// 触发左侧信息
			onClickLeft() {
				this.$emit("clickLeft");
			},
			// 触发右侧信息
			onClickRight() {
				this.$emit("clickRight");
			}
		}
	};
</script>

<style lang="scss" scoped>
	$nav-height: 44px;
	.uni-nav-bar-text {
		/* #ifdef APP-PLUS */
		font-size: 34rpx;
		/* #endif */
		/* #ifndef APP-PLUS */
		font-size: $uni-font-size-lg;
		/* #endif */
	}
	.uni-nav-bar-right-text {
		font-size: $uni-font-size-base;
	}
	.uni-navbar {
		width: 750rpx;
	}
	.uni-navbar__content {
		position: relative;
		width: 750rpx;
		background-color: $uni-bg-color;
		overflow: hidden;
	}
	.uni-navbar__content_view {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		flex-direction: row;
	}
	.uni-navbar__header {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		width: 750rpx;
		height: $nav-height;
		line-height: $nav-height;
		font-size: 32rpx;
	}
	.uni-navbar__header-btns {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-wrap: nowrap;
		width: 120rpx;
		padding: 0 12rpx;
		justify-content: center;
		align-items: center;
	}
	.uni-navbar__header-btns-left {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		width: 150rpx;
		justify-content: flex-start;
	}
	.uni-navbar__header-btns-right {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		width: 150rpx;
		padding-right: 30rpx;
		justify-content: flex-end;
	}
	.uni-navbar__header-container {
		flex: 1;
	}
	.uni-navbar__header-container-inner {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		align-items: center;
		justify-content: center;
		font-size: $uni-font-size-base;
	}
	.uni-navbar__placeholder-view {
		height: $nav-height;
	}
	.uni-navbar--fixed {
		position: fixed;
		z-index: 998;
	}
	.uni-navbar--shadow {
		/* #ifndef APP-NVUE */
		box-shadow: 0 1px 12rpx #ccc;
		/* #endif */
	}
	.uni-navbar--border {
		border-bottom-width: 1rpx;
		border-bottom-style: solid;
		border-bottom-color: $uni-border-color;
	}
</style>
