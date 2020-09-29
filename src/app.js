import Cookie from 'js-cookie'
import VConsole from 'vconsole'

const app = {
  ver: '1.0.0',
  storage_prefix: 'project_',
  debug: false,
  base_url: 'http://www.domain.com',
  app_id: 'appid',
  getStorage: key => {
    return Cookie.get(app.storage_prefix + app.ver + '_' + key)
  },
  setStorage: (key, value, exp = 7) => {
    return Cookie.set(app.storage_prefix + app.ver + '_' + key, value, { expires: exp })
  },
  removeStorage: key => {
    return Cookie.remove(app.storage_prefix + app.ver + '_' + key)
  }
}

if (app.debug) {
  new VConsole()
}

export default app
