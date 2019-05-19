// 服务器路由api 路径get/post
const express = require('express')  //引入express
const router = express.Router()     //使用express的路由实例

const bcrypt = require('bcrypt')    //引入加密模块（处理密码）在npm官网查看使用详情
const gravatar = require('gravatar')  // 引入头像依赖
const jwt = require('jsonwebtoken')   // 引入制作token的依赖
const keys = require('../../config/keys')
const passport = require('passport')  //引入token解析依赖
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
                password:req.body.password,
                right:req.body.right
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

/**
 * $route   POST api/users/login
 * @desc    登录接口 接收post数据，数据库判断是否存在/密码错误
 * @access  public公开接口（是否需要token登录）
 */
router.post('/login',(req,res)=>{
  const email = req.body.email
  const password = req.body.password
  // {email} 是es6语法 相当于 { "email":email }
  UserModel.findOne({email}).then(user=>{
    // 判断用户是否存在
    if(!user) return res.status(400).json({email:'用户不存在'})
    // 判断密码是否正确，bcrypt加密过数据库里的密码, (输入的密码，数据库查询后的密码)
    bcrypt.compare(password, user.password).then(isMatch =>{
      // 匹配输入密码与数据库密码一致为 true
      if(isMatch){
        // res.json({msg:'login success'})
        // jwt.sign("规则","加密名字","过期时间","箭头函数")
        const rult = {id:user.id, name:user.name,avatar:user.avatar} //规则：用于制作成唯一的tiken
        jwt.sign(rult,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
          if(err) throw err
          res.json({
            success:true,
            token: 'Bearer '+token  // token名字(写死)
          })
        })
      }
      else return res.status(400).json({password:'密码错误'})
    })
  })
})

/**
 * $route   GET api/users/current
 * @desc    获取当前登录用户信息
 * @access  public公开接口（是否需要token登录）
 */
// 路由方法（"末端路径",passport结合passport-jwt token依赖解析,回调函数）
router.get("/current",passport.authenticate('jwt',{session:false}),(req,res)=>{
  // res.json({msg:'解析token调用成功'})
  // res.json(req.user)
  res.json({
    name:req.user.name,
    email:req.user.email,
    id:req.user.id
  })
})

// 暴露路由
module.exports = router