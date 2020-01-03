// 本地存储的封装
export const setItem = (key, value) => {
  // typeof 判断简单数据类型 instanceof判断复杂数据类型
  // if (value instanceof Object) {
  //   // JSON.stringify 将对象转换为JSON字符串
  //   value = JSON.stringify(value)
  // }
  window.sessionStorage.setItem(key, JSON.stringify(value))
}
export const getItem = (key) => {
  return JSON.parse(window.sessionStorage.getItem(key))
}
export const removeItem = (key) => {
  window.sessionStorage.removeItem(key)
}

// 存储的区别
// localStorage存在磁盘中 sessionStorage存在内存中 cookie是服务器请求携带
