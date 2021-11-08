import { createApp } from "vue"
import App from "./App.vue"
import "./index.css"
import "./assets/tailwind.css"
import store from "./store"
import router from "./router"
import axios from "axios"

const app = createApp(App)
app.use(router)
app.use(store)
app.config.globalProperties.axios = axios
app.config.globalProperties.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
app.mount("#app")
