import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'

// 在多个服务器请求时，baseURL 不同，所以不推荐直接操作axios，而是new一个axios实例
const instance = axios.create({
  // baseURL: '', // baseUrl 从cli3.3起已弃用，改为publicPath
  timeout: 50000
  // headers:{}
})

// 请求拦截器 拦截请求并为每一个请求添加token
instance.interceptors.request.use(config => {
  // 判断vuex中是否有登录状态
  // 因为请求文件是一个单独的模块，所以this访问不到vue的实例，这时可以将store引入
  if (store.state.user) {
    // 为请求的headers对象新增Authorization属性
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 大数字处理：获取到服务器返回的数据，并且是在数据处理之前使用
// transformResponse 是在响应拦截器之前执行
instance.defaults.transformResponse = [function (data) {
  try {
    return JSONbig.parse(data)
  } catch (err) {
    return data
  }
}]

// 响应拦截器 拦截请求返回的error
instance.interceptors.response.use(responses => {
  return responses.data.data || responses.data
},
error => {
  return Promise.reject(error)
})
export default instance
