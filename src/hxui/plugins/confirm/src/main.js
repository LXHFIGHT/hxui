import Main from './Main.vue'

const Vue = window.Vue
const ConfirmConstructor = Vue.extend(Main)

const Confirm = function (options) {
  if (typeof options !== 'object') {
    console.log('this.$hxui.confirm方法需要传入一个对象')
    return null
  }
  const instance = new ConfirmConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}

export default Confirm
