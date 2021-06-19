<template>
  <div id="app">
    <Navigation></Navigation>
    <b-container class="mt-3">
      <router-view />
    </b-container>
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

.card {
  box-shadow: 0 2px 4px rgb(126 142 177 / 10%);
}
</style>
