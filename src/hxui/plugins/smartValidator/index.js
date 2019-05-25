/**
 * Created by lxhfight on 2018/8/9.
 * Email:
 * Description:
 *
 */
import { $, isPhone } from './../tools'
import toast from './../toast'

const _focusFunc = function () {
  const $view = event.target
  $view.classList.remove('error')
}

const _validateRequired = (query) => {
  let result = true
  let components = $(query ? (query + ' [required]') : '[required]')
  for (let i = 0; i < components.length; i++) {
    const $view = components[i]
    if (!$view.value) {
      result = false
      $view.classList ? $view.classList.add('error') : $view.classList = ['error']
    }
    components[i].removeEventListener('focus', _focusFunc)
    components[i].addEventListener('focus', _focusFunc)
  }
  return result
}

const _validatePhone = (query) => {
  let components = $(query ? (query + ' [phone]') : '[phone]')
  let result = true
  for (let i = 0; i < components.length; i++) {
    const $view = components[i]
    if (!isPhone($view.value)) {
      result = false
      $view.classList ? $view.classList.add('error') : $view.classList = ['error']
    }
    components[i].removeEventListener('focus', _focusFunc)
    components[i].addEventListener('focus', _focusFunc)
  }
  return result
}

const smartValidate = (query) => {
  const result = []
  !_validateRequired(query) && result.push('请完善所有必填项')
  !_validatePhone(query) && result.push('检测手机格式是否正确')
  if (result.length) {
    toast.warn(result.join(', '))
    return false
  }
  return true
}

export default smartValidate
