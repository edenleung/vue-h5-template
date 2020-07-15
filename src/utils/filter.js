import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.filter('day', function(dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)
})

Vue.filter('moment', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('now', function(dataStr) {
  return moment(dataStr).fromNow()
})

Vue.filter('phone', function(str) {
  return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
})
