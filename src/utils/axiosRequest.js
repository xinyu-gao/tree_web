import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './auth'
const creatRequest = axios.create({
  // 请求地址
  baseURL: process.env.VUE_APP_BASE_API,
  // 请求超时时间
  timeout: 7000
})

creatRequest.interceptors.request.use(config => {
  // console.log('------request------' + JSON.stringify(config))
  // 设置请求头 ，可选
  config.headers = {
    // 请求格式为 json
    'Content-Type': 'application/json',
    // 设置 Token
    'Authorization': getToken()
  }
  config.data = JSON.stringify(config.data)
  return Promise.resolve(config)
}, error => {
  Message.error({ message: '请求超时!' })
  return Promise.reject(error)
})

creatRequest.interceptors.response.use(data => {
  // console.log('------response------', data)
  data = data && data.data || {}
  // 返回 200 代码，并且 data 字段存在，正常返回 data，否则抛出异常
  if (data && data.code === 200 && data.data) {
    return Promise.resolve(data.data)
  } else {
    return Promise.reject(data.message)
  }
}, err => {
  return Promise.reject(err)
})

export default creatRequest
