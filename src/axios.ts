/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-05 14:38:17
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-12 01:00:38
 * @FilePath: /ts-axios/src/axios.ts
 * @Description: Do something ...
 */
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/axios'
import { extend } from './helpers/utils'
import defaults from './default'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
