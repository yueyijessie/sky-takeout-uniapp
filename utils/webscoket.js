import { Stomp } from './stomp'
import store from './../store'

export default function initWebScoket(params){
	
	var socketOpen = false;
	var socketMsgQueue = [];	
	var ws = {
	  send: sendSocketMessage,
	  onopen: null,
	  onmessage: null
	}
	
	function sendSocketMessage(msg) {
		 if (socketOpen) {
			uni.sendSocketMessage({ data: msg });
			console.log('信息已发送：' + msg);
		  } else {
			socketMsgQueue.push(msg);
		  }
	}
	
	uni.connectSocket({
	  url: 'wss://socket-canzg.itheima.net/ws'
	});
	
	uni.onSocketOpen(function (res) {
	  socketOpen = true;
	  console.log('WebSocket连接已打开！');
	  for (var i = 0; i < socketMsgQueue.length; i++) {
	    sendSocketMessage(socketMsgQueue[i]);
	  }
	  socketMsgQueue = [];
	  ws.onopen && ws.onopen()
	});
	
	uni.onSocketError(function (res) {
	  console.log('WebSocket连接打开失败，请检查！');
	});
	
	uni.onSocketMessage(function (res) {
	  console.log('收到服务器内容：', res);
	  ws.onmessage && ws.onmessage(res)
	});
	
	uni.onSocketClose(function (res) {
	  console.log('WebSocket 已关闭！');
	});
	
	var client = Stomp.over(ws)
	
	var destination = `/exchange/micro_app_exchange/${params.tableId}`
	client.connect('guest', 'guest', sessionId => {
	  console.log('sessionId', sessionId)
	  client.subscribe(destination, (body, headers) => {
		console.log('From MQ:', JSON.parse(body.body))
		store.commit('initdishListMut', JSON.parse(body.body))
	  })
	})
}