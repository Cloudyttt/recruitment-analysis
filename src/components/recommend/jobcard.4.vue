<template>
  <div class="jobcard">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <el-container>
          <el-header class="card-header">
            <span class="companytitle">{{jobName}} <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button></span>
            <span class="salarytitle">{{salaryRange}}</span>
            <div>收藏数: <strong class="collect">14</strong></div>
          </el-header>
          <el-main class="card-main">
            {{expRequest }} / {{ eduRequest}}
          </el-main>
          <el-footer class="card-footer">
            {{jobFeature}}
          </el-footer>
        </el-container>
      </div>
      <div class="text item camp">
        <div class="camp-campicon"><img src="https://img.bosszhipin.com/beijin/logo/24e256703824374872e43f68de4ef1b3be1bd4a3bd2a63f070bdbdada9aad826.jpg?x-oss-process=image/resize,w_120,limit_0" height="40" width="40"></div>
        <div class="camp-detail">
          <div class="camp-detail-name">{{companyName}}</div>
          <div>{{field}} / {{financialStage}} / {{cmplocation}}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
	data(){
		return{
      jobName: 'java工程师',
      companyName: '安恒信息',
      salaryRange: '7k-15k',
      expRequest: '不限',
      eduRequest: '本科',
      jobFeature: '负责安全服务项目实施工作，安全服务项目包含渗透测试、安全咨询、代码审计、应急响应等',
      field: '信息安全',
      financialStage: 'D轮及以上',
      cmplocation: '浙江 杭州'
		}
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.collect{
  color red
}
.companytitle{
  font-size 16px!important
}
.salarytitle{
  color red
}
.card-header{
  height 30px!important
  line-height 30px
  display flex
  justify-content space-between
}
.card-main{
  margin 0!important
  padding 0 20px!important
  height 30px!important
  line-height 30px
  display flex
  justify-content space-between 
  font-size 14px
  color #777
}
.card-footer{
  margin 0!important
  padding 0 20px!important
  height 30px!important
  line-height 30px
  display flex
  justify-content space-between 
  font-size 14px
  color #777
  overflow hidden
}
.camp{
  margin 0!important
  padding 0!important
  display flex
  justify-content flex-start
  font-size 14px
  color #777
  .camp-detail{
    font-size 14px
    display flex
    padding-left 20px
    align-items flex-start
    justify-content space-between 
    flex-direction column
    camp-detail-name{
      margin-bottom 5px
      color #555
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
.el-card__header{
  margin 0
  padding 0
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
}
</style>