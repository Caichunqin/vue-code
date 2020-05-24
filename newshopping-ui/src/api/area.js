import http from '../shared/http'

export function getCitys () {
  return http.get('/authCenter/area/getCitys')
}
