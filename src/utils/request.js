import axios from 'axios'
import store from '@/store'
import app from '@/app'

const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000
})

const error = (error) => {
  const { response } = error
  if (response.status === 401) {
    store.dispatch('LogOut').then(() => {
      location.reload()
    })
  }
  return Promise.reject(error)
}

request.interceptors.request.use(config => {
  const token = store.getters.token
  if (token && config.url !== app.cdn_domain) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, error)

request.interceptors.response.use((response) => {
  return response.data
}, error)

export default request
