/* eslint-disable no-new-wrappers */
/* eslint-disable space-before-blocks */
/* eslint-disable keyword-spacing */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-useless-return */
/* eslint-disable no-array-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-new-object */
const mysql = require('mysql')
const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')

function querySql (sql) {
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
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

/* GET home page. */
/* Boss直聘网络爬虫 */
router.get('/', async function(req, res, next) {
  console.log(req.query.spiderUrl)
  var jobsArray = new Array()
  var spiderUrl = encodeURI(req.query.spiderUrl)
  console.log('前端请求爬取的网址: ' + spiderUrl)
  const urlHear = 'https://www.zhipin.com'
  await axios({ method: 'get', url: spiderUrl })
    .then(function(res) {
      const $ = cheerio.load(res.data)
      $('.job-list ul .job-primary').each((index, el) => {
        // 岗位信息
        var job = new Object()
        var company = new Object()
        var jobs = new Object()
        let jobtitle = $(el).find('.job-title').text()
        let jobsalary = $(el).find('.red').text()
        let joburl = $(el).find('a').attr('href')
        let jobDetail = $(el).find('.info-primary').find('p').text()
        let companytitle = $(el).find('.info-company').find('h3').text()
        let jobpublishtime = $(el).find('.info-publis').find('p').text()
        let companyUrl = $(el).find('.info-company').find('h3').find('a').attr('href')
        let companyDetail = $(el).find('.company-text').find('p').text()
        if (jobDetail.includes('1年以内')) {
          job.jobLocation = jobDetail.split('1年以内')[0]
          job.jobExp = '1年以内'
          job.jobEdu = jobDetail.split('1年以内')[1]
        } else if (jobDetail.includes('1-3年')) {
          job.jobLocation = jobDetail.split('1-3年')[0]
          job.jobExp = '1-3年'
          job.jobEdu = jobDetail.split('1-3年')[1]
        } else if (jobDetail.includes('3-5年')) {
          job.jobLocation = jobDetail.split('3-5年')[0]
          job.jobExp = '3-5年'
          job.jobEdu = jobDetail.split('3-5年')[1]
        } else if (jobDetail.includes('5-10年')) {
          job.jobLocation = jobDetail.split('5-10年')[0]
          job.jobExp = '5-10年'
          job.jobEdu = jobDetail.split('5-10年')[1]
        } else if (jobDetail.includes('10年以上')) {
          job.jobLocation = jobDetail.split('10年以上')[0]
          job.jobExp = '10年以上'
          job.jobEdu = jobDetail.split('10年以上')[1]
        } else if (jobDetail.includes('不限')) {
          job.jobLocation = jobDetail.split('不限')[0]
          job.jobExp = '经验不限'
          job.jobEdu = jobDetail.split('不限')[1]
        } else if (jobDetail.includes('经验不限')) {
          job.jobLocation = jobDetail.split('经验不限')[0]
          job.jobExp = '经验不限'
          job.jobEdu = jobDetail.split('经验不限')[1]
        } else if (jobDetail.includes('应届生')) {
          job.jobLocation = jobDetail.split('应届生')[0]
          job.jobExp = '应届生'
          job.jobEdu = jobDetail.split('应届生')[1]
        }
        job.jobTitle = jobtitle
        job.jobsalary = jobsalary
        job.joburl = urlHear.concat(joburl)
        job.jobDetail = jobDetail
        job.companyTitle = companytitle
        job.jobPublishTime = jobpublishtime
        // 公司信息
        if (companyDetail.includes('未融资')) {
          company.companyField = companyDetail.split('未融资')[0]
          company.companyFinancialStage = '未融资'
          company.companySize = companyDetail.split('未融资')[1]
        } else if (companyDetail.includes('不需要融资')) {
          company.companyField = companyDetail.split('不需要融资')[0]
          company.companyFinancialStage = '不需要融资'
          company.companySize = companyDetail.split('不需要融资')[1]
        } else if (companyDetail.includes('天使轮')) {
          company.companyField = companyDetail.split('天使轮')[0]
          company.companyFinancialStage = '天使轮'
          company.companySize = companyDetail.split('天使轮')[1]
        } else if (companyDetail.includes('A轮')) {
          company.companyField = companyDetail.split('A轮')[0]
          company.companyFinancialStage = 'A轮'
          company.companySize = companyDetail.split('A轮')[1]
        } else if (companyDetail.includes('B轮')) {
          company.companyField = companyDetail.split('B轮')[0]
          company.companyFinancialStage = 'B轮'
          company.companySize = companyDetail.split('B轮')[1]
        } else if (companyDetail.includes('C轮')) {
          company.companyField = companyDetail.split('C轮')[0]
          company.companyFinancialStage = 'C轮'
          company.companySize = companyDetail.split('C轮')[1]
        } else if (companyDetail.includes('D轮及以上')) {
          company.companyField = companyDetail.split('D轮及以上')[0]
          company.companyFinancialStage = 'D轮及以上'
          company.companySize = companyDetail.split('D轮及以上')[1]
        } else if (companyDetail.includes('已上市')) {
          company.companyField = companyDetail.split('已上市')[0]
          company.companyFinancialStage = '已上市'
          company.companySize = companyDetail.split('已上市')[1]
        }
        company.companyTitle = companytitle
        company.companyUrl = urlHear.concat(companyUrl)
        company.companyDetail = companyDetail
        console.log('公司图标', company.companyUrl)
        // 爬取公司图标
        /* axios({ method: 'get', url: company.companyUrl })
          .then(function(res) {
            const $ = cheerio.load(res.data)
            $('.company-banner .info-primary img').each((index, el) => {
              if(index === 0){
                let companyiconUrl = $(el).attr('src')
                company.companyiconUrl = companyiconUrl
                console.log('公司图标资源定位src：' + companyiconUrl)
              }
            })
          })
          .catch(function (error) {
            console.log(error)
          })
        console.log('999:') */
        
        /* console.log('发布时间： ' + job.jobPublishTime) */
        /* console.log('index: ' + index)
        console.log('工作名称: ' + job.jobTitle)
        console.log('薪资: ' + job.jobsalary)
        console.log('工作详情: ' + job.joburl)
        console.log('工作地点: ' + job.jobLocation)
        console.log('经验要求: ' + job.jobExp)
        console.log('学历要求: ' + job.jobEdu)

        console.log('公司名称: ' + company.companyTitle)
        console.log('公司详情: ' + company.companyUrl)
        console.log('公司领域: ' + company.companyField)
        console.log('融资阶段: ' + company.companyFinancialStage)
        console.log('公司规模: ' + company.companySize) */
        jobs.job = job
        jobs.company = company
        console.log(index + ':' + jobs.job.jobTitle)
        jobsArray[index] = jobs
        /* jobsArray.push(jobs) */
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  res.json({
    jobsArray: jobsArray
  })
})

/* 收藏模块数据库操作 */
router.get('/collect', async function(req, res, next) {
  console.log('前端请求插入收藏表')
  var telephone
  let job = JSON.parse(req.query.job)
  let company = JSON.parse(req.query.company)
  /* 岗位 */
  let jobTitle = job.jobTitle
  let jobSalary = job.jobSalary
  let jobExp = job.jobExp
  let jobEdu = job.jobEdu
  let jobUrl = job.jobUrl
  let jobDetail = job.jobDetail
  var companyId
  var jobId
  /* 公司 */
  let companyTitle = company.companyTitle
  let companyField = company.companyField
  let companyFinancingStage = company.companyFinancialStage
  let companyLocation = job.jobLocation
  let companySize = company.companySize
  let companyUrl = company.companyUrl
  let companyDetail = company.companyDetail
  
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

  // 插入数据库
  // 第一步：查询数据库中是否已经存在该公司数据
  /* 公司 */
  let q1 = `select * from company where companytitle = '${companyTitle}'`
  let q2 = `insert into company (companytitle, location, field, financingstage, companyurl, size, compnydetail) values ('${companyTitle}','${companyLocation}','${companyField}','${companyFinancingStage}','${companyUrl}','${companySize}','${companyDetail}')`
  var sql1 = q1
  var sql2 = q2
  console.log('sql查询语句（公司数据查询语句）：' + sql1)
  console.log('sql查询语句（公司数据插入语句）：' + sql2)
  connection.query(sql1, function (err, result) {
    if (err) { // 查询失败
      console.log('[SELECT ERROR]---:', err.message)
      return
    } else {
      if (result.length === 1) { // 该公司数据已存在
        console.log('公司数据已存在，不需要再次插入')
        /* console.log(result) */
        console.log(result[0])
        companyId = result[0].companyid
        console.log(companyId)
        // 第三步：查询数据库中是否已经存在该岗位数据
        /* 岗位 */
        console.log('companyId:' + companyId)
        let q3 = `select * from job where jobtitle = '${jobTitle}' and companytitle = '${companyTitle}'`
        let q4 = `insert into job (jobtitle, companyid, companytitle, salary, edu, exp, joburl, jobdetail) values ('${jobTitle}','${companyId}','${companyTitle}','${jobSalary}','${jobEdu}','${jobExp}','${jobUrl}','${jobDetail}')`
        var sql3 = q3
        var sql4 = q4
        console.log('sql查询语句（岗位数据查询语句）：' + sql3)
        console.log('sql查询语句（岗位数据插入语句）：' + sql4)
        connection.query(sql3, function (err, result) {
          if (err) { // 查询失败
            console.log('Select fail!')
            console.log('[SELECT ERROR]---:', err.message)
            return
          } else {
            if (result.length === 1) {
              console.log('岗位数据已存在，不需要再次插入')
              console.log(result[0].jobid)
              jobId = result[0].jobid
              /* ------------------------------------------------------ */
              // 第五步：插入收藏表
              var sql5 = `select telephone from user where status = 1`
              console.log('准备插入收藏表前查询当前登录用户：' + sql5)
              connection.query(sql5, function (err, result) {
                if (err) { // 查询失败
                  console.log('Select fail!')
                  console.log('[SELECT ERROR]---:', err.message)
                  return
                } else { 
                  if (result.length === 1) {
                    telephone = result[0].telephone
                    console.log(result) 
                    var sql6 = `select * from collection where telephone = '${telephone}' and  jobid = '${jobId}'`
                    console.log('准备插入收藏表前查询是否已经存在该条记录：' + sql6)
                    var sql7 = `insert into collection (jobid, companyid, telephone) values ('${jobId}','${companyId}','${telephone}')`
                    console.log('sql查询语句（收藏表插入语句）：' + sql7)
                    connection.query(sql6, function (err, result) {
                      if (err) { // 查询失败
                        console.log('Select fail!')
                        console.log('[INSERT ERROR]---:', err.message)
                        return
                      } else {
                        if (result.length === 0) {
                          connection.query(sql7, function (err, result) {
                            if (err) { // 查询失败
                              console.log('Select fail!')
                              console.log('[INSERT ERROR]---:', err.message)
                              return
                            } else {
                              if (result.length === 1) {
                                console.log('收藏表插入成功')
                              }
                            }
                          })
                        }
                      }
                    })
                  } else if (result.length === 0) {
                    console.log('没有用户登录')
                  }
                }
              })
              /* ------------------------------------------------------ */
            } else if (result.length === 0) {
              // 第四步：向数据库插入岗位数据
              connection.query(sql4, function (err, result) {
                if (err) { // 插入失败
                  console.log('Insert fail!')
                  console.log('[INSERT ERROR]---:', err.message)
                  return
                } else {
                  console.log('岗位数据插入成功！')
                  console.log(result.insertId)
                  jobId = result.insertId
                  /* ------------------------------------------------------ */
                  // 第五步：插入收藏表
                  var sql5 = `select telephone from user where status = 1`
                  console.log('sql查询语句（当前登录用户）：' + sql5)
                  connection.query(sql5, function (err, result) {
                    if (err) { // 查询失败
                      console.log('Select fail!')
                      console.log('[SELECT ERROR]---:', err.message)
                      return
                    } else { 
                      if (result.length === 1) {
                        telephone = result[0].telephone
                        console.log(result) 
                        var sql6 = `select * from collection where telephone = '${telephone}' and  jobid = '${jobId}'`
                        console.log('sql查询语句（收藏表查询语句）：' + sql6)
                        var sql7 = `insert into collection (jobid, companyid, telephone) values ('${jobId}','${companyId}','${telephone}')`
                        console.log('sql查询语句（收藏表插入语句）：' + sql7)
                        connection.query(sql6, function (err, result) {
                          if (err) { // 查询失败
                            console.log('Select fail!')
                            console.log('[INSERT ERROR]---:', err.message)
                            return
                          } else {
                            if (result.length === 0) {
                              connection.query(sql7, function (err, result) {
                                if (err) { // 查询失败
                                  console.log('Select fail!')
                                  console.log('[INSERT ERROR]---:', err.message)
                                  return
                                } else {
                                  if (result.length === 1) {
                                    console.log('收藏表插入成功')
                                  }
                                }
                              })
                            }
                          }
                        })
                      } else if (result.length === 0) {
                        console.log('没有用户登录')
                      }
                    }
                  })
                  /* ------------------------------------------------------ */
                }
              })
            }
          }
        })
      } else if (result.length === 0) {
        // 第二步：向数据库插入公司数据
        connection.query(sql2, function (err, result) {
          if (err) { // 插入失败
            console.log('Insert fail!')
            console.log('[INSERT ERROR]---:', err.message)
            return
          } else { 
            console.log('公司数据插入成功!')
            companyId = result.insertId
            console.log(result.insertId)
            console.log(companyId)
            // 第三步：查询数据库中是否已经存在该岗位数据
            /* 岗位 */
            console.log('companyId:' + companyId)
            let q3 = `select * from job where jobtitle = '${jobTitle}' and companytitle = '${companyTitle}'`
            let q4 = `insert into job (jobtitle, companyid, companytitle, salary, edu, exp, joburl, jobdetail) values ('${jobTitle}','${companyId}','${companyTitle}','${jobSalary}','${jobEdu}','${jobExp}','${jobUrl}','${jobDetail}')`
            var sql3 = q3
            var sql4 = q4
            console.log('sql查询语句（岗位数据查询语句）：' + sql3)
            console.log('sql查询语句（岗位数据插入语句）：' + sql4)
            connection.query(sql3, function (err, result) {
              if (err) { // 查询失败
                console.log('Select fail!')
                console.log('[SELECT ERROR]---:', err.message)
                return
              } else {
                if (result.length === 1) {
                  console.log('岗位数据已存在，不需要再次插入')
                  console.log(result[0].jobid)
                  jobId = result.insertId
                  /* ------------------------------------------------------ */
                  // 第五步：插入收藏表
                  var sql5 = `select telephone from user where status = 1`
                  console.log('sql查询语句（当前登录用户）：' + sql5)
                  connection.query(sql5, function (err, result) {
                    if (err) { // 查询失败
                      console.log('Select fail!')
                      console.log('[SELECT ERROR]---:', err.message)
                      return
                    } else { 
                      if (result.length === 1) {
                        telephone = result[0].telephone
                        console.log(result) 
                        var sql6 = `select * from collection where telephone = '${telephone}' and  jobid = '${jobId}'`
                        console.log('sql查询语句（收藏表查询语句）：' + sql6)
                        var sql7 = `insert into collection (jobid, companyid, telephone) values ('${jobId}','${companyId}','${telephone}')`
                        console.log('sql查询语句（收藏表插入语句）：' + sql7)
                        connection.query(sql6, function (err, result) {
                          if (err) { // 查询失败
                            console.log('Select fail!')
                            console.log('[INSERT ERROR]---:', err.message)
                            return
                          } else {
                            if (result.length === 0) {
                              connection.query(sql7, function (err, result) {
                                if (err) { // 查询失败
                                  console.log('Select fail!')
                                  console.log('[INSERT ERROR]---:', err.message)
                                  return
                                } else {
                                  if (result.length === 1) {
                                    console.log('收藏表插入成功')
                                  }
                                }
                              })
                            }
                          }
                        })
                      } else if (result.length === 0) {
                        console.log('没有用户登录')
                      }
                    }
                  })
                  /* ------------------------------------------------------ */
                } else if (result.length === 0) {
                  // 第四步：向数据库插入岗位数据
                  connection.query(sql4, function (err, result) {
                    if (err) { // 插入失败
                      console.log('Insert fail!')
                      console.log('[INSERT ERROR]---:', err.message)
                      return
                    } else {
                      console.log('岗位数据插入成功！')
                      console.log(result.insertId)
                      jobId = result.insertId
                      /* ------------------------------------------------------ */
                      // 第五步：插入收藏表
                      var sql5 = `select telephone from user where status = 1`
                      console.log('sql查询语句（当前登录用户）：' + sql5)
                      connection.query(sql5, function (err, result) {
                        if (err) { // 查询失败
                          console.log('Select fail!')
                          console.log('[SELECT ERROR]---:', err.message)
                          return
                        } else { 
                          if (result.length === 1) {
                            telephone = result[0].telephone
                            console.log(result) 
                            var sql6 = `select * from collection where telephone = '${telephone}' and  jobid = '${jobId}'`
                            console.log('sql查询语句（收藏表查询语句）：' + sql6)
                            var sql7 = `insert into collection (jobid, companyid, telephone) values ('${jobId}','${companyId}','${telephone}')`
                            console.log('sql查询语句（收藏表插入语句）：' + sql7)
                            connection.query(sql6, function (err, result) {
                              if (err) { // 查询失败
                                console.log('Select fail!')
                                console.log('[INSERT ERROR]---:', err.message)
                                return
                              } else {
                                if (result.length === 0) {
                                  connection.query(sql7, function (err, result) {
                                    if (err) { // 查询失败
                                      console.log('Select fail!')
                                      console.log('[INSERT ERROR]---:', err.message)
                                      return
                                    } else {
                                      if (result.length === 1) {
                                        console.log('收藏表插入成功')
                                      }
                                    }
                                  })
                                }
                              }
                            })
                          } else if (result.length === 0) {
                            console.log('没有用户登录')
                          }
                        }
                      })
                      /* ------------------------------------------------------ */
                    }
                  })
                }            
              }
            })
          }
        })
      }
    }
  })
  res.send('collect succeed!')
})
/* 取消收藏模块数据库操作 */
router.get('/uncollect', async function(req, res, next) {
  console.log('前端请求取消收藏表')
  var telephone
  let jobTitle = req.query.jobTitle
  let companyTitle = req.query.companyTitle
  console.log('jobTitle: ' + jobTitle)
  /* ---------------------------------数据库连接----------------------------------- */
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
  /* ---------------------------------数据库连接----------------------------------- */

  var sql0 = `select jobid, companyid from job where jobtitle = '${jobTitle}' and companytitle = '${companyTitle}'`
  console.log('sql0:' + sql0)
  connection.query(sql0, function (err, result) {
    if (err) { // 查询失败
      console.log('Select fail!')
      console.log('[SELECT ERROR]---:', err.message)
      return
    } else {
      console.log('')
      console.log(result)
      let jobId = result[0].jobid
      let companyId = result[0].companyid
      var sql = `select telephone from user where status = 1`
      console.log('sql查询语句（当前登录用户）：' + sql)
      connection.query(sql, function (err, result) {
        if (err) { // 查询失败
          console.log('Select fail!')
          console.log('[SELECT ERROR]---:', err.message)
          return
        } else { 
          if (result.length === 1) {
            telephone = result[0].telephone
            console.log(result)
            var sql2 = `DELETE FROM collection where telephone = '${telephone}' and jobid = '${jobId}' and companyid = '${companyId}'`
            console.log('sql删除语句：' + sql2)
            connection.query(sql2, function (err, result) {
              if (err) { // 查询失败
                console.log('Select fail!')
                console.log('[SELECT ERROR]---:', err.message)
                return
              } else {
                console.log(result)
                res.send('uncollectsucceed')
              }
            })
          }
        }
      })
    }
  })
})
/* 查询收藏模块数据库操作 */
router.get('/query', async function(req, res, next) {
  console.log('前端请求取消收藏表')
  var telephone
  var job = new Object()
  var company = new Object()
  var jobs = new Object()
  var jobsArray = new Array()
  var count = new Number()
  var count2 = new Number()
  /* ---------------------------------数据库连接----------------------------------- */
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
  /* ---------------------------------数据库连接----------------------------------- */
  var sql = `select telephone from user where status = 1`
      connection.query(sql, async function (err, result) {
        if (err) { // 查询失败
          console.log('Select fail!')
          console.log('[SELECT ERROR]---:', err.message)
          return
        } else { 
          if (result.length === 1) {
            telephone = result[0].telephone
            let sql = `select *
            from collection
            left join job on job.jobid=collection.jobid
            left join company on job.companyid=company.companyid
            where telephone=${telephone}`
            let collections = await querySql(sql)
            for (let i = 0, l = collections.length; i < l; i++) {
              let c = collections[i]
              let jobId = c.jobid
              sql = `select count(*) as count from collection where jobid=${parseInt(jobId)}`
              let count = await querySql(sql)
              c.count = count[0].count
            }
            res.json({ data: collections })
          }
        }
      })
})
module.exports = router
