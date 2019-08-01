import Main from './Main.vue'

const Vue = window.Vue
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
