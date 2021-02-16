
import creatRequest from '@/utils/axiosRequest'

export function login(data) {
  return creatRequest({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function getRoles(data) {
  return creatRequest({
    url: `/user/roles?username=${data}`,
    method: 'get'
  })
}

export function logout() {
  return creatRequest({
    url: '/user/logout',
    method: 'post'
  })
}

export function saveUser(data) {
  return creatRequest({
    url: '/user/save',
    method: 'post',
    data: data
  })
}

export function updateUserRoles(data) {
  return creatRequest({
    url: '/user/roles/update',
    method: 'post',
    data: data
  })
}

export function updateUserPassword(data) {
  return creatRequest({
    url: '/user/password',
    method: 'post',
    data: data
  })
}
export function deleteUser(data) {
  return creatRequest({
    url: '/user',
    method: 'delete',
    data: data
  })
}

export function getAllUsers(data) {
  return creatRequest({
    url: '/user/findAll',
    method: 'post',
    data: data
  })
}

export function findUser(data) {
  return creatRequest({
    url: '/user/find',
    method: 'post',
    data: data
  })
}

export function getCaptcha() {
  return creatRequest({
    url: '/captcha?',
    method: 'get'
  })
}

export function checkCaptcha() {
  return creatRequest({
    url: '/checkVerifyCode',
    method: 'get'
  })
}
