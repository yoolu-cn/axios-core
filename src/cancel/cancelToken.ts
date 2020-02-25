/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-25 21:55:14
 * @LastEditors: yangjingpuyu@aliyun.com
 * @LastEditTime: 2020-02-25 23:51:24
 * @FilePath: /ts-axios/src/cancel/cancelToken.ts
 * @Description: Do something ...
 */
import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler

    const token = new CancelToken(c => {
      cancel = c
    })

    return {
      token,
      cancel
    }
  }
}
