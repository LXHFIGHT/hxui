/**
 * Created by lxhfight on 2019/2/14.
 * Email: lxhfight1@gmail.com
 * Description:
 *   用于处理对象或字符串的工具方法
 */

/**
 * 将JavaScript对象转换为queryString形式的字符串，如：
 * { foo: 'bar', name: 'hxui' } = '?foo=bar&name=hxui'
 * @param {*} obj 接受转换的对象
 */
export const queryString = (obj) => {
  if (typeof obj !== 'object') {
    return ''
  }
  let result = '?'
  for (let param in obj) {
    result += `${param}=${encodeURI(obj[param])}&`
  }
  return result.substr(0, (result.length - 1))
}
