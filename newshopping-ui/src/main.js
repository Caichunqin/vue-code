import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getUrlQuery, consoleMobile } from './shared/util'

import './components/global'
import './style/index.scss'

Vue.config.productionTip = false

initApp()

async function initApp () {
  if (getUrlQuery('debug')) {
    await consoleMobile()
  }
  return new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
