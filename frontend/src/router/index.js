import Vue from "vue";
import VueRouter from "vue-router";
import List from "../components/List.vue";
import Login from "../views/Login.vue"
import Signup from "../views/Signup.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "List",
    component: List,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
