<template>
  <div class="dashboard">
    <div>
      <button class="btn btn-red">
        <router-link
          :to="{
            path: `/admin/${this.$route.params.id}/all`,
          }"
        >
          Tous les utilisateurs
        </router-link>
      </button>
      <!-- <button class="btn btn-blue">
      <router-link
        :to="{
          path: `/admin/${this.$route.params.id}/all`,
          query: { search: 'admins' },
        }"
      >
        Administrateurs
      </router-link>
      </button>
      <button class="btn btn-yellow">
      <router-link
        :to="{
          path: `/admin/${this.$route.params.id}/all`,
          query: { search: 'students' },
        }"
      >
        Etudiants
      </router-link>
      </button>
      <button class="btn btn-red">
      <router-link
        :to="{
          path: `/admin/${this.$route.params.id}/all`,
          query: { search: 'users' },
        }"
      >
        Utilisateurs
      </router-link>
      </button> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Dashboard",
  components: {},
};
</script>
<style scoped>
.btn {
  margin: 10px;
}
</style>
