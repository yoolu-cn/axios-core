/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-03 22:14:53
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-04 21:14:54
 * @FilePath: /ts-axios/examples/server.js
 * @Description: Do something ...
 */
/*
 * @Author: yangjingpuyu@aliyun.com
 * @Date: 2020-02-03 22:14:53
 * @LastEditors  : yangjingpuyu@aliyun.com
 * @LastEditTime : 2020-02-03 22:52:39
 * @FilePath: /ts-axios/example/server.js
 * @Description: Do something ...
 */
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()

const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})

router.get('/base/get', function(req, res) {
  res.json(req.query)
})

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})