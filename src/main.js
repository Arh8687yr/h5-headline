import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// 引入校验器
import VeeValidate, { Validator } from 'vee-validate'
// 导入vee-validate的中文包
import zhCN from 'vee-validate/dist/locale/zh_CN'
// 获取相对时间
// import { fmtDate } from '@/utils/day.js'
// css样式最后写
import 'vant/lib/index.css'
import '@/style/gulp.css'

Vue.config.productionTip = false

// 获取相对时间的过滤器(参数一：过滤器的名字，参数二，过滤函数)
// Vue.filter('fmtDate', fmtDate)
Vue.use(Vant)
Vue.use(VeeValidate, {
  // 文本框中触发验证的事件，默认为input事件
  events: ''
})
// 配置中文
Validator.localize('zhCN', zhCN)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
