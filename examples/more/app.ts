/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-03-30 21:37:34
 * @LastEditors: yangjingpuyu@aliyun.com
 * @LastEditTime: 2020-04-21 23:12:09
 * @FilePath: /ts-axios/examples/more/app.ts
 * @Description: Do something ...
 */
import axios from '../../src/index'

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

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res => {
  console.log(res)
})