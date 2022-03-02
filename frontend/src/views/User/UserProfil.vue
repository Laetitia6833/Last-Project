<template>
  <div class="userProfil">
    <transition name="slide-from-top">
      <pop-up-modal v-if="this.$store.state.message.message !== null" />
    </transition>
    <mission-modal
      v-if="missionModalVisible"
      @closeModal="missionModalVisible = false"
      :mission="mission"
    />
    <div class="header">
      <h1 class="title">Bonjour {{ user.firstname }}</h1>
      <router-link class="btn btn-yellow" :to="{ name: 'UserUpdate' }">
        Modifier mes informations
      </router-link>
    </div>
    <h2>Les Missions en attente de réponse</h2>
    <div
      class="cards__container"
      v-if="waitingMissions && waitingMissions.length === 0"
    >
      <p>Pas de missions pour les moment</p>
    </div>
    <div
      class="cards__container"
      v-if="waitingMissions && waitingMissions.length > 0"
    >
      <mission-card
        class="mission-card1"
        v-for="mission in waitingMissions"
        :key="mission._id"
        :mission="mission"
        @mission="this.mission = mission"
        @openModalMission="missionModalVisible = true"
      />
    </div>
    <h2>Les Missions à venir</h2>
    <div
      class="cards__container"
      v-if="acceptedMissions && acceptedMissions.length === 0"
    >
      <p>Pas de missions pour le moment</p>
    </div>
    <div
      class="cards__container"
      v-if="acceptedMissions && acceptedMissions.length > 0"
    >
      <mission-card
        class="mission-card2"
        v-for="mission in acceptedMissions"
        :key="mission._id"
        :mission="mission"
        @mission="this.mission = mission"
        @openModalMission="missionModalVisible = true"
      />
    </div>
    <h2>Les Missions terminées</h2>
    <div
      class="cards__container"
      v-if="doneMissions && doneMissions.length === 0"
    >
      <p>Pas de missions pour le moment</p>
    </div>
    <div
      class="cards__container"
      v-if="doneMissions && doneMissions.length > 0"
    >
      <mission-card
        class="mission-card1"
        v-for="mission in doneMissions"
        :key="mission._id"
        :mission="mission"
        @mission="this.mission = mission"
        @openModalMission="missionModalVisible = true"
      />
    </div>
    <!-- <h1>Mes favoris</h1> -->
  </div>
</template>

<script>
import MissionCard from "../../components/user/MissionCard.vue";
import MissionModal from "../../components/modals/mission/ModalMission.vue";
import PopUpModal from "../../components/modals/PopUpModal.vue";

export default {
  name: "UserProfil",
  components: {
    MissionCard,
    MissionModal,
    PopUpModal,
  },

  data() {
    return {
      missionModalVisible: false,
      mission: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    missions() {
      return this.$store.state.studentMissions;
    },
    waitingMissions() {
      return this.$store.getters.getUserWaitingMissions;
    },
    acceptedMissions() {
      return this.$store.getters.getIncomingMissions;
    },
    doneMissions() {
      return this.$store.getters.getDoneMissions;
    },
  },
};
</script>
<style scoped lang="scss">
.userProfil {


  .header {
    padding-top: 40px;
    margin-bottom: 40px;
  }
  .title {
    text-align: center;
  }

  .btn.btn-yellow {
    display: block;
    border: 2px solid $yellow;
    width: max-content;
    margin: 20px auto 0 auto;
    transition: all 0.3s;
    color: $red;

    &:hover {
      background: white;
    }
  }
}
.cards__container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 90%;
  margin: 20px auto;
}

h2 {
  text-align: center;
  font-size: 25px;
}
.mission-card1 {
  background: #ffe26f38;
}
.mission-card2 {
  background: #ff797926;
}
h1 {
  text-align: center;
  margin: 10px;
  padding-bottom: 10px;
}
</style>
