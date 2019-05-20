// 引入express路由
const express = require('express')
const router = express.Router()
const passport = require('passport')  //引入token解析依赖

// 引入要用到的数据库
const MoneyModel = require('../../models/Money')

// 配置接口api路由

/**
 * $route   GET api/money
 * @desc    获取资金详情表格，不是对应用户的？后期补充
 * @access  public公开接口（是否需要token登录）
 */
router.get('/',(req,res)=>{
  MoneyModel.find().then( data => res.json(data) )
})
/**
 * $route   POST api/money/addMoney
 * @desc    添加资金详情信息，要登录才能调用，但是上传到数据库的这条数据没有用用户区分
 * @access  public公开接口（是否需要token登录）
 */
router.post('/addMoney',passport.authenticate('jwt',{session:false}),(req,res)=>{
  // 添加数据
  const body = req.body
  const moneyList = {}
  moneyList.type = body.type ? body.type : ''
  moneyList.describe = body.describe ? body.describe : ''
  moneyList.incode = body.incode ? body.incode : ''
  moneyList.expend = body.expend ? body.expend : ''
  moneyList.cash = body.cash ? body.cash : ''
  moneyList.remark = body.remark ? body.remark : ''
  
  new MoneyModel(moneyList).save().then(data=>{
    res.json(data)
  })
})

module.exports = router
