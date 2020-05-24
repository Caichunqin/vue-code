import http from '../shared/http'

// 保存地址
export function saveAddress (data) {
  return http.post('/goods/receiveAddress', data)
}

export function getAddressList (pageNo) {
  return http.get('/goods/receiveAddress/list', {
    params: {
      pageSize: 10,
      pageNo: pageNo
    }
  })
}
export function getAddressDetail (id) {
  return http.get('/goods/receiveAddress?id=' + id)
}
export function deleteAddress (id) {
  return http.post('/goods//receiveAddress/delete?id=' + id)
}
export function getDefaultAddress () {
  return http.get('/goods/receiveAddress/default')
}

export function setDefaultAddress (id) {
  return http.post('/goods//receiveAddress/default?id=' + id)
}

export function getAreaList () {
  return http.get('/goods/receiveAddress/areaList')
}
