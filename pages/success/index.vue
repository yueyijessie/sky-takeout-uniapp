<template>
  <view class="success_content">
    <view class="success_info">
      <image
        class="success_icon"
        src="../../static/success.png"
        mode=""
      ></image>
      <view class="success_title"> 下单成功 </view>
      <view class="word-box">
        <text class="word_bottom"
          >预计<text class="word_date">{{ arrivalTime }}</text
          >送达</text
        >
      </view>
      <view class="success_desc"> 后厨已开始疯狂备餐中, 请耐心等待~ </view>
      <!-- 新添加 -->
      <view class="btns">
        <view class="go_dish defaultBtn" @click="goIndex()"> 返回首页 </view>
        <view class="go_dish" @click="goOrder"> 查看订单 </view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      arrivalTime: "",
      orderId: null,
    };
  },
  computed: {
    tableInfo: function () {
      return this.shopInfo();
    },
  },
  onLoad(options) {
    // 获取一小时以后的时间
    this.getHarfAnOur();
    this.orderId = options.orderId;
  },
  methods: {
    ...mapState(["shopInfo", "arrivals"]),
    // 回首页
    goIndex() {
      uni.navigateTo({
        url: "/pages/index/index?status=" + "不验证",
      });
    },
    // 查看订单
    goOrder() {
      uni.navigateTo({
        url: "/pages/details/index?orderId=" + this.orderId,
      });
    },
    // 获取一小时以后的时间
    getHarfAnOur() {
      this.arrivalTime = this.arrivals();
    },
  },
};
</script>
<style src="./../common/Navbar/navbar.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.success_content {
  padding-top: 260rpx;
  .success_info {
    text-align: center;
    .success_icon {
      width: 144rpx;
      height: 138rpx;
      text-align: center;
    }
    .success_title {
      font-size: 40rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      color: #333333;
      margin-top: 16rpx;
      height: 56rpx;
      line-height: 56rpx;
    }
    .success_desc {
      font-size: 32rpx;
      margin-bottom: 40rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #666666;
      height: 44rpx;
      line-height: 44rp;
      margin-top: 24rpx;
    }
    .word-box {
      margin-top: 38rpx;
      height: 44rpx;
      line-height: 44rpx;
    }
    .word_bottom {
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      font-size: 32rpx;
      color: #666666;
      .word_date {
        color: #ffc200;
      }
    }

    .btns {
      width: 750rpx;
      display: flex;
      justify-content: center;
      .go_dish {
        // flex: 1;
        position: relative;
        font-size: 30rpx;
        // margin: 0 auto;
        width: 200rpx;
        height: 72rpx;
        line-height: 72rpx;
        margin-top: 20rpx;
        background: #ffc200;
        border-radius: 8rpx;
        & + .go_dish {
          margin-left: 40rpx;
        }
      }
      .defaultBtn {
        border: 1px solid #e5e4e4;
        background: none;
      }
    }
  }
}
</style>
 