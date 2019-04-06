<template>
  <div class="searchfilter">
    <el-container class="searchfilter-container">
      <!-----------------------------------------------行业领域---------------------------------------------------->
      <el-header class="searchfilter-header">
        <el-row class="searchfilter-row">
          <div class="searchfilter-row-normol">
            <strong>行业领域</strong>
          </div>
          <el-select v-model="field" placeholder size="small" @change="changeField">
            <el-option v-for="item in industryField" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <!-- <el-select v-model="defaultDirection" placeholder size="small">
            <el-option
              v-for="item in workingDirection"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>-->
          <!-----------------------------------------------工作地点---------------------------------------------------->
          <div class="searchfilter-row-normol">
            <strong>工作地点:</strong>
          </div>
          <el-select v-model="location" placeholder size="small" @change="changeLocation">
            <el-option v-for="item in jobLocations" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-row>
      </el-header>
      <el-main id="searchfilter-main">
        <!-- <el-row class="searchfilter-row">
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
        </el-row-->
        >
        <!-----------------------------------------------工作经验---------------------------------------------------->
        <el-row class="searchfilter-row">
          <div class="searchfilter-row-normol">
            <strong>工作经验:</strong>
          </div>
          <div class="searchfilter-row-detail">
            <el-radio-group class="radio-group" v-model="jobExp" @change="changeJobExp">
              <el-radio v-for="item in jobNature" :key="item" :label="item">{{item}}</el-radio>
            </el-radio-group>
          </div>
        </el-row>
        <!-----------------------------------------------学历要求---------------------------------------------------->
        <el-row class="searchfilter-row">
          <div class="searchfilter-row-normol">
            <strong>学历要求:</strong>
          </div>
          <div class="searchfilter-row-detail">
            <el-radio-group class="radio-group" v-model="eduBg" @change="changeEduBg">
              <el-radio v-for="item in educationBg" :key="item" :label="item">{{item}}</el-radio>
            </el-radio-group>
          </div>
        </el-row>
        <!-----------------------------------------------融资阶段---------------------------------------------------->
        <el-row class="searchfilter-row">
          <div class="searchfilter-row-normol">
            <strong>融资阶段:</strong>
          </div>
          <div class="searchfilter-row-detail">
            <el-radio-group class="radio-group" v-model="finanStage" @change="changeFinanStage">
              <el-radio v-for="item in financingStage" :key="item" :label="item">{{item}}</el-radio>
            </el-radio-group>
          </div>
        </el-row>
        <!-----------------------------------------------公司规模---------------------------------------------------->
        <el-row class="searchfilter-row">
          <div class="searchfilter-row-normol">
            <strong>公司规模:</strong>
          </div>
          <div class="searchfilter-row-detail">
            <el-radio-group class="radio-group" v-model="compSize" @change="changeCompSize">
              <el-radio v-for="item in companySize" :key="item" :label="item">{{item}}</el-radio>
            </el-radio-group>
          </div>
        </el-row>
        <!-----------------------------------------------发布时间---------------------------------------------------->
        <el-row class="searchfilter-row">
          <div class="searchfilter-row-normol">
            <strong>发布时间:</strong>
          </div>
          <div class="searchfilter-row-detail">
            <el-radio-group class="radio-group" v-model="time" @change="changeCommitTime">
              <el-radio v-for="item in commitTime" :key="item" :label="item">{{item}}</el-radio>
            </el-radio-group>
          </div>
        </el-row>
      </el-main>
      <!-----------------------------------------------薪资范围---------------------------------------------------->
      <el-footer class="searchfilter-footer">
        <el-row class="searchfilter-row">
          <div class="searchfilter-row-normol">
            <strong>月薪:</strong>
          </div>
          <el-select v-model="salary" placeholder size="small" @change="changeSalary">
            <el-option
              v-for="item in salaryRange"
              :key="item"
              :label="item"
              :value="item"
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
      website: "https://www.zhipin.com/",
      finalWebsite: "",
      tempWebsite:
        "https://www.zhipin.com" +
        "/行业领域" +
        "-" +
        "杭州市/" +
        "薪资范围" +
        "-" +
        "学历要求" +
        "-" +
        "工作经验" +
        "-" +
        "公司规模" +
        "-" +
        "融资阶段" +
        "-" +
        "行政区" +
        "/?query=岗位方向" +
        "&发布时间",
      HangzhouCode: "-c101210100/",
      locCode: "",
      expCode: "",
      eduBgCode: "",
      finanCode: "",
      compSizeCode: "",
      fieldCode: "",
      salaryCode: "",
      timeCode: "",

      jobExp: "不限",
      eduBg: "不限",
      finanStage: "不限",
      compSize: "不限",
      field: "不限",
      time: "不限",
      salary: "不限",
      location: "不限",

      uncheckAll: true,
      checkedJobNature: [],
      jobNature: ["不限", "应届生", "1-3年", "3-5年", "5-10年", "10年以上"],

      uncheckAllEdu: true,
      checkedEducationBg: [],
      educationBg: ["不限", "大专", "本科", "硕士", "博士"],

      uncheckAllStage: true,
      checkedFinancingStage: [],
      financingStage: [
        "不限",
        "未融资",
        "天使轮",
        "A轮",
        "B轮",
        "C轮",
        "D轮",
        "D轮及以上",
        "上市公司",
        "不需要融资"
      ],

      uncheckAllSize: true,
      checkedCompanySize: [],
      companySize: [
        "不限",
        "0-20人",
        "20-99人",
        "100-499人",
        "500-999人",
        "1000-9999人",
        "10000以上"
      ],

      uncheckAllField: true,
      checkedIndustryField: [],
      commitTime: [
        "不限",
        "1天以内",
        "3天以内",
        "7天以内",
        "15天以内",
        "1个月以内"
      ],

      jobLocations: [
        "不限",
        "西湖区",
        "滨江区",
        "余杭区",
        "拱墅区",
        "江干区",
        "萧山区",
        "上城区",
        "下城区",
        "临安区",
        "富阳市",
        "桐庐县",
        "富阳区",
        "临安市",
        "建德市"
      ],
      salaryRange: [ "不限", "3k以下", "3k-5k", "5k-10k", "10k-20k", "20k-50k", "50k以上" ],
      industryField: [
        "不限",
        "电子商务",
        "游戏",
        "媒体",
        "在线教育",
        "O2O",
        "医疗健康",
        "社交网络",
        "数据服务",
        "生活服务"
      ]
    };
  },
  props: {
    workingDirection: String
  },
  components: {
    "v-filtertitle": filtertitle
  },
  methods: {
    /************************************ 工作经验 ******************************************/
    changeJobExp(val) {
      if (val == "不限") {
        console.log("不限");
        this.expCode = "";
      } else if (val == "应届生") {
        console.log("应届生");
        this.expCode = "-e_102";
      } else if (val == "1-3年") {
        console.log("1-3年");
        this.expCode = "-e_104";
      } else if (val == "3-5年") {
        console.log("3-5年");
        this.expCode = "-e_105";
      } else if (val == "5-10年") {
        console.log("5-10年");
        this.expCode = "-e_106";
      } else if (val == "10年以上") {
        console.log("10年以上");
        this.expCode = "-e_107";
      }
      console.log(this.expCode);
      this.productWebsite();
      console.log("this.finalWebsite:" + this.finalWebsite);
    },
    /************************************ 学历要求 ******************************************/
    changeEduBg(val) {
      if (val == "不限") {
        console.log("不限");
        this.eduBgCode = "";
      } else if (val == "大专") {
        console.log("大专");
        this.eduBgCode = "-d_202";
      } else if (val == "本科") {
        console.log("本科");
        this.eduBgCode = "-d_203";
      } else if (val == "硕士") {
        console.log("硕士");
        this.eduBgCode = "-d_204";
      } else if (val == "博士") {
        console.log("博士");
        this.eduBgCode = "-d_205";
      }
      console.log(this.eduBgCode);
      this.productWebsite();
    },

    /************************************ 融资阶段 ******************************************/
    changeFinanStage(val) {
      if (val == "不限") {
        console.log("不限");
        this.finanCode = "";
      } else if (val == "未融资") {
        console.log("未融资");
        this.finanCode = "-t_801";
      } else if (val == "天使轮") {
        console.log("天使轮");
        this.finanCode = "-t_802";
      } else if (val == "A轮") {
        console.log("A轮");
        this.finanCode = "-t_803";
      } else if (val == "B轮") {
        console.log("B轮");
        this.finanCode = "-t_804";
      } else if (val == "C轮") {
        console.log("C轮");
        this.finanCode = "-t_805";
      } else if (val == "D轮及以上") {
        console.log("D轮及以上");
        this.finanCode = "-t_806";
      } else if (val == "已上市") {
        console.log("已上市");
        this.finanCode = "-t_807";
      } else if (val == "不需要融资") {
        console.log("不需要融资");
        this.finanCode = "-t_808";
      }
      console.log(this.finanCode);
      this.productWebsite();
    },
    /************************************ 公司规模 ******************************************/
    changeCompSize(val) {
      if (val == "不限") {
        console.log("不限");
        this.compSizeCode = "";
      } else if (val == "0-20人") {
        console.log("0-20人");
        this.compSizeCode = "-s_301";
      } else if (val == "20-99人") {
        console.log("20-99人");
        this.compSizeCode = "-s_302";
      } else if (val == "100-499人") {
        console.log("100-499人");
        this.compSizeCode = "-s_303";
      } else if (val == "500-999人") {
        console.log("500-999人");
        this.compSizeCode = "-s_304";
      } else if (val == "1000-9999人") {
        console.log("1000-9999人");
        this.compSizeCode = "-s_305";
      } else if (val == "10000以上") {
        console.log("10000以上");
        this.compSizeCode = "-s_306";
      }
      console.log(this.compSizeCode);
      this.productWebsite();
    },
    /************************************ 行业领域 ******************************************/
    changeField(val) {
      if (val == "不限") {
        console.log("不限");
        this.fieldCode = "";
      } else if (val == "电子商务") {
        console.log("电子商务");
        this.fieldCode = "i100001";
      } else if (val == "游戏") {
        console.log("游戏");
        this.fieldCode = "i100002";
      } else if (val == "媒体") {
        console.log("媒体");
        this.fieldCode = "i100003";
      } else if (val == "在线教育") {
        console.log("在线教育");
        this.fieldCode = "i100012";
      } else if (val == "O2O") {
        console.log("O2O");
        this.fieldCode = "i100008";
      } else if (val == "医疗健康") {
        console.log("医疗健康");
        this.fieldCode = "i100006";
      } else if (val == "社交网络") {
        console.log("社交网络");
        this.fieldCode = "i100001";
      } else if (val == "数据服务") {
        console.log("数据服务");
        this.fieldCode = "i100005";
      } else if (val == "生活服务") {
        console.log("生活服务");
        this.fieldCode = "i100007";
      }
      console.log(this.fieldCode);
      this.productWebsite();
    },
    /************************************ 工作地点 ******************************************/
    changeLocation(val) {
      if (val == "不限") {
        console.log("不限");
        this.locCode = "";
      } else if (val == "西湖区") {
        console.log("西湖区");
        this.locCode = "-b_西湖区";
      } else if (val == "滨江区") {
        console.log("滨江区");
        this.locCode = "-b_滨江区";
      } else if (val == "江干区") {
        console.log("江干区");
        this.locCode = "-b_江干区";
      } else if (val == "余杭区") {
        console.log("余杭区");
        this.locCode = "-b_余杭区";
      } else if (val == "拱墅区") {
        console.log("拱墅区");
        this.locCode = "-b_拱墅区";
      } else if (val == "萧山区") {
        console.log("萧山区");
        this.locCode = "-b_萧山区";
      } else if (val == "下城区") {
        console.log("下城区");
        this.locCode = "-b_下城区";
      } else if (val == "上城区") {
        console.log("上城区");
        this.locCode = "-b_上城区";
      } else if (val == "临安区") {
        console.log("临安区");
        this.locCode = "-b_临安区";
      } else if (val == "富阳区") {
        console.log("富阳区");
        this.locCode = "-b_富阳区";
      } else if (val == "桐庐县") {
        console.log("桐庐县");
        this.locCode = "-b_桐庐县";
      } else if (val == "建德市") {
        console.log("建德市");
        this.locCode = "-b_建德市";
      } else if (val == "淳安县") {
        console.log("淳安县");
        this.locCode = "-b_淳安县";
      } else if (val == "临安市") {
        console.log("临安市");
        this.locCode = "-b_临安市";
      }
      console.log(this.locCode);
      this.productWebsite();
    },
    /************************************ 薪资范围 ******************************************/
    changeSalary(val) {
      if (val == "不限") {
        console.log("不限");
        this.salaryCode = "";
      } else if (val == "3k以下") {
        console.log("3k以下");
        this.salaryCode = "y_2";
      } else if (val == "3k-5k") {
        console.log("3k-5k");
        this.salaryCode = "y_3";
      } else if (val == "5k-10k") {
        console.log("5k-10k");
        this.salaryCode = "y_4";
      } else if (val == "10k-15k") {
        console.log("10k-15k");
        this.salaryCode = "y_5";
      } else if (val == "15k-30k") {
        console.log("15k-30k");
        this.salaryCode = "y_6";
      } else if (val == "30k-50k") {
        console.log("30k-50k");
        this.salaryCode = "y_7";
      } else if (val == "50k以上") {
        console.log("50k以上");
        this.salaryCode = "y_8";
      }
      console.log(this.salaryCode);
      this.productWebsite();
    },
    /************************************ 发布时间 ******************************************/
    changeCommitTime(val) {
      if (val == "不限") {
        console.log("不限");
        this.timeCode = "&ka=sel-scale-0";
      } else if (val == "1天以内") {
        console.log("1天以内");
        this.timeCode = "&period=1&ka=sel-scale-1";
      } else if (val == "3天以内") {
        console.log("3天以内");
        this.timeCode = "&period=2&ka=sel-scale-2";
      } else if (val == "7天以内") {
        console.log("7天以内");
        this.timeCode = "&period=3&ka=sel-scale-3";
      } else if (val == "15天以内") {
        console.log("15天以内");
        this.timeCode = "&period=4&ka=sel-scale-4";
      } else if (val == "1个月以内") {
        console.log("一个月以内");
        this.timeCode = "&period=5&ka=sel-scale-5";
      }
      console.log(this.timeCode);
      this.productWebsite();
    },
    productWebsite() {
      this.finalWebsite =
        this.website +
        this.fieldCode +
        this.HangzhouCode +
        this.salaryCode +
        this.eduBgCode +
        this.expCode +
        this.compSizeCode +
        this.finanCode +
        this.locCode +
        "/?query=php" +
        this.timeCode;
      while (this.finalWebsite.indexOf("/-") != -1) {
        /* console.log("替换前" + this.finalWebsite); */
        this.finalWebsite = this.finalWebsite.replace("/-", "/");
        /* console.log("替换后" + this.finalWebsite); */
      }
      console.log('网址:' + this.finalWebsite);
    }
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

  .radio-group {
    display: flex;
    align-items: center;
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
  width: 1080px;
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
  width: 1080px;
  height: 50px !important;
  float: left;
  padding: 6px 16px;
  overflow: visible;
  background-color: #ffffff;
  border: 1px solid #DCDFE6 !important;
  border-radius: 4px;
}

.searchfilter-header {
  position: relative;
  margin-top: 16px;
  width: 1080px;
  height: 50px !important;
  float: left;
  margin-bottom: 16px;
  padding: 6px 16px;
  overflow: visible;
  background-color: #ffffff;
  border: 1px solid #DCDFE6 !important;
  border-radius: 4px;
}

.OrderWay {
  margin-right: 26px;
}
</style>