
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
 * 获取文章详情
 * @param {*} id 获取文章的id
 */
export const getArtDetail = (id) => {
  return axios.get(`/app/v1_0/articles/${id}`)
}

/**
 * 不喜欢文章
 */
export const dislikeArt = (artId) => {
  return axios.post('/app/v1_0/article/dislikes', {
    target: artId
  })
}

/**
 * 取消不喜欢文章
 * @param {*} artId 获取文章的id
 */
export const cancleDislike = (artId) => {
  return axios.delete(`/app/v1_0/article/dislikes/${artId}`)
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

/**
 * 点赞 target:文章的ID
 */
export const likeArticle = (artId) => {
  return axios.post('/app/v1_0/article/likings', {
    target: artId
  })
}

/**
 * 取消点赞 target: 文章的ID
 */
export const cancleLike = (artId) => {
  return axios.delete(`/app/v1_0/article/likings/${artId}`)
}
