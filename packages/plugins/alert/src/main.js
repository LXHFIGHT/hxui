import Main from './Main.vue'
import { Vue } from './../../../tools/object'

const AlertConstructor = Vue.extend(Main)
let alertQueue = []
const Alert = function (...params) {
  if (alertQueue[0] && alertQueue[0].$el.parentNode) {
    alertQueue[0].$el.parentNode.removeChild(alertQueue[0].$el)
    alertQueue[0].$destroy(true)
    alertQueue.shift()
  }
  const instance = new AlertConstructor({
    data: {
      text: params || ''
    }
  })
  instance.vm = instance.$mount()
  alertQueue.push(instance.vm)
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}

export default Alert
