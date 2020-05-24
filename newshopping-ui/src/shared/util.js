import router from '../router'
import Login from '../components/login'
import Compressor from 'compressorjs'
import { loadScript } from './loadScriptOrStyle'

/**
 * 获取地址栏参数
 * @param {String} name 要获取的参数名，若为空，将返回所有参数
 */
export function getUrlQuery (name = '') {
  let querys = {}
  location.search.substr(1)
    .split('&')
    .filter(i => i)
    .forEach(i => (querys[i.split('=')[0]] = i.split('=')[1]))
  return name ? querys[name] : querys
}

/**
 * 替换 url 中某个查询参数的值
 * @param {String} url
 * @param {String} name
 * @param {String} value
 */
export function replaceUrlQuery (url, name, value) {
  const reg = new RegExp('(\\?(?:.+&|)' + name + '=).+(?!&|#)')
  return url.replace(reg, `$1${value}`)
}

/**
 * 跳转至登录页
 */
export function toLogin () {
  const instance = Login()
  return instance
}

/**
 * 跳转路由并添加请求参数: from
 * @param {String} path
 */
export function toPathWithQueryFrom (path) {
  const { pathname, search, hash } = location
  const from = pathname + search + hash
  router.push({
    path,
    query: { from }
  })
}

/**
 * 返回上一页
 */
export function back () {
  const from = getUrlQuery('from')
  if (from) {
    router.replace(decodeURIComponent(from))
  } else {
    router.back()
  }
}

/**
 * 图片压缩
 * @param {File | Blob} file 要压缩的图片
 * @param {Object} options 可选配置，见 https://github.com/fengyuanchen/compressorjs#options
 */
export async function imageCompress (file, options) {
  if (!(file instanceof File) && !(file instanceof Blob)) {
    throw new TypeError(`${file} should be File or Blob type`)
  }
  return new Promise((resolve, reject) => {
    /* eslint-disable no-new */
    new Compressor(file, {
      ...options,
      success: resolve,
      error: reject
    })
  })
}

/**
 * 开启移动端日志打印
 */
export async function consoleMobile () {
  const url = 'https://cdn.bootcss.com/vConsole/3.3.2/vconsole.min.js'
  await loadScript(url)
  // eslint-disable-next-line no-undef
  return new VConsole()
}
