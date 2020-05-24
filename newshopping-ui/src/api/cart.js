import http from '../shared/http'

export function addCart (data) {
  return http.post('/goods/cart/addCart', data)
}

export function updateCartCount (data) {
  return http.post('/goods/cart/cart', data)
}

export function deleteGoods (data) {
  return http.post('/goods/cart/cart', data)
}

export function deleteAllGoods () {
  return http.post('/goods/cart/clearCart')
}

export function getCartList (pageSize, pageNo) {
  return http.get('/goods/cart/getCartList', {
    params: {
      pageNo,
      pageSize
    }
  })
}

export function getTotalPrice (data) {
  return http.post('/goods/cart/settleAccounts', data)
}
