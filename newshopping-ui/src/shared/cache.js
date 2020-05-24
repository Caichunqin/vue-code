export default {
  // 最多缓存数据条数
  MAX_NUM: 200,
  // 最多缓存分钟数
  MAX_MINUTE: 5,
  data: [],
  _isExpired (key) {
    const { time } = this.data.find(i => i.key === key)
    const now = +new Date()
    if (!time) throw new Error(`${key} is not exist in cache`)
    return (now - time) / 1000 / 60 > this.MAX_MINUTE
  },
  set (key, value) {
    const item = this.data.find(i => i.key === key)
    if (item) {
      item.value = value
      item.time = +new Date()
      return
    }
    if (this.data.length >= this.MAX_NUM) this.data.shift()
    this.data.push({ key, value, time: +new Date() })
  },
  get (key) {
    const item = this.data.find(i => i.key === key)
    if (item && !this._isExpired(key)) {
      return item.value
    }
  },
  getAll () {
    return this.data.filter(i => !this.isExpired(i.key))
  },
  remove (key) {
    const index = this.data.findIndex(i => i.key === key)
    if (index >= 0) this.data.splice(index, 1)
  },
  clear () {
    this.data = []
  }
}
