import navBar from "../common/Navbar/navbar.vue" //标题
import Phone from "@/components/uni-phone/index.vue" //拨打电话
import popMask from "./components/popMask.vue" //规格
import popCart from "./components/popCart.vue" //购物车弹出层
import dishDetail from "./components/dishDetail.vue" //菜品详情
import {
	// 苍穹外卖相关的接口
	userLogin,
	getCategoryList,
	dishListByCategoryId,
	// 查询套餐列表的接口
	querySetmeaList,
	// 获取购物车集合
	getShoppingCartList,
	// 新的购物车添加逻辑接口
	newAddShoppingCartAdd,
	// 新的购物车减少接口
	newShoppingCartSub,
	// 清空购物车
	delShoppingCart,
	// 此接口为首页查询套餐详情展示的接口
	querySetmealDishById,
	// 获取店铺信息
	getShopStatus,
	// 获取店铺联系方式
	getMerchantInfo,
} from "../api/api.js"
import { mapState, mapMutations } from "vuex"
import { baseUrl } from "../../utils/env"
export default {
	data() {
		return {
			title: "Hello",
			// 去结算部分
			openOrderCartList: false,
			// 存放左侧滚动区域菜品分类数组
			typeListData: [],
			dishListData: [],
			// 存放右侧对应菜品每个菜名称的数组
			dishListItems: [],
			dishDetailes: {},
			openDetailPop: false,
			openMoreNormPop: false,
			moreNormDataes: null,
			tableInfo: null,
			moreNormDishdata: null,
			moreNormdata: null,
			// 套餐中查询到的菜品名称
			dishMealData: null,
			openTablePeoPleNumber: 1,
			orderData: 0,
			// 选中左侧菜品的索引
			typeIndex: 0,
			// 控制菜品详情显示
			openTablePop: false,
			// 规格有关的数组
			flavorDataes: [],
			// 加入购物车数量
			orderDishNumber: 0,
			// 菜品金额
			orderDishPrice: 0,
			params: {
				shopId: "f3deb",
				storeId: "1282344676983062530",
				tableId: "1282346960773238786",
			},
			// 添加一个右侧number更新以后重新刷新接口的id --- 这个id来自左侧菜品分类的id
			rightIdAndType: {},
			phoneData: "",
			tablewareNumber: 0,
			shopStatus: null,
			scrollTop: 0,
			menuHeight: 0, // 左边菜单的高度
			menuItemHeight: 0, // 左边菜单item的高度
			itemId: "", // 栏目右边scroll-view用于滚动的id
			arr: [],
		}
	},
	//   组件
	components: {
		navBar,
		Phone,
		popMask,
		popCart,
		dishDetail,
	},
	//   计算属性
	computed: {
		// 购物车信息列表
		orderListDataes: function () {
			return this.orderListData()
		},
		loaddingSt: function () {
			return this.lodding()
		},
		// 计算购物车清单
		orderAndUserInfo: function () {
			let orderData = []
			Array.isArray(this.orderListDataes) &&
				this.orderListDataes.forEach((n, i) => {
					let userData = {}
					userData.nickName = n.name ?? ""
					userData.avatarUrl = n.image ?? ""
					userData.dishList = [n]
					const num = orderData.findIndex(
						(o) => o.nickName == userData.nickName
					)
					if (num != -1) {
						orderData[num].dishList.push(n)
					} else {
						orderData.push(userData)
					}
				})
			return orderData
		},
		ht: function () {
			return (
				uni.getMenuButtonBoundingClientRect().top +
				uni.getMenuButtonBoundingClientRect().height +
				7
			)
		},
	},

	onReady() {
		this.getMenuItemTop()
	},
	onLoad(options) {
		uni.onNetworkStatusChange(function (res) {
			if (res.isConnected == false) {
				uni.navigateTo({
					url: "/pages/nonet/index",
				})
			}
		})
		if (options) {
			if (!options.status && !options.formOrder) {
				this.getData()
			}
		}
	},
	onShow() {
		if (this.token()) {
			this.init()
		}
	},
	methods: {
		//   vuex储存信息
		...mapMutations([
			"setShopInfo", //设置店铺信息
			"setShopPhone", //设置电话
			"setShopStatus", //设置店铺状态
			"initdishListMut", //设置购物车订单
			"setStoreInfo",
			"setBaseUserInfo", //设置用户基本信息
			"setLodding",
			"setToken", //设置token
			"setDeliveryFee", //设置配送费
		]),
		// 从vuex信息
		...mapState([
			"shopInfo", //店铺信息
			"shopPhone", //电话
			"orderListData",
			"baseUserInfo", //用户信息
			"lodding",
			"token", //token
			"deliveryFee", //配送费
		]),
		loginSync() {
			return new Promise((resolve, reject) => {
				uni.login({
					success: (loginRes) => {
						if (loginRes.errMsg === "login:ok") {
							resolve(loginRes.code)
						}
					},
				})
			})
		},
		// 获取用户信息
		getData() {
			let res = wx.getMenuButtonBoundingClientRect()
			let _this = this
			// 获取店铺状态
			this.getShopInfo()
			this.selectHeight = res.height
			if (this.token() === "") {
				uni.showModal({
					title: "温馨提示",
					content: "亲，授权微信登录后才能点餐！",
					showCancel: false,
					success(res) {
						if (res.confirm) {
							let jsCode = ""
							uni.login({
								provider: "weixin",
								success: (loginRes) => {
									if (loginRes.errMsg === "login:ok") {
										jsCode = loginRes.code
									}
								},
							})
							// 授权
							uni.getUserProfile({
								desc: "登录",
								success: function (userInfo) {
									_this.setBaseUserInfo(userInfo.userInfo)
									const params = {
										code: jsCode,
										// 传递地理位置信息
									}
									// 获取定位信息
									uni.getLocation({
										type: 'gcj02', isHighAccuracy: true
									}).then(([err, result]) => {
										if (err) {
											uni.showToast({
												title: "获取地理位置失败",
												icon: "none"
											})
										} else {
											if (process.env.NODE_ENV === '"development"') {
												params.location = `116.481488,39.990464`//	先写死在北京
											} else {
												params.location = `${result.longitude},${result.latitude}`
											}

											userLogin(params)
												.then((success) => {
													if (success.code === 1) {
														_this.setToken(success.data.token)
														// 保存配送费
														// _this.setDeliveryFee(success.data.deliveryFee)
														_this.setDeliveryFee(6) // 先写死6块
														// 保存商铺信息
														// _this.setShopInfo({
														// 	shopName: success.data.shopName,
														// 	shopAddress: success.data.shopAddress,
														// 	shopId: success.data.shopId,
														// })
														_this.setShopInfo({
															shopName: success.data.shopName,
															shopAddress: "北京市朝阳区新街大道一号楼8层",
															shopId: success.data.shopId,
														})
														_this.init()
													}
												})
												.catch((err) => { })



										}

									})

								},
								fail: function (err) { },
							})
						}
					},
				})
			}
		},

		async init() {
			// 获取菜品和套餐分类接口
			if (this.typeIndex !== 0) {
				this.typeIndex = 0
			}

			// 获取店铺联系方式
			this.getMerchantInfo()
			getCategoryList().then((res) => {
				if (res && res.code === 1) {
					this.typeListData = [...res.data]
					if (res.data.length > 0) {
						this.getDishListDataes(res.data[this.typeIndex || 0])
					}
				}
			})
			// 调用一次购物车集合---初始化
			this.getTableOrderDishListes()
		},
		// 点击左边的栏目切换
		async swichMenu(params, index) {
			if (this.arr.length == 0) {
				await this.getMenuItemTop()
			}
			if (index == this.typeIndex) return
			this.$nextTick(function () {
				this.typeIndex = index
				this.leftMenuStatus(index)
			})
			this.getDishListDataes(params, index)
		},
		// 获取一个目标元素的高度
		getElRect(elClass, dataVal) {
			new Promise((resolve, reject) => {
				const query = uni.createSelectorQuery().in(this)
				query
					.select("." + elClass)
					.fields(
						{
							size: true,
						},
						(res) => {
							// 如果节点尚未生成，res值为null，循环调用执行
							if (!res) {
								setTimeout(() => {
									this.getElRect(elClass)
								}, 10)
								return
							}
							this[dataVal] = res.height
							resolve()
						}
					)
					.exec()
			})
		},
		// 设置左边菜单的滚动状态
		async leftMenuStatus(index) {
			this.typeIndex = index
			// 如果为0，意味着尚未初始化
			if (this.menuHeight == 0 || this.menuItemHeight == 0) {
				await this.getElRect("menu-scroll-view", "menuHeight")
				await this.getElRect("type_item", "menuItemHeight")
			}
			// 将菜单活动item垂直居中
			this.scrollTop =
				index * this.menuItemHeight +
				this.menuItemHeight / 2 -
				this.menuHeight / 2
		},
		// 获取右边菜单每个item到顶部的距离
		getMenuItemTop() {
			new Promise((resolve) => {
				let selectorQuery = uni.createSelectorQuery()
				selectorQuery
					.selectAll(".class-item")
					.boundingClientRect((rects) => {
						// 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
						if (!rects.length) {
							setTimeout(() => {
								this.getMenuItemTop()
							}, 10)
							return
						}
					})
					.exec()
			})
		},
		// 获取菜品列表
		async getDishListDataes(params, index) {
			this.rightIdAndType = {}
			this.rightIdAndType = {
				id: params.id,
				type: params.type,
			}
			const param = {
				categoryId: params.id,
			}
			// type：1是菜品、2是套餐
			if (params.type === 1) {
				await dishListByCategoryId(param)
					.then((res) => {
						if (res && res.code === 1) {
							// 添加一个字段去实时更新加入购物车number数量 ----- newCardNumber
							this.dishListData =
								res.data &&
								res.data.map((obj) => ({
									...obj,
									type: 1,
									newCardNumber: 0,
								}))
						}
					})
					.catch((err) => { })
			} else {
				// 套餐
				await querySetmeaList(param)
					.then((success) => {
						if (success && success.code === 1) {
							// dishListItems被转换数组---原始this.dishListData
							this.dishListData =
								success.data &&
								success.data.map((obj) => ({
									...obj,
									type: 2,
									newCardNumber: 0,
								}))
						}
					})
					.catch((err) => { })
			}
			this.typeIndex = index
			this.setOrderNum()
		},
		// 获取首页店铺信息
		async getShopInfo() {
			await getShopStatus()
				.then((res) => {
					this.shopStatus = res.data
					console.log(res.data);
					this.setShopStatus(res.data)
				})
				.catch((err) => { })
		},
		// 获取店铺电话
		async getMerchantInfo() {
			this.phoneData = '123456789'
			this.setShopPhone('123456789')
			// await getMerchantInfo()
			// 	.then((res) => {
			// 		this.phoneData = res.data.phone
			// 		console.log(res);
			// 		this.setShopPhone(res.data)
			// 	})
			// 	.catch((err) => { })
		},
		// 重新拼装image
		getNewImage(image) {
			return `${baseUrl}/common/download?name=${image}`
		},
		// 获取购物车订单列表
		async getTableOrderDishListes() {
			// 调用获取购物车集合接口
			await getShoppingCartList({})
				.then((res) => {
					if (res.code === 1) {
						this.initdishListMut(res.data)
						this.computOrderInfo()
					}
				})
				.catch((err) => { })
		},
		// 去订单页面
		goOrder() {
			uni.navigateTo({
				url: "/pages/order/index",
			})
		},
		// 加菜 - 添加菜品
		async addDishAction(item, form) {
			// 规格
			if (
				this.openMoreNormPop &&
				(!this.flavorDataes || this.flavorDataes.length <= 0)
			) {
				uni.showToast({
					title: "请选择规格",
					icon: "none",
				})
				return false
			}
			this.openMoreNormPop = false
			// 实时更新obj.newCardNumber新添加的字段----加入购物车数量number
			this.tablewareNumber++
			this.dishDetailes.dishNumber++
			if (
				this.orderListDataes &&
				!this.orderListDataes.some((n) => n.id == item.dishId) &&
				this.flavorDataes.length > 0
			) {
				item.flavorRemark = JSON.stringify(this.flavorDataes)
			}
			// 有sort字段是菜品
			let dishFlavorDatas = ""
			let flavorRemark = []
			if (item.flavorRemark) {
				flavorRemark = JSON.parse(item.flavorRemark)
			}
			if (item.dishFlavor !== "" && item.dishFlavor) {
				dishFlavorDatas = item.dishFlavor
			} else if (flavorRemark.length > 0) {
				dishFlavorDatas = flavorRemark.join(',')
			} else {
				dishFlavorDatas = null
			}
			let params = {
				dishFlavor: dishFlavorDatas,
			}
			if (item.type === 1) {
				params = {
					...params,
					dishId: item.id,
				}
			} else if (item.type === 2) {
				params = {
					setmealId: item.id,
				}
			} else if (form === "购物车") {
				if (item.dishId) {
					params = {
						...params,
						dishId: item.dishId,
					}
				} else {
					params = {
						setmealId: item.setmealId,
					}
				}
			}
			newAddShoppingCartAdd(params)
				.then((res) => {
					if (res.code === 1) {
						// 调用一次购物车集合---初始化
						this.getTableOrderDishListes()
						// 重新调取刷新右侧具体菜品列表
						this.getDishListDataes(this.rightIdAndType)
						this.flavorDataes = []
					}
				})
				.catch((err) => { })
		},
		// 加入购物车
		addShop(item) {
			console.log(item);
			this.dishDetailes = item
			this.addDishAction(item, "普通")
		},
		// 减菜 - 添加菜品
		async redDishAction(item, form) {
			// 实时更新obj.newCardNumber新添加的字段----加入购物车数量number
			this.tablewareNumber--
			this.dishDetailes.dishNumber--
			let dishFlavorDatas = ""
			let flavorRemark = []
			if (item.flavorRemark) {
				flavorRemark = JSON.parse(item.flavorRemark)
			}
			if (item.dishFlavor !== "" && item.dishFlavor) {
				dishFlavorDatas = item.dishFlavor
			} else if (flavorRemark.length > 0) {
				dishFlavorDatas = flavorRemark[0]
			} else {
				dishFlavorDatas = null
			}
			let params = {
				dishFlavor: dishFlavorDatas,
			}
			if (item.type === 1) {
				params = {
					...params,
					dishId: item.id,
				}
			} else if (item.type === 2) {
				params = {
					// ...params,
					setmealId: item.id,
				}
			} else if (form === "购物车") {
				if (item.dishId) {
					params = {
						...params,
						dishId: item.dishId,
					}
				} else {
					params = {
						setmealId: item.setmealId,
					}
				}
			}
			await newShoppingCartSub(params)
				.then((res) => {
					if (res.code === 1) {
						// 调用一次购物车集合---初始化
						this.getTableOrderDishListes()
						// 重新调取刷新右侧具体菜品列表
						this.getDishListDataes(this.rightIdAndType)
					}
				})
				.catch((err) => { })
		},
		// 清空购物车
		clearCardOrder() {
			delShoppingCart()
				.then((res) => {
					this.openOrderCartList = false
					// 调用一次购物车集合---初始化
					this.getTableOrderDishListes()
					// 重新调取刷新右侧具体菜品列表
					this.getDishListDataes(this.rightIdAndType)
				})
				.catch((err) => { })
		},
		// 打开菜品牌详情
		openDetailHandle(item) {
			this.dishDetailes = item
			if (item.type === 2) {
				querySetmealDishById({
					id: item.id,
				})
					.then((res) => {
						if (res.code === 1) {
							this.openDetailPop = true
							this.dishMealData = res.data
						}
					})
					.catch((err) => { })
			} else {
				this.openDetailPop = true
			}
		},
		// 关闭菜品详情
		dishClose() {
			this.openDetailPop = false
		},
		// 多规格数据处理
		moreNormDataesHandle(item) {
			this.flavorDataes.splice(0)
			this.moreNormDishdata = item
			this.openDetailPop = false
			this.openMoreNormPop = true
			this.moreNormdata = item.flavors.map((obj) => ({
				...obj,
				value: JSON.parse(obj.value),
			}))
			this.moreNormdata.forEach((item) => {
				if (item.value && item.value.length > 0) {
					this.flavorDataes.push(item.value[0])
				}
			})
		},
		// 选规格 处理一行只能选择一种
		checkMoreNormPop(val) {
			let obj = val.obj
			let item = val.item
			let ind
			let findst = obj.some((n) => {
				ind = this.flavorDataes.findIndex((o) => o == n)
				return ind != -1
			})
			const num = this.flavorDataes.findIndex((it) => it == item)
			if (num == -1 && !findst) {
				this.flavorDataes.push(item)
			} else if (findst) {
				this.flavorDataes.splice(ind, 1)
				this.flavorDataes.push(item)
			} else {
				this.flavorDataes.splice(num, 1)
			}
		},
		// 关闭选规格弹窗
		closeMoreNorm(moreNormDishdata) {
			this.flavorDataes.splice(0, this.flavorDataes.length)
			this.openMoreNormPop = false
		},
		// 订单里和总订单价格计算
		computOrderInfo() {
			let oriData = this.orderListDataes
			this.orderDishNumber = this.orderDishPrice = 0
			oriData.map((n, i) => {
				this.orderDishNumber += n.number
				this.orderDishPrice += n.number * n.amount
			})
			this.orderDishPrice = this.orderDishPrice
		},
		// 处理点餐数量 - 更新菜品已点餐数量
		setOrderNum() {
			let ODate = this.dishListData
			let CData = this.orderListDataes
			ODate &&
				ODate.map((obj, index) => {
					obj.dishNumber = 0
					// 去除空的规格
					if (obj.flavors) {
						obj.flavors.forEach((value, i) => {
							if (value.name === "") {
								obj.flavors.splice(i, 1)
							}
						})
					}

					if (CData.length > 0) {
						CData &&
							CData.forEach((tg, ind) => {
								if (obj.id === tg.dishId) {
									obj.dishNumber = tg.number
								}
								if (obj.id === tg.setmealId) {
									obj.dishNumber = tg.number
								}
							})
					}
				})
			if (this.dishListItems.length == 0) {
				this.dishListItems = ODate
			} else {
				this.dishListItems.splice(0, this.dishListItems.length, ...ODate)
			}
		},
		// 拨打电话弹层
		handlePhone(type) {
			this.$refs.phone.$refs.popup.open(type)
		},
		// 关闭电话弹层
		closePopup(type) {
			this.$refs.phone.$refs.popup.close(type)
		},
		disabledScroll() {
			return false
		},
	},
}
