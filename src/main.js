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

Vue.config.productionTip = false;
//在vue中使用全局ElementUI
Vue.use(ElementUI);

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
