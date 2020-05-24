import http from '../shared/http'

/**
 * 获取验证码
 * @param mobile 手机号码
 * @param type 验证码类型 2-手机验证码登录 3-更换手机号码
 */
export function getCode (mobile, type) {
  return http.get('/authCenter/user/getMobileVerificationCode', {
    params: {
      mobile,
      type
    }
  })
}

export function loginByCode (mobile, code) {
  return http.post('/authCenter/user/login', {
    mobile,
    type: 2,
    messageCode: code
  })
}

export function loginByPassword (loginName, password) {
  return http.post('/authCenter/user/login', {
    type: 1,
    loginName,
    password
  })
}

export function logout () {
  return http.get('/authCenter/user/logout')
}

export function getUserInfo () {
  return http.get('/authCenter/user/getUserInfo')
}

export function updateUserInfo (info = {}) {
  return http.post('/authCenter/user/updateUser', info)
}

export function modifyUserPassword (mobile, messageCode, password) {
  return http.post('/authCenter/user/modifyUserPassword', {
    mobile,
    messageCode,
    password
  })
}
