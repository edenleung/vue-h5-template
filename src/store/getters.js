const getters = {
  userName: state => state.app.userName,
  token: state => state.permission.token,
  user: state => state.app.user
}
export default getters
