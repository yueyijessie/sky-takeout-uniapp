<!--拨打电话-->
<template>
  <view class="container phoneCon">
    <uni-popup ref="popup" @change="change" class="popupBox">
      <view class="popup-content">
        <view>{{ phoneData }}</view>
        <view @click="call">呼叫</view>
        <view @click="closePopup" class="closePopup">取消</view>
      </view>
    </uni-popup>
  </view>
</template>
<style src="../../pages/index/style.scss" lang="scss" scoped></style>
<script>
import { call } from "../../utils/index.js";
export default {
  props: {
	//电话号码
    phoneData: {
      type: String,
      default: "",
    },
  },
  methods: {
    // 电话号码拨打
    call() {
      // 暂时关闭打电话
      call(this.phoneData);
    },
	// 取消关闭弹层
    closePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>
