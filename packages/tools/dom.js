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

// 获取距离屏幕顶部的距离
export const getElementToPageTop = (el) => {
  if (el.parentElement) {
    return getElementToPageTop(el.parentElement) + el.offsetTop
  }
  return el.offsetTop
}

// 获取距离屏幕左边的距离
export const getElementToPageLeft = (el) => {
  if (el.parentElement) {
    console.warn(el.parentElement.classList, el.offsetLeft)
    return getElementToPageLeft(el.parentElement) + el.offsetLeft
  }
  return el.offsetLeft
}
