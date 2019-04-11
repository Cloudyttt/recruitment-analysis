<template>
  <div class="jobcard">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <el-container>
          <el-header class="card-header">
            <span class="companytitle">{{jobName}} <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="open2"></el-button></span>
            <span class="salarytitle">{{salaryRange}}</span>
            <div>收藏数: <strong class="collect">34</strong></div>
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
        <div class="camp-campicon"><img src="https://img.bosszhipin.com/beijin/mcs/chatphoto/20170808/8a08ab6a8ceec3b1b3362815c59d4249c110f7482f96b29925f2a79edd8d271b.jpg?x-oss-process=image/resize,w_120,limit_0" height="40" width="40"></div>
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
      jobName: 'PHP程序员',
      companyName: '游侠科技',
      salaryRange: '5k-10k',
      expRequest: '1-3年',
      eduRequest: '本科',
      jobFeature: '在业界以及游戏爱好者群体中影响深远，在国内单机游戏网站中屈指可数',
      field: '游戏',
      financialStage: '未融资',
      cmplocation: '杭州市 拱墅区'
		}
  },
  methods: {
      open2() {
        this.$confirm('将从收藏夹中删除该岗位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
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