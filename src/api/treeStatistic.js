import creatRequest from '../utils/axiosRequest'

export function getGradeStatistic(data) {
  return creatRequest({
    url: `/statistic/grade?province=${data.province}`,
    method: 'get'
  })
}
