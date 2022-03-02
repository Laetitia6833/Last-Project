<template>
  <div class="form">
    <h2 class="title">Vous voulez aider un étudiant</h2>
    <div v-if="!success">
      <div class="form__group">
        <div v-if="errors.length > 0" class="errors">
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
        <label class="form__control form__control--label" for="password"
          >Votre Mot de passe</label
        >
        <input
          class="form__control form__control--input"
          v-model="user.password"
          type="text"
        />
      </div>
      <div class="form__group">
        <label
          class="form__control form__control--label"
          for="password_confirmation"
          >Confirmez votre mot de passe</label
        >
        <input
          class="form__control form__control--input"
          v-model="user.password_confirmation"
          type="text"
        />
      </div>
      <div class="form__group">
        <button class="form__btn" @click="register">S'inscrire</button>
      </div>
    </div>
    <div v-if="success" class="form__group">
      <p>Merci de votre inscription</p>
      <router-link class="form__btn btn__link" :to="{ name: 'Signin' }">
        Se connecter
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";

export default {
  data() {
    return {
      user: {
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: [],
      success: false,
    };
  },

  methods: {
    register() {
      axios
        .post(`${server.baseURL}/auth/userRegister`, this.user)
        .then((res) => {
          console.log(res);
          this.success = true;
        })
        .catch((e) => {
          let errors = e.response.data.message;
          if (Array.isArray(errors)) {
            this.errors = errors;
          } else {
            this.errors = [errors];
          }
        });
    },
  },
};
</script>

<style lang="scss">
// $blue: "blue";
// $red: "red";
@import "../../assets/_variables.scss";
.form {
  max-width: 400px;
  padding-top: 20px;
  padding-bottom: 20px;
  position: relative;
  background: rgba(255, 255, 255, 0.856);
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;

  .title {
    font-size: 22px;
    margin: 10px auto 20px auto;
    text-align: center;
    max-width: 70%;
    line-height: 1.2;
    color: $blue;
  }

  &__group {
    width: 80%;
    margin: 10px auto;
  }

  &__control {
    display: block;

    &--input {
      width: 100%;
      height: 35px;
      padding: 2px 10px;
      border: 1px solid rgba(122, 122, 122, 0.37);
      border-radius: 5px;
    }

    &--label {
      margin-bottom: 5px;
    }
  }

  &__btn {
    display: block;
    background: $blue;
    color: white;
    border: 2px solid $blue;
    padding: 10px 30px;
    border-radius: 9999px;
    margin: 20px auto;
    transition: all 0.3s;
    letter-spacing: 2px;
    font-size: 1.1rem;
    cursor: pointer;

    &:hover {
      background: transparent;
      color: $blue;
    }
  }

  .btn__link {
    text-align: center;
  }
}
</style>
