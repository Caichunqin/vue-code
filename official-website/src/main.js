import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Sentry.init({
  dsn: 'https://4763b76215ae4f9eb42ec5a9e648d205@sentry.io/1537186',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
