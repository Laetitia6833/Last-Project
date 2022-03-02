<template>
  <div>
    <!-- <h1>UpdateStudent</h1> -->
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
        <label class="form__control form__control--label" for="email">
          Ou étudiez vous ?
        </label>
        <input
          class="form__control form__control--input"
          v-model="user.school_name"
          type="text"
        />
      </div>
      <div class="form__group">
        <label class="form__control form__control--label" for="email">
          Qu'est ce que vou étudiez ?
        </label>
        <input
          class="form__control form__control--input"
          v-model="user.study"
          type="text"
        />
      </div>
      <!-- <div class="form__group" v-if="!user.study">
        <label class="form__control form__control--label" for="email">
          Ou étudiez vous ?
        </label>
        <input
          class="form__control form__control--input"
          v-model="study.location"
          type="text"
        />
      </div>
      <div class="form__group" v-if="!user.study">
        <label class="form__control form__control--label" for="email">
          Qu'est ce que vou étudiez ?
        </label>
        <input
          class="form__control form__control--input"
          v-model="study.type"
          type="text"
        />
      </div> -->
      <div class="form__group">
        <label class="form__control form__control--label" for="email">
          Une petite description ?
        </label>
        <textarea
          class="form__control form__control--textarea"
          v-model="user.description"
          type="text"
        />
      </div>
      <div class="form__group">
        <label class="form__control form__control--label" for="email">
          Selectionner votre département
        </label>
        <select
          v-model="user.location"
          class="form__control form__control--select"
        >
          <option
            v-for="location in locations"
            :key="location.id"
            :value="location.location_id"
          >
            {{ location.location_code }} - {{ location.location_nom }}
          </option>
        </select>
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
      locations: "",
      study: {
        location: null,
        type: null,
      },
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
      if (!this.user.study) {
        this.user.study = this.study;
      }
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

  created() {
    axios.get(`${process.env.VUE_APP_API_URL}/locations`).then((res) => {
      this.locations = res.data;
    });
  },
};
</script>

<style lang="scss">
.form__group {
  .form__control {
    &--select {
      width: 100%;
      padding: 2px 10px;
      height: 35px;
      border: 1px solid rgba(122, 122, 122, 0.37);
      border-radius: 5px;
    }
    &--textarea {
      width: 100%;
      padding: 5px 10px;
      border: 1px solid rgba(122, 122, 122, 0.37);
      border-radius: 5px;
      min-height: 60px;
      font-family: sans-serif;
      resize: none;
    }
  }
}
</style>
