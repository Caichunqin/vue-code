import http from '../shared/http'
import { imageCompress } from '../shared/util'

export async function uploadFile (file) {
  if (!(file instanceof File)) {
    throw new TypeError(`${file} should be File type`)
  }
  const { size, type } = file
  // 图片压缩
  if (type.startsWith('image')) {
    file = await imageCompress(file, {
      checkOrientation: size < 8 * 1024 * 1024,
      maxWidth: 1000,
      quality: 0.6
    })
  }
  const formData = new FormData()
  formData.append('file', file)
  return http.post('/authCenter/upload/uploadFile', formData)
}

export function downloadFile (linkKey) {
  if (!linkKey) return ''
  return '/authCenter/upload/downloadPic?linkKey=' + linkKey
}
