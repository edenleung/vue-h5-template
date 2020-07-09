import request from '@/utils/request'

const api = {
  Login: '/api/auth/login'
}

export function login (data) {
  return request({
    url: api.Login,
    method: 'post',
    data
  })
}
