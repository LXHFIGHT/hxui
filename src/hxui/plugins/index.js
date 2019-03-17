/**
 * Created by lxhfight on 2018/8/10.
 * Email:
 * Description:
 *  HXUI 插件方法集合
 */
import popTip from './popTip'
import popLoading from './popLoading'
import previewImage from './imagePreviewer'
import Confirm from './confirm'

export default {
  ...popLoading,
  popTip,
  previewImage,
  /**
   *  传入对象
   *  title: 弹框标题,
      text: 提示内容,
      onConfirm: () => {}, 点击确认后触发方法
      onCancel: () => {}, 点击取消后触发方法
      confirmText: '确定', 确认按钮文案
      cancelText: '取消', 取消按钮文案
      level: '', 提示等级  参考hxui/config.js
   */
  confirm: Confirm
}
