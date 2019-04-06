const mysql = require("mysql");
const pool = mysql.createPool({
  // host: '119.28.89.98',
  // user: 'test',
  // host: 'localhost',
  // user: 'root',
  host: '101.132.136.186',
  user: 'root',
  password: '123+456-',
  database: 'codemart',
  multipleStatements: true,
  port: 3306
});

function query(sql, callback, options) {
  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, options, function (err, results, fields) {
        if (err) throw err;
        conn.release();
        callback(err, results, fields);
      });
    }
  });
};

function promiseQuery(sql) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (err) {
        reject(err);
      } else {
        conn.query(sql, function (err, rows, fields) {
          //释放连接
          conn.release();
          //传递Promise回调对象
          resolve({
            "err": err,
            "rows": rows,
            "fields": fields
          });
        });
      }
    });
  });
}
module.exports = {
  query: query,
  promiseQuery: promiseQuery
};
