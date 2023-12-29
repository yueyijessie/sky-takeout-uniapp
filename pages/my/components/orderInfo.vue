<!--我的头部-->
<template>
  <view class="box address_order">
    <!-- 地址管理 -->
    <view class="address" @click="goAddress">
      <image class="location" src="../../../static/address.png"></image>
      <text class="address_word">地址管理</text>
      <image class="to_right" src="../../../static/toRight.png" mode=""></image>
    </view>
    <!-- 历史订单 -->
    <view class="order" @click="goOrder">
      <image class="location" src="../../../static/order.png"></image>
      <text class="order_word">历史订单</text>
      <image class="to_right" src="../../../static/toRight.png" mode=""></image>
    </view>
  </view>
</template>
<script>
export default {
  methods: {
    //去地址列表页
    goAddress() {
      this.$emit("goAddress");
    },
    //去历史订单页
    goOrder() {
      this.$emit("goOrder");
    },
  },
};
</script>
<style lang="scss" scoped>
    // 地址及订单
    .address_order {
      width: 710rpx;
      height: 200rpx;
      margin: 20rpx auto;
      margin-top: 0;
      // 地址
      .address {
        line-height: 100rpx;
        position: relative;
        .location {
          width: 34rpx;
          height: 36rpx;
          margin-right: 8rpx;
          vertical-align: middle;
          margin-bottom: 4rpx;
          padding-left: 30rpx;
        }
        .address_word {
          opacity: 1;
          font-size: 28rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #333333;
          line-height: 40rpx;
        }
        .to_right {
          // width: 12rpx;
          // height: 20rpx;
          width: 30rpx;
          height: 30rpx;
          vertical-align: middle;
          margin-bottom: 10rpx;
          position: absolute;
          top: 50%;
          right: 20rpx;
          transform: translateY(-50%);
        }
      }
      // 订单
      .order {
        line-height: 100rpx;
        position: relative;
        border-top: 1px dashed #ebebeb;
        margin-left: 30rpx;
        margin-right: 20rpx;
        .location {
          width: 34rpx;
          height: 36rpx;
          margin-right: 8rpx;
          vertical-align: middle;
          margin-bottom: 4rpx;
        }
        .order_word {
          opacity: 1;
          font-size: 28rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #333333;
          line-height: 40rpx;
        }
        .to_right {
          // width: 12rpx;
          // height: 20rpx;
          width: 30rpx;
          height: 30rpx;
          vertical-align: middle;
          color: #fff;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }
    }

    // 最近订单
    .recent {
      height: 60rpx;
      padding: 0 16rpx 0 22rpx;
      .order_line {
        opacity: 1;
        font-size: 28rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 550;
        text-align: left;
        color: #333333;
        line-height: 60rpx;
        letter-spacing: 0px;
        display: block;
        width: 100%;
        padding-left: 6rpx;
      }
    }

    .quit {
      width: 710rpx;
      height: 100rpx;
      opacity: 1;
      background: #ffffff;
      border-radius: 12rpx;
      margin: 20rpx auto;
      font-size: 30rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #333333;
      line-height: 100rpx;
      position: fixed;
      bottom: 50rpx;
      left: 20rpx;
    }
</style>