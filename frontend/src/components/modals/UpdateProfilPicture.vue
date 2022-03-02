<template>
  <div class="modal">
    <div class="modal__content">
      <div
        class="close__btn"
        @click="$emit('updateProfilPictureVisible', false)"
      >
        X
      </div>
      <div v-if="errors" class="errors">
        <div v-for="error in errors" :key="error">
          <p>{{ error }}</p>
        </div>
      </div>
      <p>Choisissez une photo de profil</p>
      <input type="file" @change="handleFileUpload($event)" />
      <div>
        <button @click="updateProfilPicture()" class="btn btn__send">
          Envoyer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["user"],

  data() {
    return {
      file: null,
      errors: null,
    };
  },

  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    updateProfilPicture() {
      if (this.file !== null) {
        let formData = new FormData();
        const fileExt = this.file.type.split("/")[1];
        const fileName = this.user._id + "." + fileExt;
        formData.append("file", this.file, fileName);
        formData.append("id", this.user._id);
        formData.append("firstname", this.user.firstname);
        formData.append("lastname", this.user.lastname);
        formData.append("email", this.user.email);
        formData.append("fileName", fileName);
        axios
          .post(
            `${process.env.VUE_APP_API_URL}/users/uploadProfilPicture`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.accessToken}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 201) {
              this.$store.dispatch("setUser", this.user._id);
              this.$store.dispatch("setMessage", {
                message: "Photo de profil modifié",
                type: "success",
              });
              this.$emit("updateProfilPictureVisible", false);
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(99, 99, 99, 0.425);
  display: grid;
  place-items: center;

  &__content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    position: relative;

    p {
      margin-bottom: 10px;
    }

    & > div {
      margin-top: 10px;
    }

    .btn__send {
      display: block;
      background: rgb(0, 207, 28);
      color: white;
      margin: auto;
    }

    .close__btn {
      margin-top: 0;
      background: red;
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      color: white;
      display: grid;
      place-items: center;
      border-radius: 9999px;
      transform: translate(50%, -50%);
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        transform: translate(50%, -50%) scale(1.2) rotate(360deg);
      }
    }
  }
}
</style>
