/**
 * Created by lxhfight on 2018/7/25
 * Updated on 2019/3/7
 * Email: lxhfight@gmail.com
 * Description:
 *  project: 此前端项目相关配置
 *  _isDev:  是否在开发环境
 *  serverPrefix: 提供接口数据服务端的URL前缀
 *  ossPrefix: 阿里云或者其他云计算提供商的图片存储桶关联的url或者其CDN关联的URL
 */
import bgLogin from './../assets/bg/bg-login.jpg'

// 前端项目总配置
export const project = {
  version: 'v 0.0.1', // 项目版本
  name: 'HXUI For Vue', // 项目名
  logo: 'https://lxh-static.oss-cn-shenzhen.aliyuncs.com/img/icon-logo.jpg', // 项目logo图片URL
  subject: '账号', // 项目围绕主体名
  theme: 'light', // 项目整体风格  dark 黑色风 light 明亮风
  isAdmin: 0, // 前端项目的模式是否为管理后台： true 管理后台界面风格布局  false 官网首页界面风格布局 
  login: {
    title: '登录管理后台', // 登录界面标题
    background: bgLogin
  },
  copyright: {
    content: 'HXUI', // 版权内容
    icp: '粤ICP备00000000号-1' // 如果不提供ICP，将不展示
  }
}

export const _isDev = process.env.NODE_ENV === 'production'

export const ossPrefix = ''

const testServerPrefix = '//test.api.lxhfight.com/'
const prodServerPrefix = '//product.api.lxhfight.com/'
export const serverPrefix = _isDev ? testServerPrefix : prodServerPrefix
