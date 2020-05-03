/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-04 16:29:00
 * @LastEditors: yangjingpuyu@aliyun.com
 * @LastEditTime: 2020-05-03 21:35:36
 * @FilePath: /ts-axios/src/helpers/url.ts
 * @Description: Do something ...
 */
import { isDate, isPlainObject, isURLSearchParams } from './utils'

interface URLOrigin {
  protocol: string
  host: string
}

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
export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!params) {
    return url
  }

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []
    Object.keys(params).forEach(key => {
      const val = params[key]
      if (val === null || typeof val === 'undefined') {
        return
      }
      let values = []
      // 以arr[]=1&arr[]=2 的方式构建get 数组参数
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
    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    let makeIndex = url.indexOf('#')
    if (makeIndex !== -1) {
      url = url.slice(0, makeIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

/**
 * @description: 判断当前页面url 和 requestURL 是不是同源
 * @param {type}
 * @return:
 */
export function isUrlSameOrigin(requestUrl: string): boolean {
  const parsedOrigin = resolveUrl(requestUrl)

  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const currentOrigin = resolveUrl(window.location.href)

/**
 * @description: 获取当前页面url地址
 * @param {type}
 * @return:
 */
function resolveUrl(url: string): URLOrigin {
  const urlParsingNode = document.createElement('a')

  urlParsingNode.setAttribute('href', url)

  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}

/**
 * @description: 判断 url 是不是 绝对的 URL
 * @param
 * @return: boolean
 */
export function isAbsoluteURL(url: string): boolean {
  return /(^[a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

/**
 * @description: 拼接 baseURL 和 relativeURL
 * @param {type}
 * @return:
 */
export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
