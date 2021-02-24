import { findUser } from '@/api/user'

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validUsernameOrPassword(rule, value, callback) {
  const rsCheck = /^[0-9a-zA-Z!@#$%^&*()_+~,./]/.test(value.trim())
  if (!rsCheck) {
    callback(new Error('由数组、字母、字符组成'))
  }
}
export function validUsername(rule, value, callback) {
  const rsCheck = /^[0-9a-zA-Z!@#$%^&*()_+~,./]/.test(value.trim())
  if (!rsCheck) {
    callback(new Error('由数组、字母、字符组成'))
  }
  findUser({
    username: value
  }).then(data => {
    if (data) {
      callback(new Error('用户名已存在'))
    }
  })
}
