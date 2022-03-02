<template>
  <div class="verify_user">
    <p>
      Vérifier l'utilisateur
      <span>{{ user.lastname }} {{ user.firstname }}</span>
    </p>
    <div>
      <p>Document envoyé :</p>
      <div v-if="user.file">
        <div class="img">
          <img
            :src="require(`../../assets/uploads/justificatif/${user.file}`)"
            alt=""
          />
        </div>
      </div>
    </div>
    <button @click="verifyUser(true)">Vérifier l'utilisateur</button>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      user: "",
    };
  },

  methods: {
    verifyUser(data) {
      axios
        .patch(
          `${process.env.VUE_APP_API_URL}/users/verifyUser/${this.user._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    },
  },

  mounted() {
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/users/getUser/${this.$route.params.userId}`
      )
      .then((res) => {
        this.user = res.data;
      });
  },
};
</script>

<style lang="scss">
.verify_user {
  span {
    font-weight: bold;
  }
  .img {
    width: 90%;
    max-width: 800px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
