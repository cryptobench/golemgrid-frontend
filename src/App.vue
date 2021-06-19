<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/NavBar.vue"

export default {
  components: {
    Navigation,
  },
}
</script>
<style>
.navbar-light .navbar-nav .nav-link {
  color: white !important;
}

.navbar-light .navbar-brand {
  color: white !important;
}
</style>
