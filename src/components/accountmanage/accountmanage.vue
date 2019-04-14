<template>
  <div class="accountmanage">
    <el-container>
      <el-header>
        <h1>个人信息修改</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <h4>新用户名</h4>
              <el-input v-model="newUsername" placeholder="请输入新用户名"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <h4>旧密码</h4>
              <el-input v-model="oldPassword" placeholder="请输入旧密码"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <h4>新密码</h4>
              <el-input v-model="newPassword" type="password" placeholder="请输入登录密码"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <h4>确认密码</h4>
              <el-input v-model="confirmNewPassword" type="password" placeholder="请再次输入登录密码"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-button type="primary" @click="userAlert()">确认修改</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row class="login-others">
          <!--           <el-col :span="6" :offset="18">
            <div class="grid-content bg-purple-dark noaccount">
              <el-tag type="info" size="mini">
                <router-link to="/register">没有账号？</router-link>
              </el-tag>
            </div>
          </el-col>-->
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
import { EventBus } from "../eventBus/EventBus.js"
export default {
  data() {
    return {
      telephone: '123',
      newUsername: "",
      newPassword: "",
      confirmNewPassword: "",
      oldPassword: ""
    };
  },
  methods: {
    userAlert() {
      /* EventBus.$on("loginsucceed", ({ telephone, status }) => {
        this.telephone = telephone;
      }); */
      if(this.newUsername === '' && this.newPassword === ''){
        this.open4()
      } else if(this.newPassword !== this.confirmNewPassword) {
        this.open5()
      } else {
        axios
          .get("http://localhost:3000/users/alert/", {
            params: {
              telephone: this.telephone,
              oldPassword: this.oldPassword,
              newUsername: this.newUsername,
              newPassword: this.newPassword
            }
          })
          .then(res => {
            console.log("数据获取成功");
            console.log(res);
            console.log(res.data);
            if(res.data.oldPasswordTrue === false){// 旧密码输入错误
              this.open3();
            } else {
              if (res.data.newPasswordSucceed === true) {
                console.log("密码修改成功");
                this.open2();
              } 
              if(res.data.newUsernameSucceed === true){
                console.log("用户名修改成功");
                this.open1();
                EventBus.$emit("newUsername", {
                      username: this.username
                });
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    open1() {
      this.$notify({
        title: "恭喜",
        message: "用户名修改成功！",
        type: "success"
      });
    },
    open2() {
      this.$notify({
        title: "恭喜",
        message: "密码修改成功！",
        type: "success"
      });
    },
    open3() {
        this.$alert('旧密码输入错误', '修改失败', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
    open4() {
        this.$alert('修改内容不能全为空', '修改失败', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      open5() {
        this.$alert('两次密码输入不一致', '修改失败', {
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

.accountmanage {
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