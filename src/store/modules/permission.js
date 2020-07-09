const state = {
  token: null
}
const mutations = {
  login (state, token) {
    state.token = token
  },
  logout (state) {
    state.token = null
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
