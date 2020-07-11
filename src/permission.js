import router from './router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import { Notify } from 'vant'

NProgress.configure({
  showSpinner: false
})

const whiteList = ['Login', 'Register']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (!store.getters.token) {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
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
          Notify('warning', '请求用户信息失败，请重试')
          NProgress.done()
        })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
