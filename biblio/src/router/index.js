import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Gate from "../views/Gate.vue";
import Search from "../views/Search.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/gate",
    name: "Gate",
    component: Gate,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
];

const router = new VueRouter({
  routes,
});

export default router;