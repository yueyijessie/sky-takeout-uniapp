<!--最近订单-->
<template>
  <scroll-view scroll-y="true" :style="{ height: scrollH + 'px' }" @scrolltolower="lower">
    <view class="main recent_orders">
      <!-- 最近订单列表 -->
      <view class="box order_lists" v-for="(item, index) in recentOrdersList" :key="index">
        <!-- 时间和支付状态 -->
        <view class="date_type">
          <!-- 时间 -->
          <text class="time">{{ item.orderTime }} {{ item.id }}</text>
          <!-- 支付状态 -->
          <text class="type status" :class="{ status: item.status == 2 }">{{
            statusWord(item.status)
          }}</text>
        </view>
        <!-- 点菜的内容 -->
        <view class="orderBox" @click="goDetail(item.id)">
          <view class="food_num">
            <scroll-view scroll-x="true" class="pic" style="width: 100%; overflow: hidden; white-space: nowrap">
              <view class="food_num_item" v-for="(num, y) in item.orderDetailList" :key="y">
                <view class="img">
                  <image :src="num.image"></image>
                  <!-- <image src="../../static/img2.jpg"></image> -->
                </view>
                <view class="food">{{ num.name }}</view>
              </view>
            </scroll-view>
          </view>
          <view class="numAndAum">
            <view><text>￥{{ item.amount.toFixed(2) }}</text></view>
            <view><text>共{{ numes(item.orderDetailList).count }}件</text></view>
          </view>
        </view>

        <view class="againBtn">
          <button class="new_btn" type="default" @click="oneOrderFun(item.id)">
            再来一单
          </button>
          <button class="new_btn btn" type="default" @click="goDetail(item.id)"
            v-if="item.status === 1 && getOvertime(item.orderTime) > 0">
            去支付
          </button>
        </view>
      </view>
    </view>
    <reach-bottom v-if="loading" :loadingText="loadingText"></reach-bottom>
  </scroll-view>
</template>
<script>
import ReachBottom from "@/components/reach-bottom/reach-bottom.vue";
import { statusWord } from "@/utils/index";
export default {
  // 获取父级传的数据
  props: {
    // 头像
    scrollH: {
      type: Number,
      default: 0,
    },
    //
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: "",
    },
    // 例表数据
    recentOrdersList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ReachBottom,
  },
  methods: {
    lower() {
      this.$emit("lower");
    },
    //订单详情
    goDetail(id) {
      this.$emit("goDetail", id);
    },
    //  1待付款 2待接单 3 已接单 4 派送中 5 已完成 6 已取消 7 退款 
    numes(list) {
      let count = 0;
      let total = 0;
      list.length > 0 &&
        list.forEach((obj) => {
          count += Number(obj.number);
          total += Number(obj.number) * Number(obj.amount);
        });
      return { count: count, total: total };
    },
    // 再来一单
    oneOrderFun(id) {
      this.$emit("oneOrderFun", id);
    },
    //
    getOvertime(time) {
      this.$emit("getOvertime", time);
    },
    // 支付状态
    statusWord(status, time) {
      this.$emit("statusWord", { status: status, time: time });
      return statusWord(status, time);
    },
  },
};
</script>