// 数据库表格，不需要引入已连接的数据库(这一步在服务器server.js里就可以了)
const mongoose = require('mongoose')  // 引入mongoose模块

// 设置表头
const MoneySchema = mongoose.Schema({
  type:{
    type:String
  },
  // 收支描述
  describe:{
    type:String
  },
  // 收入
  incode:{
    type:String,
    required:true
  },
  // 支出
  expend:{
    type:String,
    required:true
  },
  // 余额
  cash:{
    type:String,
    required:true
  },
  // 备注
  remark:{
    type:String
  },
  data:{
    type:Date,
    default:Date.now
  }
})

// 连接表格/创建表格
const MoneyModel = mongoose.model('Money',MoneySchema)
// 暴露数据库表格
module.exports = MoneyModel

