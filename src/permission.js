import router from './router'
import app from './app'
import wechat from '@/utils/wechat'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import { Notify } from 'vant'

NProgress.configure({
  showSpinner: false
})

if (process.env.NODE_ENV === 'development') {
  //  开发时模拟openid
  app.setStorage('openid', 'o_Z3Is4_rGCpOqTSlijNDyk4Rgr0')
}

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  await wechat.listen()
  if (!store.getters.token) {
    if (to.meta.auth === true) {
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (!store.getters.user) {
      store
        .dispatch('getUserInfo')
        .then(() => {
          const redirect = decodeURIComponent(from.query.redirect || to.path)
          if (to.path === redirect) {
            next({
              ...to,
              replace: true
            })
          } else {
            next({
              path: redirect
            })
          }
        })
        .catch(() => {
          Notify({ type: 'warning', message: '请求用户信息失败，请重试' })
          NProgress.done()
        })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
  wechat.initSdk()
})
