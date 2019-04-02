<template>
  <div id="app">
    <div id="main-container">
      <el-container direction="vertical">
        <el-header>
          <v-header></v-header>
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
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#fafafa"
                router
              >
                <el-menu-item index="/bestrecommend" route="/bestrecommend">推荐职位</el-menu-item>
                <el-menu-item index="/hotrecommend" route="/hotrecommend">热门职位</el-menu-item>
                <el-menu-item index="/lastestrecommend" route="/lastestrecommend">最新职位</el-menu-item>
              </el-menu>
              <router-view></router-view>
            </el-header>
            <el-main>
              <div class="block">
                <span class="demonstration">页数较少时的效果</span>
                <el-pagination
                  layout="prev, pager, next"
                  :total="50">
                </el-pagination>
              </div>
            </el-main>
          </el-container>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
import Register from "./components/register/register";
import Login from "./components/login/login";
import Header from "./components/header/header";
import Worksearch from "./components/worksearch/worksearch";
import Searchfilter from "./components/searchfilter/searchfilter";
import Bestrecommend from "./components/recommend/bestrecommend";
import Hotrecommend from "./components/recommend/hotrecommend";
import Lastestrecommend from "./components/recommend/lastestrecommend";
import Hotcompanys from "./components/recommend/hotcompanys";
import Friendlylinks from "./components/friendlylinks/friendlylinks";
export default {
  data() {
    return {
      activeIndex1: "/bestrecommend",
      activeIndex2: "/hotrecommend",
      activeIndex3: "/lastestrecommend"
    };
  },
  components: {
    name: "App",
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
#app {
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
