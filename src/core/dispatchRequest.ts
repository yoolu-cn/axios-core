/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-05 16:57:43
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-12 00:50:08
 * @FilePath: /ts-axios/src/core/dispatchRequest.ts
 * @Description: Do something ...
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import xhr from './xhr'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 * 处理 Config 配置
 *
 * @param {AxiosRequestConfig} config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 注意： 这里headers 处理需要设置在 body 处理之前，设置 ’content-type' 需要 data 参数为普通对象时 才会设置
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

/**
 *  转化 Url 操作
 *
 * @param {AxiosRequestConfig} config
 * @returns {string}
 */
function transformURL(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildURL(url!, params)
}

/**
 * 转化相应参数
 *
 * @param {AxiosResponse} config
 * @returns {AxiosResponse}
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
