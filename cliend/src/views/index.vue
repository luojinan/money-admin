<template>
  <div>
    <head-nav></head-nav>
    <side-bar></side-bar>
    主页
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

<style scoped>

</style>
