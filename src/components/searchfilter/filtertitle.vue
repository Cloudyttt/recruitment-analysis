<template>
    <div class="filtertitle" v-on:click="changeState">
        {{title}}
<!--         <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-cha"></use>
        </svg> -->
    </div>
</template>
<script type="text/ecmascript-6">
export default {
	data(){
		return{
            isSelelcted: false
        }
    },
    methods: {
        changeState: function(){

        }        
    },
    props: {
        title: String,
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.filtertitle{
    float: left;
    display: inline-block;
    padding: 5px 8px;
    margin: 6px 5px 6px 0;
    height: 14px;
    line-height: 14px;
    cursor: pointer;
    font-size: 14px;
    color: #555;
}
</style>