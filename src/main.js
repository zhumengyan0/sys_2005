import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//引入自定义的css样式
import "@/assets/styles/base.css"
import "@/assets/styles/el-reset.css"
//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Vue.config.productionTip = false;
//在vue中使用全局ElementUI
Vue.use(ElementUI);

//路由前置钩子（导航守卫）
router.beforeEach((to,from,next)=>{
  // console.log(to);
  // console.log(from);
  // console.log(next);
  let token = localStorage.getItem("stu-token")
  if(token){
    //用户登录过后localstorage就会有token，
    //如果是注册页面或登录页面，直接放行
    next()
  }else{
    if(to.path=="/login"){
      //如果访问的页面是登录注册页面，放行
      next()
    }else{
      //访问的不是登录注册页面，跳转到登录注册页面
      next({path:"/login"})
    }
  }
})

//按需引入
// import { Carousel,CarouselItem } from "element-ui"

//注册全局组件
// Vue.component("el-carousel",Carousel)
// Vue.component("el-carousel-item",CarouselItem)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
