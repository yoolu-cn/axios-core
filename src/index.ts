/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-03 22:22:30
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-03 22:45:01
 * @FilePath: /ts-axios/src/index.ts
 * @Description: Do something ...
 */
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig) {
  // TODO
  xhr(config)
}

export default axios
