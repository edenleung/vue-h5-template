import app from '@/app'
import request from '@/utils/request'

const sdk = require('weixin-js-sdk')
import { getWechatSDK } from '@/api/project'

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
  sdk: sdk,
  listen: () => {
    return new Promise((resolve, reject) => {
      if (getQuery('code') !== undefined) {
        wechat.wxlogin(getQuery('code')).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      } else {
        if (!app.getStorage('openid')) {
          wechat.oauth()
        } else {
          resolve()
        }
      }
    })
  },
  wxlogin: (code) => {
    return request({
      url: '/api/wxpay/wxlogin',
      method: 'get',
      params: {
        code
      }
    }).then(res => {
      app.setCookie('openid', res.result.openid, 7)
      const callback = getQuery('callback')
      if (callback !== undefined) {
        window.location.href = decodeURIComponent(callback)
      } else {
        window.location.href = app.base_url
      }
    }).catch(err => {
      throw err
    })
  },
  oauth: () => {
    const app_id = app.app_id
    const scope = app.oauth_scope
    const app_callback = encodeURIComponent(window.location.href)
    const redirect_uri = encodeURIComponent(`${app.base_url}?target=${app_callback}`)
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${app_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}#wechat_redirect`
  },
  config: (config) => {
    wechat.sdk.config(config)
  },
  initSdk: async(url) => {
    await getWechatSDK({ url }).then(res => {
      wechat.config({
        ...res.result.data
      })
    })
  },
  ready: (cb) => {
    wechat.sdk.ready(cb)
  }
}

export default wechat
