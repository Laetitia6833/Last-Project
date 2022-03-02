<template>
  <div class="card__user">
    <div class="notifications" v-if="unReadMessages > 0">
      <font-awesome-icon
        class="icon"
        :icon="['far', 'envelope']"
      ></font-awesome-icon>
      <p>{{ unReadMessages }}</p>
    </div>
    <p>
      Proposé à
      <span class="capitalize"
        >{{ student.lastname }} {{ student.firstname }}</span
      >
    </p>
    <p>
      Date de la mission:
      <span v-if="mission.missionDate">{{ mission.missionDate }}</span>
      <em v-else>Non renseigné</em>
    </p>
    <p v-if="mission.status === 'ACCEPTED'">
      notif : la mission à été accpetée
    </p>
    <!-- <p v-if="unReadMessages > 0">{{ unReadMessages }} messages non lus</p> -->
    <div class="error" v-if="mission.status === 'REFUSED'">
      <p>La mission à été refusée</p>
    </div>
    <div class="error" v-if="mission.status === 'NOT DONE'">
      <p>Mission non accomplie</p>
    </div>
    <button class="btn btn-blue" @click="seeMission">Voir la mission</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["mission"],

  data() {
    return {
      student: "",
      unReadMessages: null,
    };
  },

  methods: {
    seeMission() {
      if (this.mission.status === "ACCEPTED") {
        axios
          .patch(
            `${process.env.VUE_APP_API_URL}/missions/changeMissionstatus/${this.mission._id}`,
            {
              status: "COMING",
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.accessToken,
              },
            }
          )
          .then(() => {
            this.$emit("mission", this.mission);
            this.$emit("openModalMission", true);

            this.$store.dispatch("getNotifications");
          });
      }
      this.seeMessage();
    },
    seeMessage() {
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
          this.$emit("mission", this.mission);
          this.$emit("openModalMission", true);
          this.$store.dispatch("getNotifications");
        });
    },
  },

  mounted() {
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/users/getUser/${this.mission.studentId}`
      )
      .then((res) => {
        this.student = res.data;
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get(
        `${process.env.VUE_APP_API_URL}/messages/getUnSeenMessages/${this.mission._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      )
      .then((res) => {
        this.unReadMessages = res.data;
      });
  },
};
</script>

<style lang="scss">
.card__user {
  width: 300px;
  padding: 10px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background: white;
  box-shadow: 9px 9px 11px -8px rgb(0 0 0 / 33%);
  position: relative;

  .notifications {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 9999px;
    font-size: 14px;
    background: $yellow;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    transform: translate(-50%, -65%);

    .icon {
      cursor: initial;
      widows: 15px;
      height: 15px;
    }
    p {
      display: block;
      margin: 0;
    }
  }

  span {
    font-weight: bold;
  }

  p {
    margin-bottom: 10px;
  }
}
</style>
