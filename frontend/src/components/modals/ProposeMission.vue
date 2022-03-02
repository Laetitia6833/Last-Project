<template>
  <div class="modal modal__propose-mission">
    <div class="content">
      <div class="error">
        <p v-if="error">{{ error }}</p>
      </div>
      <div class="close__btn" @click="$emit('closeModal', false)">X</div>
      <h4>
        Proposer une mission à
        <span class="capitalize bold">{{ user.firstname }}</span>
      </h4>
      <div class="description">
        <p>Description de la mission</p>
        <textarea v-model="mission.description"></textarea>
        <input type="date" v-model="mission.date" />
      </div>
      <em
        >Une fois la proposition envoyé l'étudiant pourra l'accepter s'il le
        souhaite puis vous pourrez échanger concernant les dates et
        modalités</em
      >
      <button class="btn btn-blue" @click="sendMission">
        Envoyer la proposition
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["user"],
  data() {
    return {
      mission: {
        description: null,
        date: null,
      },
      error: null,
    };
  },
  methods: {
    sendMission() {
      axios
        .post(
          `${process.env.VUE_APP_API_URL}/missions`,
          {
            description: this.mission.description,
            studentId: this.user._id,
            missionDate: this.mission.date,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          }
        )
        .then(() => {
         
          this.$store.dispatch("setMessage", {
            message: "proposition envoyée",
            type: "success",
          });
          this.$emit("closeModal", false);
        })
        .catch((e) => {
          console.log(e.response);
          if (e.response.status === 400) {
            this.error = e.response.data.message[0];
          } else {
            this.error = e.response.data.message;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &__propose-mission {
    .content {
      max-width: 80%;
      display: block;

      h4 {
        text-align: center;
        font-size: 20px;
      }

      .description {
        margin-top: 20px;
        p {
          text-align: center;
        }
        textarea,
        input {
          display: block;
          margin: 10px auto;
          width: 70%;
          border-radius: 5px;
          border: 1px solid rgba(128, 128, 128, 0.603);
        }

        textarea {
          height: 50px;
          resize: none;
          font-family: sans-serif;
          padding: 5px;
        }
        input {
          padding: 5px;
        }
      }

      em {
        font-size: 12px;
        font-style: italic;
        display: block;
        max-width: 70%;
        margin: 10px auto;
      }
    }
    .error {
      text-align: center;
    }
    .btn.btn-blue {
      display: block;
      margin: auto;
      border: 2px solid $blue;
      transition: all 0.3s;

      &:hover {
        color: $blue;
        background: white;
      }
    }
  }
}
.error {
  font-size: 14px;
  color: $red;
  margin-bottom: 10px;
}
h3 {
  padding-bottom: 10px;
}
.datetime {
  background: $yellow;
  margin-bottom: 5px;
}
.textarea {
  width: 100%;
  margin: 2%;
  padding: 2%;
}
</style>
