/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-05 14:21:51
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-05 14:42:24
 * @FilePath: /ts-axios/src/helpers/error.ts
 * @Description: Do something ...
 */
import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.response = response
    this.request = request
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)

  return error
}
