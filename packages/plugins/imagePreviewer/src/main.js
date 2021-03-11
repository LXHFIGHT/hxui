/**
 * Created by lxhfight on 2018/8/16.
 * Email:
 * Description:
 *  图片预览组件
 */
 import Main from './main.vue'
 import { Vue } from './../../../tools/object'
 const PreviewerConstructor = Vue.extend(Main)
 let PreviewerInstance = null
 // 内部用于整理变量的方法
 const _formatParams = (options, urls) => {
   let bundle = {}
   if (typeof options === 'string') {
     bundle = {
       current: options,
       urls: Array.isArray(urls) ? urls : [options]
     }
   } else if (Array.isArray(options)) {
     bundle = {
       current: options[0],
       urls: options
     }
   } else {
     bundle = Object.assign({}, options)
     if (options.current && !options.urls) {
       bundle.urls = [options.current]
     }
   }
   return bundle
 }
 
 /**
  * 打开图片预览框
  * @param options
  *  当为字符串的时候，图片预览组件只展示以这个字符串为URL的图片
  *  当为对象的时候，参考以下两个参数
  * @param options.current 当前图片URL
  * @param options.urls 图片列表页面
  * @param options.max 最大放大比例
  * @param options.position 预览框的位置： 默认全屏， left 左半屏， right 右半屏 
  * 
  * @param urls 当第一个参数为图片链接是生效，表示所有预览图片链接
  */
 const imagePreviewer = function (options, urls) {
   if (PreviewerInstance) {
     PreviewerInstance.vm.destroyElement()
   }
   let bundle = _formatParams(options, urls)
   bundle.listener = listener // 此处需要将绑定的事件传给组件内部，如果组件内关闭预览，可以一起也移除本事件
   PreviewerInstance = new PreviewerConstructor({
     data: bundle
   })
   PreviewerInstance.vm = PreviewerInstance.$mount()
   let target = PreviewerInstance.vm.$el
   function listener () {
     document.body.removeChild(target)
     window.removeEventListener('popstate', listener)
   }
   document.body.appendChild(target)
   window.addEventListener('popstate', listener)
   return PreviewerInstance.vm
 }
 
 export default imagePreviewer
 