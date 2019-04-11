<template>
  <div class="jobcard">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <el-container>
          <el-header class="card-header">
            <span class="companytitle">{{jobName}} <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button></span>
            <span class="salarytitle">{{salaryRange}}</span>
            <div>收藏数: <strong class="collect">3</strong></div>
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
        <div class="camp-campicon"><img src="https://img.bosszhipin.com/beijin/mcs/chatphoto/d96a109d1dde9b69e8994669ed3b714f-be57f160099fa6f403d43cPnUAcH.jpeg?x-oss-process=image/resize,w_120,limit_0" height="40" width="40"></div>
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
      jobName: 'C语音试工程师',
      companyName: '中软国际',
      salaryRange: '10k-25k',
      expRequest: '5年以上',
      eduRequest: '本科',
      jobFeature: '美女如云 领导nice 扁平管理 互联网金融 公司氛围好',
      field: '互联网金融',
      financialStage: '不需要融资上',
      cmplocation: '浙江 杭州'
		}
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
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