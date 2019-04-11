<template>
  <div class="v-worksearch">
    <el-container>
      <el-header id="worksearch-header">
        <el-row>
          <el-col :span="4" id="jobs-num">
            <el-tag>职位 {{jobsNum}} 个</el-tag>
          </el-col>
        </el-row>
      </el-header>
      <el-main id="worksearch-main">
        <el-row class="demo-autocomplete">
          <el-col :span="12" id="search-input">
            <el-autocomplete
              class="inline-input"
              id="worksearch-input"
              v-model="searchingjob"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
              size="medium"
            ></el-autocomplete>
            <el-button type="primary" icon="el-icon-search" id="search-button" @click="searchjob">搜索</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
import { EventBus } from "../eventBus/EventBus.js";
export default {
  data() {
    return {
      jobsNum: "99",
      restaurants: [],
      searchingjob: "",
      state2: ""
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "Web开发" },
        { value: "PHP" },
        { value: "Java" },
        { value: "后端开发" },
        { value: "python" },
        { value: "Android" },
        { value: "iOS" },
        { value: "测试工程师" },
        { value: "C++" },
        { value: "JavaScript" },
        { value: "产品经理" },
        { value: "UI设计师" },
        { value: "HTML5" }
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    searchjob() {
      EventBus.$emit("searchedjob", {
        searchingjob: this.searchingjob
      });
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
  @css { * }zoom: 1; /* IE/7/6 */
}

#search-input {
  display: flex;
  justify-content: flex-start;
}

#jobs-num {
  display: flex;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
}

#worksearch-header {
  height: 32px !important;
  margin-left: 10px;
  padding: 0 !important;
}

#worksearch-main {
  height: 86px !important;
  padding-left: 0 !important;
  padding-top: 10px;
  margin-left: 10px;
}

#worksearch-input {
  width: 600px;
  height: 46px;
  line-height: 46px;
}

#search-button {
  width: 142px !important;
}
</style>