<template>
  <div id="main">
    <navbar ref="navbar" />
    <div class="app__container">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import VueJwtDecode from "vue-jwt-decode";

require("dotenv").config();

export default {
  components: {
    Navbar,
  },

  data() {
    return {
      height: "",
    };
  },

  mounted() {
    const navbar = document.querySelector(".navbar");
    let navbarHeight = navbar.clientHeight + 1;
    this.height = `calc(100vh - ${navbarHeight}px)`;
    if (localStorage.accessToken) {
      this.$store.dispatch("setIsLogged", true);
      this.$store.dispatch(
        "setUser",
        VueJwtDecode.decode(localStorage.accessToken).id
      );
      this.$store.dispatch("getNotifications");
    }
  },
};
</script>
<style src="../css/reset.css"></style>
<style lang="scss" src="./assets/_variables.scss"></style>
<style lang="scss">

html,
body {
  min-height: 100vh;
}
body {
  font-family: sans-serif;
}

</style>
<style src="../css/css.css"></style>
