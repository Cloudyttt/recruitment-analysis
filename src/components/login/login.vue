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
              <el-button type="primary" @click="userLogin">登录</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row class="login-others">
          <el-col :span="6" :offset="18">
            <div class="grid-content bg-purple-dark noaccount">
              <el-tag type="info" size="mini">
                <router-link to="/register">没有账号？</router-link>
              </el-tag>
            </div>
          </el-col>
<!--           <el-col :span="6">
							<div class="grid-content bg-purple-dark">
								 <el-tag type="warning" size="mini">忘记密码？</el-tag>
							</div>
          </el-col> -->
        </el-row>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from 'axios';
export default {
  data() {
    return {
      input: ""
    };
  },
  methods: {
		userLogin(){
      axios.get('http://localhost:3000/users/login/')
        .then(res => {
          console.log('数据获取成功')
          console.log(res.data)
        })
    }
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}
.login{
  margin-top: 20px;
}
.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-row {
  display: flex;
  width: 20%;
  min-width: 200px;
  align-content: center;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;

  h4 {
    display: flex;
    justify-content: flex-start;
    color: #999999;
    margin-bottom: 5px;
  }

  .el-button {
    margin-top: 20px;
    width: 100%;
  }
	.noaccount{
		display flex
		justify-content flex-end
	}
}
</style>