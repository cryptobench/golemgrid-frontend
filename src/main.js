import { createApp } from "vue"
import App from "./App.vue"
import "./index.css"
import "./assets/tailwind.css"
import store from "./store"
import router from "./router"
import setupInterceptors from "./services/setupInterceptors"
setupInterceptors(store)

const app = createApp(App)
app.use(router)
app.use(store)
// app.config.globalProperties.axios = instance
// app.config.globalProperties.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
app.mount("#app")
