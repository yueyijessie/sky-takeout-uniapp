<!--备注、餐具、发票弹-->
<template>
  <view class="box order_list">
    <!-- 备注、餐具、发票 -->
    <view class="uniInfo">
      <!-- 备注 -->
      <view @click="goRemark">
        <uni-list>
          <uni-list-item showArrow title="备注" class="uniListItem">
            <template v-slot:footer>
              <text class="temarkText">{{
                remark ? remark : "推荐使用无接触配送"
              }}</text>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
      <!-- end -->
      <!-- 餐具数量 -->
      <view @click="openPopuos('bottom')">
        <uni-list>
          <uni-list-item showArrow title="餐具数量" class="uniListItem">
            <template v-slot:footer>
              <text>已在店选择：{{ tablewareData }}</text>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
      <!-- end -->
      <!-- 发票 -->
      <view class="invoiceBox">
        <uni-list>
          <uni-list-item title="发票" class="uniListItem">
            <template v-slot:footer>
              <text>请联系商家提供</text>
            </template>
          </uni-list-item>
        </uni-list>
      </view>
      <!-- end -->
      <view class="container">
        <!-- 餐具弹层 -->
        <uni-popup ref="popup" @change="change" class="popupBox">
          <view class="popup-content">
            <view class="popupTitle">
              <text>按政府条例要求： </text>
              <text>商家不得主动向您提供一次性餐具，请按需选择餐具数量</text>
            </view>
            <view class="popupCon">
              <view class="popupBtn">
                <text @click="closePopup">取消</text>
                <text>选择本单餐具</text>
                <text @click="handlePiker">确定</text>
              </view>
              <pikers
                :baseData="baseData"
                ref="piker"
                @changeCont="changeCont"
              ></pikers>
            </view>
            <view class="popupSet">
              <view>后续订单餐具设置</view>
              <view>
                <radio-group @change="handleRadio">
                  <label v-for="item in radioGroup" :key="item">
                    <radio
                      :value="item"
                      color="#FFC200"
                      :checked="item == activeRadio"
                    />{{ item }}
                  </label>
                </radio-group>
              </view>
            </view>
          </view>
        </uni-popup>
        <!-- end -->
      </view>
    </view>
  </view>
</template>
<script>
import { editHoppingCart } from '../../api/api'
import Pikers from '@/components/uni-piker/index.vue'
export default {
  // 获取父级传的数据
  props: {
    // 进入备注页
    remark: {
      type: String,
      default: '',
    },
    // 选择的餐具信息
    tablewareData: {
      type: String,
      default: '',
    },
    // 后续订单餐具设置
    radioGroup: {
      type: Array,
      default: () => [],
    },
    // 当前选择的
    activeRadio: {
      type: String,
      default: '',
    },
    // 本单餐具数据
    baseData: {
      type: Array,
      default: () => [],
    },
  },
  components: { Pikers },
  methods: {
    // 进入备注页面
    goRemark () {
      this.$emit("goRemark")
    },
    // 打开餐具数量弹出层
    openPopuos (type) {
      this.$refs.popup.open(type)
    },
    change () {
      this.$emit("change")
    },
    // 取消本单餐具
    closePopup (type) {
      this.$refs.popup.close(type)
    },
    // 确定本单餐具
    handlePiker () {
      this.$emit('handlePiker')
      this.closePopup()
    },
    // 触发本单餐具
    changeCont (val) {
      this.$emit("changeCont", val)
    },
    // 餐具数量的后续订单餐具设置
    handleRadio (e) {
      this.$emit("handleRadio", e)
    },
  },
};
</script>
<style src="./../style.scss" lang="scss" scoped></style>