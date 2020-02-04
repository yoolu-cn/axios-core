/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-03 22:25:41
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-04 21:06:40
 * @FilePath: /ts-axios/src/types/index.ts
 * @Description: Do something ...
 */
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'post'
  | 'POST'

/**
 * axios config 参数接口
 *
 * @export
 * @interface AxiosRequestConfig
 */
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
