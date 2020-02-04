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

export const Vue = vue
