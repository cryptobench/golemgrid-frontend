<template>
  <div id="app">
    <Navigation class="z-50"></Navigation>
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/NavBar.vue"
import EventBus from "@/common/EventBus"

export default {
  components: {
    Navigation,
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout")
      this.$router.push({ name: "Login" })
    },
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut()
    })
  },
  beforeUnmount() {
    EventBus.remove("logout")
  },
}
</script>
<style>
/* Overflow-x causes extra scroll at bottom of page. Not sure why currently.
html,
body {
  width: 100%;
  height: 100vw;
  margin: 0px;
  padding: 0px;
  overflow-x: hidden;
} */
</style>
