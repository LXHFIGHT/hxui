/**
 * Created by lxhfight on 2018/7/25.
 * Email: lxhfight@gmail.com
 * Description:
 *  此前端项目相关配置
 */
import logo from '@/assets/img/logo.png'
import bgLogin from '@/assets/bg/bg-login.jpg'

const project = {
  version: 'v 0.0.1', // 项目版本
  name: 'HXUI For Vue', // 项目名
  logo, // 项目logo图片URL
  subject: '账号', // 项目围绕主体名
  login: {
    title: '登录管理后台', // 登录界面标题
    background: bgLogin
  },
  copyright: {
    content: 'HXUI', // 版权内容
    icp: '粤ICP备00000000号-1' // 如果不提供ICP，将不展示
  }
}

export default project
