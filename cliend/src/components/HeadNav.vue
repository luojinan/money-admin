<template>
  <div class="head-nav">
    <el-row>
      <!-- 左边logo -->
      <el-col :span="6" class="logo-container">
        <img src="../assets/404_images/404.png" class="logo" alt="">
        <span class='title'>资金后台管理平台系统</span>
      </el-col>
      <!-- 右边用户信息 -->
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img :src="user.avatar" alt="" class="avatar">
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <!-- 下拉箭头 -->
          <span class="username">
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'',
  computed:{
    user(){
      return this.$store.getters.user
    }
  },
  data(){
   return {
   }
  },
  methods:{
    setDialogInfo(command){
      // console.log(command)
      switch(command){
        case 'info':
          this.showInfoList()
          break
        case 'logout':
          this.logout()
          break
      }
    },
    showInfoList(){
      this.$router.push('userinfo')
    },
    logout(){
      // 清除本地token
      localStorage.removeItem('eleToken')
      // 清除vuex
      this.$store.dispatch('clearCurrentState')
      // 跳转登录页面
      this.$router.push('login')
    }
  }
}
</script>

<style scoped lang="scss">
.el-icon--right{
  color: #fff;
}
.head-nav {
  width:100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background-color: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
  .logo-container{
    line-height: 60px;
    min-width: 400px;
    .logo{
      height: 50px;
      width: 50px;
      margin-right: 5px;
      vertical-align: middle;
      display: inline-block;
    }
  }
  .user{
    float:right;
    .userinfo{
      .avatar{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
      }
      .welcome{
        display: inline-block;
        width: auto;
        vertical-align: middle;
        padding: 0 5px;
        .name{
          line-height: 20px;
          text-align: center;
          font-size: 14px;
        }
        .comename{
          font-size: 12px;
        }
        .avatarname{
          color: #409eff;
          font-weight: bolder;
        }
      }
    }
  }
}
</style>
