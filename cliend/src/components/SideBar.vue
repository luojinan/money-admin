<template>
<el-row class="side-bar">
  <el-col>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#324057"
      text-color="#fff"
      active-text-color="#4094ff">

      <!-- 侧边栏分两种情况：1.没有子项2.有子项 -->
      <template v-for="(item,index) in sideItems">
        <!-- 没有子项 -->
        <el-menu-item v-if="!item.children" :index="item.path" :key="index" @click="toRouter(item.path)">
          <span>{{item.name}}</span>
        </el-menu-item>
        <!-- 有子项 -->
        <el-submenu v-else :index="item.path" :key="item.path">
          <template slot="title">{{item.name}}</template>
          <el-menu-item v-for="(citem,cindex) in item.children" :key="cindex" :index="citem.path" @click="toRouter(item.path)">
            <span>{{citem.name}}</span>
          </el-menu-item>
        </el-submenu>
      </template>

    </el-menu>
  </el-col>
</el-row>
</template>

<script>
export default {
  name:'',
  data(){
   return {
     sideItems:[{
       name:'首页',
       path:'homepage'
     },{
       name:'资金管理',
       path:'fund',
       children:[{name:'资金流水',path:'fundlist'}]
     },{
       name:'信息管理',
       path:'info',
       children:[{name:'个人信息',path:'infoshow'}]
     }]
   }
  },
  methods:{
    toRouter(path){
      this.$router.push(`${path}`)
    }
  }
}
</script>

<style scoped lang="scss">
.side-bar{
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
  .el-menu{
    border:none;
  }
  .el-menu-vertical-demo{
    width: 35px;
    .el-submenu .el-menu-item{
      min-width: 180px;
    }
    &:not(.el-menu--collapse){
      width: 180px;
      min-height: 400px;
    }
  }
}
</style>
