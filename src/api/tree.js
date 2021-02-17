import creatRequest from '@/utils/axiosRequest'

export function getTreePics(data) {
  return creatRequest({
    url: `/minio/pic?tree_id=${data.treeId}`,
    method: 'get'
  })
}

export function getTreePicsUploadUrl() {
  return process.env.VUE_APP_BASE_API + '/minio/upload'
}

export function getTreeInfo(data) {
  return creatRequest({
    url: `/tree/info?tree_id=${data.treeId}`,
    method: 'get'
  })
}

export function saveTreeInfo(data) {
  return creatRequest({
    url: `/tree/info`,
    method: 'post',
    data: data
  })
}

export function getTreeListData(data) {
  return creatRequest({
    url: `/tree_list/info`,
    method: 'get',
    params: data
  })
}

export function getTreeListAll() {
  return creatRequest({
    url: `/tree_list/info/all`,
    method: 'get'
  })
}

export function getTreeListDataBy(data) {
  return creatRequest({
    url: `/tree_list/info/${data}`,
    method: 'get',
    params: data
  })
}

export function getCityTreeCount(data) {
  return creatRequest({
    url: `/test`,
    method: 'post',
    data: data
  })
}
