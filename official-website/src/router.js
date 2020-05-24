import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
const lazyload = component => () => import(`./views/${component}.vue`)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/resolution',
      component: lazyload('Resolution')
    },
    {
      path: '/ability',
      component: lazyload('Ability')
    },
    {
      path: '/friends',
      component: lazyload('Friends')
    },
    {
      path: '/about',
      component: lazyload('About')
    },
    {
      path: '*',
      redirect: '/home'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
