import http from '../shared/http'

export function getBanner () {
  return http.get('/authCenter/homePage/imgSet')
}
