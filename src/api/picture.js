import { creatRequest, creatRequestForFile } from '@/utils/axiosRequest'

export function getPicUrlById(data) {
  return creatRequest({
    url: `picture/tree`,
    method: 'get',
    params: data
  })
}

export function uploadPic(username, treeId, file) {
  return creatRequestForFile({
    url: `picture/tree?username=${username}&tree_id=${treeId}`,
    data: file
  })
}

export function deletePicByName(username, treeId, fileName) {
  return creatRequest({
    url: 'picture/tree/name',
    method: 'delete',
    data: {
      fileName: fileName,
      treeId: treeId,
      username: username
    }
  })
}
