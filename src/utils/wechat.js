import app from '@/app'
import request from '@/utils/request'

function getQuery(key) {
  var query = window.location.search.substring(1)
  var map = query.split('&')
  for (var i = 0; i < map.length; i++) {
    var pair = map[i].split('=')
    if (pair[0] === key) {
      return pair[1]
    }
  }
}

const wechat = {
  listen: () => {
    if (getQuery('code') !== undefined) {
      // code 换取 openid
      request({
        url: '/wechat/wxlogin',
        method: 'get',
        params: {
          code: getQuery('code')
        }
      }).then(res => {
        app.getStorage('openid', res.result.user.openid, 7)
        window.location.href = app.base_url
      })
    } else {
      if (!app.getStorage('openid')) {
        const app_id = app.app_id
        const scope = 'snsapi_base'
        const app_callback = encodeURIComponent(window.location.href)
        const redirect_uri = encodeURIComponent(`${app.base_url}?target=${app_callback}`)
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${app_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}#wechat_redirect`
        return false
      }
    }
  }
}

export default wechat
