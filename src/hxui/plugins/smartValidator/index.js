/**
 * Created by lxhfight on 2018/8/9.
 * Email:
 * Description:
 *
 */
import { $ } from './../tools'

const smartValidate = (query) => {
  const RESULT_REQUIRED_ISSUE = 1 // 必填项需要填写

  let components = $(query ? (query + ' [required]') : '[required]')
  let result = true
  let focusFunc = function () {
    const $view = event.target
    console.log(event.target.classList)
    $view.classList.remove('error')
  }

  for (let i = 0; i < components.length; i++) {
    const $view = components[i]
    if (!$view.value) {
      result = RESULT_REQUIRED_ISSUE
      console.log('LINUX ', $view.classList)
      $view.classList ? $view.classList = ['error'] : $view.classList.push('error')
    }
    components[i].removeEventListener('focus', focusFunc)
    components[i].addEventListener('focus', focusFunc)
  }

  switch (result) {
    case RESULT_REQUIRED_ISSUE: alert('请完善所有信息'); break
    default: break
  }

  return (typeof result !== 'number')
}

export default smartValidate
