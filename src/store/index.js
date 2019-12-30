import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // {token,refresh_token}
    user: null
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    // actions中 用store的另一个实例context来作为第一个参数 所以可以使用context.commit或者{commit}
    SET_USER_SYNC ({ commit }, user) {
      commit('SET_USER', user)
    }
  },
  modules: {
  }
})
