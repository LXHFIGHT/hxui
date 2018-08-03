/**
 * Created by lxhfight on 2018/8/2.
 * Email: lxhfight1@gmail.com
 * Description:
 *  服务端相关配置
 */

const testConfig = {
  client: '',
  server: '//car-inspection.shengxintech.com/',
  prefix: ''
}

const prodConfig = {
  client: '', // 配置前端项目访问域名
  server: '//car-inspection.shengxintech.com/', // 配置前端项目
  prefix: ''
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : testConfig

export default config
