import Vue from 'vue'
import Main from './Index.vue'
let LoginConstructor = Vue.extend(Main)

LoginConstructor.prototype.close = function () {
  this.visible = false
}

const Login = function () {
  const instance = new LoginConstructor()
  instance.$mount()
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => { instance.visible = true })
  return instance
}

export default Login
