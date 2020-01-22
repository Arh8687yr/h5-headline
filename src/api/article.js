
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

/**
 * 举报文章：target文章ID type:举报类型 remark:对举报内容的附加说明
 */
export const reportArt = ({
  target,
  type
}) => {
  return axios.post('/app/v1_0/article/reports', {
    target,
    type
  })
}
