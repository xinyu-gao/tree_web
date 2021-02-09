import request from '@/utils/request'
import creatRequest from '@/utils/axiosRequest'

export function login(data) {
  return creatRequest({
    url: '/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
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
