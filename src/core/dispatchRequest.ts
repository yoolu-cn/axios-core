/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-05 16:57:43
 * @LastEditors: yangjingpuyu@aliyun.com
 * @LastEditTime: 2020-02-05 17:14:43
 * @FilePath: /ts-axios/src/core/dispatchRequest.ts
 * @Description: Do something ...
 */
import { AxiosRequestConfig, AxiosPrimise, AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import xhr from './xhr'
import { transfromRequest, transfromResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPrimise {
  processConfig(config)
  return xhr(config).then(res => {
    res.data = transformResponseData(res)
    return res
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
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
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
 * 转化 body 参数
 *
 * @param {AxiosRequestConfig} config
 * @returns {*}
 */
function transformRequestData(config: AxiosRequestConfig): any {
  return transfromRequest(config.data)
}

/**
 * 处理 data 参数为普通object 时，设置请求头 ‘content-type'
 *
 * @param {AxiosRequestConfig} config
 * @returns {*}
 */
function transformHeaders(config: AxiosRequestConfig): any {
  // 注意： 这里 headers 需要设置默认值，在 processHeaders 中通过判断headers是否存在，然后设置 header 属性
  let { headers = {}, data } = config
  return processHeaders(headers, data)
}

/**
 * 转化相应参数
 *
 * @param {AxiosResponse} config
 * @returns {AxiosResponse}
 */
function transformResponseData(config: AxiosResponse): AxiosResponse {
  let { data } = config
  return transfromResponse(data)
}
