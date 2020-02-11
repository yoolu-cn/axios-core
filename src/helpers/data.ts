/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-04 21:44:29
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-12 00:13:04
 * @FilePath: /ts-axios/src/helpers/data.ts
 * @Description: Do something ...
 */
import { isPlainObject } from './utils'

/**
 * 转化请求data类型
 *
 * @export
 * @param {*} data
 * @returns {*}
 */
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do something
    }
  }

  return data
}
