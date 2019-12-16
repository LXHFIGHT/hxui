import Main from './Main.vue'
import { Vue } from './../../../tools/object'

const ConfirmConstructor = Vue.extend(Main)
let confirmQueue = []

const Confirm = function (options) {
  if (confirmQueue[0] && confirmQueue[0].$el.parentNode) {
    confirmQueue[0].$el.parentNode.removeChild(confirmQueue[0].$el)
    confirmQueue[0].$destroy(true)
    confirmQueue.shift()
  }
  if (typeof options !== 'object') {
    console.warn('this.$hxui.confirm方法需要传入一个对象')
    return null
  }
  const instance = new ConfirmConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  confirmQueue.push(instance.vm)
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}

export default Confirm
