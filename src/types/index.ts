/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-03 22:25:41
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-05 17:56:44
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
  url?: string
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
export interface AxiosResponse<T = any> {
  data: T
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
export interface AxiosPrimise<T = any> extends Promise<AxiosResponse<T>> {}

/**
 * axios 错误返回信息接口
 *
 * @export
 * @interface AxiosError
 * @extends {Error}
 */
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPrimise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPrimise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPrimise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPrimise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPrimise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPrimise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPrimise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPrimise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPrimise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPrimise<T>
}
