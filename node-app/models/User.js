// 数据库表格，不需要引入已连接的数据库(这一步在服务器server.js里就可以了)
const mongoose = require('mongoose')  // 引入mongoose模块

// 设置表头
const UserSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  right:{
    type:String,
    required:true
  },
  avatar:{
    type:String
  },
  data:{
    type:Date,
    default:Date.now
  }
})

// 连接表格/创建表格
const UserModel = mongoose.model('User',UserSchema)
// 暴露数据库表格
module.exports = UserModel

