/**
 * Created by lxhfight on 2018/8/16.
 * Email:
 * Description:
 *  图片预览组件
 */
import Vue from 'vue'
import Main from './main.vue'

const PreviewerConstructor = Vue.extend(Main)
let PreviewerInstance = null

/**
 * 打开图片预览框
 * @param options
 *  当为字符串的时候，图片预览组件只展示以这个字符串为URL的图片
 *  当为对象的时候，参考以下两个参数
 * @param options.current 当前图片URL
 * @param options.urls 图片列表页面
 * @param options.max 最大放大比例
 */
const imagePreviewer = function (options) {
  PreviewerInstance && PreviewerInstance.vm.destroyElement()
  let bundle = {}
  if (typeof options === 'string') {
    bundle = {
      current: options,
      urls: [options]
    }
  } else {
    bundle = Object.assign({}, options)
  }
  PreviewerInstance = new PreviewerConstructor({
    data: bundle
  })
  PreviewerInstance.vm = PreviewerInstance.$mount()
  document.body.appendChild(PreviewerInstance.vm.$el)
  return PreviewerInstance.vm
}

export default imagePreviewer
