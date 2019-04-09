var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('hello Express')
  res.send('respond with a resource')
})

router.get('/register', function (req, res, next) {
  console.log('前端请求注册')
  res.send('前端请求注册')
})
router.get('/login', function (req, res, next) {
  console.log('前端请求登录')
  res.send('前端请求登录')
})
router.get('/alert', function (req, res, next) {
  console.log('前端请求修改账号信息')
  res.send('前端请求修改账号信息')
})
module.exports = router
