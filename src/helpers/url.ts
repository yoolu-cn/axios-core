/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-04 16:29:00
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-04 21:49:31
 * @FilePath: /ts-axios/src/helpers/url.ts
 * @Description: Do something ...
 */
import { isDate, isPlainObject } from './utils'

/**
 * 转义 url 中的特殊字符
 *
 * @param {string} val
 * @returns {string}
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 构建 请求的 url
 *
 * @export
 * @param {string} url
 * @param {*} [params]
 * @returns {string}
 */
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }

      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    let makeIndex = url.indexOf('#')
    if (makeIndex !== -1) {
      url = url.slice(0, makeIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
