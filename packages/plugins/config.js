/**
 * Created by lxhfight on 2018/8/9.
 * Email:
 * Description:
 *  配置文件
 */
const DEFAULT = 'default'
const WARNING = 'warn'
const ERROR = 'error'
const SUCCESS = 'success'
const FATAL = 'fatal'
export default {
  level: {
    DEFAULT,
    WARNING,
    ERROR,
    SUCCESS,
    FATAL
  },
  position: {
    TOP: 'top',
    CENTER: 'center',
    BOTTOM: 'bottom',
    TOP_LEFT: 'topLeft',
    TOP_RIGHT: 'topRight',
    BOTTOM_LEFT: 'bottomLeft',
    BOTTOM_RIGHT: 'bottomRight'
  },
  levelFilter (text) {
    let result = ''
    switch (text) {
      case SUCCESS: result = '成功'; break
      case DEFAULT: result = '提示'; break
      case WARNING: result = '警告'; break
      case ERROR: result = '错误'; break
      case FATAL: result = '崩溃'; break
      default: result = '提示'
    }
    return result
  }
}
