<template>
  <div class="home-page">
    <h1>资金管理平台</h1>
    <p>这是一个简易的全栈项目，前端没有用到element-admin的模版，而是自己写的</p>
  </div>
</template>

<script>
export default {
  name:'',
  data(){
   return {

   }
  }
}
</script>

<style scoped lang="scss">
.home-page{
  width: 100%;
  height: calc(100vh - 71px);
  background: url('../../assets/1.png') no-repeat;
  background-size: 100% 100%;
  h1{
    font-size: 30px;
  }
  p{
    font-size: 22px;
    margin-top: 50px;
  }
} 
</style>
