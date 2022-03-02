<template>
  <div class="card__mission">
    <div class="notifications" v-if="unReadMessages > 0">
      <font-awesome-icon
        class="icon"
        :icon="['far', 'envelope']"
      ></font-awesome-icon>
      <p>{{ unReadMessages }}</p>
    </div>

    <p>
      Proposé par <span>{{ user.lastname }} {{ user.firstname }}</span>
    </p>
    <p>Description de la mission :</p>
    <p>{{ mission.description }}</p>
    <div class="date">
      <p>Date de la mission :</p>
      <p v-if="mission.missionDate">{{ mission.missionDate }}</p>
      <p v-if="!mission.missionDate"><em> Non renseigné</em></p>
    </div>
    <div class="error" v-if="mission.status === 'REFUSED'">
      <p>Vous avez refusé la mission</p>
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
      user: "",
      unReadMessages: null,
    };
  },

  methods: {
    seeMission() {
      axios
        .patch(
          `${process.env.VUE_APP_API_URL}/missions/seen`,
          { missionId: this.mission._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          }
        )
        .then(() => {
          this.$store.dispatch("studentOrUserMissions", this.$route.params.id);
        })
        .catch((e) => {
          console.log(e);
        });
      this.$emit("modalMission", true);
      this.$emit("mission", this.mission);
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
          this.$store.dispatch("getNotifications");
        });
    },
  },

  mounted() {
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/users/getUser/${this.mission.userId}`
      )
      .then((res) => {
        this.user = res.data;
      })
      .catch((e) => {
        console.log(e.response);
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
.card__mission {
  border: 1px solid rgba(148, 148, 148, 0.466);
  width: 300px;
  padding: 10px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  box-shadow: 9px 9px 11px -8px rgb(0 0 0 / 75%);
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

  .date {
    display: flex;

    em {
      font-style: italic;
    }
  }
  p {
    margin-bottom: 5px;
  }

  .btn.btn-blue {
    display: block;
    margin: 15px auto 0 auto;
  }
}
</style>
