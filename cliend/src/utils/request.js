import axios from "axios"

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
const service = axios.create({
  baseURL: "http://localhost:5000", // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config =>{
    startLoading()
    return config
  },
  err =>{
    return Promise.reject(err)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    endLoading()
    return response
  },
  err =>{
    endLoading()
    Message.error(err.response.data)
  }
)