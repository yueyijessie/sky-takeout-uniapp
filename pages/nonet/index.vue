<template>
  <view class="nonet_content">
    <view class="success_info">
      <image class="success_icon" src="../../static/noNet.png" mode=""></image>
      <view class="success_title"> 网络无法连接 </view>
      <view class="go_dish" @click="goIndex()"> 点击刷新 </view>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    tableInfo: function () {
      return this.shopInfo();
    },
  },
  methods: {
    ...mapState(["shopInfo"]),
    goIndex() {
      uni.navigateTo({ url: "/pages/index/index" });
    },
  },
};
</script>
<style src="./../common/Navbar/navbar.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.nonet_content {
  padding-top: 260rpx;
  .success_info {
    text-align: center;
    .success_icon {
      width: 300rpx;
      height: 300rpx;
      text-align: center;
    }
    .success_title {
      font-size: 48rpx;
    }
    .success_desc {
      font-size: 32rpx;
      margin-bottom: 40rpx;
      color: #818693;
    }
    .go_dish {
      position: relative;
      font-size: 30rpx;
      margin: 0 auto;
      width: 248rpx;
      line-height: 72rpx;
      margin-top: 20rpx;
      background: linear-gradient(144deg, #ffda05 18%, #ffb302 80%);
      border-radius: 36rpx;
    }
  }
}
</style>
 