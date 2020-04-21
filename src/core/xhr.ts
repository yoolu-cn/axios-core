/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-03 22:25:55
 * @LastEditors: yangjingpuyu@aliyun.com
 * @LastEditTime: 2020-04-21 23:07:39
 * @FilePath: /ts-axios/src/core/xhr.ts
 * @Description: Do something ...
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isUrlSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/utils'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfHeaderName,
      xsrfCookieName,
      onDownloadProgress,
      onUploadProgress
    } = config
    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }
      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
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
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if ((withCredentials || isUrlSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

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
