<template>
  <div class="modal modal__mission">
    <div class="modal__content">
      <div
        class="close__btn"
        @click="$emit('closeModal', false), (userCompetences = [])"
      >
        X
      </div>
      <div v-if="!next">
        <div>
          <p v-if="currentUserId === this.$route.params.id">
            Proposé à {{ user.lastname }} {{ user.firstname }}
          </p>
          <p v-else>Proposé par {{ user.lastname }} {{ user.firstname }}</p>
        </div>
        <p>
          Date de la mission :
          {{ mission.missionDate ? mission.missionDate : "Non renseigné" }}
        </p>
        <p>Description de la mission:</p>
        <p>{{ mission.description }}</p>

        <!-- IF STUDENT -->
        <div
          class="btn__container"
          v-if="mission.studentId === this.$route.params.id"
        >
          <button
            v-if="!mission.accepted && !mission.done"
            @click="sendResponse(true)"
            class="accept"
          >
            Accepter la mission
          </button>
          <button
            v-if="!mission.accepted && !mission.done"
            @click="sendResponse(false)"
            class="refuse"
          >
            Refuser la mission
          </button>
          <div v-if="mission.accepted && !mission.done">
            <p>La mission à été acceptée</p>
          </div>
          <div v-if="mission.done">
            <p>La mission est terminée</p>
          </div>
        </div>
        <!--  -->
        <!-- mission done messages -->
        <div v-if="mission.done">
          <p class="success" v-if="mission.status === 'DONE' && mission.done">
            Mission terminée avec succès
          </p>
          <p class="error" v-if="mission.status === 'NOT DONE' && mission.done">
            Mission terminée sans succès
          </p>
          <p class="error" v-if="mission.status === 'REFUSED'">
            Mission refusée
          </p>
        </div>
        <!-- IF USER -->
        <div v-if="mission.userId === this.$route.params.id">
          <div v-if="!mission.done" class="btn__container">
            <button
              @click="(missionAccomplished = true), (next = true)"
              class="accept"
            >
              Mission Accomplie
            </button>
            <button
              @click="(missionAccomplished = false), (next = true)"
              class="refuse"
            >
              Mission non Accomplie
            </button>
          </div>
        </div>
        <!--  -->
        <missions-messages
          :missionDone="mission.done"
          :missionId="mission._id"
          :from="
            this.$route.params.id === mission.userId
              ? mission.studentId
              : mission.userId
          "
        />
      </div>
      <div v-if="next">
        <button @click="next = false" class="btn btn-red">Retour</button>
        <div v-if="missionAccomplished">
          <p>Merci de votre aide !!</p>
          <p>
            Vous pouvez laisser un commentaire sur la mission effectuée par
            {{ user.firstname }} {{ user.lastname }}, celui-ci sera visible sur
            son profil
          </p>
          <p class="error" v-if="commentError">{{ commentError }}</p>
          <textarea class="textarea" v-model="comment"></textarea>
        </div>
        <div v-if="!missionAccomplished">
          <p>Merci de votre aide</p>
          <p>En esperant que la prochaine mission s'accomplisse</p>
        </div>
        <div class="validate">
          <button class="btn btn-yellow" @click="missionDone">
            Valider ma réponse
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

import MissionsMessages from "./MissionsMessages.vue";

export default {
  props: ["mission"],
  data() {
    return {
      user: "",
      moreInfos: false,
      info: "",
      currentUserId: VueJwtDecode.decode(localStorage.accessToken).id,
      next: false,
      missionAccomplished: null,
      comment: "",
      commentError: null,
    };
  },

  components: {
    MissionsMessages,
  },

  methods: {
    sendResponse(value) {
      axios
        .patch(
          `${process.env.VUE_APP_API_URL}/missions/giveAnswer/${this.mission._id}`,
          { accepted: value },
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          }
        )
        .then((res) => {
          const response = JSON.parse(res.config.data);
          this.$store.dispatch("studentOrUserMissions", this.$route.params.id);
          this.$store.dispatch("setMessage", {
            message: res.data,
            type: response.accepted ? "success" : "error",
          });
          this.$emit("closeModal");
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    async validate() {
      await axios
        .patch(
          `${process.env.VUE_APP_API_URL}/missions/missionDone/${this.mission._id}`,
          { done: this.missionAccomplished },
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          }
        )
        .then(() => {
          this.$emit("closeModal");
          this.$store.dispatch("setMessage", {
            message: "Merci, votre reponse à été enregistrer",
            type: "success",
          });
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    async missionDone() {
      if (this.comment !== "") {
        await axios
          .post(
            `${process.env.VUE_APP_API_URL}/comments/addMissionComment/${this.$route.params.id}`,
            {
              studentId: this.mission.studentId,
              content: this.comment,
              missionId: this.mission._id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.accessToken}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 201) {
              this.validate();
            }
          })
          .catch((e) => {
            this.commentError = e.response.data.message;
          });
      } else {
        this.validate();
      }
    },
  },

  mounted() {
    const token = localStorage.accessToken;
    const currentUserId = VueJwtDecode.decode(token).id;
    let searchUser;
    if (currentUserId === this.$route.params.id) {
      searchUser = this.mission.studentId;
    } else {
      searchUser = this.mission.studentId;
    }

    axios
      .get(`${process.env.VUE_APP_API_URL}/users/getUser/${searchUser}`)
      .then((res) => {
        this.user = res.data;
      })
      .catch((e) => {
        console.log(e.response);
      });
    axios
      .patch(
        `${process.env.VUE_APP_API_URL}/messages/seeMessage/${this.mission._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      )
      .then(() => {
        // this.$store.dispatch("unseenMessages", this.$route.params.id);
      });
  },
};
</script>

<style lang="scss">
.btn-yellow {
  margin: 10px;
}
.validate {
  display: flex;
  justify-content: center;
}

.textarea {
  width: 100%;
  padding: 2%;
}
.modal__mission {
  overflow-y: scroll;
  z-index: 100;
  .modal__content {
    width: 90%;
    max-width: 870px;
    margin-top: 20px;
    margin-bottom: 20px;

    .btn__container {
      display: flex;
      justify-content: center;
      gap: 10px;

      button {
        border-radius: 0;
        margin: 0;
        transition: all 0.3s;
      }

      .btn-red {
        margin-bottom: 10px;
      }

      .accept {
        background: rgb(0, 143, 0);
        border-color: rgb(0, 143, 0);

        &:hover {
          color: rgb(0, 143, 0);
          background: transparent;
        }
      }
      .refuse {
        background: rgb(180, 0, 0);
        border-color: rgb(180, 0, 0);

        &:hover {
          color: rgb(180, 0, 0);
          background: transparent;
        }
      }
    }
  }
}

</style>
