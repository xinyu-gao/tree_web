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

export function getNodeHistoryInfoByIMSI(data) {
  return creatRequest({
    url: `/imsi/history?imsi=${data.imsi}&page=${data.page}&size=${data.size}`,
    method: 'get'
  })
}

export function getNodeDefectInfoByIMSI(data) {
  return creatRequest({
    url: `/imsi/defect?imsi=${data.imsi}`,
    method: 'get'
  })
}
