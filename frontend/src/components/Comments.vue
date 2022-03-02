<template>
  <div class="comments">
    <pre>{{ comments }} </pre>
    <li v-for="comment in comments" :key="comment._id">
      {{ comment.content }}
    </li>
  </div>
</template>
<script>
export default {
  name: "Comments",
  data() {
    return {
      
    };
  },
  mounted() {
    this.$store.dispatch("getComment", this.$route.params.id);
   
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    },
  },
};
</script>
<style scoped></style>
