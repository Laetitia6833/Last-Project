<template>
  <div class="missionCard">
    <h3>Mes missions</h3>
    <p>
      Vous avez actuellement <span>{{ pendingMissions }}</span> demandes de
      nouvelles missions
    </p>
    <p>
      Vous avez <span>{{ waitingMissions }}</span> demandes en attente de
      réponse
    </p>
    <p>
      Vous avez <span>{{ acceptedMissions }} </span> missions à venir
    </p>
    <p>
      Vous avez effectué <span>{{ doneMissions }}</span> missions
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // missions: this.$store.getters.getStudentPendingMissions,
    };
  },
  computed: {
    pendingMissions() {
      let number;
      if (this.$store.getters.getStudentPendingMissions) {
        number = this.$store.getters.getStudentPendingMissions.length;
      }
      return number;
    },
    doneMissions() {
      let number;
      if (this.$store.getters.getStudentDoneMissions) {
        number = this.$store.getters.getStudentDoneMissions.length;
      }
      return number;
    },
    acceptedMissions() {
      let number;
      if (this.$store.getters.getStudentAcceptedMissions) {
        number = this.$store.getters.getStudentAcceptedMissions.length;
      }
      return number;
    },
    waitingMissions() {
      let number;
      if (this.$store.getters.getStudentWaitingMissions) {
        console.log(this.$store.getters.getStudentWaitingMissions);
        number = this.$store.getters.getStudentWaitingMissions.length;
      }
      return number;
    },

    missions() {
      return this.$store.state.studentMissions;
    },
  },
};
</script>
<style lang="scss" scoped>
h3 {
  text-align: center;
  font-weight: bold;
}
p {
  margin: 3px;
}
.missionCard {
  background: $yellow;
  padding: 10px;
  margin: 10px;
  border: 1px solid rgba(122, 122, 122, 0.37);
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
}
span {
  color: $red;
  font-weight: bold;
}
</style>
