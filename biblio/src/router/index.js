import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Gate from "../views/Gate.vue";
import Search from "../views/Search.vue";
import Paper from "../views/paper.vue";
import PaperDetail from "../views/paperdetail.vue";

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
  {
    path: "/paper",
    name: "Paper",
    component: Paper
  },
  {
    path: "/paperdetail",
    name: "PaperDetail",
    component :PaperDetail
  }
];

const router = new VueRouter({
  routes,
});

export default router;
