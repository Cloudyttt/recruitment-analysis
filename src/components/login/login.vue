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
              <el-input v-model="telephone" name="telephone" placeholder="请输入手机号"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <h4>密码</h4>
              <el-input v-model="password" placeholder="请输入登录密码" type="password" name="password"></el-input>
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
          </el-col>-->
        </el-row>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from "axios";
import { EventBus } from "../eventBus/EventBus.js";
export default {
  data() {
    return {
      telephone: "",
      password: ""
    };
  },
  methods: {
    loginSuccess() {
      this.$notify.success({
        title: "提示",
        message: "恭喜，登录成功！",
        showClose: true
      });
      this.$router.push({ path: '/bestrecommend' })
    },
    loginFail() {
      this.$notify.error({
        title: "错误",
        message: "登录失败"
      });
    },
    userLogin() {
      if (this.telephone === "" || this.password === "") {
        this.open();
      } else {
        axios
          .get("http://localhost:3000/users/login/", {
            params: {
              telephone: this.telephone,
              password: this.password
            }
          })
          .then(res => {
            console.log("数据获取成功");
            console.log(res.data);
            console.log("登录用户的用户名[login]：");
            console.log(res.data[0].username);
            console.log("登录用户的手机号[login]：");
            console.log(res.data[0].telephone);
            /* console.log('res.data.length: ' + res.data.length) */
            if (res.data.length === 1) {
              // 登录成功
              this.loginSuccess();
              // 向全局总线提交当前登录系统并正在使用的用户信息
              EventBus.$emit("loginsucceed", {
                username: res.data[0].username,
                telephone: res.data[0].telephone,
                status: 1
              });
            } else {
              this.loginFail();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    open() {
      this.$alert("请同时输入手机号和密码！", "登录失败", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
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

.login {
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

  .noaccount {
    display: flex;
    justify-content: flex-end;
  }
}
</style>