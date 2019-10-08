/**
 * Created by lxhfight on 2018/8/10.
 * Email:
 * Description:
 *  HXUI 插件方法集合
 */
import toast from './toast'
import {
  showLoading,
  hideLoading
} from './popLoading'
import previewImage from './imagePreviewer'
import Confirm from './confirm'
import Alert from './alert'
import Prompt from './prompt'
import validate from './smartValidator'
import compressImage from './compressImage'

export default {
  showLoading,
  hideLoading,
  toast,
  previewImage,
  /**
   *  传入对象
   *  title: 弹框标题,
      text: 提示内容,
      onConfirm: () => {}, 点击确认后触发方法
      onCancel: () => {}, 点击取消后触发方法
      confirmText: '确定', 确认按钮文案
      cancelText: '取消', 取消按钮文案
      level: '', 提示等级  参考hxui/const.js
   */
  confirm: Confirm,
  alert: Alert,
  prompt: Prompt,
  validate,
  /**
   * 压缩图片对象
   * @param {*} object.files 文件对象
   * @param {*} object.maxsize 需要压缩的文件的大小， 单位是KB
   * @param {*} object.compress 是否需要压缩， 单位是1%， 如果需要50%压缩率则填50
   * @param {*} object.handler 处理（回调）方法， 参数带着压缩后可供append到formData中的文件列表files
   */
  compressImage
}
