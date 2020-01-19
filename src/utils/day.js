import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入语言包
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

dayjs.extend(relativeTime)

// 获取相对时间的方法
// value为过滤器需要传的值
export const fmtDate = (value) => {
  // dayjs() 获取当前时间 (dayjs中的一个特殊的对象)
  return dayjs().to(dayjs(value))
}
