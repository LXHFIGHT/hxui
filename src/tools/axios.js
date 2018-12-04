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
  console.log('Analysing Response Data')
  return res.data
}

/**
 * 统一处理错误信息
 * @param err 请求返回的错误信息
 */
const handleError = (err) => { console.log(err) }

/**
 * 将JavaScript对象转换为queryString形式的字符串，如：
 * { foo: 'bar', name: 'hxui' } = '?foo=bar&name=hxui'
 * @param {*} obj 接受转换的对象
 */
const queryString = (obj) => {
  if (typeof obj !== 'object') {
    return ''
  }
  let result = '?'
  for (let param in obj) {
    result += `${param}=${encodeURI(obj[param])}&`
  }
  return result.substr(0, (result.length - 1))
}

const fetch = (method, path, data) => {
  let token = session.get(session.KEY_USER_TOKEN)
  const contentType = 'application/json'
  const headers = {
    'Content-Type': contentType,
    'Authorization': `Bearer ${token}`
  }
  const url = `${config.server}${config.prefix}${path}`
  const bundle = (method === 'get' || method === 'delete') ? { params: data } : data
  return axios[method](url, bundle, {headers})
    .then(res => {
      return checkResponse(res)
    })
    .catch(err => {
      handleError(err)
    })
}

const upload = (path, data) => {
  let token = session.get(session.KEY_USER_TOKEN)
  const contentType = 'multipart/form-data'
  const url = `${config.server}${config.prefix}${path}`
  const headers = {
    'Content-Type': contentType,
    'Authorization': `Bearer ${token}`
  }
  return axios['post'](url, data, {headers})
    .then(res => {
      return checkResponse(res)
    })
    .catch(err => {
      handleError(err)
    })
}

export default {
  doOpen (path, data, mode = '_self') {
    const url = `${config.server}${config.prefix}${path}${queryString(data)}`
    window.open(url, mode)
  },
  doPost (path, data) {
    return fetch('post', path, data)
  },
  doGet (path, data) {
    return fetch('get', path, data)
  },
  doPut (path, data) {
    return fetch('put', path, data)
  },
  doDelete (path) {
    return fetch('delete', path, {})
  },
  doUpload (path, formData) {
    return upload(path, formData)
  }
}
