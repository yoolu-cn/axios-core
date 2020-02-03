/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-03 22:25:55
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-03 22:46:21
 * @FilePath: /ts-axios/src/xhr.js
 * @Description: Do something ...
 */
import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
