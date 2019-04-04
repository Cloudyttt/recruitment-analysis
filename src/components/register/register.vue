<template>
  <div class="register">
    <el-container>
      <el-header>
        <h1>用户注册</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <h4>用户名</h4>
              <el-input v-model="input" placeholder="请输入用户名"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <h4>手机号</h4>
              <el-input v-model="input" placeholder="请输入手机号码"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <h4>密码</h4>
              <el-input v-model="input" placeholder="请输入密码"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <h4>确认密码</h4>
              <el-input v-model="input" placeholder="请再次输入密码"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-button type="primary" @click='find'>注册</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row class="login-others">
          <el-col :span="6" :offset="18">
            <div class="grid-content bg-purple-dark">
              <el-tag type="info" size="mini">
                <router-link to="/login">已有账号？</router-link>
              </el-tag>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      input: "",
      radio: "1"
    };
	},
	methods: {
		find(){
			console.log('123')
		}
	},
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

.register {
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

  .send-message {
    margin-top: 0;
  }

  .sex {
    .el-col {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 5px;
    }
  }
}
</style>