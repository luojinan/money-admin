// 服务器路由api 路径get/post
const express = require('express')  //引入express
const router = express.Router()     //使用express的路由实例

const bcrypt = require('bcrypt')    //引入加密模块（处理密码）在npm官网查看使用详情
const gravatar = require('gravatar')  // 引入头像依赖

// 引入已连接的数据库表格
const UserModel = require('./../../models/User.js')

// 配置路由详细情况，路径末端名（qpi名），响应方法
// 编程规范，注释写好接口的路径和简介
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
  // res.json(req.body)  //postman测试接收到的post数据
  UserModel.findOne({email:req.body.email})
           .then((user)=>{
            // 判断是邮箱已存在
            if(user) return res.status(400).json({email:"邮箱已被占用！"})  // 编写接口请求失败提示语法
            else {
              // 调用头像依赖
              const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})  // 'mm'是默认头像

              const newUser = new UserModel({
                name:req.body.name,
                avatar,
                email:req.body.email,
                password:req.body.password
              })
              // 对post数据的密码进行加密
              bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    // hash是加密后的值
                    if(err) throw err
                    newUser.password = hash
                    //加密后存入数据库
                    newUser.save().then(user=>res.json(user)) //存入数据库表格成功，在调控台测试查看存入的数据
                                  .catch(err=>console.log(err))
                })
              })
            }
           })
})

// 暴露路由
module.exports = router