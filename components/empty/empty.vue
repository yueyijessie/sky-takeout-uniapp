<!--空数据展示-->
<template>
  <view class="empty-box">
    <image class="empty-img" src="./../../static/no_adress.png" mode="" />
    <view class="empty-des">{{textLabel}}</view>
  </view>
</template>
<script>
export default {
  // 获取父级传的数据
  props:{
    // 空页面提示
    'textLabel':{
      type: String,
      default: '暂无数据'
    }
  }
}
</script>
<style lang="scss" scoped>
.empty-box{
  width: 100%;
  text-align: center;
  transform: translate(0,50%);
  .empty-img{
    width: 480rpx;
    height: 296rpx;
  }
  .empty-des{
    height: 44rpx;
    line-height: 44rpx;
    margin-top: 40rpx;
    font-size: 32rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    color: #666;
  }
}
</style>
