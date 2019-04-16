// 用于存放并注册全局过滤器

const _getInfo = (array, value, param = 'key') => {
  // eslint-disable-next-line
  let data = array.filter(v => v.value == value)
  if (!(data && data[0])) {
    return '-'
  }
  return data[0][param] || '-'
}

const combineFilters = (Vue) => {
  // Vue.filter('sex', (value) => _getInfo(sexArray, value))
  // Vue.filter('sexClass', (value) => _getInfo(sexArray, value, 'className'))
}

export default combineFilters
