<template>
  <div class="register">
    <el-container>
      <el-header>
        <h1>用户注册</h1>
      </el-header>
      <el-main>
        <form action="http://localhost:3000/users/register/" method="GET">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <h4>手机号</h4>
                <el-input v-model="telephone" placeholder="请输入手机号码" name="telephone"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <h4>邮箱</h4>
                <el-input v-model="email" placeholder="请输入邮箱" name="email"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <h4>用户名</h4>
                <el-input v-model="username" placeholder="请输入用户名" name="username"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <h4>密码</h4>
                <el-input v-model="password" placeholder="请输入密码" type="password" name="password"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <h4>确认密码</h4>
                <el-input
                  v-model="confirmPassword"
                  placeholder="请再次输入密码"
                  type="password"
                  name="confirmpassword"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-button type="primary" @click='userRegister'>注册</el-button>
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
        </form>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from "axios";
export default {
  data() {
    return {
      telephone: '',
      email: '',
      username: '',
      password: '',
      status: 0,
      confirmPassword: ''
    };
  },
  methods: {
    userRegister() {
      if (this.telephone !== '' && this.email !== '' && this.username !== '' && this.password !== '' && this.confirmPassword !== '' && this.password === this.confirmPassword) {
        // 确保注册密码输入无误
        axios
          .get("http://localhost:3000/users/register/", {
            params: {
              telephone: this.telephone,
              email: this.email,
              username: this.username,
              password: this.password,
              status: this.status
            }
          })
          .then(res => {
            console.log("数据获取成功");
            console.log(res.data);
            if(res.data === 'succeed'){
              this.open3()
            } else{
              this.open4()
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if(this.telephone === '' || this.email === '' || this.username === '' || this.password === '' || this.confirmPassword === '' ) {// 确保注册信息完整
        this.open2()
      } else if(this.password !== this.confirmPassword){  //  确保两次注册密码输入一致
        this.open1()
      } 
    },
    open1() {
        this.$alert('密码输入不一致', '注册失败', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      open2() {
        this.$alert('休息填写不全', '注册失败', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      open3() {
        this.$notify({
          title: '恭喜',
          message: '账号注册成功！',
          type: 'success'
        });
      },
      open4() {
        this.$alert('账号已存在，请勿重复注册', '注册失败', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

form {
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
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