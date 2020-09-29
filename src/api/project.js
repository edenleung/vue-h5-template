import request from '@/utils/request'

export function getWechatSDK(params) {
  return request({
    url: `/wechat/sign`,
    method: 'get',
    params
  })
}
