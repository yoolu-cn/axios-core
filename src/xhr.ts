/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-03 22:25:55
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-04 23:20:52
 * @FilePath: /ts-axios/src/xhr.js
 * @Description: Do something ...
 */
import { AxiosRequestConfig, AxiosPrimise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPrimise {
  return new Promise((resolve, reject) => {
    const { data, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const requestData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: requestData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
