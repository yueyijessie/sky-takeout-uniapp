<!--选择多规格弹层-->
<template>
  <view class="more_norm_pop">
    <view class="title">{{ moreNormDishdata.name }}</view>
    <scroll-view class="items_cont" scroll-y="true" scroll-top="0rpx">
      <view class="item_row" v-for="(obj, index) in moreNormdata" :key="index">
        <view class="flavor_name">{{ obj.name }}</view>
        <view class="flavor_item">
          <view
            :class="{
              item: true,
              act: flavorDataes.findIndex((it) => item === it) !== -1,
            }"
            v-for="(item, ind) in obj.value"
            :key="ind"
            @click="checkMoreNormPop(obj.value, item)"
          >
            {{ item }}
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="but_item">
      <view class="price">
        <text class="ico">￥</text>
        {{ moreNormDishdata.price }}
      </view>
      <view class="active"
        ><view class="dish_card_add" @click="addShop(moreNormDishdata, '普通')"
          >加入购物车</view
        ></view
      >
    </view>
    <view class="close" @click="closeMoreNorm(moreNormDishdata)"
      ><image
        class="close_img"
        src="../../../static/but_close.png"
        mode=""
      ></image
    ></view>
  </view>
</template>
<script>
export default {
  // 获取父级传的数据
  props: {
    // 空页面提示
    moreNormDishdata: {
      type: Object,
      default: () => ({}),
    },
    moreNormdata: {
      type: Array,
      default: () => [],
    },
    flavorDataes: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    checkMoreNormPop(obj, item) {
      this.$emit("checkMoreNormPop", { obj: obj, item: item });
    },
    addShop(obj) {
      console.log(obj);
      this.$emit("addShop", obj);
    },
    closeMoreNorm(obj) {
      this.$emit("closeMoreNorm", obj);
    },
  },
};
</script>
<style lang="scss" scoped>
.more_norm_pop {
  width: calc(100vw - 160rpx);
  box-sizing: border-box;
  position: relative;
  top: 50%;
  left: 50%;
  padding: 40rpx;
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
  border-radius: 20rpx;
  .div_big_image {
    width: 100%;
    border-radius: 10rpx;
  }
  .title {
    font-size: 40rpx;
    line-height: 80rpx;
    text-align: center;
    font-weight: bold;
  }
  .items_cont {
    display: flex;
    flex-wrap: wrap;
    margin-left: -14rpx;
    max-height: 50vh;
    .item_row {
      .flavor_name {
        height: 40rpx;
        opacity: 1;
        font-size: 28rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #666666;
        line-height: 40rpx;
        padding-left: 10rpx;
        padding-top: 20rpx;
      }
      .flavor_item {
        display: flex;
        flex-wrap: wrap;
        .item {
          border: 1px solid #ffb302;
          border-radius: 12rpx;
          margin: 20rpx 10rpx;
          padding: 0 26rpx;
          height: 60rpx;
          line-height: 60rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #333333;
        }
        .act {
          // background: linear-gradient(144deg, #ffda05 18%, #ffb302 80%);
          background: #ffc200;
          border: 1px solid #ffc200;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
        }
      }
    }
  }
  .but_item {
    display: flex;
    position: relative;
    flex: 1;
    padding-left: 10rpx;
    margin: 34rpx 0 -20rpx 0;
    .price {
      text-align: left;
      color: #e94e3c;
      line-height: 88rpx;
      box-sizing: border-box;
      font-size: 48rpx;
      font-family: DIN, DIN-Medium;
      font-weight: 500;
      .ico {
        font-size: 28rpx;
      }
    }
    .active {
      position: absolute;
      right: 0rpx;
      bottom: 20rpx;
      display: flex;
      .dish_add,
      .dish_red {
        display: block;
        width: 72rpx;
        height: 72rpx;
      }
      .dish_number {
        padding: 0 10rpx;
        line-height: 72rpx;
        font-size: 30rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
      }
      .dish_card_add {
        width: 200rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        font-weight: 500;
        font-size: 28rpx;
        opacity: 1;
        // background: linear-gradient(144deg, #ffda05 18%, #ffb302 80%);
        background: #ffc200;
        border-radius: 30rpx;
      }
    }
  }
}
.close {
  position: absolute;
  bottom: -180rpx;
  left: 50%;
  transform: translateX(-50%);
  .close_img {
    width: 88rpx;
    height: 88rpx;
  }
}
</style>