import axios from "axios"
import router from "../router"

// 按需引入element-ui，main里全局引入的是在vue文件中的
import { Message, MessageBox,Loading } from 'element-ui'

// 设置每个请求都有一个loading动画
let loading
function startLoading() {
  loading = Loading.service({
    lock:true,
    text:'拼命加载中...',
    background:'rgba(0,0,0,0.7)'
  })
}
function endLoading(){
  loading.close()
}
// 创建axios实例
const server = axios.create({
  baseURL: "/api", // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
server.interceptors.request.use(
  config =>{
    startLoading()
    // 登录状态，发起请求自动添加一个请求头
    if(localStorage.eleToken) config.headers.Authorization = localStorage.eleToken
    return config
  },
  err =>{
    return Promise.reject(err)
  }
)

// response 拦截器
server.interceptors.response.use(
  response => {
    endLoading()
    return response
  },
  err =>{
    endLoading()
    Message.error(err.response.data)
    // 登录状态带着请求头请求，但是token是过期的无效的
    if(err.response.status == 401) {
      Message.error('token失效，请求重新登录')
      localStorage.removeItem('eleToken')
      router.push('login')
    }
  }
)
export default server