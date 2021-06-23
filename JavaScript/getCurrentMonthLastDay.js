const getCurrentMonthLastDay = () => {
  const year = new Date().getFullYear().toString()
  const month = (new Date().getMonth() + 1 < 10) ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}` 
  const curtMonthLastDay = new Date(year, month, 0) // 获取当前月份的最后一天
  const lastDay = curtMonthLastDay.getDate()
  const firstDay = new Date(year, month, 1).getDate() // 获取当前月份的第一天
  console.log('当前月份的第一天 =>', `${year}-${month}-${firstDay}`, '当前月份的最后一天 =>', `${year}-${month}-${lastDay}`)
  return `${year}-${month}-${lastDay}`
}

getCurrentMonthLastDay()
