import axios from '@/utils/axiosConfig.js'

/**
 * @param {*} 获取搜索建议 q 搜索条件
 */

export const getSuggestion = (q) => {
  return axios.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}

/**
 * @params {*} 获取用户搜索历史
 */
export const userHistory = () => {
  return axios.get('/app/v1_0/search/histories')
}
