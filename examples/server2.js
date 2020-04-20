/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-03-30 21:38:18
 * @LastEditors: yangjingpuyu@aliyun.com
 * @LastEditTime: 2020-03-30 22:43:47
 * @FilePath: /ts-axios/examples/server2.js
 * @Description: Do something ...
 */
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()

const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

router.post('/more/serverf', function(req, res) {
  res.set(cors)
  res.json(req.cookies)
})

router.options('/more/serverf', function(req, res) {
  res.set(cors)
  res.end()
})

app.use(router)

const port = 8088
module.exports = app.listen(port)