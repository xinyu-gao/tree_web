import { creatRequest } from '@/utils/axiosRequest'

export function getWarnThreshold() {
  return creatRequest({
    url: '/warn/threshold',
    method: 'get'
  })
}

export function setWarnThreshold(data) {
  return creatRequest({
    url: '/warn/threshold',
    method: 'post',
    data: data
  })
}
