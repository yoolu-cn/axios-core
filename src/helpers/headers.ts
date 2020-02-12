/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-04 22:02:17
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-12 00:00:54
 * @FilePath: /ts-axios/src/helpers/headers.ts
 * @Description: Do something ...
 */
import { isPlainObject, deepMerge } from './utils'
import { Method } from '../types'

/**
 * 解决 传入的headers的key值 中大小写不匹配， 统一改为首字母大写
 *
 * @param {*} headers
 * @param {string} normalizedName
 */
function normalizedHeadersName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 处理body传值为普通对象时，设置header参数
 *
 * @export
 * @param {*} headers
 * @param {*} data
 * @returns {*}
 */
export function processHeaders(headers: any, data: any): any {
  normalizedHeadersName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, ...val] = line.split(':')

    key = key.trim().toLowerCase()

    if (!key) {
      return
    }

    let newVal = val.join(':')

    if (newVal) {
      newVal = newVal.trim()
    }

    parsed[key] = newVal
  })

  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
