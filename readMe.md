笔记目录：
[1.创建服务器项目](https://app.yinxiang.com/shard/s11/nl/18783918/ade5efc8-3202-4ef2-a4d3-83d6397a059d)
[2.创建前端项目](https://app.yinxiang.com/shard/s11/nl/18783918/84a7aec9-8c50-43ba-bfc4-dde6fc6a6a63)

重点难点
> 服务器项目创建结构

一个model数据库，一个router接口集api

> 服务器api怎么设置匹配token，怎么设置某接口请求头有token才能访问？
设置某接口要请求头，就是解析写在接口路径后的模块方法


> 留坑--怎么两个文件夹用一个命令npm run（网上的都是前端放后端里，或者后端放前端里,没有分离）

> 前端跨域问题，配置了代理，在封装axios实例后跨域失败？
```js
// 创建axios实例
const server = axios.create({
  baseURL: "/api", // api 的 base_url
  timeout: 5000 // 请求超时时间
})
```
这里的`baseURL`不能设置成服务器全称地址`http://localhost:5000/api`
代理配置之后所有用到这个地址的地方都直接用`/api`

> 请求拦截，登录状态时设置请求头，并配置失效的响应

> 前端解析token，用户信息存入本地并存入vuex

> 前端侧边栏

> 表格数据不是跟用户对应上的，怎么弄

> 前端搜索接口，增删查改接口

> 接口分页功能，前端分页刷新获取数据

> 接口筛选功能

> 权限功能视频里没有？

TODO

1. 补充注册登录前端验证拦截输入
2. 补充注册的流程，自动登录
3. 路由拦截的时候，不直接返回登录页面，而是弹窗
4. 首页默认进入，侧边栏不是选中状态
5. 晚上首页，个人信息页样式