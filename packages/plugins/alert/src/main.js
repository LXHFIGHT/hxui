import Main from './Main.vue'
import { Vue } from './../../../tools/object'

const AlertConstructor = Vue.extend(Main)

const Alert = function (text) {
  const instance = new AlertConstructor({
    data: {
      text
    }
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}

export default Alert
