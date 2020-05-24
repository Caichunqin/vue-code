import http from '../shared/http'

export function queryGoods (goodsName, sortId, pageSize, pageNo) {
  return http.get('/goods/goodsInfo/queryGoods', {
    params: {
      goodsName,
      sortId,
      pageSize,
      pageNo
    }
  })
}
export function queryGoodsDetail (id) {
  return http.get('/goods/goodsInfo/queryGoodsDetail', {
    params: {
      id
    }
  })
}

export function addGoods (data) {
  return http.post('/goods/goodsInfo/addGoods', data)
}

export function goodsFocus (goodsId) {
  return http.post('/goods/goodsFocus?goodsId=' + goodsId)
}
export function cancelFocus (goodsId) {
  return http.post('/goods/goodsFocus/cancelFocus?goodsId=' + goodsId)
}

export function focusGoodsList (pageSize) {
  return http.get('/goods/goodsFocus/focusGoodsList', {
    params: {
      pageSize: pageSize,
      pageNo: 1
    }
  })
}
export function browHistory (pageSize) {
  return http.get('/goods/browHistory', {
    params: {
      pageSize: pageSize,
      pageNo: 1
    }
  })
}
