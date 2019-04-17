<template>
  <div class="jobcard">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <el-container>
          <el-header class="card-header">
            <div class="companytitle">
              {{jobinfo.jobtitle }}
              <!-- 作为收藏按钮 -->
              &nbsp;
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
            <span class="salarytitle">{{jobinfo.salary}}</span>
          </el-header>
          <el-main class="card-main">{{jobinfo.exp }} / {{ jobinfo.edu}}</el-main>
          <el-footer class="card-footer"><!-- 收藏数 -->
            <span class="salarytitle"><strong>收藏数：{{jobinfo.count}}</strong></span>
            <a :href="jobinfo.joburl">查看详情</a>
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
            {{jobinfo.companytitle }}
            <!-- 评分 -->
            <!-- <el-rate v-model="value1" show-score text-color="#ff9900" score-template="{value}"></el-rate> -->
          </div>
          <div>{{jobinfo.field}} / {{jobinfo.financingstage}} / {{jobinfo.location}}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script type="text/ecmascript-6">
import { EventBus } from "../eventBus/EventBus.js";
import { error } from "util";
import { constants } from 'crypto';
const axios = require('axios')
const cheerio = require('cheerio')
export default {
  data() {
    return {
      conditionTotle:false,
      dataAvailable: false /* 是否有数据 */,
      condition: false /* 控制收藏按钮的显示与否 */,
      value1: null,
      colletioncount: 0,
      
      /* 岗位信息 */
      job: {
        jobTitle: "123",
        jobSalary: "123",
        jobExp: "123",
        jobEdu: "123",
        jobUrl: "123",
        jobDetail: "123",
        jobLocation: "123"
      },

      /* 公司信息 */
      company: {
        companyTitle: "123",
        companyField: "123",
        companyFinancialStage: "123",
        companyLocation: "123",
        companySize: "123",
        companyUrl: "123",
        companyDetail: "123"
      }
    };
  },
  props: {
    jobinfo: Object,
    /* telephone: String,
    status: Number */
  },
  methods: {
    collect() {
      this.condition = false;
    },
    uncollect() {
      var jobTitle = this.jobinfo.jobtitle;
      var companyTitle = this.jobinfo.companytitle;
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
          EventBus.$emit("refreshcollection", {
              refresh: true
            });
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
    EventBus.$on("loginsucceed", ({ username, telephone, status}) => {
      this.telephone = telephone
      this.status = status
      console.log('status in jobcard: ' + status)
    });
    EventBus.$on("loginoutsucceed", ({ username, telephone, status}) => {
      this.telephone = telephone
      this.status = status
      console.log('status in jobcard: ' + status)
    });
  },
  created(){
    /* console.log('666:')
    console.log(this.jobinfo) */
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
  font-size 14px
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
  padding: 0 0 !important;
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