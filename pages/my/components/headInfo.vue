<!--我的头部-->
<template>
    <view class="my_info">
        <!-- 头像部分 -->
        <view class="head">
          <image class="head_image" :src="psersonUrl"></image>
        </view>
        <!-- 姓名及手机号 -->
        <view class="phone_name">
          <!-- 姓名 -->
          <view class="name">
            <text class="name_text">{{ nickName }}</text>
            <image
              v-if="gender === 2"
              class="name_type"
              src="../../../static/girl.png"
            ></image>
            <image
              v-if="gender === 1"
              class="name_type"
              src="../../../static/boy.png"
            ></image>
          </view>
          <!-- 电话号 -->
          <view class="phone">
            <text class="phone_text">{{ phoneNumber | getPhoneNum }}</text>
          </view>
        </view>
      </view>
</template>
<script>
export default {
  // 获取父级传的数据
  props: {
    // 头像
    psersonUrl: {
      type: String,
      default: '',
    },
    // 姓名
    nickName: {
      type: String,
      default: '',
    },
    // 性别
    gender: {
      type: String,
      default: '',
    },
    // 电话
    phoneNumber: {
      type: String,
      default: '',
    },
    // 电话
    getPhoneNum: {
      type: String,
      default: '',
    }
  },
};
</script>
<style lang="scss" scoped>
.my_info {
    height: 172rpx;
    width: 750rpx;
    background-color: #ffc200;
    display: flex;
    // 头像
    .head {
      width: 172rpx;
      height: 172rpx;
      margin: auto;
      text-align: center;
      .head_image {
        width: 116rpx;
        height: 116rpx;
        line-height: 172rpx;
        vertical-align: top;
        margin: 20rpx auto;
        border-radius: 50%;
        background-color: #fff;
      }
    }
    // 姓名电话号
    .phone_name {
      flex: 1;
      margin: auto;
      .name {
        .name_text {
          font-size: 32rpx;
          opacity: 1;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 550;
          text-align: left;
          color: #333333;
          height: 44rpx;
          line-height: 44rpx;
          margin-right: 12rpx;
        }

        .name_type {
          width: 32rpx;
          height: 32rpx;
          vertical-align: middle;
          margin-bottom: 6rpx;
        }
      }
      .phone {
        .phone_text {
          height: 40rpx;
          opacity: 1;
          font-size: 28rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #333333;
          line-height: 40rpx;
        }
      }
    }
  }
</style>