import Vue from "vue";
import Base from "./base.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element";
import "./assets/icons";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import echarts from "echarts";
import "./utils/bus.js";
import "./http/axios.js";

Vue.use(ElementUI);
Vue.use(Base);

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
