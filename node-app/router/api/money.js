// 引入express路由
const express = require('express')
const router = express.Router()
const passport = require('passport')  //引入token解析依赖

// 引入要用到的数据库
const MoneyModel = require('../../models/Money')

// 配置接口api路由

/**
 * $route   GET api/money
 * @desc    获取资金详情表格
 * @access  public公开接口（是否需要token登录）
 */
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
  MoneyModel.find().then( data => {
    if(!data) return res.status(404).json('没有任何内容')
    res.json(data)
  } ).catch(err=>res.status(404).json(err))
})
/**
 * $route   GET api/money/:id
 * @desc    根据id表格的一条数据
 * @access  public公开接口（是否需要token登录）
 */
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  MoneyModel.findOne({_id:req.params.id}).then( data => {
    if(!data) return res.status(404).json('输入的资金id没有数据')
    res.json(data)
  } ).catch(err=>res.status(404).json(err))
})
/**
 * $route   POST api/money/addMoney
 * @desc    添加资金详情信息，要登录才能调用
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
