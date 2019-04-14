<template>
  <div class="v-header">
    <div class="header-left">
      <router-link to="/mainpage">
        <div class="header-left-logo">
          <img src="/static/logo/logo-like.png" height="30" width="30">
          <strong>云鱼</strong>
        </div>
      </router-link>
      <div id="header-location">
        <strong id="header-location-current">
          <router-link to="/mainpage">杭州站</router-link>
        </strong>
      </div>
    </div>
    <div class="header-menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#fafafa"
        router
        text-color="#ff00ff"
        active-text-color="#ccc"
      >
        <el-menu-item index="collection" route="/collection">
          <i class="el-icon-star-on">收藏</i>
        </el-menu-item>
        <el-menu-item index="accountmanage" route="/accountmanage">
          <i class="el-icon-setting">设置</i>
        </el-menu-item>
        <el-menu-item index="register" route="/register">
          <i class="el-icon-edit">注册</i>
        </el-menu-item>
        <el-menu-item v-if="!isLogined" index="login" route="/login">
          <i class="el-icon-mobile-phone">登录</i>
        </el-menu-item>
        <el-menu-item>
          <el-dropdown v-if="isLogined" size="small" type="primary">
            <span class="el-dropdown-link">
              {{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" id="header-el-dropdown-menu">
              <el-dropdown-item icon="el-icon-bell" divided><el-button class="mybutton" size="mini" >我的消息</el-button></el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit" :to="{ path: '/accountmanage' }" ><el-button class="mybutton" size="mini" >账号设置</el-button></el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check" to="/accountmanage" ><el-button class="mybutton" size="mini" >职位推荐</el-button></el-dropdown-item>
              <el-dropdown-item icon="el-icon-star-on" ><el-button class="mybutton" size="mini" >我的标签</el-button></el-dropdown-item>
              <el-dropdown-item icon="el-icon-back"><el-button class="mybutton" size="mini" @click="loginout">退出登录</el-button></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Register from "../register/register";
import Login from "../login/login";
import { EventBus } from "../eventBus/EventBus.js";
import { constants } from "crypto";
export default {
  data() {
    return {
      username: "俞浩天",
      activeIndex: "login",
      isLogined: false
    };
  },
  components: {
    "v-register": Register,
    "v-login": Login
  },
  watch: {
    isLogined: function() {
      if (this.isLogined === false) {
        this.username = "登录";
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    loginout() {
      console.log("Login out");
      EventBus.$emit("loginout", {
        status: 0
      });
    }
  },
  mounted() {
    EventBus.$on("loginsucceed", ({ username, telephone, status }) => {
      console.log(username);
      console.log(telephone);
      console.log(status);
      if (status === 1) {
        this.isLogined = true;
        this.username = username;
        console.log("用户名：");
        console.log(username);
      }
    });
    EventBus.$on("loginout", ({ status }) => {
      console.log(status);
      if (status === 0) {
        this.isLogined = false;
      }
    });
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
/* CSS Document */
html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  outline-style: none; /* FF */
}

body {
  line-height: 1;
}

a {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  text-decoration: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

input, select {
  vertical-align: middle;
}

/* css为clearfix，清除浮动 */
.clearfix::before, .clearfix::after {
  content: '';
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}

.clearfix:after {
  clear: both;
}

.clearfix {
@css {
  *
}
  zoom: 1; /* IE/7/6 */
}
.mybutton{
  border none 
}
.header-left {
  margin-left: 40px;
  border-radius: 4px;
  min-height: 50px;
  max-width: 400px;
  min-width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.v-header {
  height: 60px;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fafafa;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .header-breadcrumb {
    margin-right: 40px;
  }
}

.header-left-logo {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  height: 44px;
  line-height: 44px;
  margin-left: 10px;

  strong {
    margin-left: 10px;
    color: #333;
    font-size: 30px;
    font-weight: 700;
    height: 30px;
    line-height: 35px;
  }

  #header-logo-title {
    font-size: 30px;
    font-weight: bold;
    margin-left: 10px;
  }
}

#header-location {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  height: 44px;
  line-height: 44px;

  #header-location-current {
    font-size: 20px;
    height: 30px;
    line-height: 30px;
  }

  #header-location-change {
    font-size: 10px;
    color: #999;
    height: 30px;
    line-height: 30px;
  }
}

#header-manage {
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  font-size: 16px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 10px;
}

#header-el-dropdown-menu {
  font-size: 10px;
}

.el-menu--horizontal>.el-menu-item {
  width: 60px;
  display: flex;
  align-items: center;
  color: #2c3e50 !important;
  margin-right: 20px;
}

.el-menu-item [class^=el-icon-] {
  font-size: 16px;
}
</style>