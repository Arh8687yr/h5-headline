import axios from 'axios'
import JSONbig from 'json-bigint'

// 在多个服务器请求时，baseURL 不同，所以不推荐直接操作axios，而是new一个axios实例
const instance = axios.create({
  // baseURL: '' // baseUrl 从cli3.3起已弃用，改为publicPath
  timeout: 50000
  // headers:{}
})

// 请求拦截器 拦截请求并为每一个请求添加token
instance.interceptors.request.use(config => {

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
})
export default instance
