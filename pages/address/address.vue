<template>
  <view class="customer-box">
    <uni-nav-bar
      @clickLeft="goBack"
      left-icon="back"
      leftIcon="arrowleft"
      title="地址管理"
      statusBar="true"
      fixed="true"
      color="#ffffff"
      backgroundColor="#333333"
    ></uni-nav-bar>
    <view
      class="address"
      :style="{
        height: `calc(100% - 136rpx - ${statusBarHeight} - 44px - 20rpx)`,
      }"
    >
      <view
        v-if="addressList && addressList.length > 0"
        class="address_content"
      >
        <!-- address列表 -->
        <view
          class="address_liests"
          v-for="(item, index) in addressList"
          :key="index"
        >
          <!-- 上部 -->
          <view class="list_item_top" @click.stop="choseAddress(index, item)">
            <!-- 左边 -->
            <view class="item_left">
              <!-- 地址 -->
              <view class="details">
                <text class="tag" :class="'tag' + item.label">{{
                  getLableVal(item.label)
                }}</text>
                <text class="address_word"
                  >{{ item.provinceName }}{{ item.cityName
                  }}{{ item.districtName }}{{ item.detail }}</text
                >
              </view>
              <!-- 性别及手机号 -->
              <view class="sale">
                <text class="name">{{
                  item.sex === "0"
                    ? item.consignee + " 先生"
                    : item.consignee + " 女士"
                }}</text>
                <text class="num">{{ item.phone }}</text>
              </view>
            </view>
            <!-- 右边 -->
            <view class="item_right">
              <image
                @click.stop="addOrEdit('编辑', item)"
                class="edit"
                src="../../static/edit.png"
              ></image>
            </view>
          </view>
          <!-- 下部 -->
          <view class="list_item_bottom">
            <label class="radio" @click.stop="getRadio(index, item)">
              <radio
                class="item_radio"
                v-if="testValue"
                color="#FFC200"
                :value="item.id"
                :checked="item.isDefault === 1 && isActive === index"
                @click.stop="getRadio(index, item)"
              />设为默认地址</label
            >
          </view>
        </view>
      </view>
      <!-- 无地址展示 -->
      <empty
        v-if="isEmpty"
        boxHeight="100%"
        textLabel="一个地址都没有哦"
      ></empty>
      <view class="add_address">
        <button
          class="add_btn"
          type="primary"
          plain="true"
          @click="addOrEdit('新增')"
        >
          <text class="add-icon">+</text>
          新增收货地址
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { queryAddressBookList, putAddressBookDefault } from "../api/api.js";
import { mapState, mapMutations } from "vuex";
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import Empty from "@/components/empty/empty";
export default {
  components: {
    uniNavBar,
    Empty,
  },
  data() {
    return {
      testValue: true,
      addressList: [],
      formRouter: "",
      isActive: null,
      isEmpty: false,
    };
  },
  onShow(options) {
    this.getAddressList();
    if (options && options.form) {
      this.formRouter = "";
      this.formRouter = options.form;
    }
  },
  computed: {
    ...mapState(["addressBackUrl"]),
    statusBarHeight() {
      return uni.getSystemInfoSync().statusBarHeight + "px";
    },
  },
  methods: {
    ...mapMutations(["setAddress"]),
    goBack() {
      uni.redirectTo({
        url: this.addressBackUrl,
      });
    },
    getLableVal(item) {
      switch (item) {
        case "1":
          return "公司";
        case "2":
          return "家";
        case "3":
          return "学校";
        default:
          return "其他";
      }
    },
    getAddressList() {
      this.testValue = false;
      uni.showLoading({ title: "加载中", mask: true });
      queryAddressBookList().then((res) => {
        if (res.code === 1) {
          setTimeout(function () {
            uni.hideLoading();
          }, 100);
          this.testValue = true;
          this.addressList = res.data;
          this.isEmpty = true;
          this.addressList.map((val, index) => {
            if (val.isDefault === 1) {
              this.isActive = index;
            }
          });
        }
      });
    },

    addOrEdit(type, item) {
      // 编辑与新增
      if (type === "新增") {
        // TODO
        uni.redirectTo({
          url: "/pages/addOrEditAddress/addOrEditAddress",
        });
      } else {
        // TODO
        uni.redirectTo({
          url:
            "/pages/addOrEditAddress/addOrEditAddress?type=" +
            "编辑" +
            "&" +
            "id=" +
            item.id,
        });
      }
    },
    // 点击整体设置为默认地址并返填订单页面
    choseAddress(e, item) {
      if (this.addressBackUrl !== "/pages/order/index") {
        return false;
      }
      uni.redirectTo({
        url: "/pages/order/index?address=" + JSON.stringify(item),
      });
      this.setAddress(item);
    },
    getRadio(index, item) {
      // // 提供默认接口
      item.isDefault = 1;
      this.isActive = index;
      putAddressBookDefault({ id: item.id }).then((res) => {
        if (res.code === 1) {
          uni.showToast({
            title: "默认地址设置成功",
            duration: 2000,
            icon: "none",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.address {
  width: 750rpx;
  .address_content {
    margin: 0 20rpx;
    padding-bottom: 20rpx;
    height: 100%;
    overflow-y: auto;
    .address_liests {
      width: 100%;
      height: 256rpx;
      opacity: 1;
      background: #ffffff;
      border-radius: 12rpx;
      display: flex;
      display: flex;
      flex-direction: column;
      margin-top: 20rpx;
      padding: 0 28rpx 0 12rpx;
      box-sizing: border-box;
      // 上部
      .list_item_top {
        flex: 1;
        width: 100%;
        height: 100%;
        display: flex;
        // 左边
        .item_left {
          flex: 1;
          overflow: hidden;
          margin-left: 12rpx;
          // 地址
          .details {
            margin-top: 42rpx;
            display: flex;
            height: 40rpx;
            line-height: 40rpx;

            // 地址描述
            .address_word {
              flex: 1;
              font-size: 28rpx;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              text-align: left;
              color: #333333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            // 不同标签展示不同背景色
            .active {
              background: #fef8e7;
            }
          }
          // 姓名及手机号
          .sale {
            margin-top: 20rpx;
            .name,
            .num {
              height: 40rpx;
              opacity: 1;
              font-size: 28rpx;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              text-align: left;
              color: #999999;
              line-height: 40rpx;
              letter-spacing: 0px;
            }
            .num {
              margin-left: 20rpx;
            }
          }
        }
        // 右边--编辑
        .item_right {
          width: 100rpx;
          height: 100rpx;
          line-height: 1;
          text-align: right;
          padding-right: 18rpx;
          .edit {
            width: 32rpx;
            height: 32rpx;
            padding: 24rpx;
            margin-top: 50rpx;
            margin-left: 20rpx;
          }
        }
      }
      // 下部
      .list_item_bottom {
        height: 80rpx;
        line-height: 80rpx;
        border-top: 1px solid #efefef;
        .radio {
          margin-left: 8rpx;
          opacity: 1;
          font-size: 26rpx;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #333333;
          .item_radio {
            transform: scale(0.7);
          }
        }
      }
    }
  }
  // 暂无地址
  .no_address {
    margin: 0 auto;
    height: 50rpx;
    .no_word {
      display: block;
      text-align: center;
      font-size: 32rpx;
    }
  }
  .add_address {
    position: fixed;
    bottom: 40rpx;
    left: 20rpx;
    right: 20rpx;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .add_btn {
      width: 100%;
      height: 86rpx;
      line-height: 86rpx;
      border-radius: 8rpx;
      background: #ffc200;
      border: 1px solid #ffc200;
      opacity: 1;
      font-size: 30rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      text-align: center;
      color: #333333;
      letter-spacing: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      .add-icon {
        font-size: 32rpx;
        margin-right: 8rpx;
        margin-bottom: 4rpx;
      }
      .img_btn {
        width: 44rpx;
        height: 44rpx;
        vertical-align: middle;
        margin-bottom: 8rpx;
      }
    }
  }
}
.customer-box {
  height: 100vh;
}
</style>
