<template>
  <div class="newrecommend">
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
  </div>
</template>
<script type="text/ecmascript-6">
import jobcard1 from "./jobcard";
import jobcard2 from "./jobcard.1";
import jobcard3 from "./jobcard.2";
export default {
  data() {
    return {};
  },
  components: {
		"v-jobcard1": jobcard1,
		"v-jobcard2": jobcard2,
		"v-jobcard3": jobcard3
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>