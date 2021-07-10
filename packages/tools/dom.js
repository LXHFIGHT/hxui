/*
 * @Author       : liuxuhao
 * @LastEditors  : liuxuhao
 */
export const $ = (query) => {
  return document.querySelectorAll(query)
}

export const getChildByClassName = ($view, className) => {
  const children = $view.childNodes
  for (let i = 0; i < children.length; i++) {
    if (children[i].classList && children[i].classList.contains(className)) {
      return children[i]
    }
  }
  return null
}

const _getTranslateFromMatrix = (str) => {
  if (str.indexOf('matrix') === -1) {
    return { x: 0, y: 0 }
  }
  const start = str.indexOf('(') + 1
  const end = str.indexOf(')')
  const arr = str.substring(start, end).split(', ')
  return {
    x: parseInt(arr[arr.length - 2]),
    y: parseInt(arr[arr.length - 1])
  }
}

// 获取距离屏幕顶部的距离
export const getElementToPageTop = (el) => {
  if (el.offsetParent) {
    const transform = document.defaultView.getComputedStyle(el.offsetParent, null).webkitTransform
    const { y } = _getTranslateFromMatrix(transform)
    return getElementToPageTop(el.offsetParent) + el.offsetTop + y
  }
  return el.offsetTop
}

// 获取距离屏幕左边的距离
export const getElementToPageLeft = (el) => {
  if (el.offsetParent) {
    const transform = document.defaultView.getComputedStyle(el.offsetParent, null).webkitTransform
    const { x } = _getTranslateFromMatrix(transform)
    return getElementToPageLeft(el.offsetParent) + el.offsetLeft + x
  }
  return el.offsetLeft
}

export const getElementScrollTop = (el) => {
  if (el.offsetParent) {
    return getElementScrollTop(el.offsetParent) + el.scrollTop
  }
  return el.scrollTop
}

// 全屏
export const toFullscreen = () => {
  var docElm = document.documentElement
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen()
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen()
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen()
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen()
  }
}

// 退出全屏
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

/**
 * 根据定义的颜色和文字颜色得到该组件综合的样式
 * @param {*} options.color 背景色
 * @param {*} options.textColor 文字颜色
 * @param {*} options.blank 是否为线框组件
 * @param {*} options.text 是否为文字组件
 */
export const getColorStyle = (options) => {
  /** * 当 textColor 为空时
  * 如果设置了color, 如果blank则使用 color为文字颜色，否则文字颜色为白色
  * 如果没有color, 则为空（默认黑色）
  *** 当 textColor, 非空时, 则使用 textColor 作为文字颜色
  */
  let textColor = ''
  if (options.textColor) {
    textColor = `color: ${options.textColor};`
  } else {
    if (options.color) {
      textColor = `color: ${(options.blank || options.text) ? options.color : 'white'};`
    }
  }
  /** * 当 color 不为空时，边框颜色为 color
   *       如果 blank 为 true 则不需要填充背景色，否则设置背景色为 color
   *** 当 color 为空时，则为空（默认）
   */
  let backgroundColor = ''
  if (options.color) {
    backgroundColor = `border: 1px solid ${options.text ? 'transparent' : options.color};`
    !options.blank && (backgroundColor += ` background-color: ${options.color};`)
  }
  return backgroundColor + textColor
}
