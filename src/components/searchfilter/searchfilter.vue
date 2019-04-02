<template>
  <div class="searchfilter">
    <el-container class="searchfilter-container">
<!-----------------------------------------------顶部位置筛选----------------------------------------------------->      
      <el-header class="searchfilter-header">
        <el-row class="searchfilter-row">
          <div class="searchfilter-row-normol">
            <strong>岗位</strong>
          </div>
          <el-cascader size="small"
            :options="workingDirections"
            :show-all-levels="false"
            @change="handleChangeWorkingDirection"
          ></el-cascader>
<!--           <el-select v-model="defaultDirection" placeholder size="small">
            <el-option
              v-for="item in workingDirection"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select> -->
          <div class="searchfilter-row-normol">
            <strong>工作地点:</strong>
          </div>
          <el-select v-model="defaultLocation" placeholder size="small">
            <el-option
              v-for="item in jobLocations"
              :key="item"
              :label="item"
              :value="item"
              @change="handleChangeWorkingDirection"
            ></el-option>
          </el-select>
        </el-row>
      </el-header>
<!-----------------------------------------------中部详细筛选-----------------------------------------------------> 
      <el-main id="searchfilter-main">
<!--         <el-row class="searchfilter-row">
          <div class="searchfilter-row-title">
            <strong>工作地点:</strong>
          </div>
          <div class="searchfilter-row-detail-special">
            <el-radio-group v-model="radio" size="small">
              <el-radio-button                 
                v-for="item in jobLocation"
                v-bind:key="item"
                v-bind:label="item"></el-radio-button>
            </el-radio-group>
          </div>
        </el-row> -->
<!----------------------------------------------工作性质--------------------------------------------------->        
        <el-row class="searchfilter-row">
          <div class="searchfilter-row-normol">
            <strong>工作性质:</strong>
          </div>
          <div class="searchfilter-row-detail">
            <el-checkbox v-model="uncheckAll" @change="handleUncheckAllChange">不限</el-checkbox>
            <el-checkbox-group v-model="checkedJobNature" @change="handleCheckedNatureChange">
              <el-checkbox
                v-for="item in jobNature"
                v-bind:key="item"
                v-bind:label="item" 
              >{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>

        </el-row>
<!-----------------------------------------------学历----------------------------------------------------->
        <el-row class="searchfilter-row">
          <div class="searchfilter-row-normol">
            <strong>学历要求:</strong>
          </div>
          <div class="searchfilter-row-detail">
            <el-checkbox v-model="uncheckAllEdu" @change="handleUncheckAllEdu">不限</el-checkbox>
            <el-checkbox-group v-model="checkedEducationBg" @change="handleCheckedEduChange">
              <el-checkbox
                v-for="item in educationBg"
                v-bind:key="item"
                v-bind:label="item" 
              >{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-row>
<!-----------------------------------------------融资阶段----------------------------------------------------->        
        <el-row class="searchfilter-row">
          <div class="searchfilter-row-normol">
            <strong>融资阶段:</strong>
          </div>
          <div class="searchfilter-row-detail">
            <el-checkbox v-model="uncheckAllStage" @change="handleUncheckAllStage">不限</el-checkbox>
            <el-checkbox-group v-model="checkedFinancingStage" @change="handleCheckedStageChange">
              <el-checkbox
                v-for="item in financingStage"
                v-bind:key="item"
                v-bind:label="item" 
              >{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-row>
<!-----------------------------------------------公司规模----------------------------------------------------->
<!--         <el-row class="searchfilter-row">
          <div class="searchfilter-row-normol">
            <strong>公司规模:</strong>
          </div>
          <div class="searchfilter-row-detail">
            <el-checkbox v-model="uncheckAllSize" @change="handleUncheckAllSize">不限</el-checkbox>
            <el-checkbox-group v-model="checkedCompanySize" @change="handleCheckedSizeChange">
              <el-checkbox
                v-for="item in companySize"
                v-bind:key="item"
                v-bind:label="item" 
              >{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-row> -->
<!-----------------------------------------------行业领域----------------------------------------------------->
        <el-row class="searchfilter-row">
          <div class="searchfilter-row-normol">
            <strong>行业领域:</strong>
          </div>
          <div class="searchfilter-row-detail">
            <el-checkbox v-model="uncheckAllField" @change="handleUncheckAllField">不限</el-checkbox>
            <el-checkbox-group v-model="checkedIndustryField" @change="handleCheckedFieldChange">
              <el-checkbox
                v-for="item in industryField"
                v-bind:key="item"
                v-bind:label="item" 
              >{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-row>
      </el-main>
<!-----------------------------------------------footer薪资范围----------------------------------------------------->
      <el-footer class="searchfilter-footer">
        <el-row class="searchfilter-row">
<!--           <div class="searchfilter-row-normol">
            <strong>排序方式:</strong>
          </div>
          <div> 
            <el-radio-group v-model="radio" @change="handleChangeWorkingDirection">
              <el-radio label="1" class="OrderWay">默认</el-radio>
              <el-radio label="2">最新</el-radio>
            </el-radio-group>
          </div> -->
          <div class="searchfilter-row-normol">
            <strong>月薪:</strong>
          </div>
          <el-select v-model="value" placeholder size="small">
            <el-option
              v-for="item in salaryRange"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @change="handleChangeWorkingDirection"
            ></el-option>
          </el-select>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
import filtertitle from "./filtertitle";
export default {
  data() {
    return { 
      radio: '1',
      mainSelection:{

      },

      uncheckAll: true,
      checkedJobNature: [],
      jobNature: ['实习', '全职', '兼职'],
      
      uncheckAllEdu:true,
      checkedEducationBg:[],
      educationBg: [ '大专', '本科', '硕士', '博士' ],

      uncheckAllStage: true,
      checkedFinancingStage:[],
      financingStage: [ '未融资', '融资中', '上市公司'],

      uncheckAllSize: true,
      checkedCompanySize:[],
      companySize: [ '少于50人', '50-500人', '500-2000人', '2000人以上'],

      uncheckAllField: true,
      checkedIndustryField:[],
      industryField: [ '移动互联网', '电子商务', '金融', '企业服务', '教育', '医疗', '文娱', '硬件' ], 

      jobLocations: [ '不限', '西湖区', '滨江区', '余杭区', '拱墅区', '江干区', '萧山区', '上城区', '下城区', '下沙', '富阳市', '桐庐县', '富阳区', '临安市', '建德市'],
      defaultLocation: '不限',
      value: "选项1",
      salaryRange: [
        {
          value: "选项1",
          label: "不限"
        },
        {
          value: "选项2",
          label: "3k以下"
        },
        {
          value: "选项3",
          label: "3k-7k"
        },
        {
          value: "选项4",
          label: "7k-15k"
        },
        {
          value: "选项5",
          label: "15k-25k"
        },
        {
          value: "选项6",
          label: "25k-50k"
        },
        {
          value: "选项7",
          label: "50k以上"
        }
      ],

      defaultDirection: 'qianduan',
      workingDirections: 
      [
        //前端
        {
          value: 'qianduan',
          label: '前端',
/*           children: [{
            value: 'webqianduan',
            label: 'Web前端',
          }, 
          {
            value: 'html5',
            label: 'HTML5',
          },
          {
            value: 'javascript',
            label: 'JavaScript',
          }
          ] */
        }, 
        //后端
        {
          value: 'houduan',
          label: '后端',
/*           children: [{
            value: 'java',
            label: 'Java',
          }, {
            value: 'c++',
            label: 'C++',
          }, {
            value: 'PHP',
            label: 'PHP',
          }, {
            value: 'python',
            label: 'Python',
          }, {
            value: 'nodejs',
            label: 'Node.js',
          }, {
            value: 'quanzhan',
            label: '全栈工程师',
          }, {
            value: 'asp',
            label: 'ASP',
          }, {
            value: 'shujuwajue',
            label: '数据挖掘',
          }] */
        }, 
        //移动开发
        {
          value: 'yidong',
          label: '移动开发',
/*           children: [{
            value: 'html5',
            label: 'HTML5'
          }, {
            value: 'android',
            label: 'Android'
          }, {
            value: 'ios',
            label: 'iOS'
          }] */
        },
        //测试
        {
          value: 'ceshi',
          label: '测试'
        },
        //DBA
        {
          value: 'dba',
          label: 'DBA',
/*           children: [{
            value: 'mysql',
            label: 'MySQL'
          }, {
            value: 'oracle',
            label: 'Oracle'
          }, {
            value: 'sqlserver',
            label: 'SQLServer'
          }, {
            value: 'mangodb',
            label: 'MangoDB'
          }] */
        },
        ]//岗位方向
    };
  },
  components: {
    "v-filtertitle": filtertitle
  },
  methods: {
/************************************ 工作性质 ******************************************/
    handleUncheckAllChange(val) {
      /* this.checkedJobNature = val ? [] : this.checkedJobNature; */
      if(this.uncheckAll == true){
        this.isDisabled = true;
        console.log('“不限”复选框当前是否可用: ' + this.isDisabled);
        this.uncheckAll == true;
        this.checkedJobNature = [];
        }else{
        this.isDisabled = false;
        console.log('“不限”复选框当前是否可用: ' + this.isDisabled);
        this.uncheckAll == true;
        this.checkedJobNature = [];
      }
      console.log('checkedJobNature(选中的属性): ' + this.checkedJobNature);
      console.log('unCheckAll的值（“不限”复选框是否被选中）: ' + this.uncheckAll);
    },
    handleCheckedNatureChange(value) {
      let checkedCount = value.length;
      console.log("checkedCount的值：" + checkedCount);
      console.log('value的东西: ' + value);
      if(checkedCount!= 0){
          this.uncheckAll = false; 
      }else{
          this.uncheckAll = true; 
      }
      console.log('checkedJobNature(选中的属性): ' + this.checkedJobNature);
      console.log('unCheckAll的值（“不限”复选框是否被选中）: ' + this.uncheckAll);
    },
    


/************************************ 学历 ******************************************/
    handleUncheckAllEdu(val) { 
      if(this.uncheckAllEdu == true){ 
        this.uncheckAllEdu == true;
        this.checkedEducationBg = [];
        }else{ 
        this.uncheckAllEdu == true;
        this.checkedEducationBg = [];
      }
      console.log('checkedEducationBg(选中的属性): ' + this.checkedJobNature);
      console.log('unCheckAllEdu的值（“不限”复选框是否被选中）: ' + this.uncheckAllEdu);
    },
    handleCheckedEduChange(value) {
      let checkedCount = value.length;
      console.log("checkedCount的值：" + checkedCount);
      console.log('value的东西: ' + value);
      if(checkedCount!= 0){
          this.uncheckAllEdu = false; 
      }else{
          this.uncheckAllEdu = true; 
      }
      console.log('checkedEducationBg(选中的属性): ' + this.checkedEducationBg);
      console.log('unCheckAllEdu的值（“不限”复选框是否被选中）: ' + this.uncheckAllEdu);
    },

/************************************ 融资阶段 ******************************************/
    handleUncheckAllStage(val) { 
      if(this.uncheckAllStage == true){ 
        this.uncheckAllStage == true;
        this.checkedFinancingStage = [];
        }else{ 
        this.uncheckAllStage == true;
        this.checkedFinancingStage = [];
      }
    },
    handleCheckedStageChange(value) {
      let checkedCount = value.length;
      if(checkedCount!= 0){
          this.uncheckAllStage = false; 
      }else{
          this.uncheckAllStage = true; 
      } 
    },
/************************************ 公司规模 ******************************************/
    handleUncheckAllSize(val) { 
      if(this.uncheckAllSize == true){ 
        this.uncheckAllSize == true;
        this.checkedFinancingSize = [];
        }else{ 
        this.uncheckAllSize == true;
        this.checkedCompanySize = [];
      }
    },
    handleCheckedSizeChange(value) {
      let checkedCount = value.length;
      if(checkedCount!= 0){
          this.uncheckAllSize = false; 
      }else{
          this.uncheckAllSize = true; 
      } 
    },
/************************************ 行业领域 ******************************************/
    handleUncheckAllField(val) { 
      if(this.uncheckAllField == true){ 
        this.uncheckAllField == true;
        this.checkedIndustryField = [];
        }else{ 
        this.uncheckAllField == true;
        this.checkedIndustryField = [];
      }
    },
    handleCheckedFieldChange(value) {
      let checkedCount = value.length;
      if(checkedCount!= 0){
          this.uncheckAllField = false; 
      }else{
          this.uncheckAllField = true; 
      } 
    },
/************************************ 岗位方向 ******************************************/
    handleChangeWorkingDirection(value){

    },
/************************************ 工作地点 ******************************************/
    handleChangeWorkingDirection(value){

    },
/************************************ 薪资范围 ******************************************/
    handleChangeWorkingDirection(value){

    },
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.searchfilter-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;

  .searchfilter-row-title {
    height: 72px;
    width: 86px !important;

    strong {
      width: 72px;
      float: left;
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      color: #555;
      padding: 5px 8px;
      margin: 6px 5px 6px 0;
    }
  }

  .searchfilter-row-normol {
    height: 36px;
    width: 86px;
    margin-right: 16px;
    strong {
      width: 72px;
      float: left;
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      color: #555;
      padding: 5px 8px;
      margin: 6px 5px 6px 0;
    }
  }

  .searchfilter-row-detail-special {
    float: left;
    height: 72px;
    line-height: 36px;
  }

  .searchfilter-row-detail {
    float: left;
    height: 36px;
    line-height: 36px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

  }
}

#searchfilter-main {
  width: 960px;
  float: left;
  padding: 6px 16px;
  position: relative;
  overflow: visible;
  background-color: #ffffff;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
}

.searchfilter-footer {
  position: relative;
  margin-top: 16px;
  width: 960px;
  height: 50px !important;
  float: left;
  padding: 6px 16px;
  overflow: visible;
  background-color: #ffffff;
  border: 1px solid #DCDFE6 !important;
  border-radius: 4px;
}
.searchfilter-header{
  position: relative;
  margin-top: 16px;
  width: 960px;
  height: 50px !important;
  float: left;
  margin-bottom: 16px;
  padding: 6px 16px;
  overflow: visible;
  background-color: #ffffff;
  border: 1px solid #DCDFE6 !important;
  border-radius: 4px;
}
.OrderWay{
  margin-right 26px
  
}
</style>