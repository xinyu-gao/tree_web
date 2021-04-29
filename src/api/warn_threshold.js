import { creatRequest } from '@/utils/axiosRequest'

export function getWarnThreshold(treeId) {
  return creatRequest({
    url: `/warn/threshold?tree_id=${treeId}`,
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
