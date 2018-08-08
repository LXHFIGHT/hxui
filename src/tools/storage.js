/**
 * Created by lxhfight on 2018/7/25.
 * Email: lxhfight1@gmail.com
 * Description:
 *  该工具包含前端缓存相关方法
 */
export const KEY_USER_TOKEN = 'KEY_USER_TOKEN'

export const session = {
  KEY_USER_TOKEN,
  save (key, item) {
    if (!window.sessionStorage) {
      console.warn('當前瀏覽器不支持sessionStorage')
      return null
    }
    if (typeof item === 'object') {
      window.sessionStorage.setItem(key, JSON.stringify(item))
    } else {
      window.sessionStorage.setItem(key, item)
    }
  },
  get (key, isObject = false) {
    if (!window.sessionStorage) {
      console.warn('當前瀏覽器不支持sessionStorage')
      return null
    }
    const str = window.sessionStorage.getItem(key)
    return str ? (isObject ? JSON.parse(str) : str) : null
  },
  remove (key) {
    if (!window.sessionStorage) {
      console.warn('當前瀏覽器不支持localStorage')
      return null
    }
    window.sessionStorage.removeItem(key)
  },
  clear () {
    if (!window.sessionStorage) {
      console.warn('當前瀏覽器不支持sessionStorage')
      return null
    }
    window.sessionStorage.clear()
  }
}

export const local = {
  save (key, item) {
    if (!window.localStorage) {
      console.warn('當前瀏覽器不支持localStorage')
      return null
    }
    if (typeof item === 'object') {
      window.localStorage.setItem(key, JSON.stringify(item))
    } else {
      window.localStorage.setItem(key, item)
    }
  },
  get (key, isObject = false) {
    if (!window.localStorage) {
      console.warn('當前瀏覽器不支持localStorage')
      return null
    }
    const str = window.localStorage.getItem(key)
    return str ? (isObject ? JSON.parse(str) : str) : null
  },
  remove (key) {
    if (!window.localStorage) {
      console.warn('當前瀏覽器不支持localStorage')
      return null
    }
    window.localStorage.removeItem(key)
  }
}
