<template>
  <nav class="navbar">
    <div class="navbar_left">
      <router-link class="link link--primary" to="/"
        ><img
          src="https://img.icons8.com/fluency-systems-regular/30/000000/home.png"
      /></router-link>
    </div>

    <div class="navbar_right">
      <notifications v-if="isLogged" />

      <div v-if="!isLogged">
        <button
          class="btn btn-red signup"
          @click="$router.push({ path: '/signup' })"
        >
          S'inscrire
        </button>
        <button
          class="btn btn-blue signin"
          @click="$router.push({ path: '/signin' })"
        >
          Se connecter
        </button>
      </div>
      <div v-if="isLogged">
        <button
          class="btn btn-red signup"
          @click="$router.push({ path: profilPath })"
        >
          Profil
        </button>
        <button class="btn btn-blue signin" @click="logout">
          Se déconnecter
        </button>
      </div>
    </div>
  </nav>
</template>

<script>

import VueJwtDecode from "vue-jwt-decode";
import Notifications from "./Notifications.vue";

export default {
  name: "Navbar",

  components: {
    Notifications,
  },

  computed: {
    isLogged() {
      return this.$store.getters.isLogged;
    },
    userId() {
      const token = localStorage.accessToken;
      const id = VueJwtDecode.decode(token).id;
      return id;
    },
    profilPath() {
      const token = localStorage.accessToken;
      let role = VueJwtDecode.decode(token).role;
      let id = VueJwtDecode.decode(token).id;
      role = role.toLowerCase();
      return `/${role}/${id}`;
    },

  },

  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => this.$router.push("/"));
    },

  },

  mounted() {},
};
</script>
<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background: #fff;

  &_right {
    display: flex;
    align-items: center;
  }
}

.navbar .navbar_right .signup {
  position: relative;
}


.navbar_right button {
  margin-right: 10px;
}

</style>
