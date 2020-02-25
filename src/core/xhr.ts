/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-03 22:25:55
 * @LastEditors: yangjingpuyu@aliyun.com
 * @LastEditTime: 2020-02-25 22:07:20
 * @FilePath: /ts-axios/src/core/xhr.ts
 * @Description: Do something ...
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data, url, method = 'get', headers, responseType, timeout, cancelToken } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
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
      hanldeResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError('Network Error.', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout}ms exceded`, config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    function hanldeResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status of code ${response.status}.`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
