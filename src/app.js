import Cookie from 'js-cookie'
import VConsole from 'vconsole'

const app = {
  ver: '1.0.0',
  storage_prefix: 'project_',
  debug: false,
  base_url: 'http://www.domain.com',
  app_id: 'appid',
  oauth_scope: 'snsapi_base',
  // cdn
  cdn_domain: 'http://up-z2.qiniup.com',
  // h5 公众号快速关注链接
  weixin_profile: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=xxxxxx&scene=124#wechat_redirect',
  getStorageKey: key => {
    return app.storage_prefix + app.ver + '_' + key
  },
  getStorage: key => {
    return Cookie.get(app.getStorageKey(key))
  },
  setStorage: (key, value, exp = 7) => {
    return Cookie.set(app.getStorageKey(key), value, { expires: exp })
  },
  removeStorage: key => {
    return Cookie.remove(app.getStorageKey(key))
  },
  // 开发人员 debug 账号集
  debuger: [
    // 'o_Z3Is4_rGCpOqTSlijNDyk4Rgr0'
  ]
}

export default app
