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
