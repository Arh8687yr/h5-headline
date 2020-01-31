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

/**
 * @params {*} 删除用户搜索历史
 */
export const delUserHistory = () => {
  return axios.delete('/app/v1_0/search/histories')
}

/**
 * @params {*} 搜索结果
 * page 页数
 * per_page 每页显示条数
 * q 搜索关键字
 */
export const getSearchResult = ({
  page,
  per_page,
  q
}) => {
  return axios.get('/app/v1_0/search', {
    params: {
      page,
      per_page,
      q
    }
  })
}
