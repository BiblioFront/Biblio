import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Gate from "../views/Gate.vue";
import Search from "../views/Search.vue";
import Paper from "../views/paper.vue";
import MyInfo from "../views/MyInfo.vue";
import PaperDetail from "../views/paperdetail.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

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
    path: "/info",
    name: "MyInfo",
    component: MyInfo,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/paper",
    name: "Paper",
    component: Paper,
  },
  {
    path: "/paperdetail",
    name: "PaperDetail",
    component: PaperDetail,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
