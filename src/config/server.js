/**
 * Created by lxhfight on 2018/8/2.
 * Email: lxhfight1@gmail.com
 * Description:
 *  服务端相关配置:
 *    ossPrefix: 阿里云或者其他云计算提供商的图片存储桶关联的url或者其CDN关联的URL
 *    serverPrefix: 提供数据服务端的URL
 */
const ossPrefix = ''

const testConfig = {
  serverPrefix: '//car-inspection.shengxintech.com/',
  ossPrefix
}

const prodConfig = {
  serverPrefix: '//car-inspection.shengxintech.com/',
  ossPrefix
}

const _isDev = process.env.NODE_ENV === 'production'
const config = _isDev ? prodConfig : testConfig

export default config
