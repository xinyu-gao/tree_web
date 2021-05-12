import axios from 'axios'
import { Notification } from 'element-ui'
import { getToken } from './auth'

export const creatRequest = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 请求地址
  timeout: 7000 // 请求超时时间
})

creatRequest.interceptors.request.use(config => {
  config.headers = { // 设置请求头 ，可选
    'Content-Type': 'application/json', // 请求格式为 json
    'Authorization': getToken() // 设置 Token
  }
  config.data = JSON.stringify(config.data)
  return Promise.resolve(config)
}, error => {
  Notification.error({ title: '错误', message: '请求超时' })
  return Promise.reject(error)
})

creatRequest.interceptors.response.use(data => {
  data = data && data.data || {}
  if (data && data.code === 200) { // 返回 200 代码，正常返回 data，否则抛出异常
    return Promise.resolve(data.data)
  } else if (data.code === 401) {
    return Promise.resolve(data.data)
  } else {
    return Promise.reject(data.message)
  }
}, err => {
  if (err.response.status === 500) {
    Notification.error({
      title: '错误',
      message: '服务器连接失败'
    })
  }
  return Promise.reject(err)
})

export const creatRequestForFile = axios.create({
  // 请求地址
  baseURL: process.env.VUE_APP_BASE_API,
  // 请求超时时间
  timeout: 7000,
  method: 'post'
})

creatRequestForFile.interceptors.request.use(config => {
  // 设置请求头 ，可选
  config.headers = {
    // 请求格式为 json
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    // 设置 Token
    'Authorization': getToken()
  }
  return Promise.resolve(config)
}, error => {
  Notification.error({
    title: '错误',
    message: '请求超时'
  })
  return Promise.reject(error)
})

creatRequestForFile.interceptors.response.use(data => {
  data = data && data.data || {}
  // 返回 200 代码，正常返回 data，否则抛出异常
  if (data && data.code === 200) {
    return Promise.resolve(data.data)
  } else if (data.code === 401) {
    return Promise.resolve(data.data)
  } else {
    return Promise.reject(data.message)
  }
}, err => {
  if (err.response.status === 500) {
    Notification.error({
      title: '错误',
      message: '服务器连接失败'
    })
  }
  return Promise.reject(err)
})
