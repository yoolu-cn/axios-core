/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-05 21:24:49
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-05 21:48:56
 * @FilePath: /ts-axios/examples/interceptor/app.ts
 * @Description: Do something ...
 */
import axios from '../../src/index'

axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptor = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptors.request.use(config => {
  console.log('//////// request config')
  console.log(config)
  return config
}, error => {
  console.log('//////// request error')
  console.log(error)
  return new Promise(error)
})

axios.interceptors.response.use(res => {
  console.log('//////// response res')
  console.log(res)
  return res
}, error => {
  console.log('//////// response error')
  console.log(error.message, error.config)
  return new Promise(error)
})

axios.interceptors.response.eject(interceptor)

// axios({
//   url: '/interceptor/get',
//   method: 'get',
//   headers: {
//     test: ''
//   }
// }).then((res) => {
//   console.log(res.data)
// })

axios({
  url: 'a',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})

axios({
  url: '/interceptor/timeout',
  method: 'get',
  timeout: 5000,
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})