/**
 * Created by lxhfight on 2018/7/26.
 * Email: lxhfight1@gmail.com
 * Description:
 *   用于发起http/https请求的 工具方法
 */

import axios from 'axios'
import { session } from './storage'
import config from './../config/server'

/**
 * 检查返回数据是否有问题
 * @param res 响应数据
 */
const checkResponse = (res) => {

}

/**
 * 统一处理错误信息
 * @param err 请求返回的错误信息
 */
const handleError = (err) => {

}

const fetch = (method, path, bundle) => {
  let token = session.get(session.KEY_USER_TOKEN)
  const contentType = 'application/json'
  const headers = {
    'Content-Type': contentType,
    'Authorization': `Bearer ${token}`
  }
  const url = `${config.server}${config.prefix}${path}`

  if (method === 'get' || method === 'delete') {
    return axios[method](url, { params: bundle }, {headers})
      .then(res => {
        checkResponse(res)
      })
      .catch(err => {
        handleError(err)
      })
  } else {
    return axios[method](url, bundle, {headers})
      .then(response => {
        return checkResponse(response)
      })
      .catch(err => {
        handleError(err)
      })
  }
}

export default {
  doPost (path, data) {
    return fetch('post', path, data)
  },
  doGet (path, data) {
    return fetch('post', path, data)
  },
  doPut (path, data) {
    return fetch('put', path, data)
  },
  doDelete (path) {
    return fetch('delete', path, { })
  }
}
