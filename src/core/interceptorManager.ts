/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-05 20:52:07
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-05 21:22:03
 * @FilePath: /ts-axios/src/core/interceptorManager.ts
 * @Description: Do something ...
 */
import { Interceptor, ResolvedFn, RejectedFn } from '../types'

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
