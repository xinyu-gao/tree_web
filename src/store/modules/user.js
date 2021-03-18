import { login, logout, getRoles } from '@/api/user'
import { getUsername, removeToken, setToken, setUsername } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    name: '',
    avatar: '',
    roles: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {

  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(data => {
          commit('SET_NAME', username)
          setUsername(username)
          setToken(data.tokenHead + ' ' + data.token)
          return resolve(data)
        }).catch(error => {
          return reject(error)
        })
    })
  },

  getRoles({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRoles(getUsername()).then(data => {
        console.log(data)
        commit('SET_ROLES', data)
        return resolve(data)
      }).catch(error => {
        return reject(error)
      })
    })
  },

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        console.log('out')
        removeToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

