import { creatRequest } from '@/utils/axiosRequest'

export function getTreePics(data) {
  return creatRequest({
    url: `/picture/tree?tree_id=${data.treeId}`,
    method: 'get'
  })
}

export function getTreePicsUploadUrl() {
  return process.env.VUE_APP_BASE_API + '/picture/tree'
}

export function getTreeInfo(data) {
  return creatRequest({
    url: `/tree/info?tree_id=${data.treeId}`,
    method: 'get'
  })
}

export function saveTreeInfo(username, data) {
  return creatRequest({
    url: `/tree/info?username=${username}`,
    method: 'put',
    data: data
  })
}

export function getTreeListData(data) {
  return creatRequest({
    url: `/tree/list`,
    method: 'get',
    params: data
  })
}

export function getTreeListAll() {
  return creatRequest({
    url: `/tree/info/all`,
    method: 'get'
  })
}

export function getTreeListDataByCity(data) {
  return creatRequest({
    url: `/tree/info/${data}`,
    method: 'get'
  })
}

export function getCityTreeCount(data) {
  return creatRequest({
    url: `/test`,
    method: 'post',
    data: data
  })
}

export function getTreeById(data) {
  return creatRequest({
    url: `/tree/info?tree_id=${data.treeId}`,
    method: 'get'
  })
}

export function getTreeFuzzyQuery(data) {
  return creatRequest({
    url: `/tree/info/fuzzy?data=${data}`,
    method: 'get'
  })
}

export function getTreeListSorted(data) {
  return creatRequest({
    url: `/tree/info_sorted?page=${data.page}&size=${data.size}&keys=${data.keys}&asc=${data.asc}`,
    method: 'get'
  })
}

export function getTreeListBySearch(data) {
  return creatRequest({
    url: `/tree/condition?condition=${data.condition}&value=${data.value}&page=${data.page}&size=${data.size}`,
    method: 'get'
  })
}
