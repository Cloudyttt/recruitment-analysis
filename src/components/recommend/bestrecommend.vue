<template>
  <div class="bestrecommend">
		<div v-if="datalength">
			<!-- <div v-for="(item, index) in jobsinfo" v-bind:key="index">
				{{item}}
			</div> -->
			<v-jobcard v-for="(item, index) in jobsinfo" v-bind:key="index" v-bind:jobinfo="item"></v-jobcard>
		</div>
  </div>
</template>
<script type="text/ecmascript-6">
import jobcard from './jobcard';
import { EventBus } from "../eventBus/EventBus.js"
import { constants } from 'crypto';
export default {
  data() {
    return {
			wcnm:0,
			index: 0,
			datalength: 0,
			jobsinfo: [],
			jobsinfos: [{
				job: {
					jobTitle: '无',
					jobsalary:'无',
					jobExp:'无',
					jobEdu:'无',
					jobDetail:'无',
					jobLocation:'无',
					joburl:'无'
				},
				company:{
					companyTitle:'无',
					companyField:'无',
					companyFinancialStage:'无',
					companyUrl:'无'
				}
				}],
			isInfoAvailid: false,
      currentDate: new Date()
    };
	},
	components: {
		'v-jobcard': jobcard
	},
	methods:{
		cnm(){
			this.wcnm = typeof(this.jobsinfo[0].job)
			console.log("123")
			console.log(this.jobsinfo[0].job)
		}
	},
	/* watch:{
		jobsinfo: function catchjobdinfo() {
			if(jobsinfo !== ''){
				this.isInfoAvailid = true
			}
		}
	}, */
	mounted() {
		EventBus.$on("searchingresult", ({ dataAvailable, jobsinfo}) => {
			this.jobsinfo = jobsinfo
			/* console.log('jobsinfo in bestrecommend: ')
			console.log(this.jobsinfo) */
			this.datalength = jobsinfo.length
			/* console.log('jobsinfo.length:' + jobsinfo.length) */
    });
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>