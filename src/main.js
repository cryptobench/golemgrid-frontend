import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"

import axios from "axios"

Vue.use({
  install(Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: "http://api:8002/v1/",
    })
  },
})
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
