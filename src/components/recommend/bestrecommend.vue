<template>
  <div class="bestrecommend">
		<el-row v-for="i in 3" v-bind:key="i">
			<el-col v-bind:span="8" v-for="j in 3" v-bind:key="j">
				<v-jobcard></v-jobcard>
			</el-col>
		</el-row>
  </div>
</template>
<script type="text/ecmascript-6">
import jobcard from './jobcard';
import { EventBus } from "../eventBus/EventBus.js"
export default {
  data() {
    return {
			jobsinfo: '',
      currentDate: new Date()
    };
	},
	components: {
		'v-jobcard': jobcard
	},
	mounted() {
		EventBus.$on("searchingresult", ({ jobsinfo}) => {
			this.jobsinfo = jobsinfo
			console.log('jobsinfo in bestrecommend: ')
			console.log(jobsinfo)
			console.log(jobsinfo[0].job.jobTitle)
    });
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>