<template>
  <div class="form">
    <div class="form__group">
      <div v-if="errors.length > 0" class="errors">
        <ul v-for="error in errors" :key="error">
          <li>{{ error }}</li>
        </ul>
      </div>
    </div>
    <div class="form__group">
      <div v-if="error" class="errors">
        <p>{{ error }}</p>
      </div>
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

    <div class="form__group">
      <label class="form__control form__control--label" for="password">
        Votre Mot de passe
      </label>
      <input
        class="form__control form__control--input"
        v-model="user.password"
        type="password"
      />
    </div>

    <div class="form__group">
      <button class="form__btn" @click="login">Se connecter</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "SignupForm",

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: [],
      error: null,
    };
  },

  methods: {
    login() {
      if (this.user.email !== "" && this.user.password !== "") {
        axios
          .post(`${process.env.VUE_APP_API_URL}/auth/login`, this.user)
          .then((res) => {
            localStorage.setItem("accessToken", res.data.accessToken);
            this.$store.dispatch("setIsLogged", true);
            this.$store.dispatch("getNotifications");

            switch (res.data.user.roles) {
              case "STUDENT":
                this.$router.push({
                  path: `/student/${res.data.user._id}`,
                });
                break;
              case "USER":
                this.$router.push({
                  path: "/",
                });
                break;
              case "ADMIN":
                this.$router.push({
                  path: `/admin/${res.data.user._id}`,
                });
            }
          })
          .catch((e) => {
            this.error = e.response.data.message;
          });
      } else {
        this.error = "Veuillez remplir tous les champs";
      }
    },
  },
};
</script>

<style lang="scss"></style>
