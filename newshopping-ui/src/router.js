import Vue from 'vue'
import Router from 'vue-router'
import { toLogin } from './shared/util'

Vue.use(Router)

const lazyload = component => () => import(`./views/${component}.vue`)

/**
 * 路由
 * @description
 * meta 定义如下
 * - {boolean} requireAuth: 该页面是否需要登录，默认为false
 */
const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: lazyload('Tabs'),
      redirect: 'index',
      children: [
        {
          path: 'index',
          component: lazyload('index/Index')
        },
        {
          path: 'sort',
          component: lazyload('sort/index')
        },
        {
          path: 'explore',
          component: lazyload('explore/Explore')
        },
        {
          path: 'cart',
          component: lazyload('cart/index'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'self',
          component: lazyload('self/Self')
        }
      ]
    },
    {
      path: '/search',
      component: lazyload('index/search')
    },
    {
      path: '/productList',
      component: lazyload('index/ProductList')
    },
    {
      path: '/productDetail',
      component: lazyload('product/productDetail')
    },
    {
      path: '/footmark',
      title: '我的足迹',
      component: lazyload('product/footmark')
    },
    {
      path: '/orderDetail',
      title: '订单详情',
      component: lazyload('product/orderDetail')
    },
    {
      path: '/commentList',
      title: '问大家',
      component: lazyload('product/commentList')
    },
    {
      path: '/commentDetail',
      title: '问大家',
      component: lazyload('product/commentDetail'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userInfo',
      component: lazyload('self/UserInfo'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/setting',
      component: lazyload('self/Setting'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/email',
      component: lazyload('self/Email'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/setPassword',
      component: lazyload('self/SetPassword'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/updateMobile',
      component: lazyload('self/UpdateMobile'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/mobileView',
      component: lazyload('self/MobileView'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/changeUserName',
      component: lazyload('self/ChangeUserName'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/certification',
      component: lazyload('self/Certification'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/authentication',
      component: lazyload('self/Authentication'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/getCity',
      component: lazyload('self/GetCity'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/profile',
      component: lazyload('self/Profile'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/publish',
      component: lazyload('Publish'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/addAddress',
      component: lazyload('address/add'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/addressList',
      component: lazyload('address/list'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/contract',
      component: lazyload('contract/Contract'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/store',
      component: lazyload('store/Homepage')
    },
    {
      path: '/companyStore',
      component: lazyload('store/CompanyStore'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/goodsManage',
      component: lazyload('store/GoodsManage'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/companyInfo',
      component: lazyload('store/CompanyInfo'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/manageSort',
      component: lazyload('store/ManageSort'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/focusGoods',
      component: lazyload('product/focusGoods'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/404',
      component: lazyload('404')
    },
    {
      path: '*',
      component: lazyload('404')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requireAuth) &&
    !localStorage.getItem('token')
  ) {
    toLogin()
    return
  }
  next()
})

export default router
