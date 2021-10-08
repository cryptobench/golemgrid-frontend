import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import TaskInfo from "../views/TaskInfo.vue"
import Blender from "../views/Blender.vue"

const routes = [
  {
    path: "/blender",
    name: "Home",
    component: Blender,
  },
  {
    path: "/",
    name: "Dashboard",
    component: Home,
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
