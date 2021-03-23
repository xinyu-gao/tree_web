import { findUser } from '@/api/user'
import { Message } from 'element-ui'
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

export function validEmail(rule, value, callback) {
  if (value === '') {
    callback(new Error('请正确填写邮箱'))
  } else {
    if (value !== '') {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(value)) {
        callback(new Error('请输入有效的邮箱'))
      }
    }
    callback()
  }
}

export function validMobilePhone(rule, value, callback) {
  if (value === '') {
    callback(new Error('手机号码不可为空'))
  } else {
    if (value !== '') {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (!reg.test(value)) {
        callback(new Error('请输入有效的手机号码'))
      }
    }
    callback()
  }
}

export function validateMobile(value) {
  if (value === '') {
    return `请填写手机号码`
  } else {
    if (value !== '') {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (!reg.test(value)) {
        return `请输入有效的手机号码`
      }
    }
    return true
  }
}

export function validateEmail(value) {
  if (value === '') {
    Message({
      type: 'warning',
      message: `请填写邮箱`
    })
    return false
  } else {
    if (value !== '') {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(value)) {
        Message({
          type: 'warning',
          message: `请输入有效的邮箱`
        })
      }
      return false
    }
  }
}
