/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-04 16:28:52
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-04 20:32:32
 * @FilePath: /ts-axios/src/helpers/utils.ts
 * @Description: Do something ...
 */
const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
