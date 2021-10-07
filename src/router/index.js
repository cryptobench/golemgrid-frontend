import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import TaskInfo from "../views/TaskInfo.vue"

const routes = [
  {
    path: "/",
    name: "Home",
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
