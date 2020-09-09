import Cookie from 'js-cookie'
import VConsole from 'vconsole'

const app = {
  ver: '1.0.0',
  cookie_prefix: 'project_',
  debug: false,
  base_url: 'http://www.domain.com',
  app_id: 'appid',
  getCookie: key => {
    return Cookie.get(app.cookie_prefix + app.ver + '_' + key)
  },
  setCookie: (key, value, exp = 7) => {
    return Cookie.set(app.cookie_prefix + app.ver + '_' + key, value, { expires: exp })
  }
}

if (app.debug) {
  new VConsole()
}

export default app
