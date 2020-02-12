<!--
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-03 21:23:20
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-12 21:52:12
 * @FilePath: /ts-axios/README.md
 * @Description: Do something ...
 -->
# ts-axios
Typescript training project to improve programming ability

## 开发文档

[ts-axios开发文档](https://dev.cubsdiary.com/ts-axios)

## 不懂点

接口扩展 -> 扩展接口
拦截器实现 -> 链式调用实现

## Features

- 在浏览器端使用 XMLHttpRequest 对象通讯
- 支持 Promise API
- 支持请求和响应的拦截器
- 支持请求数据和响应数据的转换
- 支持请求的取消
- JSON 数据的自动转换
- 客户端防止 XSS

## Usage

```javascript
const axios = require('axios')

axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Yee',
    lastName: 'Huang'
  }
})
```
