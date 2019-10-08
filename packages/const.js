// HXUI中使用到的常量汇总于此

const DEFAULT = 'default'
const WARNING = 'warn'
const ERROR = 'error'
const SUCCESS = 'success'
const FATAL = 'fatal'

export const Levels = {
  DEFAULT,
  WARNING,
  ERROR,
  SUCCESS,
  FATAL
}

export const levelArray = [
  { key: DEFAULT, color: 'cornflowerblue', text: '提示' },
  { key: SUCCESS, color: 'rgb(135, 208, 104)', text: '成功' },
  { key: WARNING, color: '#ff8f02', text: '警告' },
  { key: ERROR, color: '#ff5a50', text: '错误' },
  { key: FATAL, color: '#000000', text: '崩溃' }
]
// 等级筛选器
export const levelFilter = (text, target = 'text') => {
  let result = levelArray.filter(v => v.key === text)
  console.log('WARN', result)
  if (result.length) {
    return result[0][target]
  }
  return levelArray[0][target] // 使用 default 作为默认
}

export const Positions = {
  TOP: 'top',
  CENTER: 'center',
  BOTTOM: 'bottom',
  TOP_LEFT: 'topLeft',
  TOP_RIGHT: 'topRight',
  BOTTOM_LEFT: 'bottomLeft',
  BOTTOM_RIGHT: 'bottomRight'
}
