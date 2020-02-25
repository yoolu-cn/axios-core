/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-25 23:25:16
 * @LastEditors: yangjingpuyu@aliyun.com
 * @LastEditTime: 2020-02-25 23:27:04
 * @FilePath: /ts-axios/src/cancel/cancel.ts
 * @Description: Do something ...
 */
export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
