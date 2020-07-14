import request from '@/utils/request'

const api = {
  Login: '/api/auth/login',
  UserInfo: '/api/user/info'
}

export function login (data) {
  return request({
    url: api.Login,
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: api.UserInfo,
    method: 'get'
  })
}
