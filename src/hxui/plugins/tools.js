/**
 * Created by lxhfight on 2018/8/9.
 * Email:
 * Description:
 *   通用工具方法
 */
export const $ = (query) => {
  return document.querySelectorAll(query)
}

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
 * 生成随机字符串，基于0-9  大小写字母
 * @param length 字符串长度
 */
export const randomString = (length) => {
  let result = ''
  let tpl = '0123456789qwertyuiopasdfghjklzxcvbnmZXCVBNMASDFGHJKLQWERTYUIOP'
  for (let i = 0; i < length; i++) {
    result += tpl.charAt(randomNumber({from: 0, to: 62}))
  }
  return result
}

export const getElementToPageTop = (el) => {
  if (el.parentElement) {
    return getElementToPageTop(el.parentElement) + el.offsetTop
  }
  return el.offsetTop
}

export const getElementToPageLeft = (el) => {
  if (el.parentElement) {
    return getElementToPageLeft(el.parentElement) + el.offsetLeft
  }
  return el.offsetLeft
}
