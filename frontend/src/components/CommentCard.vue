<template>
  <div class="comment">
    <p class="capitalize">Publié par {{ user.firstname }}</p>
    <p>{{ comment.content }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["comment"],

  data() {
    return {
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
  },
};
</script>

<style lang="scss" scoped>
.comment {
  border: 1px solid #0083b7;

  background: rgba(0, 131, 183, 0.1);
  width: 200px;
  margin: 10px;
  padding: 10px;
  box-shadow: -1px 3px 3px 0px rgb(0 0 0 / 16%);
  border-radius: 5px;
}
p {
  color: white;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    display: block;
    height: 1px;
    background: white;
    width: 100%;
  }

  p {
    margin-bottom: 10px;
    max-width: 300px;
  }
}
</style>
