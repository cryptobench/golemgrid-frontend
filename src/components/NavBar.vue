<template>
  <div class="nav-main">
    <b-container>
      <b-navbar toggleable="lg">
        <b-navbar-brand href="#">GolemGrid</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Dashboard</b-nav-item>
            <b-nav-item href="#">Compute Engine</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ms-auto">
            <b-nav-item-dropdown text="GolemUser" right>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Wallet</b-dropdown-item>
              <b-dropdown-item href="#">Logout</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item href="#"><b-icon icon="gear-fill" aria-hidden="true"></b-icon></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Navigation",
}
</script>
<style>
.nav-main {
  background-color: #0e15c5;
}

.navbar-light .navbar-nav .nav-link {
  color: white !important;
}

.navbar-light .navbar-brand {
  color: white !important;
}
</style>
