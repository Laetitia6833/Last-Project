<template>
  <div class="commentaire">
    <!-- <p>Éffectué par {{ student.firstname }}</p> -->
    <p class="header">{{ user.firstname }}</p>
    <p class="content">{{ comment.content }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["comment"],

  data() {
    return {
      student: "",
      user: "",
    };
  },

  mounted() {
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/users/getUser/${this.comment.userId}`
      )
      .then((res) => {
        this.user = res.data;
      });

    axios
      .get(
        `${process.env.VUE_APP_API_URL}/users/getUser/${this.comment.studentId}`
      )
      .then((res) => {
        this.student = res.data;
      });
  },
};
</script>

<style lang="scss">
.commentaire {
  background: rgba(255, 255, 255, 0.685);
  width: 300px;
  padding: 10px;
  border-radius: 10px;

  .header {
    text-transform: capitalize;
    font-size: 20px;
    margin-bottom: 20px;
    color: $blue;
  }

  .content {
    margin-bottom: 20px;
    line-height: 1.2;
  }
}
</style>
