// 从npm复制示例代码进行修改
const keys = require('./keys')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt
const UserModel = require('../models/User')  // 引入数据库，这个文件暴露方法到主文件server中只是配置，调用依旧在路由api中

// opts对象传入配置方法中
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = (passport)=>{
  passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
    // console.log(jwt_payload)  //jwt_payload就是解析token后的值，id和name
    //done 会把值返回到服务器接口的req中
    //使用解析token获得的id，操作数据库，把用户信息存到req里
    UserModel.findById(jwt_payload.id).then(user=>{
      if(user) return done(null,user)
      return done(null,false)
    }).catch(err=>console.log(err))
  }))
}



