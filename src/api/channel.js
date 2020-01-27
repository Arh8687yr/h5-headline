import axios from '@/utils/axiosConfig.js'

/**
 * 获取用户频道列表
 * 1. 用户登录，获取登录用户的频道列表
 * 2. 用户未登录，获取默认的频道列表
 */
export const getChannels = () => {
  return axios.get('/app/v1_0/user/channels')
}

/**
 * 获取所有频道列表
 */
export const getAllChannels = () => {
  return axios.get('/app/v1_0/channels')
}

/**
 * 删除用户的指定频道
 */
export const delChannel = (id) => {
  return axios.delete(`/app/v1_0/user/channels/${id}`)
}
