/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-05 14:38:17
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-05 17:38:45
 * @FilePath: /ts-axios/src/axios.ts
 * @Description: Do something ...
 */
import { AxiosInstance } from './types'
import Axios from './core/axios'
import { extend } from './helpers/utils'

function createInstance(): AxiosInstance {
  const context = new Axios()

  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
