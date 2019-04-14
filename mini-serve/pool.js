/* eslint-disable no-unused-vars */
const mysql = require('mysql')
const express = require('express')
const router = express.Router()
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
  var db = connection
  db.connect(handleError)
  db.on('error', handleError)
}

module.exports = {
  connect: connect,
  handleError: handleError,
  connection: connection
}
