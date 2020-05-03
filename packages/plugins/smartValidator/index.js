/**
 * Created by lxhfight on 2018/8/9.
 * Email:
 * Description:
 *
 */
import { 
  cellphoneRegExp,
  emailRegExp,
  idNumberRegExp,
  numberRegExp
} from './../../tools/object'
import { $, getChildByClassName } from './../../tools/dom'
import toast from './../toast'

const _isValidatableHXUIComponents = (classList) => {
  const cptNames = ['hx-smart-uploader', 'hx-selector', 'hx-options'] // 可进行验证的HXUI组件
  for (let cptName of cptNames) {
    if (classList.contains(cptName)) {
      return true
    }
  } 
  return false
}

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
    if (_isValidatableHXUIComponents($view.classList)) { // 判断是否为HXUI组件
      if (!$view.dataset['value']) {
        result = false
        const lastChild = getChildByClassName($view, 'btn-upload')
        if (lastChild) {
          _setInvalidStatus(lastChild)
        } else {
          _setInvalidStatus($view)
        }
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

const _validateType = (query, attr, regExp) => {
  let components = $(query ? (query + ' ' + attr) : attr)
  let result = true
  for (let i = 0; i < components.length; i++) {
    const $view = components[i]
    if (!regExp.test($view.value)) {
      result = false
      _setInvalidStatus($view)
    }
  }
  return result
}
const _validateLength = (query, type) => {
  let result = true
  let components = type === 'max' 
    ? $(query ? (query + ' [max-length]') : '[max-length]') 
    : $(query ? (query + ' [min-length]') : '[min-length]')
  for (let i = 0; i < components.length; i++) {
    const $view = components[i]
    let length = type === 'max' 
      ? parseInt($view.getAttribute('max-length')) 
      : parseInt($view.getAttribute('min-length'))
    let content = $view.value || ''
    if (isNaN(length)) {
      console.warn('存在部分表单组件的 max-length 或 min-length 属性值不是填写整数，故不生效，请检查')
      continue
    }
    if ((type === 'max' && content.length > length) || (type === 'min' && content.length < length)) {
      result = false
      _setInvalidStatus($view)
    }
  }
  return result
}

const smartValidate = (query) => {
  const result = []
  !_validateRequired(query) && result.push('完善所有必填项')
  !_validateType(query, '[data-type=cellphone]', cellphoneRegExp) && result.push('检查手机格式是否正确')
  !_validateType(query, '[data-type=email]', emailRegExp) && result.push('检查邮箱信息是否正确')
  !_validateType(query, '[data-type=idNumber]', idNumberRegExp) && result.push('检查身份证号格式是否正确')
  !_validateType(query, '[data-type=number]', numberRegExp) && result.push('检查是否为数字类型')
  !_validateLength(query, 'max') && result.push('检查内容长度是否超过最大限制')
  !_validateLength(query, 'min') && result.push('检查内容长度是否低于最小限制')
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
