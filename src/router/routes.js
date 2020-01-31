import Tabbar from '@/views/Tabbar.vue'
import Home from '@/views/home'
const routes = [
  {
    // 首页
    path: '/',
    component: Tabbar,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/home/Qa.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/home/Video.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/home/User.vue')
      }
    ]
  },
  {
    // 登录页
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  // 搜索页
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue')
  },
  // 搜索结果页
  {
    path: '/searchResult/:q',
    name: 'searchResult',
    // 通过props传递动态参数
    props: true,
    component: () => import('@/views/SearchResult.vue')
  }
]
export default routes
