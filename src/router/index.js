import Vue from "vue"
import VueRouter from "vue-router"
import Blender from "../views/Blender.vue"
import TaskInfo from "../views/TaskInfo.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Blender",
    component: Blender,
  },
  {
    path: "/task/:id",
    name: "taskinfo",
    component: TaskInfo,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
