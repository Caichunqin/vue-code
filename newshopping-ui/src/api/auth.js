import http from '../shared/http'

// 个人审核
export function submitPersonAuth (data) {
  return http.post('/authCenter/auth/submitPersonAuth', data)
}

// 个人审核详情信息
export function personDetail () {
  return http.get('/authCenter/auth/personDetail')
}

// 企业审核
export function submitCompanyAuth (data) {
  return http.post('/authCenter/auth/submitCompanyAuth', data)
}

// 企业审核详情信息
export function companyDetail () {
  return http.get('/authCenter/auth/companyDetail')
}
