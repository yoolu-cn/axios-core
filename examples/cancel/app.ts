/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-25 22:26:25
 * @LastEditors: yangjingpuyu@aliyun.com
 * @LastEditTime: 2020-02-26 00:05:35
 * @FilePath: /ts-axios/examples/cancel/app.ts
 * @Description: Do something ...
 */
import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() => {
  cancel()
}, 200)
