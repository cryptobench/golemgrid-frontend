import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import TaskInfo from "../views/TaskInfo.vue"
import Blender from "../views/Blender.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"

const routes = [
  {
    path: "/blender",
    name: "blender",
    component: Blender,
  },
  {
    path: "/",
    name: "Dashboard",
    component: Home,
  },
  {
    path: "/auth/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/auth/signup",
    name: "Register",
    component: Register,
  },
  {
    path: "/task/:id",
    name: "taskinfo",
    component: TaskInfo,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
