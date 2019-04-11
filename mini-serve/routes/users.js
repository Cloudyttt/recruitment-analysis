/* eslint-disable no-useless-return */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const query = require('../pool.js').query
const mysql = require('mysql')
const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('hello Express')
  res.send('respond with a resource')
})

router.get('/register', function (req, res, next) {
  console.log('前端请求注册')
  res.send('前端请求注册')
  console.log(res.query)
  let {
    telephone,
    username,
    password,
    email,
    status
  } = req.body
  let q1 = `select * from user where telephone = '${telephone}'`
  let q2 = `insert into user (telephone, username, password, email, status) values ('${telephone},'${username}','${password}','${email}','${status}')`
})

router.get('/login', function (req, res, next) {
  console.log('前端请求登录')

  // 数据库连接
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'mydb',
    port: '3306'
  })
  function handleError (err) {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') { // 如果是连接断开，自动重新连接
        connect()
      } else if (err.code === 'PROTOCOL_ENQUEUE_HANDSHAKE_TWICE') { // 已经连接数据库时断开重连
        connection.end(function (err) {
          if (err) {
            console.log('---:' + err)
            return
          }
          console.log('关闭succeed')
        })
      } else {
        console.error(err.stack || err)
      }
    } else {
      console.log('connecting succeed!')
    }
  }

  // 连接数据库
  function connect () {
    db = connection
    db.connect(handleError)
    db.on('error', handleError)
  }
  var db
  connect()

  /* console.log(req.query.telephone)
  console.log(req.query.password) */
  var telephone = req.query.telephone
  var password = req.query.password
  var loginStatus = 0

  // 查询数据库
  var sql = `select * from user where telephone = '${telephone}' and password = '${password}'`
  console.log(sql)
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      return
    } else if (result.length === 1) {
      console.log('Login succeed!')
      console.log(result[0])
      res.send(result)
    } else {
      console.log('Login fail!')
      console.log(result.length)
      res.send(result)
    }
  })

  // 断开连接
  connection.end(function (err) {
    if (err) {
      console.log('---:' + err)
      return
    }
    console.log('unconnect succeed!')
  })
})

router.get('/alert', function (req, res, next) {
  console.log('前端请求修改账号信息')
  res.send('前端请求修改账号信息')
})
module.exports = router
