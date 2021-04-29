const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  imsiDataUpdate: state => state.app.imsiDataUpdate,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters
