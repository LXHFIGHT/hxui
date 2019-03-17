/**
 * Created by lxhfight on 2018/8/9.
 * Email:
 * Description:
 *  HXUI 弹出框调用方法
 */
import Vue from 'vue'
import Main from './Main.vue'

const PoptipConstructor = Vue.extend(Main)

const PopTip = function (options) {
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

export default PopTip
