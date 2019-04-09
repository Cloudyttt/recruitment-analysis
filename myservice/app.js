/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const bodyParser = require('body-parser')
const express = require('express')
const multer = require('multer')
const APP = express()
// const upload = multer({ MemoryStorage: 'upload/' })
const fs = require('fs')
const query = require('../lib/service/lib/pool.js').query
const promiseQuery = require('../lib/service/lib/pool.js').promiseQuery
const request = require('request')
const xml2js = require('xml2js')
const path = require('path')
const xlsx = require('node-xlsx').default
const cors = require('cors')
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`))
// const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`)

const jsonBuilder = new xml2js.Builder() // jons -> xml
const xmlParser = new xml2js.Parser({
  explicitArray: false,
  ignoreAttrs: true
}) // xml -> json
require('body-parser-xml')(bodyParser)
APP.use(bodyParser.json()) // for parsing application/json
APP.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded
APP.use(bodyParser.raw()) // for parsing application/x-www-form-urlencoded
APP.use(
  bodyParser.xml({
    limit: '1MB', // Reject payload bigger than 1 MB
    xmlParseOptions: {
      normalize: true, // Trim whitespace inside text nodes
      normalizeTags: true, // Transform tags to lowercase
      explicitArray: false // Only put nodes in array if >1
    }
  })
)
APP.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5500'
  })
)
APP.use(express.static(__dirname))
var upload = multer({
  dest: './upload'
})
const app = {
  get: function (url, func) {
    APP.post(url, function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      let body = req && req.body
    })
  },
  post: function (url, func) {
    APP.post(url, function (req, res, next) {
      func(req, res, next)
    })
  },
  send: function (res, r, cb) {
    if (cb) {
      res.send(cb + '(' + JSON.stringify(r) + ')')
    } else {
      res.send(r)
    }
  }
}
APP.listen(4208)

APP.get('/test', (req, res, next) => {
  let r = {
    status: 0,
    msg: 'daivd'
  }
  res.send(r)
})

function randomNum () {
  return parseInt(Math.random() * 1000000)
}

// 用户注册
app.post('/userRegister', (req, res, next) => {
  let {
    username,
    password,
    type,
    question,
    answer
  } = req.body
  let now = new Date()
  let formatNum = function (num) {
    return (num + 100 + '').substring(1)
  }
  let create_time = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay()} ${formatNum(
    now.getHours()
  )}:${formatNum(now.getMinutes())}:${formatNum(now.getSeconds())}`
  let update_time = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay()} ${formatNum(
    now.getHours()
  )}:${formatNum(now.getMinutes())}:${formatNum(now.getSeconds())}`
  console.log(create_time)
  let q1 = `select * from user where username = '${username}'`
  let q2 = `insert into user (username,password,type,question,answer,status,create_time,update_time) values ('${username}','${password}','${type}','${question}','${answer}',1,'${create_time}','${update_time}')`
  query(q1, (err, rows, fields) => {
    if (err) {
      throw err
    }
    if (rows.length) {
      let r = {
        status: 0,
        msg: '已存在该用户名'
      }
      res.send(r)
    } else {
      query(q2, (err, rows, fields) => {
        if (err) {
          throw err
        }
        let result = {
          status: 1,
          msg: 'success'
        }
        res.send(result)
      })
    }
  })
})

// 忘记密码
app.post('/forgetPassword', (req, res, next) => {
  let {
    username,
    password,
    question,
    answer
  } = req.body
  let q1 = `select * from user where username = '${username}'`
  let q2 = `update user set password = '${password}' where question = '${question}' and answer = '${answer}'`
  query(q1, (err, rows, fields) => {
    if (err) {
      throw err
    }
    if (rows.length) {
      query(q2, (err, rows, fields) => {
        if (err) {
          throw err
        }
        if (rows.affectedRows) {
          let result = {
            status: 1,
            msg: 'success'
          }
          res.send(result)
        } else {
          let result = {
            status: 0,
            msg: '密保问题或密码答案错误'
          }
          res.send(result)
        }
      })
    } else {
      let r = {
        status: 0,
        msg: '该用户不存在，请先注册'
      }
      res.send(r)
    }
  })
})

// 登录
app.post('/login', (req, res, next) => {
  let {
    username,
    password
  } = req.body
  let r = {}
  let q = `select * from user where username = '${username}'`
  query(q, (err, rows, fields) => {
    if (err) {
      throw err
    }
    if (rows.length === 0) {
      r.status = 0
      r.msg = '该用户不存在'
      res.send(r)
    } else {
      let s = `select * from user where username = '${username}' and password = '${password}'`
      query(s, (err, rows, fields) => {
        if (err) {
          throw err
        }
        if (rows.length === 0) {
          r.status = 0
          r.msg = '密码错误'
        } else {
          r.status = 1
          r.msg = 'success'
          r.data = rows
        }
        res.send(r)
      })
    }
  })
})

// 修改密码
app.post('/updatePsw', (req, res, next) => {
  let {
    username,
    password
  } = req.body
  let q = `update user set password = '${password}' where username = '${username}'`
  query(q, (err, rows, fields) => {
    let result = {
      status: 0,
      msg: ''
    }
    if (err) {
      throw err
    }
    if (rows.affectedRows) {
      result.status = 1
      result.msg = 'success'
    }
    res.send(result)
  })
})

// 上传头像
app.post('/upload', function (req, res, next) {
  var formidable = require('formidable')
  let form = new formidable.IncomingForm()
  form.encoding = 'utf-8'
  form.uploadDir = './upload'
  form.keepExtensions = true
  // eslint-disable-next-line no-unused-vars
  let realName
  form.on('file', function (name, file) {
    console.log(name)
    let _path = require('path').resolve(file.path)
    let arr = file.name.split('.')
    let time = new Date().getTime()
    delete file._writeStream
    fs.rename(
      _path,
      // eslint-disable-next-line no-path-concat
      __dirname + '/upload/' + arr[0] + time + '.' + arr[1],
      function (err) {
        if (err) {
          throw err
        }
        const r = {
          status: 0,
          msg: 'success',
          data: `${arr[0]}${time}.${arr[1]}`
        }
        res.send(r)
      }
    )
  })

  form.parse(req, function (err, fields, files) {
    if (err) {
      res.locals.error = err
      // eslint-disable-next-line no-useless-return
      return
    }
  })
})

// 修改头像
app.post('/updateUserImage', (req, res, next) => {
  let {
    id,
    image
  } = req.body
  let q = `update user set image = '${image}' where id = '${id}'`
  query(q, (err, rows, fields) => {
    let result = {
      status: 0,
      msg: ''
    }
    if (err) {
      throw err
    }
    if (rows.affectedRows) {
      result.status = 1
      result.msg = 'success'
    }
    res.send(result)
  })
})

// 查询与自己有关的消息列表
app.post('/getMessageList', (req, res, next) => {
  let {
    username
  } = req.body
  let q = `select * from message where recipientName = '${username}'`
  query(q, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let r = {}
    r.status = 1
    r.msg = 'success'
    r.pageData = rows
    res.send(r)
  })
})

// 删除消息通知
app.post('/deleteMessage', (req, res, next) => {
  let {
    id
  } = req.body
  let q = `delete from message where id = '${id}'`
  query(q, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let r = {
      status: 1,
      msg: 'success'
    }
    res.send(r)
  })
})

// 查询所有用户
app.post('/getUserList', (req, res, next) => {
  let q = `select * from user`
  query(q, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let r = {}
    r.status = 1
    r.msg = 'success'
    r.pageData = rows
    res.send(r)
  })
})

// 查询指定用户名用户
app.post('/getUserListById', (req, res, next) => {
  let {
    userName
  } = req.body
  let q = `select * from user where username = '${userName}'`
  query(q, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let r = {}
    r.status = 1
    r.msg = 'success'
    r.pageData = rows
    res.send(r)
  })
})

// 修改用户信息
app.post('/updateUser', (req, res, next) => {
  let {
    id,
    username,
    type,
    skill,
    projectAddress,
    mail,
    tel
  } = req.body
  let q = `update user set username = '${username}',type = '${type}',skill = '${skill}',projectAddress = '${projectAddress}',mail = '${mail}',tel = '${tel}' where id = '${id}'`
  query(q, (err, rows, fields) => {
    let result = {
      status: 0,
      msg: ''
    }
    if (err) {
      throw err
    }
    if (rows.affectedRows) {
      result.status = 1
      result.msg = 'success'
    }
    res.send(result)
  })
})

// 修改用户认证状态
app.post('/updateUserStatus', (req, res, next) => {
  let {
    id,
    status
  } = req.body
  let q = `update user set status = '${status}' where id = '${id}'`
  query(q, (err, rows, fields) => {
    let result = {
      status: 0,
      msg: ''
    }
    if (err) {
      throw err
    }
    if (rows.affectedRows) {
      result.status = 1
      result.msg = 'success'
    }
    res.send(result)
  })
})

// 发送消息
app.post('/addMessage', (req, res, next) => {
  let {
    notifierName,
    notifierType,
    recipientName,
    recipientType,
    messageDetail
  } = req.body
  let now = new Date()
  let formatNum = function (num) {
    return (num + 100 + '').substring(1)
  }
  // eslint-disable-next-line camelcase
  let create_time = `${now.toLocaleDateString()} ${formatNum(
    now.getHours()
  )}:${formatNum(now.getMinutes())}:${formatNum(now.getSeconds())}`
  // eslint-disable-next-line camelcase
  let update_time = `${now.toLocaleDateString()} ${formatNum(
    now.getHours()
  )}:${formatNum(now.getMinutes())}:${formatNum(now.getSeconds())}`
  let q = `insert into message (notifierName,notifierType,recipientName,recipientType,messageDetail,create_time,update_time) values ('${notifierName}','${notifierType}','${recipientName}','${recipientType}','${messageDetail}','${create_time}','${update_time}')`
  query(q, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let result = {
      status: 1,
      msg: 'success'
    }
    res.send(result)
  })
})

// 查询所有项目
app.post('/getProjectList', (req, res, next) => {
  let q = `select * from project`
  query(q, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let r = {}
    r.status = 1
    r.msg = 'success'
    r.pageData = rows
    res.send(r)
  })
})

// 查询我的项目
app.post('/getMyProjectList', (req, res, next) => {
  let {
    username
  } = req.body
  let q = `select * from project where username = '${username}'`
  query(q, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let r = {}
    r.status = 1
    r.msg = 'success'
    r.pageData = rows
    res.send(r)
  })
})

// 添加收藏
app.post('/addStar', (req, res, next) => {
  let {
    starUser,
    projectId
  } = req.body
  let q = `insert into star (star_user,project_id) values ('${starUser}','${projectId}')`
  query(q, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let result = {
      status: 1,
      msg: 'success'
    }
    res.send(result)
  })
})

// 查询所有收藏项目
app.post('/getStarList', (req, res, next) => {
  let {
    starUser,
    projectId
  } = req.body
  let q = `select * from star where star_user = '${starUser}' and project_id = '${projectId}'`
  query(q, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let r = {}
    r.status = 1
    r.msg = 'success'
    r.pageData = rows
    res.send(r)
  })
})

// 删除收藏项目
app.post('/deleteStar', (req, res, next) => {
  let {
    id
  } = req.body
  let q = `delete from star where id = '${id}'`
  query(q, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let r = {
      status: 1,
      msg: 'success'
    }
    res.send(r)
  })
})
