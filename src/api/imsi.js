import creatRequest from '@/utils/axiosRequest'

export function getNodeByIMSI(data) {
  return creatRequest({
    url: `/imsi/newest?imsi=${data.imsi}`,
    method: 'get'
  })
}
