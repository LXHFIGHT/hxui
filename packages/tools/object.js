/**
 * Created by lxhfight on 2019/10/9.
 * Email:
 * Description:
 *  用于处理数据的通用工具方法
 */
import vue from 'vue' // 如果Vue是由npm管理的选择此项
// const vue = window.Vue

export const isPhone = (phone) => {
  if (!phone) {
    return false
  }
  return /^1[3456789]\d{9}$/.test(phone)
}

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

export const Vue = vue
