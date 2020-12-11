import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import app_config from '@/app'
import VConsole from 'vconsole'
import '@/core/vant'

// import './permission'

// filter
import '@/utils/filter'

Vue.config.productionTip = false

if (app_config.debug && process.env.NODE_ENV === 'production') {
  // 指定开发人者开启vconsole
  const debuger = app_config.getStorage('openid')
  if (app_config.debuger.lenght && debuger && app_config.debuger.indexOf(debuger) !== -1) {
    new VConsole()
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
