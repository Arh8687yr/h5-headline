import axios from '@/utils/axiosConfig'

/**
 * 用户登录
 * @param {*} 登录参数 mobile,code
 */
export const login = ({
  mobile,
  code
}) => {
  return axios.post('/app/v1_0/authorizations', {
    mobile,
    code
  })
}

// 拉黑作者
export const blackLists = (aut_id) => {
  return axios.post('/app/v1_0/user/blacklists', {
    target: aut_id
  })
}

/**
 * 关注用户 target 关注的用户id
 */
export const followUser = (id) => {
  return axios.post('/app/v1_0/user/followings', {
    target: id
  })
}

/**
 * 取消关注用户
 */
export const cancleFollowUser = (id) => {
  return axios.delete(`/app/v1_0/user/followings/${id}`)
}
