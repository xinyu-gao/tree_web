
import creatRequest from '@/utils/axiosRequest'

export function login(data) {
  return creatRequest({
    url: '/log/login',
    method: 'post',
    data: data
  })
}

export function loginByAlipay() {
  return creatRequest({
    url: '/oauth/render',
    method: 'get'
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
    url: '/log/logout',
    method: 'post',
    data: ''
  })
}

export function saveUser(data) {
  return creatRequest({
    url: '/user/register',
    method: 'post',
    data: data
  })
}

export function updateUserRoles(data) {
  return creatRequest({
    url: '/user/roles',
    method: 'put',
    data: data
  })
}

export function updateUserEmail(data) {
  return creatRequest({
    url: '/user/email',
    method: 'put',
    data: data
  })
}

export function updateUserPhoneNumber(data) {
  return creatRequest({
    url: '/user/phone_number',
    method: 'put',
    data: data
  })
}

export function updateUserPassword(data) {
  return creatRequest({
    url: '/user/password',
    method: 'put',
    data: data
  })
}
export function deleteUser(data) {
  return creatRequest({
    url: `/user?username=${data.username}`,
    method: 'delete'
  })
}

export function getAllUsers(data) {
  return creatRequest({
    url: `/user/list?page=${data.page}&size=${data.size}`,
    method: 'get'
  })
}

export function getUserListSorted(data) {
  return creatRequest({
    url: `/user/list_sorted?page=${data.page}&size=${data.size}&keys=${data.keys}&asc=${data.asc}`,
    method: 'get'
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
