<template>
  <div class="index">
    <head-nav></head-nav>
    <side-bar></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import headNav from '../components/HeadNav'   // 引入头部导航栏组件
import sideBar from '../components/SideBar'   // 引入侧边栏组件
export default {
  name:'index',
  components:{
    headNav,
    sideBar
  },
  data(){
   return {

   }
  }
}
</script>

<style scoped lang="scss">
.index{
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
