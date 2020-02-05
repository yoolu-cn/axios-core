/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-03 22:25:41
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-05 14:28:17
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
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

/**
 * axios 返回数据接口
 *
 * @export
 * @interface AxiosResponse
 */
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

/**
 * axios promise参数接口
 *
 * @export
 * @interface AxiosPrimise
 * @extends {Promise<AxiosResponse>}
 */
export interface AxiosPrimise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}
