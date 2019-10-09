import Main from './Main.vue'
import { Vue } from './../../../tools/object'

const PromptConstructor = Vue.extend(Main)

const Prompt = function (options) {
  if (typeof options !== 'object') {
    console.warn('this.$hxui.prompt方法需要传入一个对象')
    return null
  }
  const instance = new PromptConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}

export default Prompt
