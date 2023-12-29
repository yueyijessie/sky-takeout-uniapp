<!--餐具数量-->
<template>
  <view>
    <view class="date-select">
      <picker-view
        class="picker-view"
        :value="defaultValue"
        :indicator-style="indicatorStyle"
        @change="bindChange"
      >
        <picker-view-column>
          <view class="item" v-for="(item, index) in baseData" :key="index">
            <view class="itemTit" v-if="item === '无需餐具'">
              <view>无需餐具</view>
              <view>（筷子、调羹、叉子、刀）</view>
            </view>
            <text>{{ item }}份</text>
          </view>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<script>
export default {
  // 获取父级传的数据
  props: ["baseData"],
  data () {
    return {
      selectscooldata: {},
      title: "picker-view",
      indicatorStyle: `height: 50px;`,
      defaultValue: [0], //默认选中hoverhover中下标为2的那个元素
      //defaultValue是默认展示的值，你要注意，如果hoverhover是动态循环出来时，你在data中直接给默认值，可能不能够显示你想要展示的值
    }
  },

  methods: {

    /**
     * uniapp中，向上传递值得时候，不要在关闭事件中进行传递值；
     * 因为关闭事件中有可能形成异步(造成选择的值和页面显示的值不一致这个问题)
     * 使用change事件将值抛出去
     * */
    bindChange (e) {
      this.selectscooldata = e
      if (e.detail && e.detail.value) {
        //实时将用户选择的值抛出去
        this.$emit("changeCont", this.baseData[e.detail.value[0]])
        this.tablewareData = this.baseData[e.detail.value[0]]
        this.$emit("changeCont", this.tablewareData)
      } else {
        this.$emit("changeCont", this.baseData[e.detail.value[0]])
        this.tablewareData = this.baseData[e.detail.value[0]]
        // 用户没有滚动，说明用户选择的是我们给用户展示的默认值
        this.$emit("changeCont", this.tablewareData)
      }
    },
  },
};
</script>

<style scoped lang="scss">
.date-select {
  width: 100%;
  height: 400rpx;
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
  background-color: #ffffff;
  position: relative;
  .picker-view {
    background-color: #eeeeee;
    position: absolute;
    width: 100%;
    height: 288rpx;
    bottom: 20rpx;
    .item {
      height: 88rpx;
      line-height: 100rpx;
      font-size: 32rpx;
      text-align: center;
      .itemTit {
        font-size: 28rpx;
        line-height: 30rpx;
        padding-top: 18rpx;
        &:last-child {
          font-size: 24rpx;
        }
      }
    }
  }
  .btn {
    width: 100%;
    height: 100rpx;
    box-sizing: border-box;

    .btn-left,
    .btn-right {
      color: #ffffff;
      width: 150upx;
      height: 90upx;
      line-height: 90upx;
      text-align: center;
      border-radius: 15upx;
    }
  }
}

.demo-flex {
  display: flex;
  align-items: center;
  .select-time {
    height: 96rpx;
    line-height: 96rpx;
    font-size: 32rpx;
    font-family: "PingFangSC, PingFangSC-Medium";
    font-weight: 500;
    text-align: center;
    color: #323233;
    flex: 1;
    padding-left: 90rpx;
  }
  .of-sourceof {
    height: 96rpx;
    line-height: 96rpx;
    font-size: 30rpx;
    font-family: "PingFangSC, PingFangSC-Regular";
    text-align: center;
    color: #3388ff;
    padding-right: 32rpx;
  }
}

.picker-item-area {
  width: 100%;
  height: 200rpx;
  line-height: 100rpx;
  text-align: center;
  font-size: 30prx;
  font-weight: 500;
  color: #666666;
}

.picker-area {
  width: 100%;
  height: 600rpx;
}

.popup-title {
  text-align: center;
  padding: 40rpx 30rpx;
  font-size: 36rpx;
  font-weight: 600;
  color: #333333;
}

.product-type-area {
  width: 100%;
  background: #ffffff;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}
</style>