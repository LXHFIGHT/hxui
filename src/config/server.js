/**
 * Created by lxhfight on 2018/8/2.
 * Email: lxhfight1@gmail.com
 * Description:
 *  服务端相关配置
 */

const testConfig = {
  client: '',
  server: '',
  prefix: '/api'
}

const prodConfig = {
  client: '', // 配置前端项目访问域名
  server: '', // 配置前端项目
  prefix: '/api'
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : testConfig

export default config
