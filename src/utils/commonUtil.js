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

export function generateUUID() {
  let d = new Date().getTime()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}
