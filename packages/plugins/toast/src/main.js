/**
 * Created by lxhfight on 2018/8/9.
 * Email:
 * Description:
 *  HXUI 弹出框调用方法
 */
import Main from './Main.vue'
import { Vue } from './../../../tools/object'
const PoptipConstructor = Vue.extend(Main)

let toast = function (options) {
  let bundle = {}
  if (typeof options === 'string') {
    bundle = {
      text: options,
      level: 'success',
      during: 1500
    }
  } else {
    bundle = Object.assign({}, options)
  }
  const instance = new PoptipConstructor({
    data: bundle
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}
toast.warn = (text, position = 'top') => { toast({ text, position, level: 'warn' }) }
toast.error = (text, position = 'top') => { toast({ text, position, level: 'error' }) }
toast.info = (text, position = 'top') => { toast({ text, position, level: 'info' }) }
toast.default = (text, position = 'top') => { toast({ text, position, level: 'default' }) }
toast.success = (text, position = 'top') => { toast({ text, position, level: 'success' }) }

export default toast
