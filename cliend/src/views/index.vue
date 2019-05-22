<template>
  <div class="index">
    <head-nav></head-nav>
    <side-bar></side-bar>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
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
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  .rightContainer{
    position:relative;
    top: 0;
    left: 180px;
    width: calc(100% - 180px);
    height: calc(100% - 71px);
    overflow: hidden;
  }
}
</style>
