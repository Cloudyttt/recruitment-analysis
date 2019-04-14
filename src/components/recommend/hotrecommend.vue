<template>
  <div class="hotrecommend">
		<el-row v-for="i in 3" v-bind:key="i">
			<el-col v-bind:span="8" v-for="j in 3" v-bind:key="j">
				<!-- <v-jobcard></v-jobcard> -->
			</el-col>
		</el-row>
  </div>
</template>
<script type="text/ecmascript-6">
import jobcard from './jobcard';
export default {
	data(){
		return{
		}
	},
	components: {
		'v-jobcard': jobcard
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>