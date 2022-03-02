<template>
  <div class="update">
    <h1>Modifier votre profile</h1>
    <div class="form">
      <div class="errors form__group" v-if="errors">
        <p v-for="error in errors" :key="error">
          {{ error }}
        </p>
      </div>
      <div class="form__group">
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
        <label class="form__control form__control--label" for="email"
          >Votre Email</label
        >
        <input
          class="form__control form__control--input"
          v-model="user.email"
          type="text"
        />
      </div>
      <div class="form__group">
        <label class="form__control form__control--label" for="email"
          >Votre numéro de téléphone</label
        >
        <input
          class="form__control form__control--input"
          v-model="user.phone_number"
          type="tel"
        />
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
      errors: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  methods: {
    update() {
      axios
        .patch(
          `${process.env.VUE_APP_API_URL}/users/updateSelf/${this.user._id}`,
          this.user,
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          }
        )
        .then(() => {
          this.$store.dispatch("setUser", this.user._id);
          this.$store.dispatch("setMessage", {
            message: "Profil modifié avec succès",
            type: "success",
          });
          this.$router.go(-1);
        })
        .catch((e) => {
          this.errors = e.response.data.message;
        });
    },
  },
};
</script>

<style scoped></style>
