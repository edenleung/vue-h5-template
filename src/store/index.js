import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import permission from './modules/permission'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const permissionState = createPersistedState({
  paths: ['permission'],
  storage: {
    getItem: key => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
    removeItem: key => Cookies.remove(key)
  }
})

const modules = { permission, user }

export default new Vuex.Store({
  modules,
  getters,
  plugins: [permissionState]
})
