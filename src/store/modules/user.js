import { getUserInfo} from '@/api/user'

const state = {
  data: null
}
const mutations = {
  setUser(state, data) {
    state.data = data
  }
}

const actions = {
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(response => {
          commit('setUser', response.result)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
