/* eslint-disable no-new-object */
/* eslint-disable no-array-constructor */
/* eslint-disable spaced-comment */
/* eslint-disable import/first */
/* eslint-disable no-useless-return */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const mysql = require('mysql')
const express = require('express')
const router = express.Router()
/* const connect = require('../pool.js').connect
const connection = require('../pool.js').connecttion */
/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('hello Express')
  res.send('respond with a resource')
})

/***************************************************************用户注册接口****************************************************************/
router.get('/register', function (req, res, next) {
  console.log('前端请求注册')
  let telephone = req.query.telephone
  let email = req.query.email
  let username = req.query.username
  let password = req.query.password
  let status = req.query.telephone

  let q1 = `select * from user where telephone = '${telephone}'`
  let q2 = `insert into user (telephone, email, username, password, status) values ('${telephone}','${email}','${username}','${password}','${status}')`
  // 数据库连接
  const connection = mysql.createConnection({
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

  var loginStatus = 0

  // 插入数据库
  var sql = q1
  console.log('sql查询语句（数据插入前检查）：' + sql)
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]---:', err.message)
      return
    } else if (result.length === 1) { // 注册账号已存在
      console.log('Illegal registration, this account has been already existed!')
      console.log(result[0])
      res.send(result)
    } else if (result.length === 0) {
      var sql = q2
      console.log('sql插入语句：' + sql)
      connection.query(sql, function (err, result) {
        if (err) {
          console.log('Register fail!')
          console.log('[INSERT ERROR]---:', err.message)
          return
        } else {
          console.log('Register succeed!')
          console.log(result.length)
          res.send('succeed')
        }
      })
      
    }
  })

  // 断开连接
  /* connection.end(function (err) {
    if (err) {
      console.log('[UNCONNECT ERROR]---:' + err)
      return
    }
    console.log('unconnect succeed!')
  }) */
})

/***************************************************************用户登录接口****************************************************************/
router.get('/login', function (req, res, next) {
  console.log('前端请求登录')
  // 数据库连接
  const connection = mysql.createConnection({
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
  let telephone = req.query.telephone
  let password = req.query.password
  let loginStatus = 0

  // 查询数据库
  var sql = `select * from user where telephone = '${telephone}' and password = '${password}'`
  console.log('sql语句：' + sql)
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]---:', err.message)
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
      console.log('[UNCONNECT ERROR]---:' + err)
      return
    }
    console.log('unconnect succeed!')
  })
})
/***************************************************************账号修改接口****************************************************************/
router.get('/alert', function (req, res, next) {
  console.log('前端请求修改账号信息')
  var newPasswordSucceed = false
  var newUsernameSucceed = false
  var oldPasswordTrue = false
  var updateResult = new Object()

  let oldPassword = req.query.oldPassword
  let telephone = req.query.telephone
  let newUsername = req.query.newUsername
  let newPassword = req.query.newPassword
  console.log('telephone: ' + telephone)
  console.log('oldPassword: ' + oldPassword)
  console.log('newUsername: ' + newUsername)
  console.log('newPassword: ' + newPassword)

  let q0 = `select password from user where telephone = '${telephone}'`
  let q1 = `update user set password = '${newPassword}' where telephone = '${telephone}'`// 更新密码
  let q2 = `update user set username = '${newUsername}' where telephone = '${telephone}'`// 更新用户名
  let q3 = `update user set username = '${newUsername}', password = '${newPassword}' where telephone = '${telephone}'`// 同时更新用户名和密码
  // 数据库连接
  const connection = mysql.createConnection({
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

  // 更新数据库
  var sql0 = q0
  var sql
  if (newPassword === '') { // 前端传过来的密码为空，即只更新用户名 
    console.log('Update username only!')
    sql = q2
    newUsernameSucceed = true
  } else if (newUsername === '') { // 前端传过来的用户名为空，即只更新密码
    console.log('Update password only!')
    sql = q1
    newPasswordSucceed = true
  } else {
    console.log('Update both username and password!')
    sql = q3
    newPasswordSucceed = true
    newUsernameSucceed = true
  }
  console.log('sql更新语句：' + sql)
  connection.query(sql0, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR]---:', err.message)
      return
    } else if (result[0].password === oldPassword) { // 输入旧密码正确
      oldPasswordTrue = true
      connection.query(sql, function (err, result) {
        if (err) {
          console.log('[UPDATE ERROR]---:', err.message)
          return
        } else {
          console.log('Update succeed!')
          console.log(result)
          updateResult.newPasswordSucceed = newPasswordSucceed
          updateResult.newUsernameSucceed = newUsernameSucceed
          updateResult.oldPasswordTrue = oldPasswordTrue
          res.send(updateResult)
        }
      })
    } else {
      console.log('error old password!')
      updateResult.newPasswordSucceed = newPasswordSucceed
      updateResult.newUsernameSucceed = newUsernameSucceed
      updateResult.oldPasswordTrue = oldPasswordTrue
      /* console.log('updateResult.oldPasswordTrue: ' + updateResult.oldPasswordTrue) */
      res.send(updateResult)
    }
  })
  

  // 断开连接
  /* connection.end(function (err) {
    if (err) {
      console.log('[UNCONNECT ERROR]---:' + err)
      return
    }
    console.log('unconnect succeed!')
  }) */
})

module.exports = router
