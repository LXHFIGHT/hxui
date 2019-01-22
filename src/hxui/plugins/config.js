/**
 * Created by lxhfight on 2018/8/9.
 * Email:
 * Description:
 *  配置文件
 */
const INFO = 'default'
const WARNING = 'warn'
const ERROR = 'error'
const SUCCESS = 'success'
const FATAL = 'fatal'
export default {
  level: {
    INFO,
    WARNING,
    ERROR,
    SUCCESS,
    FATAL
  },
  levelFilter (text) {
    let result = ''
    switch (text) {
      case SUCCESS: result = '成功'; break
      case INFO: result = '提示'; break
      case WARNING: result = '警告'; break
      case ERROR: result = '错误'; break
      case FATAL: result = '崩溃'; break
      default: result = '提示'
    }
    return result
  }
}
