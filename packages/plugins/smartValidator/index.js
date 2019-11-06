/**
 * Created by lxhfight on 2018/8/9.
 * Email:
 * Description:
 *
 */
import { isPhone } from './../../tools/object'
import { $, getChildByClassName } from './../../tools/dom'
import toast from './../toast'

const _focusFunc = function () {
  const $view = event.target
  $view.classList.remove('error')
}
const _setInvalidStatus = ($view) => {
  $view.classList ? $view.classList.add('error') : $view.classList = ['error']
  $view.removeEventListener('focus', _focusFunc)
  $view.addEventListener('focus', _focusFunc)
}

const _validateRequired = (query) => {
  let result = true
  let components = $(query ? (query + ' [required]') : '[required]')
  for (let i = 0; i < components.length; i++) {
    const $view = components[i]
    if ($view.classList.contains('hx-smart-uploader') || $view.classList.contains('hx-selector')) {
      if (!$view.dataset['value']) {
        result = false
        const lastChild = getChildByClassName($view, 'btn-upload')
        lastChild && _setInvalidStatus(lastChild)
      }
      continue
    }
    if (!$view.value) {
      result = false
      _setInvalidStatus($view)
    }
  }
  return result
}

const _validatePhone = (query) => {
  let components = $(query ? (query + ' [data-type=cellphone]') : '[data-type=cellphone]')
  let result = true
  for (let i = 0; i < components.length; i++) {
    const $view = components[i]
    console.log('Value', components[i], $view.value)
    if (!isPhone($view.value)) {
      result = false
      _setInvalidStatus($view)
    }
  }
  return result
}

const _validateEmail = (query) => {
  let components = $(query ? (query + ' [type=email]') : '[type=email]')
  let result = true
  const regExp = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/
  for (let i = 0; i < components.length; i++) {
    const $view = components[i]
    if (!regExp.test($view.value)) {
      result = false
      _setInvalidStatus($view)
    }
  }
  return result
}

const smartValidate = (query) => {
  const result = []
  !_validateRequired(query) && result.push('完善所有必填项')
  !_validatePhone(query) && result.push('检测手机格式是否正确')
  !_validateEmail(query) && result.push('检测邮箱信息是否正确')
  if (result.length) {
    toast({
      text: `请${result.join(', ')}`,
      during: 2500,
      level: 'warn'
    })
    return false
  }
  return true
}

export default smartValidate
