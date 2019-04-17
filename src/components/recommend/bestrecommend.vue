<template>
  <div class="bestrecommend">
		<div v-if="datalength">
			<v-jobcard v-for="(item, index) in jobsinfo" v-bind:key="index" v-bind:jobinfo="item" v-bind:telephone="telephone" v-bind:status="status"></v-jobcard>
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
			telephone: 'xxx',
      status: -1,
			index: 0,
			datalength: 0,
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
	mounted() {
		EventBus.$on("searchingresult", ({ dataAvailable, jobsinfo}) => {
			this.jobsinfo = jobsinfo
			this.datalength = jobsinfo.length
		});
		EventBus.$on("loginsucceed", ({ username, telephone, status}) => {
      this.telephone = telephone
			this.status = status
			console.log('666')
			console.log('status in recommend: ' + this.status)
			console.log('telephone in recommend: ' + this.telephone)
    });
    EventBus.$on("loginoutsucceed", ({ username, telephone, status}) => {
      this.telephone = telephone
      this.status = status
      console.log('status in recommend: ' + this.status)
    });
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>