import Cookie from 'js-cookie'
import VConsole from 'vconsole'

const app = {
  ver: '1.0.0',
  storage_prefix: 'project_',
  debug: false,
  base_url: 'http://www.domain.com',
  app_id: 'appid',
  oauth_scope: 'snsapi_base',
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
  }
}

if (app.debug && process.env.NODE_ENV !== 'production') {
  new VConsole()
}

export default app
