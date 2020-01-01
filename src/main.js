import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// 引入校验器
import VeeValidate from 'vee-validate'
// css样式最后写
import 'vant/lib/index.css'
import '@/style/gulp.css'

Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(VeeValidate)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
