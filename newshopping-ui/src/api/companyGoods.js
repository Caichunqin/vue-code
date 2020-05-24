import http from '../shared/http'
import store from '../store'
const companyId = store.state?.userInfo?.companyId || ''

// 查询公司商品列表
export function queryCompanyGoods (companyId, companyCategoryId, pageSize, pageNo) {
  return http.get('/goods/companyGoods/queryGoods', {
    params: {
      companyId,
      companyCategoryId,
      pageSize,
      pageNo
    }
  })
}

// 公司商品上架、下架
export function setGoodsSelfStatus (id, companyCategoryId, status) {
  return http.post('/goods/companyGoods/setGoodsSelfStatus', {
    id,
    companyId,
    companyCategoryId,
    shelfStatus: status
  })
}

// 修改公司商品库存
export function setGoodsCount (id, companyCategoryId, counts) {
  return http.post('/goods/companyGoods/setGoodsCount', {
    id,
    companyId,
    companyCategoryId,
    counts
  })
}
