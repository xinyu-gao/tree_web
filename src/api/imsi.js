import creatRequest from '@/utils/axiosRequest'

export function getNodeByIMSI(data) {
  return creatRequest({
    url: `/imsi/newest?imsi=${data.imsi}`,
    method: 'get'
  })
}

export function getLineDataByIMSI(data) {
  return creatRequest({
    url: `/imsi/line_data?imsi=${data.imsi}`,
    method: 'get'
  })
}
