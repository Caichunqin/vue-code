import Vue from 'vue'
import Vuex from 'vuex'
import { logout, updateUserInfo } from './api/user'
import { queryGoods } from './api/goods'
import { addCart, getCartList, getTotalPrice } from './api/cart'
import { Notify } from 'vant'

Vue.use(Notify)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    goodsData: {},
    items: [],
    checkoutStatus: null,
    cartList: [],
    totalPrice: 0
  },
  mutations: {
    updateUserInfo (state, info) {
      const userInfo = info ? { ...state.userInfo, ...info } : {}
      state.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    setToken (state, token = '') {
      state.token = token
      localStorage.setItem('token', token)
    },
    queryGoods (state, info) {
      state.goodsData = info
    },
    setCartItems (state, { items }) {
      state.items = items.product
    },
    setProducts (state, products) {
      state.cartList = products
    },
    setPrice (state, price) {
      state.totalPrice = price
    }
  },
  actions: {
    async logout ({ commit }) {
      const res = await logout()
      commit('updateUserInfo', null)
      commit('setToken', '')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
      return res
    },
    async updateUserInfo ({ state, commit }, info = {}) {
      const res = await updateUserInfo(info)
      if (res.success) {
        commit('updateUserInfo', info)
      } else {
        Notify(res.errorMessage)
      }
      return res
    },
    async queryGoods ({ commit }, goodName = '', sortId = '', pageSize = 10, pageNo = 1) {
      const res = await queryGoods(goodName, sortId, pageSize, pageNo)
      if (res.success) {
        commit('queryGoods', res.value)
      } else {
        Notify(res.errorMessage)
      }
      return res
    },
    async addProductToCart ({ commit, dispatch, state }, product) {
      let params = {
        goodsName: product.goodsName,
        goodsPic: product.goodsPictures[0].address,
        quantity: 1,
        price: Number(product.price),
        goodsId: product.id,
        checked: true
      }
      commit('setCartItems', { items: params })
      const res = await addCart(params)
      if (res.success) {
        dispatch('getAllProducts')
      }
      return res
    },
    async getAllProducts ({ commit }, pageSize = 10, pageNo = 1) {
      const res = await getCartList(pageSize, pageNo)
      if (res.success) {
        commit('setProducts', res.value.list)
      }
      return res
    },
    async getPrice ({ commit, state }, product) {
      const res = await getTotalPrice(product)
      commit('setPrice', res.value)
      return res
    }
  }
})
