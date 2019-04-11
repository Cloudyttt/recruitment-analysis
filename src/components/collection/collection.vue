<template>
  <div class="collection">
    <h3>我的岗位收藏夹</h3>
    <el-row>
      <el-col v-bind:span="8">
        <v-jobcard1></v-jobcard1>
      </el-col>
      <el-col v-bind:span="8">
        <v-jobcard2></v-jobcard2>
      </el-col>
      <el-col v-bind:span="8">
        <v-jobcard3></v-jobcard3>
      </el-col>
    </el-row>
        <el-row>
      <el-col v-bind:span="8">
        <v-jobcard4></v-jobcard4>
      </el-col>
      <el-col v-bind:span="8">
        <v-jobcard5></v-jobcard5>
      </el-col>
      <el-col v-bind:span="8">
        <v-jobcard6></v-jobcard6>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
import jobcard1 from "../recommend/jobcard";
import jobcard2 from "../recommend/jobcard.1";
import jobcard3 from "../recommend/jobcard.2";
import jobcard4 from "../recommend/jobcard.3";
import jobcard5 from "../recommend/jobcard.4";
import jobcard6 from "../recommend/jobcard.5";
export default {
  data() {
    return {};
  },
  components: {
		"v-jobcard1": jobcard1,
		"v-jobcard2": jobcard2,
    "v-jobcard3": jobcard3,
    "v-jobcard4": jobcard4,
		"v-jobcard5": jobcard5,
		"v-jobcard6": jobcard6
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.collection{
  margin 0 100px
}
</style>