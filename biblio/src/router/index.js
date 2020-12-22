import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Gate from "../views/Gate.vue";
import Search from "../views/Search.vue";
import Paper from "../views/Paper.vue";
import Patent from "../views/Patent.vue";
import Project from "../views/Project.vue";
import MyInfo from "../views/MyInfo.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Admin from "../views/Admin.vue";
import PaperAdd from "../views/PaperAdd.vue";

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
    path: "/patent",
    name: "Patent",
    component: Patent,
  },
  {
    path: "/project",
    name: "Project",
    component: Project,
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
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/paperadd",
    name : "PaperAdd",
    component : PaperAdd
  },
];

const router = new VueRouter({
  routes,
});

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

export default router;
