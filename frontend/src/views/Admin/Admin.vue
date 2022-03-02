<template>
  <div>
    <h1>Administration</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getUsers");
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
  margin: 10px;
}
</style>
