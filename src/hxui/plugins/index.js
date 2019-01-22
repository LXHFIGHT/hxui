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
  confirm: Confirm
}
