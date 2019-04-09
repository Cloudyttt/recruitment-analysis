<template>
  <div class="v-header">
		<el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-row>
                        <el-col :span="8">
                            <div id="header-logo">
                                <img src="/static/logo/logo-like.png" height="30" width="30">
                                <strong>云鱼</strong>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div id="header-location">
                                <strong id="header-location-current">杭州站</strong>
                                <!-- <em id="header-location-change">「切换城市」</em> -->
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="">
                </div>
            </el-col>

            <el-col :span="8" id="header-manage">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/accountmanage' }">账号设置</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/collection' }">我的收藏</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/register' }">注册</el-breadcrumb-item>
                <el-breadcrumb-item>
                    <el-dropdown size="small" type="primary">
                        <span class="el-dropdown-link">
                            {{username}} <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" id=“header-el-dropdown-menu”>
                            <el-dropdown-item icon="el-icon-bell" divided>我的消息</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-edit" :to="{ path: '/accountmanage' }" divided>账号设置</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-check" to="/accountmanage" divided>职位推荐</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-star-on" divided>我的标签</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-back" divided>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
import Register from "../register/register";
import Login from "../login/login";
export default {
    data() {
        return {
            username: '俞浩天',
            activeIndex: '1',
            activeIndex2: '1'
        };
    },
    components: {
        "v-register": Register,
        "v-login": Login,
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
/* CSS Document */
html, body, div, span, object, iframe,h1, h2, 
h3, h4, h5, h6, p, blockquote, pre,abbr, address, cite, code,del, dfn, 
em, img, ins,kbd, q, samp,small, strong, sub, sup, var,b, i,dl, dt, dd, 
ol, ul, li,fieldset, form, label, legend,table, caption, tbody, 
tfoot,thead,tr, th, td,article, aside, canvas, details, figcaption, 
figure, footer, header, hgroup, menu, nav, section, summary,time, mark, 
audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
    outline-style:none;/*FF*/ 
}

body {
    line-height:1;
}
 
a{
    margin:0;
    padding:0;
    border:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
    text-decoration:none
     
}
table {
    border-collapse:collapse;
    border-spacing:0;
}
 
input, select {
    vertical-align:middle;
}

/*css为clearfix，清除浮动*/
.clearfix::before,
.clearfix::after{
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
}
.clearfix:after{clear:both;} 
.clearfix{ 
    *zoom:1;/*IE/7/6*/
}
.el-row {
    margin-bottom: 20px;
    height 44px;
    &:last-child {
    margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
    height 44px
}
.grid-content {
    border-radius: 4px;
    min-height: 50px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
.v-header{
    height: 60px;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fafafa;
}
#header-logo{
    display flex
    flex-direction row
    align-items flex-end
    justify-content flex-start
    height 44px
    line-height 44px
    margin-left 10px
    strong{
        margin-left: 10px;
        color: #333;
        font-size: 30px;
        font-weight: 700;
        height 30px
        line-height 30px
    }
    #header-logo-title{
        font-size 30px
        font-weight bold
        margin-left 10px
    }
}
#header-location{
    display flex
    flex-direction row
    align-items flex-end
    justify-content flex-start
    height 44px
    line-height 44px
    #header-location-current{
        font-size 20px
        height 30px
        line-height 30px
    }
    #header-location-change{
        font-size 10px
        color #999
        height 30px
        line-height 30px
    }
}
#header-manage{
    height 60px
    display flex
    flex-direction row
    align-items center
    justify-content space-around 
    font-size 16px  
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 10px;
}
#header-el-dropdown-menu{
    font-size 10px;
}
</style>