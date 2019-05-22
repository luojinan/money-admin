<template>
  <div class="user-info">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img :src="user.avatar" alt="">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          用户名：{{user.name}}
          身份：{{user.right}}
          ...
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
  }
}
</script>

<style scoped>

</style>
