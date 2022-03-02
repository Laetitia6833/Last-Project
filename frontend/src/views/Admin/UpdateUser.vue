<template>
  <div>
    <h1>Update user</h1>

    <div class="form">
      <div class="form__group">
        <div v-if="errors" class="errors">
          <ul v-for="error in errors" :key="error">
            <li>{{ error }}</li>
          </ul>
        </div>
        <label class="form__control form__control--label" for="lastname">
          Votre Nom
        </label>
        <input
          class="form__control form__control--input"
          v-model="user.lastname"
          type="text"
        />
      </div>
      <div class="form__group">
        <label class="form__control form__control--label" for="firstname">
          Votre Prénom
        </label>
        <input
          class="form__control form__control--input"
          v-model="user.firstname"
          type="text"
        />
      </div>
      <div class="form__group">
        <label class="form__control form__control--label" for="email">
          Votre Email
        </label>
        <input
          class="form__control form__control--input"
          v-model="user.email"
          type="text"
        />
      </div>

      <div class="form__group form__group--radio">
        <div>
          <label class="form__control form__control--label" for="roles">
            Utilisateur
          </label>
          <input type="radio" :value="'USER'" v-model="user.roles" />
        </div>
        <div>
          <label class="form__control form__control--label" for="roles">
            Étudiant
          </label>
          <input type="radio" :value="'STUDENT'" v-model="user.roles" />
        </div>
        <div>
          <label class="form__control form__control--label" for="roles">
            Admin
          </label>
          <input type="radio" :value="'ADMIN'" v-model="user.roles" />
        </div>
      </div>

      <div class="form__group">
        <button class="form__btn" @click="update">Modifier</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: "",
      errors: null,
    };
  },

  methods: {
    update() {
      axios
        .patch(
          `${process.env.VUE_APP_API_URL}/users/${this.$route.params.userId}`,
          this.user,
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          }
        )
        .then(() => {
          this.$store.dispatch("setMessage", {
            message: "Utilisateur modifier avec succès",
            type: "success",
          });
          this.$router.go(-1);
        })
        .catch((e) => {
          console.log(e.response);
          this.errors = e.response.data.message;
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
.form {
  &__group {
    &--radio {
      display: flex;
      justify-content: space-between;
      text-align: center;
    }
  }
}
</style>
