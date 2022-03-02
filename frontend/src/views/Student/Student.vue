<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
    };
  },
  mounted() {
    this.$store.dispatch("setUser", this.$route.params.id);
    this.$store.dispatch("studentOrUserMissions", this.$route.params.id);

   
  },
};
</script>
