/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-05 14:38:17
 * @LastEditors: yangjingpuyu@aliyun.com
 * @LastEditTime: 2020-02-25 23:29:55
 * @FilePath: /ts-axios/src/axios.ts
 * @Description: Do something ...
 */
import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/axios'
import { extend } from './helpers/utils'
import defaults from './default'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/cancelToken'
import Cancel, { isCancel } from './cancel/cancel'

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

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
