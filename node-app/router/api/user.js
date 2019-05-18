// 服务器路由api 路径get/post
const express = require('express')  //引入express
const router = express.Router()     //使用express的路由实例

// 配置路由详细情况，路径末端名（qpi名），响应方法
// 变成规范，注释写好接口的路径和简介
/**
 * $route   GET api/users/test
 * @desc    测试返回一个写死的json对象
 * @access  public公开接口（是否需要token登录）
 */
router.get("/test",(req,res)=>{
  res.json({msg:"测试接口返回一个json对象"})
})

/**
 * $route   POST api/users/register
 * @desc    注册接口，接受post数据，先测试返回post对象
 * @access  public公开接口（是否需要token登录）
 */
router.post("/register",(req,res)=>{
  res.json(req.body)  //postman测试接收到的post数据
})

// 暴露路由
module.exports = router