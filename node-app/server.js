// 创建服务器，并简单配置开启
const express = require('express')
const bodyParser = require('body-parser') //引入处理post对象的中间件
const mongoose = require('mongoose')  // 引入数据库mongoose模块
const keys = require('./config/keys') //引入配置常量

// 引入服务器路由
const users = require('./router/api/user')

//实例化服务器(不用new？)
const app = express()
// 连接数据库
console.log(keys.mongoUrl)
mongoose.connect(keys.mongoUrl,{ useNewUrlParser: true })
        .then(()=>{console.log('mongodb connected')})
        .catch(err=>{console.log(err)})

//端口号，配置成变量，方便分成生产环境(上线)和开发环境(本地)
// process.env.PORT是打包配置的变量（这里暂时没配置）
const port = process.env.PORT || 5000

//使用post中间件
app.use(bodyParser.urlencoded({extended:false}))  //配置处理成对象
app.use(bodyParser.json())

// 配置路由根路由测试
app.get('/',(req,res)=>{
  res.send('Hello World!')
})

// 使用路由中间件,路径的前面部分，结合上api文件定义的路径末端
app.use('/api/users',users)

// 配置服务器端口，传入端口变量和回调
app.listen(port,()=>{
  console.log(`Server running on port ${port}`)
})