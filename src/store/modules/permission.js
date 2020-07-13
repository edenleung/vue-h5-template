const state = {
  token: null
}
const mutations = {
  setToken (state, data) {
    state.token = data
  }
}

const actions = {
  Login({ commit }, token) {
    commit('setToken', token)
  },
  LogOut({ commit }) {
    commit('setToken', null)
  }
}

export default {
  state,
  mutations,
  actions
}
