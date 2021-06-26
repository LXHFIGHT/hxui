/**
 * Created by lxhfight on 2019/10/9.
 * Email:
 * Description:
 *  用于处理数据的通用工具方法
 */
import vue from 'vue' // 如果Vue是由npm管理的选择此项
// const vue = window.Vue

export const cellphoneRegExp = /^1[3456789]\d{9}$/
export const emailRegExp = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/
export const idNumberRegExp = /^[1-9]\d{5}((1\d)|(2\d)|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/ // 身份证类型验证
export const numberRegExp = /^-?[0-9]*\.?[0-9]*$/ // 数字类型验证
/**
 * 生成随机数
 * @param options 随机生成对象
 * @param options.from 区间下限（包括）
 * @param options.to   区间上限（不包括）
 */
const randomNumber = (options) => {
  if (Object.prototype.toString.call(options) === '[object Number]') {
    return Math.floor(Math.random() * options)
  } else {
    return options.from + Math.floor(Math.random() * Math.abs(options.to - options.from))
  }
}
/**
 * 生成随机字符串，基于0-9 大小写字母
 * @param length 字符串长度
 * @param isJustNumber 是否仅仅是数字
 */
export const randomString = (length, isJustNumber = false) => {
  let result = ''
  const numberTpl = '0123456789'
  const asciiTpl = '0123456789qwertyuiopasdfghjklzxcvbnmZXCVBNMASDFGHJKLQWERTYUIOP'
  let tpl = isJustNumber ? numberTpl : asciiTpl
  for (let i = 0; i < length; i++) {
    result += tpl.charAt(randomNumber(0, tpl.length))
  }
  return result
}

/**
 * 匹配用户 
 * @param {*} arr1 
 * @param {*} arr2 
 */
export const _isSameArray = (arr1 = [], arr2 = []) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    console.warn(`_isSameArray 方法要求第一和第二个参数为数组类型`)
    return false
  }
  if (arr1.length !== arr2.length) {
    console.warn(`第一和第二个数组长度不一致`)
    return false
  }
  let i = 0
  for (; i < arr1.length; i++) {
    let j = 0
    for (; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        break
      }
    }
    if (j === arr2.length) {
      return false
    }
  }
  if (i === arr1.length) {
    return true
  }
  return false
}

/**
 * 浅匹配第一个和第二个值的方法
 * @param {*} val1  第一个值
 * @param {*} val2  第二个值
 * @return {Boolean} true 表示两值相等  false 表示两值不等
 */
export const isShallowEqual = (val1, val2) => {
  // 如果类型不同的话，则直接返回不相等 
  if (typeof val1 !== typeof val2) {
    return false
  }
  // 如果非对象比较的话，则使用 “全等” 方法进行比较
  if (typeof val1 !== 'object' && typeof val2 !== 'object') {
    return val1 === val2
  }
  if (typeof val1 === 'object' && typeof val2 === 'object') {
    const val1Keys = Object.keys(val1)
    const val2Keys = Object.keys(val2)
    if (!_isSameArray(val1Keys, val2Keys)) {
      console.warn('参与比较的对象的属性不一致')
      return false
    }
    for (let param in val1) {
      if (!isShallowEqual(val1[param], val2[param])) {
        return false
      }
    }
    return true
  }
}

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bd_lon
 * @param bd_lat
 * @returns {*[]}
 */
const x_PI = Math.PI * 3000.0 / 180.0
export const bd09togcj02 = (bd_lon, bd_lat) => {
  var x = bd_lon - 0.0065
  var y = bd_lat - 0.006
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI)
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI)
  var gg_lng = z * Math.cos(theta)
  var gg_lat = z * Math.sin(theta)
  return [gg_lng, gg_lat]
}

export const Vue = vue
