/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-03 22:22:16
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-03 22:23:08
 * @FilePath: /ts-axios/example/simple/index.ts
 * @Description: Do something ...
 */
import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})