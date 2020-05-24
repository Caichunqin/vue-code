import axios from 'axios'
import store from '../store'
import { toLogin } from './util'
const needLoginErrorCode = [
  'TK0001',
  'TK0002',
  'TK0003',
  'TK0004',
  'TK0005'
]

axios.interceptors.request.use(config => {
  // Do something before request is sent
  const { token } = store.state
  const { headers } = config
  if (token) {
    headers['XW-Token'] = token
  }
  return config
}, error => {
  console.error(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // Do something with response data
  const { data } = response
  const { errorCode } = data
  if (needLoginErrorCode.includes(errorCode)) {
    store.commit('updateUserInfo', null)
    store.commit('setToken', '')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    toLogin()
    return false
  }
  return data
}, error => {
  console.error(error)
  return Promise.reject(error)
})

export default axios
