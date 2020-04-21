/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-03-30 21:37:34
 * @LastEditors: yangjingpuyu@aliyun.com
 * @LastEditTime: 2020-04-21 23:41:53
 * @FilePath: /ts-axios/examples/more/app.ts
 * @Description: Do something ...
 */
import axios, { AxiosError } from '../../src/index'

// ------------- withCredentials ------------

// document.cookie = 'username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/; secure=false; samesite=none';

// axios.get('/more/get').then(res => {
//   console.log(res, 'resouce')
// })

// axios.post('http://127.0.0.1:8088/more/serverf', { withCredentials: true }, {
//   withCredentials: true,
// }).then(res => {
//   console.log(res)
// })

// ---------------- xsrf ----------------

// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })

// instance.get('/more/get').then(res => {
//   console.log(res)
// })

// ------------------ auth -----------------

// axios.post('/more/post', {
//   a: 1
// }, {
//   auth: {
//     username: 'Yee',
//     password: '123456'
//   }
// }).then(res => {
//   console.log(res)
// })

// ------------------ custom status error -----------------

axios.get('/more/304').then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log('no custom')
  console.log(e.message)
})

axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log('custom')
  console.log(e.message)
})