<template>
  <div class="login">
    <el-container>
        <el-header>
          <h1>用户登录</h1>
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="24">
							<div class="grid-content bg-purple-dark">
								<h4>手机</h4>
								<el-input v-model="input" placeholder="请输入手机号"></el-input>
							</div>
						</el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
							<div class="grid-content bg-purple-dark">
								<h4>密码</h4>
								<el-input v-model="input" placeholder="请输入登录密码"></el-input>
							</div>
						</el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
							<div class="grid-content bg-purple-dark">
								 <el-button type="primary">登录</el-button>
							</div>
						</el-col>
          </el-row>
          <el-row class="login-others">
            <el-col :span="6" :offset="12">
							<div class="grid-content bg-purple-dark">
								 <el-tag type="info" size="mini">没有账号？</el-tag>
							</div>
						</el-col>
<!-- 						<el-col :span="6">
							<div class="grid-content bg-purple-dark">
								 <el-tag type="warning" size="mini">忘记密码？</el-tag>
							</div>
						</el-col> -->
          </el-row>
        </el-main>
        <el-footer>

        </el-footer>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
	data(){
		return{
			input: ''
		}
	}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
h1, h2, h3, h4, h5, h6 {
	margin: 0;
	padding: 0;
}
.el-main{
	display flex
	flex-direction column
	align-items center
}
.el-row {
	display flex
	width 30%
	min-width 300px;
	align-content center
	margin-bottom: 10px;

	&:last-child {
		margin-bottom: 0;
	}
}

.el-col {
	border-radius: 4px;
	h4{
		display flex;
		justify-content flex-start
		color #999999
		margin-bottom 5px
	}
	.el-button{
		margin-top 20px
		width 100%
	}
}

// .login-others{
// 	.el-col {
// 		display flex;
// 		float right
// 	}
// }
// .bg-purple-dark {
// 	background: #99a9bf;
// }

// .bg-purple {
// 	background: #d3dce6;
// }

// .bg-purple-light {
// 	background: #e5e9f2;
// }

// .grid-content {
// 	border-radius: 4px;
// 	min-height: 36px;
// }

// .row-bg {
// 	padding: 10px 0;
// 	background-color: #f9fafc;
// }
</style>