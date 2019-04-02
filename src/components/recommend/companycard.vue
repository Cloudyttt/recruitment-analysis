<template>
  <div class="jobcard">
    <el-card class="company-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 2" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
	data(){
		return{
		}
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before, .clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.company-card {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    float: left;
    width: 288px;
    height: 270px;
    margin-top: 16px;
    margin-right: 16px;
    border: 1px solid #EEE;
}
</style>