import Vue from "vue";

// 使用 Event Bus来实现非父子组件之间的通信
const bus = new Vue();

Vue.prototype.$bus = {
  $on(...param) {
    bus.$on(...param);
  },
  $off(...param) {
    bus.$off(...param);
  },
  $once(...param) {
    bus.$once(...param);
  },
  $emit(...param) {
    bus.$emit(...param);
  },
};

export default bus;
