import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 用于mutations名（方便在vue插件中调控）
const types = {
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',  //判断是否登录有效
  SET_USER: 'SET_USER'  //存入用户信息
}
const state = {
  isAuthenticated: false,
  user:{}
}
const getters = {
  isAuthenticated: state=> state.isAuthenticated,
  user: state => state.user
}
const mutations = {
  [types.SET_AUTHENTICATED](state,isAuthenticated){
    if(isAuthenticated) state.isAuthenticated = isAuthenticated
    else state.isAuthenticated = false
  },
  [types.SET_USER](state,user){
    if(user) state.user = user
    else state.user = {}
  }
}
// 为什么要用到异步,直接在mutations里commit不好？
const actions = {
  setAuthenticated: ({commit},isAuthenticated)=>{
    commit(types.SET_AUTHENTICATED,isAuthenticated)
  },
  setUser: ({commit},user)=>{
    commit(types.SET_USER,user)
  },
  clearCurrentState: ({commit}) => {
    commit(types.SET_AUTHENTICATED,false)
    commit(types.SET_USER,null)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
