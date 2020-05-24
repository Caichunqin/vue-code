export { default as isIDCard } from './idcard'

export function isPhone (data) {
  return /^1\d{10}$/.test(data)
}

// 是否是验证码
export function isPhoneCode (data) {
  return /^\d{6}$/.test(data)
}

export function isEmail (data) {
  return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(data)
}

export function isPassword (data) {
  return /^(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{8,30}$/.test(data)
}

export function isChinessName (data) {
  return /^[\u4e00-\u9fa5]{2,6}$/.test(data)
}

// 是否统一社会信用代码（弱校验）
export function isSocialCreditCode (data) {
  return /^[0-9A-Z]{18}$/.test(data)
}
