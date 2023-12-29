import {
	// 提交订单
	submitOrderSubmit,
	// 查询默认地址
	getAddressBookDefault,
	queryAddressBookList, getEstimatedDeliveryTime
} from '../api/api.js'
import {
	mapState,
	mapMutations,
} from 'vuex'
import {
	baseUrl
} from '../../utils/env'
import {
	getLableVal,
	dateFormat,
	presentFormat,
	getWeekDate

} from '../../utils/index.js'
import Pikers from '@/components/uni-piker/index.vue'//餐具信息
import AddressPop from "./components/address.vue" //地址
import DishDetail from "./components/dishDetail.vue" //菜品详情
import DishInfo from "./components/dishInfo.vue" //菜品信息
import dayjs from "@/utils/lib/dayjs.min.js";
export default {
	data() {
		return {
			platform: 'ios',
			orderDishPrice: 0,
			openPayType: false,
			psersonUrl: '../../static/btn_waiter_sel.png',
			nickName: '',//名字
			gender: 0,
			phoneNumber: '',//电话
			address: '',//地址
			remark: '',//备注
			arrivalTime: '',// 用户选择的送达时间
			orderTime: '',// 服务端返回的送达时间
			addressBookId: '',
			addressLabel: '',
			tagLabel: '',
			// 加入购物车数量
			orderDishNumber: 0,
			showDisplay: false,//是否显示更多收起
			type: 'center',
			expirationTime: '',
			// rocallTime:'',
			tablewareData: '无需餐具',
			tableware: '',
			packAmount: 0,
			value: [0, 0],
			timeValue: [0, 0],
			indicatorStyle: `height: 44px;color:#333`,
			tabIndex: 0,
			scrollinto: 'tab0',
			scrollH: 0,
			popleft: ['今天', '明天'],// 时间选中的左侧数据（今天、明天）
			visible: true,
			baseData: [
				'无需餐具', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
			],
			activeRadio: '无需餐具', //存的是选中的value值
			radioGroup: ['依据餐量提供', '无需餐具'],
			popright: ['立即派送', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
				'13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
				'19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'
			],
			newDateData: [],// 时间段
			// styleType: 'button',
			textTip: '',
			showConfirm: false,
			phoneData: '15200000001',
			toDate: null,
			tomorrowStart: null,
			newDate: null,
			selectValue: 0,
			selectDateValue: 0,
			timeout: false,
			isTomorrow: false,
			status: 0,
			num: 0,
			weeks: [],
			scrollTop: 0,
			addressList: [],
			isHandlePy: false
		}
	},
	computed: {
		// 菜品数据
		orderListDataes: function () {
			return this.orderListData()
		},
		// 菜品数据
		orderDataes: function () {
			let testList = []
			if (this.showDisplay === false) {
				if (this.orderListDataes.length > 3) {
					for (var i = 0; i < 3; i++) {
						testList.push(this.orderListDataes[i])
					}
				} else {
					testList = this.orderListDataes
				}
				return testList
			} else {
				return this.orderListDataes
			}
		}
	},
	created() {
		let time = new Date()
		this.toDate = new Date(time.toLocaleDateString()).getTime()
		this.tomorrowStart = this.toDate + 3600 * 24 * 1000
		this.newDate = time.getHours() * 3600 + time.getMinutes() * 60

		const weekDay = [this.toDate, this.tomorrowStart]

		weekDay.forEach((date) => {
			this.weeks.push(getWeekDate(date))

		})

		this.getAddressList()
	},
	mounted() {
		this.countdown()
	},
	components: {
		Pikers,
		// Popup,
		AddressPop,
		DishDetail,
		DishInfo
	},
	async onLoad(options) {
		this.initPlatform()
		this.psersonUrl = this.$store.state.baseUserInfo && this.$store.state.baseUserInfo.avatarUrl
		this.nickName = this.$store.state.baseUserInfo && this.$store.state.baseUserInfo.nickName
		this.gender = this.$store.state.baseUserInfo && this.$store.state.baseUserInfo.gender
		this.remark = this.remarkData()
		this.init()
		// 存在options说明换地址了
		if (this.addressData() && this.addressData().detail) {
			this.addressBookId = ''
			const newAddress = this.addressData()
			this.address = newAddress.provinceName + newAddress.cityName + newAddress.districtName + newAddress.detail
			this.phoneNumber = newAddress.phone
			this.nickName = newAddress.consignee
			this.gender = newAddress.sex

			this.addressBookId = newAddress.id
			this.addressLabel = getLableVal(newAddress.label)
		} else {
			// 默认地址查询
			await this.getAddressBookDefault()
		}

		await this.getEstimatedDeliveryTime();
		this.getDateDate()
		this.setArrivalTime(this.arrivalTime)
		this.setGender(this.gender)
	},
	onReady() {
		uni.getSystemInfo({
			success: (res) => {
				this.scrollH = res.windowHeight - uni.upx2px(100)
			}
		})
	},
	methods: {
		...mapState(['orderListData', 'remarkData', 'addressData', 'storeInfo', 'shopInfo', 'deliveryFee']),
		...mapMutations(['setAddressBackUrl', 'setOrderData', 'setArrivalTime', 'setRemark', 'setGender']),
		init() {
			this.computOrderInfo()

		},
		initPlatform() {
			const res = uni.getSystemInfoSync()
			this.platform = res.platform
		},
		// 获取用户送餐期望时间
		async getEstimatedDeliveryTime() {
			// const result = await getEstimatedDeliveryTime({ shopId: this.shopInfo().shopId, customerAddress: this.address });
			// this.arrivalTime = dayjs(result.data).format('HH:mm')
			// this.orderTime = result.data
			// 设置虚拟预计送达时间，1h
			var currentTime = new Date();
			this.orderTime = currentTime
			this.arrivalTime = dayjs(currentTime.setHours(currentTime.getHours() + 1)).format('HH:mm')
		},
		// 根据系统派送时间 格式化时间  [16:00,16:30]
		getDateDate() {
			let currentDayjs = dayjs(this.orderTime);
			const list = ['立即派送']
			if (!(currentDayjs.hour() >= 22 && currentDayjs.minute() > 30)) {
				if (currentDayjs.minute() > 30) {
					currentDayjs = currentDayjs.add(1, 'hour').set('minute', 0)
				} else {
					currentDayjs = currentDayjs.set('minute', 30)
				}
				while (true) {
					if (currentDayjs.hour() === 23 && currentDayjs.minute() === 30) {
						break
					}
					const start = `${currentDayjs.format("HH")}:${currentDayjs.format('mm')}`;
					list.push(`${start}`)
					currentDayjs = currentDayjs.add(30, 'minute')
				}
			}
			this.newDateData = list
		},
		// 获取地址
		getAddressList() {
			this.testValue = false
			queryAddressBookList().then(res => {
				if (res.code === 1) {
					this.testValue = true
					this.addressList = res.data
				}
			})
		},
		// 默认地址查询
		getAddressBookDefault() {
			return getAddressBookDefault().then(res => {
				if (res.code === 1) {
					this.addressBookId = ''
					this.address = res.data.provinceName + res.data.cityName + res.data.districtName + res.data
						.detail
					this.phoneNumber = res.data.phone
					this.nickName = res.data.consignee
					this.gender = res.data.sex
					this.addressBookId = res.data.id
					this.addressLabel = getLableVal(res.data.label)
					this.tagLabel = res.data.label
				}
			})
		},
		// 去地址页面
		goAddress() {
			this.setAddressBackUrl('/pages/order/index')
			if (this.addressList.length === 0) {
				uni.redirectTo({
					url: '/pages/addOrEditAddress/addOrEditAddress'
				})
			} else {
				uni.redirectTo({
					url: '/pages/address/address'
				})
			}

		},
		// // 重新拼装image
		getNewImage(image) {
			return `${baseUrl}/common/download?name=${image}`
		},
		// 订单里和总订单价格计算
		computOrderInfo() {
			let oriData = this.orderListDataes
			this.orderDishNumber = this.orderDishPrice = 0
			this.orderDishPrice = 0
			oriData.map((n, i) => {
				// this.orderDishPrice += n.number * n.price
				this.orderDishPrice += n.number * n.amount
				this.orderDishNumber += n.number
				console.log(n);
			})
			this.orderDishPrice = this.orderDishPrice + this.deliveryFee() + this.orderDishNumber
		},
		// 返回上一级
		goBack() {
			uni.navigateBack({ delta: 1 })
		},
		closeMask() {
			this.openPayType = false
		},
		// 支付下单
		payOrderHandle() {
			this.isHandlePy = true

			if (!this.address) {
				uni.showToast({
					title: '请选择收货地址',
					icon: 'none',
				})
				return false
			}
			const params = {
				payMethod: 1,
				addressBookId: this.addressBookId,
				remark: this.remark,
				estimatedDeliveryTime: this.arrivalTime === '立即派送' ? presentFormat() : dateFormat(this.isTomorrow,
					this.arrivalTime),
				deliveryStatus: this.arrivalTime === '立即派送' ? 1 : 0,
				remark: this.remark,
				tablewareStatus: this.status,
				tablewareNumber: this.num,
				packAmount: this.orderDishNumber,
				amount: this.orderDishPrice,
				shopId: this.shopInfo().shopId,
				deliveryFee: this.deliveryFee()
			}

			submitOrderSubmit(params).then(res => {
				if (res.code === 1) {
					this.isHandlePy = false
					this.setOrderData(res.data)
					this.setRemark('')

					uni.navigateTo({
						url: '/pages/pay/index?orderId=' + res.data.id
					})
				} else {
					uni.showToast({
						title: res.msg || '操作失败',
						icon: 'none',
					})
				}
			})
		},
		// 拨打电话
		call() {
			uni.makePhoneCall({
				phoneNumber: '114' //仅为示例
			})
		},
		// // 联系商家进行取消弹层
		handleContact(type) {
			this.showConfirm = false
			this.openPopuos(type)
			this.textTip = '请联系商家进行取消！'
		},
		// 联系商家进行退款弹层
		handleRefund(type) {
			this.showConfirm = false
			this.openPopuos(type)
			this.textTip = '请联系商家进行退款！'
		},
		// 进入备注页
		goRemark() {
			this.setAddressBackUrl('/pages/order/index')
			uni.redirectTo({
				url: '/pages/remark/index'
			})
		},
		// 打开参数数量弹层
		openPopuos(type) {
			// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
			this.$refs.popup.open(type)
		},
		// 关闭餐具弹层
		closePopup(type) {
			this.$refs.popup.close(type)
		},
		change(e) {
		},
		// 确定本单餐具
		handlePiker() {
			if (this.tableware !== '') {
				this.num = Number(this.tableware)
				this.status = 0
				if (this.tableware === '无需餐具') {
					this.num = 0
					this.status = 0
				}
				if (this.tableware === '依据餐量提供') {
					this.num = this.orderDishNumber
					this.status = 1
				}

				if (this.tableware !== '依据餐量提供' || this.tableware !== '无需餐具') {
					this.tablewareData = this.tableware + '份'

				} else {
					this.tablewareData = this.tableware
				}
			} else {
				//是默认值，在点击的时候抛出去
				let cont = this.baseData[this.$refs.dishinfo.$refs.piker.defaultValue[0]]
				this.tablewareData = cont
				if (this.activeRadio === '依据餐量提供') {
					this.num = this.orderDishNumber
					this.status = 1
				} else {
					this.num = 0
					this.status = 0
				}
			}
		},
		// 确定本单餐具
		changeCont(val) {
			this.tableware = val
		},
		// 餐具数量的后续订单餐具设置
		handleRadio(e) {
			this.activeRadio = e.detail.value
		},
		countdown() {
			const end = Date.parse(new Date())
		},
		// 星期几选择
		dateChange(index) {
			if (index === 1) {
				this.newDateData = this.popright.slice(1)
				this.isTomorrow = true
			} else {
				this.isTomorrow = false
				this.newDateData = []
				this.getDateDate()
			}
			// 点击的还是当前数据的时候直接return
			if (this.tabIndex == index) {
				return
			}
			this.tabIndex = index
		},
		// 选中时间段
		timeClick: function (val) {
			this.selectValue = val.i
			this.setTime(val.val)
		},
		// 设置时间
		setTime(val) {
			if (val === '立即派送') {
				this.arrivalTime = dayjs(this.orderTime).format('HH:mm')
			} else {
				this.arrivalTime = val
			}

			this.setArrivalTime(this.arrivalTime)

		},
		touchstart(e) {
			if (e.changedTouches[0].clientY > 400) {
			}
		}
	}
}
