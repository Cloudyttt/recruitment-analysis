<template>
  <div class="jobcard">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <el-container>
          <el-header class="card-header">
            <div class="companytitle">
              {{jobinfo.job.jobTitle }}
              <!-- 作为收藏按钮 -->
              <el-button
                v-if="condition"
                icon="el-icon-star-off"
                circle
                size="mini"
                @click="collect"
              ></el-button>
              <el-button
                v-if="!condition"
                type="warning"
                icon="el-icon-star-on"
                circle
                size="mini"
                @click="uncollect"
              ></el-button>
            </div>
            <span class="salarytitle">{{jobinfo.job.jobsalary}}</span>
            <!-- <div>收藏数: <strong class="collect">5</strong></div> -->
          </el-header>
          <el-main class="card-main">{{jobinfo.job.jobExp }} / {{ jobinfo.job.jobEdu}}</el-main>
          <el-footer class="card-footer">
            <!-- {{jobinfo.job.jobDetail}} -->
          </el-footer>
        </el-container>
      </div>
      <div class="text item camp">
        <div class="camp-campicon">
          <img
            src="https://img.bosszhipin.com/beijin/mcs/chatphoto/20181108/142246d21e8f604c4c48950159ee42a1cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_120,limit_0"
            height="40"
            width="40"
          >
        </div>
        <div class="camp-detail">
          <div class="camp-detail-name">
            {{jobinfo.company.companyTitle }}
            <!-- 评分 -->
            <!-- <el-rate v-model="value1" show-score text-color="#ff9900" score-template="{value}"></el-rate> -->
          </div>
          <div>{{jobinfo.company.companyField}} / {{jobinfo.company.companyFinancialStage}} / {{jobinfo.job.jobLocation}}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script type="text/ecmascript-6">
import { EventBus } from "../eventBus/EventBus.js";
import { error } from "util";
import { constants } from "crypto";
const axios = require("axios");
const cheerio = require("cheerio");
export default {
  data() {
    return {
      dataAvailable: false /* 是否有数据 */,
      condition: true /* 控制收藏按钮的显示与否 */,
      value1: null,
      colletioncount: 0,

      /* 岗位信息 */
      job: {
        jobTitle: "",
        jobSalary: "",
        jobExp: "",
        jobEdu: "",
        jobUrl: "",
        jobDetail: "",
        jobLocation: ""
      },

      /* 公司信息 */
      company: {
        companyTitle: "",
        companyField: "",
        companyFinancialStage: "",
        companyLocation: "",
        companySize: "",
        companyUrl: "",
        companyDetail: ""
      }
    };
  },
  props: {
    jobinfo: Object,
    telephone: String,
    status: Number
  },
  methods: {
    collect() {
      /* if(status === 1){ */
      console.log("telephone in jobcard:" + this.telephone);
      console.log("status in jobcard:" + this.status);
      this.condition = false;
      console.log("收藏");
      this.job.jobTitle = this.jobinfo.job.jobTitle;
      this.job.jobSalary = this.jobinfo.job.jobsalary;
      this.job.jobExp = this.jobinfo.job.jobExp;
      this.job.jobEdu = this.jobinfo.job.jobEdu;
      this.job.jobLocation = this.jobinfo.job.jobLocation;
      this.job.jobUrl = this.jobinfo.job.joburl;
      this.job.jobDetail = this.jobinfo.job.jobDetail;

      /* 公司信息 */
      this.company.companyTitle = this.jobinfo.company.companyTitle;
      this.company.companyField = this.jobinfo.company.companyField;
      this.company.companyFinancialStage = this.jobinfo.company.companyFinancialStage;
      this.company.companyLocation = this.jobinfo.company.jobLocation;
      this.company.companySize = this.jobinfo.company.companySize;
      this.company.companyUrl = this.jobinfo.company.companyUrl;
      this.company.companyDetail = this.jobinfo.company.companyDetail;

      /* 请求后端将收藏的岗位数据存入数据库 */
      axios
        .get("http://localhost:3000/collect", {
          params: {
            telephone: this.telephone,
            job: this.job,
            company: this.company
          }
        })
        .then(res => {
          console.log("后端传回数据成功:");
          console.log(res.data);
        })
        .catch(function(error) {
          console.log(error);
        });
      /* } */
    },
    uncollect() {
      this.condition = true
      var jobTitle = this.jobinfo.job.jobTitle;
      var companyTitle = this.jobinfo.company.companyTitle;
      /* 请求后端将收藏的岗位数据存入数据库 */
      axios
        .get("http://localhost:3000/uncollect", {
          params: {
            jobTitle: jobTitle,
            companyTitle: companyTitle
          }
        })
        .then(res => {
          console.log("后端传回数据成功:");
          console.log(res.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    EventBus.$on("searchingresult", ({ dataAvailable, datarefresh }) => {
      /* console.log(datarefresh); */
      if (datarefresh) {
        this.dataAvailable = dataAvailable;
        this.condition = true;
      }
    });
    /* EventBus.$on("loginsucceed", ({ username, telephone, status}) => {
      this.telephone = telephone
      this.status = status
      console.log('status in jobcard: ' + status)
    });
    EventBus.$on("loginoutsucceed", ({ username, telephone, status}) => {
      this.telephone = telephone
      this.status = status
      console.log('status in jobcard: ' + status)
    }); */
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.companytitle {
  font-size: 16px !important;
  max-width: 180px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
}

.salarytitle {
  color: red;
}

.card-header {
  height: 30px !important;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  padding: 0 !important;
}

.card-main {
  margin: 0 !important;
  padding: 0 !important;
  height: 30px !important;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #777;
}

.card-footer {
  margin: 0 !important;
  padding: 0 20px !important;
  height: 30px !important;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #777;
  overflow: hidden;
}

.camp {
  margin: 0 !important;
  padding: 0 !important;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  color: #777;

  .camp-detail {
    font-size: 14px;
    display: flex;
    padding-left: 20px;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;

    camp-detail-name {
      margin-bottom: 5px;
      color: #555;
    }
  }
}

.text {
  font-size: 10px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before, .clearfix:after {
  display: table;
  content: '';
}

.el-card__header {
  margin: 0;
  padding: 0;
}

.clearfix:after {
  clear: both;
}

.box-card {
  float: left;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  width: 389px;
  height: 200px;
  margin: 16px 16px 0 0;
  padding: 20px 18px 0;
  border: 1px solid #EAEEED;
  background-color: #fff;

  el-header {
    padding: 0 !important;
  }
}

.camp-detail-name {
  color: #303133;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.el-card__body {
  padding: 20px 0;
}
</style>