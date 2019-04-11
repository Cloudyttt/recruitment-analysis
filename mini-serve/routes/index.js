/* eslint-disable no-array-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-new-object */
var express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
var router = express.Router()

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log(req.query.spiderUrl)
  var jobsArray = new Array()
  var jobsArray2 = new Array()
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
        let companyUrl = $(el).find('h3').find('a').attr('href')
        let companyDetail = $(el).find('.company-text').find('p').text()
        if (jobDetail.includes('1-3年')) {
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
          job.jobExp = '不限'
          job.jobEdu = jobDetail.split('10年以上')[1]
        }
        job.jobTitle = jobtitle
        job.jobsalary = jobsalary
        job.joburl = urlHear.concat(joburl)
        job.jobDetail = jobDetail
        job.companyTitle = companytitle
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
        } else if (companyDetail.includes('D论及以上')) {
          company.companyField = companyDetail.split('D论及以上')[0]
          company.companyFinancialStage = 'D论及以上'
          company.companySize = companyDetail.split('D论及以上')[1]
        } else if (companyDetail.includes('已上市')) {
          company.companyField = companyDetail.split('已上市')[0]
          company.companyFinancialStage = '已上市'
          company.companySize = companyDetail.split('已上市')[1]
        }
        company.companyTitle = companytitle
        company.companyUrl = urlHear.concat(companyUrl)
        company.companyDetail = companyDetail
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

module.exports = router
