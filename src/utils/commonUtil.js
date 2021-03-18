import moment from 'moment'

export function handleTime(time) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

export function handleTimeYMD(time) {
  return moment(time).format('YYYY-MM-DD')
}

export function handleTimeHMS(time) {
  return moment(time).format('HH:mm:ss')
}
