/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-12 00:16:38
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-12 00:47:59
 * @FilePath: /ts-axios/src/core/transform.ts
 * @Description: Do something ...
 */
import { AxiosTransformer } from '../types'

export default function transform(
  data: any,
  headers?: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
