
import axios from '@/utils/axiosConfig.js'

/**
 * 获取文章列表(登录和不登录)
 * @param {*}  频道id: channel_id, 时间戳: timestemp, 是否包含置顶: with_top(0不包含，1包含)
 */
export const getArticles = (params) => {
  return axios.get('/app/v1_1/articles', {
    params
  })
}

/**
 * 不喜欢文章
 */
export const dislikeArt = (artId) => {
  return axios.post('app/v1_0/article/dislikes', {
    target: artId
  })
}
