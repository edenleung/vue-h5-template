import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import permission from './modules/permission'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
import app from '@/app'

Vue.use(Vuex)

const permissionState = createPersistedState({
  paths: ['permission'],
  storage: {
    getItem: key => app.getStorage(key),
    setItem: (key, value) => app.setStorage(key, value),
    removeItem: key => app.removeStorage(key)
  }
})

const modules = { permission, user }

export default new Vuex.Store({
  modules,
  getters,
  plugins: [permissionState]
})
