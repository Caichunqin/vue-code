import http from '../shared/http'

export function getCommentDetail (id) {
  return http.get('/goods/comment?id=' + id)
}

export function saveComment (data) {
  return http.post('/goods/comment', data)
}

export function getChildList (params) {
  return http.get('/goods/comment/childList', {
    params: {
      id: params.id,
      pageSize: params.pageSize,
      pageNo: params.pageNo
    }
  })
}

export function delComment (data) {
  return http.post('/goods/comment/del', data)
}
export function getCommentList (params) {
  return http.get('/goods/comment/list', {
    params: {
      goodsId: params.goodsId,
      pageSize: params.pageSize,
      pageNo: params.pageNo
    }
  })
}
