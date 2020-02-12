/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-11 22:53:17
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-11 23:39:01
 * @FilePath: /ts-axios/src/core/mergeConfig.ts
 * @Description: Do something ...
 */
import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/utils'

const strategies = Object.create(null)

function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 === 'undefined' ? val1 : val2
}

function customStrategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrategy(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1, val2)
  } else {
    return val1
  }
}

const customKeysStrategy = ['url', 'params', 'data']

customKeysStrategy.forEach(key => {
  strategies[key] = customStrategy
})

const deepKeysStrategy = ['headers', 'auth']

deepKeysStrategy.forEach(key => {
  strategies[key] = deepMergeStrategy
})

export default function mergeConfig(
  configDefault: AxiosRequestConfig,
  configCustom?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!configCustom) {
    configCustom = {}
  }

  const config = Object.create(null)

  for (let key in configCustom) {
    mergeFiled(key)
  }

  for (let key in configDefault) {
    if (!configCustom[key]) {
      mergeFiled(key)
    }
  }

  function mergeFiled(key: string): void {
    const strategy = strategies[key] || defaultStrategy
    config[key] = strategy(configDefault[key], configCustom![key])
  }
  return config
}
