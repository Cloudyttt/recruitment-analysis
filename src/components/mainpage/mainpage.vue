<template>
  <div class="mainpage">
    <div id="main-container">
      <el-container direction="vertical">
        <el-header>
          <!-- <v-header></v-header> -->
        </el-header>
        <el-main id="app-main">
          <el-container direction="vertical">
            <el-header id="app-main-header">
              <v-worksearch></v-worksearch>
            </el-header>
            <el-main id="app-main-main">
              <v-searchfilter></v-searchfilter>
            </el-main>
          </el-container>
        </el-main>
        <el-footer id="app-footer">
          <el-container id="app-footer-container">
            <!-------------------------------------------职位展示的部分--------------------------------------------->
            <el-header id="app-footer-header">
              <el-menu
                :default-active="activeIndex1"
                mode="horizontal"
                @select="handleSelect"
                background-color="#fafafa"
                router
              >
                <el-menu-item index="/bestrecommend" route="/bestrecommend">推荐职位</el-menu-item>
                <!-- <el-menu-item index="/hotrecommend" route="/hotrecommend">热门职位</el-menu-item>
                <el-menu-item index="/lastestrecommend" route="/lastestrecommend">最新职位</el-menu-item> -->
              </el-menu>
              <router-view></router-view>
            </el-header>
            <el-main>
              <!-- <div class="block">
                <span class="demonstration">页数较少时的效果</span>
                <el-pagination
                  layout="prev, pager, next"
                  :total="50">
                </el-pagination>
              </div> -->
            </el-main>
          </el-container>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Register from "../register/register";
import Login from "../login/login";
import Header from "../header/header";
import Worksearch from "../worksearch/worksearch";
import Searchfilter from "../searchfilter/searchfilter";
import Bestrecommend from "../recommend/bestrecommend";
import Hotrecommend from "../recommend/hotrecommend";
import Lastestrecommend from "../recommend/lastestrecommend";
import Hotcompanys from "../recommend/hotcompanys";
import Friendlylinks from "../friendlylinks/friendlylinks";
export default {
  data() {
    return {
      activeIndex1: "/bestrecommend",
      activeIndex2: "/hotrecommend",
      activeIndex3: "/lastestrecommend"
    };
  },
  components: {
    "v-register": Register,
    "v-login": Login,
    "v-header": Header,
    "v-worksearch": Worksearch,
    "v-searchfilter": Searchfilter,
    "v-bestrecommend": Bestrecommend,
    "v-hotrecommend": Hotrecommend,
    "v-lastestrecommend": Lastestrecommend,
    "v-hotcompanys": Hotcompanys,
    "v-friendlylinks": Friendlylinks
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

.mainpage{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content: center;
  background-color: #fafafa;
}
#main-container {
  width: 80%;
}

#app-main-main {
  padding: 0;
  margin-left: 10px;
}

#app-main-header {
  height: 128px !important;
  padding: 0;
}

#app-footer {
  margin-bottom: 16px;

  #app-footer-container {
    #app-footer-header {
      height: 708px !important;
    }

    #app-footer-main {
      height: 652px !important;
    }

    #app-footer-footer {
      height: 120px !important;
    }
  }
}
</style>