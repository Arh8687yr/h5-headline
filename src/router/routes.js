const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    // 登录页
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    // 首页
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue')

  }
]
export default routes
