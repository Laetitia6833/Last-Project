<template>
  <div class="comments__section">
    <h2>Avis des utilisateurs</h2>
    <div class="comments__container">
      <comment-card
        v-for="comment in comments"
        :key="comment._id"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommentCard from "./CommentCard.vue";

export default {
  components: {
    CommentCard,
  },
  data() {
    return {
      comments: [],
    };
  },

  mounted() {
    axios.get(`${process.env.VUE_APP_API_URL}/comments`).then((res) => {
      this.comments = res.data;
    });
  },
};
</script>

<style lang="scss">
.comments__section {
  padding: 20px;
  width: 100%;


  h2 {
    text-align: center;
    font-size: 20px;
    margin-bottom: 100px;
    color: white;

    @media screen and (max-width: 728px) {
      margin-bottom: 50px;
    }
  }

  .comments__container {
    display: flex;
    gap: 20px;
    justify-content: space-evenly;
    max-width: 90%;
    margin: 20px auto 50px auto;

    @media screen and (max-width: 728px) {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
