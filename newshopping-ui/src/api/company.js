import http from '../shared/http'

export function getCompanyDetail () {
  return http.get('/authCenter/company/detail')
}

export function editCompany (data) {
  return http.post('/authCenter/company/edit', data)
}

export function getCompanyScore () {
  return http.get('/authCenter/company/evaluate')
}

export function getDiscussList () {
  return http.get('/authCenter/company/evaluate/list')
}

export function getPicDiscussList () {
  return http.get('/authCenter/company/evaluate/pic/list')
}
