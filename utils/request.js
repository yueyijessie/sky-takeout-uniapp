import store from './../store'
import { baseUrl } from './env'
// 参数： url:请求地址  param：请求参数  method：请求方式 callBack：回调函数
export function request({url='', params={}, method='GET'}) {
	uni.getStorage({
		key: ''
	})
	const storeInfo = store.state
	let header = {
			'Accept': 'application/json',
			'Access-Control-Allow-Origin':'*',
			'Content-Type': 'application/json', 
			// 'shopid':storeInfo.storeInfo.shopId ?? '',
			// 'storeid':storeInfo.storeInfo.storeId ?? '',
			'authentication': storeInfo.token
		}
	
	const requestRes = new Promise((resolve, reject) => {
		store.commit('setLodding', false)
		 uni.request({
			url: baseUrl+url, 
			data: params,
			header: header,
			method: method,
			success: (res) => {
				const { data } = res
				if (data.code == 200 || data.code === 1) {
					// store.commit('setLodding', false)
					resolve(res.data)
				}else{
					// store.commit('setLodding', true)
					reject(res.data)
				}
			},
			fail: (err) => {
				const error = {data:{msg:err.data}}
				// store.commit('setLodding', true)
				reject(error)
			}
		});
	})
	return requestRes
}

