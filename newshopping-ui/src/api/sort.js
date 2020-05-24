import http from '../shared/http'

export function queryGoods () {
  return http.post('/goods/goodsInfo/queryGoods')
}

export function getSortList (level) {
  return http.get('/goods/sort/querySortList?level=' + level)
}
