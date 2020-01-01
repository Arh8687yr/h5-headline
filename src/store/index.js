import Vue from 'vue'
import Vuex from 'vuex'
// 引入本地存储的封装操作
import * as storageTools from '@/utils/sessionStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // {token,refresh_token}
    // 向本地读取用户登录状态
    user: storageTools.getItem('user')
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
      // 把登录状态存储到本地存储
      storageTools.setItem('user', user)
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
