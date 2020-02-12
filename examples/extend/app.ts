/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-05 17:25:36
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-05 17:57:53
 * @FilePath: /ts-axios/examples/extend/app.ts
 * @Description: Do something ...
 */
import axios from '../../src/index'

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post', { msg: 'post' })

// axios.put('/extend/put', { msg: 'put' })

// axios.patch('/extend/patch', { msg: 'patch' })

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios('/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}


async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
    console.log(user.result.age)
  }
}

test()