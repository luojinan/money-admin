<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <el-form ref="loginForm" v-show="islogin" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">登录</h3>
      <!-- 输入框--用户名 -->
      <el-form-item prop="email">
        <span class="svg-container">邮箱</span>
        <el-input v-model="loginForm.email" name="email" type="text" auto-complete="on" placeholder="email" />
      </el-form-item>
      <!-- 输入框--密码 -->
      <el-form-item prop="password">
        <span class="svg-container">密码</span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          眼睛
          <!-- <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" /> -->
        </span>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 注册表单 -->
    <el-form ref="logupForm" v-show="!islogin" :model="logupForm" :rules="logupRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">注册</h3>
      <!-- 输入框--邮箱 -->
      <el-form-item prop="email">
        <span class="svg-container">邮箱</span>
        <el-input v-model="logupForm.email" name="email" type="text" auto-complete="on" placeholder="email" />
      </el-form-item>
      <!-- 输入框--密码 -->
      <el-form-item prop="password">
        <span class="svg-container">密码</span>
        <el-input
          :type="pwdType"
          v-model="logupForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogup" />
        <span class="show-pwd" @click="showPwd">
          眼睛
          <!-- <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" /> -->
        </span>
      </el-form-item>
      <!-- 输入框--确认密码 -->
      <el-form-item prop="password">
        <span class="svg-container">确认密码</span>
        <el-input
          :type="pwdType"
          v-model="logupForm.surePassword"
          name="password"
          auto-complete="on"
          placeholder="password" />
        <span class="show-pwd" @click="showPwd">
          眼睛
          <!-- <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" /> -->
        </span>
      </el-form-item>
      <!-- 输入框--用户名 -->
      <el-form-item prop="name">
        <span class="svg-container">昵称</span>
        <el-input v-model="logupForm.name" name="name" type="text" auto-complete="on" placeholder="name" />
      </el-form-item>
      <!-- 选择框--权限 -->
      <el-form-item prop="right">
      <el-select v-model="logupForm.right" placeholder="请选择">
        <el-option
          v-for="item in right"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </el-form-item>
      <!-- 注册按钮 -->
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogup">
          注册
        </el-button>
      </el-form-item>
    </el-form>
    <div class="tips">
      <el-button type="primary" @click="showLogin">
        {{islogin?'去注册':'去登录'}}
      </el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {login,test} from '../api/login'
export default {
  name: 'Login',
  data() {
    return {
      islogin:true,       // 展示登录还是注册
      right:[{            // 注册信息权限选择的数据
        label:'管理员',
        value:'manage'
      },{
        label:'普通用户',
        value:'user'
      }],
      loginForm: {
        email: 'test@test.com',
        password: '123456'
      },
      logupForm: {
        email: 'test@test.com',
        password: '123456',
        name:'',
        surePassword:'123456',
        right:''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: '' }],
        password: [{ required: true, trigger: 'blur', validator: '' }]
      },
      logupRules: {
        email: [{ required: true, trigger: 'blur', validator: '' }],
        password: [{ required: true, trigger: 'blur', validator: '' }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  created() {
    this.test()
  },
  methods: {
    async test() {
    },
    showPwd() {
    },
    showLogin(){
      this.islogin = !this.islogin
    },
    async handleLogin() {
      console.log(this.loginForm)
      const res = await login(this.loginForm)
      // const res = await axios.post('api/users/login',this.loginForm)
      if (res){
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push('homepage')
      }else console.log('接口没有请求到或者没有数据')
    },
    async handleLogup() {
      const res = await register(this.logupForm)
      if (res) console.log(res)
      else console.log('接口没有请求到或者没有数据')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    .el-select{
      width: 100%;
      .el-input{
        width: 100%;
      }
    }
  }
}

</style>
<style scope lang="scss">
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    display: flex;
    justify-content: flex-end;
    margin: 10px 10px 0 0;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

