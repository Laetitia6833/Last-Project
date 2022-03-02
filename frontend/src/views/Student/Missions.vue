<template>
  <div>
    <h1>Mes missions</h1>
    <transition name="slide-from-top">
      <pop-up-modal v-if="this.$store.state.message.message !== null" />
    </transition>
    <modal-mission
      @closeModal="modalMissionVisible = false"
      v-if="modalMissionVisible"
      :mission="mission"
    />

    <section class="newMission">
      <h3>Nouvelles propositions de missions</h3>
      <p
        class="cards__container"
        v-if="newMissions && newMissions.length === 0"
      >
        Pas de nouvelles missions
      </p>
      <div class="cards__container">
        <mission-card
          class="mission-card1"
          v-for="mission in newMissions"
          :key="mission._id"
          :mission="mission"
          @modalMission="modalMissionVisible = true"
          @mission="this.mission = mission"
        />
      </div>
    </section>
    <section>
      <h3>Missions en attente d'acceptation</h3>
      <div class="cards__container">
        <mission-card
          class="mission-card2"
          v-for="mission in pendingMissions"
          :key="mission._id"
          :mission="mission"
          @modalMission="modalMissionVisible = true"
          @mission="this.mission = mission"
        />
      </div>
    </section>
    <section>
      <h3>Missions à venir</h3>
      <div class="cards__container">
        <mission-card
          class="mission-card1"
          v-for="mission in inComingMissions"
          :key="mission._id"
          :mission="mission"
          @modalMission="modalMissionVisible = true"
          @mission="this.mission = mission"
        />
      </div>
    </section>
    <section id="doneMissions">
      <h3>Missions terminées</h3>
      <div class="cards__container">
        <mission-card
          class="mission-card2"
          v-for="mission in doneMissions"
          :key="mission._id"
          :mission="mission"
          @modalMission="modalMissionVisible = true"
          @mission="this.mission = mission"
        />
      </div>
    </section>
  </div>
</template>

<script>
import MissionCard from "../../components/student/MissionCard.vue";
import ModalMission from "../../components/modals/mission/ModalMission.vue";
import PopUpModal from "../../components/modals/PopUpModal.vue";

export default {
  components: {
    MissionCard,
    ModalMission,
    PopUpModal,
  },

  data() {
    return {
      modalMissionVisible: false,
      mission: "",
    };
  },

  computed: {
    missions() {
      return this.$store.state.studentMissions;
    },
    doneMissions() {
      return this.$store.getters.getDoneMissions;
    },
    inComingMissions() {
      return this.$store.getters.getIncomingMissions;
    },
    newMissions() {
      return this.$store.getters.getNewMissions;
    },
    pendingMissions() {
      return this.$store.getters.getPendingMissions;
    },
  },

  mounted() {
 
  },
};
</script>

<style lang="scss">
.student__nav {
  position: fixed;
  background: #000;
 
}

section h3 {
  margin: auto;
  position: relative;
  width: max-content;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background: $yellow;
    bottom: -2px;
    left: 0;
  }
}

.cards__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 90%;
  margin: 20px auto;

  h3 {
    text-align: center;
  }
}
.mission-card1 {
  background: #ff797926;
}
.mission-card2 {
  background: #ffe26f38;
}
</style>
