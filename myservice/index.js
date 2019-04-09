const axios = require('axios')
const cheerio = require('cheerio')
/* import axios from 'axios'
import cheerio from 'cheerio' */
const urlHear = 'https://www.zhipin.com'
axios.get('https://www.zhipin.com/c101210100/?query=web&ka=sel-scale-0')
  .then(res => {
    const $ = cheerio.load(res.data)
    $('.job-list ul .job-primary').each((index, el) => {
      if (index === 10) {
        // eslint-disable-next-line no-new-object
        const job = new Object()
        // eslint-disable-next-line no-new-object
        const company = new Object()
        // 岗位信息
        const jobtitle = $(el).find('.job-title').text()
        const jobsalary = $(el).find('.red').text()
        const joburl = $(el).find('a').attr('href')
        const jobDetail = $(el).find('.info-primary').find('p').text()
        /* const jobLocation = ''
        const jobExp = ''
        const jobEdu = '' */
        // 公司信息
        const companytitle = $(el).find('.info-company').find('h3').text()
        const companyUrl = $(el).find('h3').find('a').attr('href')
        const companyDetail = $(el).find('.company-text').find('p').text()
        /* const companyField = ''
        const companyFinancialStage = ''
        cosnt companySize = '' */
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
        /* job.location = location.substring(location.indexOf(' ') + 1, location.indexOf(' ', location.indexOf(' ') + 1)) */
        /* job.workingExp = location.match(/([^\d]*)(\d*-\d*)年(.*)/)[2]
        job.eduBg = location.match(/([^\d]*)(\d*-\d*)年(.*)/)[3] */
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

        console.log(job.jobTitle)
        console.log(job.jobsalary)
        console.log(job.joburl)
        /* console.log(job.jobDetail) */
        console.log(job.jobLocation)
        console.log(job.jobExp)
        console.log(job.jobEdu)

        console.log(company.companyTitle)
        console.log(company.companyUrl)
        /* console.log(company.companyDetail) */
        console.log(company.companyField)
        console.log(company.companyFinancialStage)
        console.log(company.companySize)
      }
    })
  })
