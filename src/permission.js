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
      // jssdk 初始化
      // await wechat.initSdk(app.base_url + to.fullPath)
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

router.afterEach((to) => {
  NProgress.done()
  let url = to.fullPath
  if (window.__wxjs_is_wkwebview) {  // IOS 特殊处理
    if (window.entryUrl == '' || window.entryUrl == undefined) {
      window.entryUrl = to.fullPath
      url = to.fullPath
    }else {
      url = window.entryUrl
    }
  }
  wechat.initSdk(app.base_url + url)
})
