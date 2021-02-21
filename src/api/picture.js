import creatRequest from '@/utils/axiosRequest'

export function getPicUrlById(data) {
  return creatRequest({
    url: `picture/tree`,
    method: 'get',
    params: data
  })
}
