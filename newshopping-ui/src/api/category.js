import http from '../shared/http'
import store from '../store'
const companyId = store.state?.userInfo?.companyId || ''

// 商户获取所有分类
export function getAllCategory (id = companyId) {
  return http.get('/authCenter/category/queryAll', {
    params: { companyId: id }
  })
}

/**
 * 商户添加分类
 * @param {string} name 分类名
 */
export function addCategory (name, remark) {
  return http.post('/authCenter/category/add', { name })
}

/**
 * 商户更新分类
 * @param {number} id 分类ID
 * @param {string} name 分类名
 */
export function updateCategory (id, name) {
  return http.post('/authCenter/category/update', { id, name })
}

// 商户删除分类
export function deleteCategory (id) {
  return http.post('/authCenter/category/delete', { id })
}
