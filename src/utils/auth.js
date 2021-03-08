import Cookies from 'js-cookie'

const TokenKey = 'vue_token'
const UserKey = 'vue_name'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUsername() {
  return Cookies.get(UserKey)
}

export function setUsername(username) {
  return Cookies.set(UserKey, username)
}
