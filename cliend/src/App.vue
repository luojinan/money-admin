<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'      //引入解析token模块
import {isEmpty} from './utils/util'   //引入工具方法，判断值是否为空

export default {
  name:'app',
  created(){
    // 解决刷新就把vuex里的数据清空的问题，这里写一个，在刷新时，会执行
    if(localStorage.eleToken){
      const result = jwtDecode(localStorage.eleToken)
      this.$store.dispatch('setAuthenticated',!isEmpty(result))
      // 解析后的值存入vuex用户
      this.$store.dispatch('setUser',result)
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
