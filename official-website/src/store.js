import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activedPath: ''
  },
  mutations: {
    setActivedPath: (state, path = '') => {
      state.activedPath = path
    }
  },
  actions: {

  }
})
