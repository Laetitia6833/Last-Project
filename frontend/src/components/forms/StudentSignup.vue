<template>
  <div class="form">
    <h2 class="title">Vous êtes étudiant</h2>
    <div v-if="!userRegistered">
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
        <label
          class="form__control form__control--label"
          for="password_confirmation"
        >
          Confirmez votre mot de passe
        </label>
        <input
          class="form__control form__control--input"
          v-model="user.password_confirmation"
          type="password"
        />
      </div>
      <div class="form__group">
        <button class="form__btn" @click="register">S'inscrire</button>
      </div>
    </div>

    <div class="send__file" v-if="userRegistered && !success">
      <div class="header">
        <div class="errors" v-if="errors.length > 0">
          <ul v-for="error in errors" :key="error">
            <li>
              {{ error }}
            </li>
          </ul>
        </div>
        <p>
          Afin de terminer votre inscription, veuillez joindre un fichier
          prouvant que vous êtes étudiant
        </p>
        <p>
          <em>(carte étudiante, etc ...)</em>
        </p>
      </div>
      <div class="form__group">
        <input type="file" @change="handleFileUpload($event)" />
      </div>
      <div class="errors" v-if="error !== ''">
        <p>{{ error }}</p>
      </div>
      <div class="form__group">
        <button class="form__btn" @click="sendFile">Envoyer</button>
      </div>
      <div>
        <router-link :to="{ name: 'Signin' }">Passer</router-link>
      </div>
    </div>
    <div class="last" v-if="success">
      <p>
        Merci de votre inscirption, vous avez désormais accès à votre profil.
      </p>
      <p>
        Votre profil sera visible de tous une fois votre justificatif vérifier,
        vous receverez un mail à ce moment la
      </p>
      <div class="form__group">
        <router-link class="form__btn" :to="{ name: 'Signin' }"
          >Se connecter</router-link
        >
      </div>
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
        file: "",
      },
      errors: [],
      file: null,
      userRegistered: false,
      newUser: "",
      error: "",
      success: false,
    };
  },

  methods: {
    async register() {
      axios
        .post(`${server.baseURL}/auth/studentRegister`, this.user)
        .then((res) => {
          this.newUser = res.data;
          if (res.status === 201) {
            this.userRegistered = true;
            this.errors = [];
          }
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
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    sendFile() {
      if (this.file !== null) {
        let formData = new FormData();
        const fileExt = this.file.type.split("/")[1];
        const fileName =
          this.newUser.lastname.toLowerCase() +
          "_" +
          this.newUser.firstname.toLowerCase() +
          "." +
          fileExt;
        formData.append("file", this.file, fileName);
        formData.append("id", this.newUser._id);
        formData.append("firstname", this.newUser.firstname);
        formData.append("lastname", this.newUser.lastname);
        formData.append("email", this.newUser.email);
        formData.append("fileName", fileName);
        axios
          .post(`${server.baseURL}/auth/uploadFile`, formData)
          .then((res) => {
            if (res.status === 201) {
              this.success = true;
            }
          })
          .catch((e) => {
            console.log(e.response);
            if (e.response.status === 415) {
              this.error = e.response.data.message;
            } else if (e.response.status === 413) {
              this.error = "Fichier trop volumineux";
            }
          });
      } else {
        this.errors = ["Veuillez selectionner un fichier"];
      }
    },
  },
};
</script>

<style lang="scss">
.send__file {
  max-width: 80%;
  margin: auto;

  p {
    line-height: 1.3;
  }

  em {
    font-style: italic;
    font-size: 14px;
  }
}

.last {
  max-width: 80%;
  margin: auto;
  p {
    margin-bottom: 10px;
    line-height: 1.1;
  }

  a.form__btn {
    text-align: center;
  }
}

.errors {
  margin-bottom: 20px;
  font-size: 14px;
  color: rgb(255, 41, 41);

  li {
    margin-bottom: 5px;
  }
}
</style>
