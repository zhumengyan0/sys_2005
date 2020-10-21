import Vue from "vue";
import Vuex from "vuex";
//刷新页面会丢失信息，所以要从localStorage中去取出
let userInfo = localStorage.getItem("stu-userInfo") || '{}'
//加上一个短路运算
userInfo=JSON.parse(userInfo)
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo,
  },
  mutations: {
    //更改userInfo
    SET_USERINFO(state,payload){
      state.userInfo=payload
    }
  },
  actions: {
    
  },
  getters: {
    
  },
  modules: {
    
  }
});
