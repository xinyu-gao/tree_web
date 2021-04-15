import { creatRequest } from '../utils/axiosRequest'

export function getGradeStatistic(data) {
  return creatRequest({
    url: `/statistic/grade?province=${data.province}`,
    method: 'get'
  })
}
export function getExistedProvinceAndCity() {
  return creatRequest({
    url: `statistic/province_city`,
    method: 'get'
  })
}
