<template>
  <div class="jobcard">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <el-container>
          <el-header class="card-header">
            <span class="companytitle">
              {{jobinfo.job.jobTitle}}
              <el-checkbox v-model="checked"></el-checkbox>
            </span>
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
            <el-rate v-model="value1" show-score text-color="#ff9900" score-template="{value}"></el-rate>
          </div>
          <div>{{jobinfo.company.companyField}} / {{jobinfo.company.companyFinancialStage}} / {{jobinfo.job.jobLocation}}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      value1: null,
      checked: false,
      colletioncount: 0
      /* jobName: 'Web前端开发工程师',
      companyName: '吉磊控股',
      salaryRange: '8k-15k',
      expRequest: '3-5年',
      eduRequest: '本科',
      jobFeature: '弹性工作，免费三餐，租房补贴，扁平管理，职业大牛，团队氛围好',
      field: '其他行业',
      financialStage: '未融资',
      cmplocation: '杭州滨江区' */
    };
  },
  props: {
    jobinfo: Object
  },
  methods: {
    collect() {
      this.$refs.btncollect.type = "primary";
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.companytitle {
  font-size: 16px !important;
  max-width: 180px;
  overflow: hidden;
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