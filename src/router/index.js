import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
  // 判断当前页面是否是登录页
  // 如果是登录页 放行
  if (to.path === '/login') return next()
  // 如果不是登录页
  // 判断是否是登陆状态(是否有token)
  const token = window.sessionStorage.getItem('token')
  // 如果登录 放行
  if (token) return next()
  // 如果未登录 强制跳转到登录页
  next('/login')
})

export default router
