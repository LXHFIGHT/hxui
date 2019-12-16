import Main from './Main.vue'
import { Vue } from './../../../tools/object'

const PromptConstructor = Vue.extend(Main)
let promptQueue = []
const Prompt = function (options) {
  if (promptQueue[0] && promptQueue[0].$el.parentNode) {
    promptQueue[0].$el.parentNode.removeChild(promptQueue[0].$el)
    promptQueue[0].$destroy(true)
    promptQueue.shift()
  }
  if (typeof options !== 'object') {
    console.warn('this.$hxui.prompt方法需要传入一个对象')
    return null
  }
  const instance = new PromptConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  promptQueue.push(instance.vm)
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}

export default Prompt
