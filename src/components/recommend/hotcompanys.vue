<template>
  <div class="hotcompanys">
    <el-row v-for="i in 2" v-bind:key="i">
			<el-col v-bind:span="6" v-for="j in 4" v-bind:key="j">
				<v-companycard></v-companycard>
			</el-col>
		</el-row>
  </div>
</template>
<script type="text/ecmascript-6">
import companycard from './companycard';
export default {
  data() {
    return {};
  },
	components: {
		'v-companycard': companycard
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>