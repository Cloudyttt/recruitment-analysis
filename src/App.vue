<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Mainpage from "./components/mainpage/mainpage";
import Header from "./components/header/header";
export default {
  data() {
    return {
    };
  },
  components: {
    name: "App",
    "v-mainpage": Mainpage,
    "v-header": Header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction column
  justify-content: center;
  background-color: #fafafa;
}

</style>
