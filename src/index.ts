/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-03 22:22:30
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-04 21:27:02
 * @FilePath: /ts-axios/src/index.ts
 * @Description: Do something ...
 */
import { AxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import xhr from './xhr'

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

/**
 * 处理 Config 配置
 *
 * @param {AxiosRequestConfig} config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
}

/**
 *  转化 Url 操作
 *
 * @param {AxiosRequestConfig} config
 * @returns {string}
 */
function transformURL(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildURL(url, params)
}

export default axios
