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
