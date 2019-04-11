const mysql = require('mysql')
const pool = mysql.createPool({
  host: '172.0.0.1',
  user: 'root',
  password: 'cloudy2020',
  database: 'mydb',
  port: 3306
})

function query (sql, callback, options) {
  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null)
    } else {
      conn.query(sql, options, function (err, results, fields) {
        if (err) throw err
        conn.release()
        callback(err, results, fields)
      })
    }
  })
};

function promiseQuery (sql) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (err) {
        reject(err)
      } else {
        conn.query(sql, function (err, rows, fields) {
          // 释放连接
          conn.release()
          // 传递Promise回调对象
          resolve({
            'err': err,
            'rows': rows,
            'fields': fields
          })
        })
      }
    })
  })
}
module.exports = {
  query: query,
  promiseQuery: promiseQuery
}
