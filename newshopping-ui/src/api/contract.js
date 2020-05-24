import http from '../shared/http'
import store from '../store'

// 合同签名
export function sign (data) {
  return http.post('/authCenter/contract/sign', data)
}

// 获取订单的合同（签名好并且基本数据填充好）
export function getOrderContract (orderNo) {
  return http.get('/authCenter/contract/getOrderContract', {
    params: { orderNo }
  })
}

export const getOrderContractUrl = (orderNo) => {
  const token = store.state.token
  return `/authCenter/contract/getOrderContract?XW-Token=${token}&orderNo=${orderNo}`
}
