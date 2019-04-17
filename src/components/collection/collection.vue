<template>
  <div class="collection">
    <div class="collection-main">
      <el-container>
        <el-header>
          <h3>我的岗位收藏夹</h3>
        </el-header>
        <!-- <el-aside width="200px">Aside</el-aside> -->
        <el-main v-if="condition" class="collection-elmain">
          <!-- <el-button type="primary" @click="showCollection()">主要按钮</el-button> -->
          <v-collectcard v-for="(item, index) in jobsinfo" v-bind:key="index" v-bind:jobinfo="item"></v-collectcard>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import collectcard from "./collectcard";
import { EventBus } from "../eventBus/EventBus.js";
import { constants } from "crypto";
const axios = require("axios");
const cheerio = require("cheerio");
export default {
  data() {
    return {
      asd:'',
      condition: false,
      jobsinfo: {}
    };
  },
  components: {
    "v-collectcard": collectcard
  },
  methods: {
    showCollection() {
      axios
        .get("http://localhost:3000/query")
        .then(res => {
          if(res.data.length !== 0){
            console.log("后端传回数据成功:");
            this.jobsinfo = res.data.data;
            console.log(typeof(this.jobsinfo))
            this.condition = true
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    EventBus.$on("refreshcollection", ({ refresh }) => {
      this.showCollection()
    });
  },
  created() {
    this.showCollection();
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.collection {
  margin: 20px 100px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: -webkit-flex; /*Safari */
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  .collection-main{
    width 86%
  }
}

.collection-elmain {
}
</style>