<template>
  <div class="student">
    <!-- MODALS -->
    <not-logged-modal
      v-if="notLoggedModalVisible"
      @closeModal="notLoggedModalVisible = false"
    >
      <slot> Vous devez être connecté pour proposer une mission </slot>
    </not-logged-modal>
    <propose-mission-modal
      v-if="proposemodalVisible"
      @closeModal="proposemodalVisible = false"
      :user="user"
    />
    <transition name="slide-from-top">
      <pop-up-modal v-if="this.$store.state.message.message !== null" />
    </transition>
    <header class="profil__header">
      <div class="profil_picture">
        <img
          class="img"
          v-if="user.profil_picture"
          :src="
            require(`../assets/uploads/profilPictures/${user.profil_picture}`)
          "
          alt="photo de profil"
        />
        <img
          class="img default"
          v-if="!user.profil_picture"
          src="../assets/images/avatar-1.png"
          alt="photo de profil"
        />
      </div>
    </header>
    <section class="profil__content">
      <div class="flex jutify-evenly name">
        <p class="capitalize">{{ user.lastname }}</p>
        <p class="capitalize">{{ user.firstname }}</p>
      </div>

      <div class="nbr__missions">
        <p class="align-center">
          <span class="red name">{{ doneMissionslength }}</span> missions
          effectuées
        </p>
      </div>

      <div class="align-center">
        <p v-if="location">
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'map-marker-alt']"
          ></font-awesome-icon>
          {{ location.location_code }} - {{ location.location_nom }}
        </p>
        <div class="study">
          <p>
            <font-awesome-icon
              class="icon"
              :icon="['fas', 'university']"
            ></font-awesome-icon>
            <span class="underline">Étudie à :</span> {{ user.school_name }}
          </p>
          <p>
            <font-awesome-icon
              class="icon"
              :icon="['fas', 'user-graduate']"
            ></font-awesome-icon>
            <span class="underline">Étudie :</span> {{ user.study }}
          </p>
        </div>
        <div class="description">
          <span class="underline">À propos de moi :</span>
          <p>{{ user.description }}</p>
        </div>
      </div>
      <button class="btn btn-blue" @click="proposeMission">
        Proposer une mission
      </button>
      <div class="competences">
        <span class="underline">Compétences :</span>
        <div class="competences__container">
          <div
            class="competence"
            v-for="competence in user.competences"
            :key="competence._id"
          >
            {{ competence.name }}
          </div>
        </div>
      </div>
    </section>

    <section class="comments">
      <h3>Les avis des Utilisateurs</h3>
      <div class="comments__container">
        <comment-card
          v-for="comment in comments"
          :key="comment._id"
          :comment="comment"
        />
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import NotLoggedModal from "../components/modals/NotLoggedIn.vue";
import ProposeMissionModal from "../components/modals/ProposeMission.vue";
import CommentCard from "../components/CommentCard.vue";
import PopUpModal from "../components/modals/PopUpModal.vue";

export default {
  name: "Student",
  components: {
    NotLoggedModal,
    ProposeMissionModal,
    CommentCard,
    PopUpModal,
  },

  data() {
    return {
      notLoggedModalVisible: false,
      proposemodalVisible: false,
      comments: "",
      doneMissionslength: "",
    };
  },

  computed: {
    user() {
      return this.$store.state.studentProfil;
    },
    location() {
      return this.$store.state.userLocation;
    },
  },

  methods: {
    proposeMission() {
      if (!localStorage.accessToken) {
        this.notLoggedModalVisible = true;
      } else {
        this.proposemodalVisible = true;
      }
    },
  },

  mounted() {
    this.$store.dispatch("studentProfil", this.$route.params.id);
    this.$store.dispatch("getUserLocation", this.$route.params.id);
    axios
      .get(`${process.env.VUE_APP_API_URL}/comments/${this.$route.params.id}`)
      .then((res) => {
        this.comments = res.data;
      });
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/missions/doneMissions/${this.$route.params.id}`
      )
      .then((res) => {
        this.doneMissionslength = res.data.length;
      });
  },
};
</script>

<style lang="scss">
.profil__header {

  height: 175px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 50%;
    background: $blue;
  }
  .profil_picture {
    position: absolute;
    left: 50%;
   
    transform: translateX(-50%);
    width: 150px;
    height: 150px;
    z-index: 1;
    // clip-path: circle(50% at 50% 50%);
    border-radius: 99999px;
    overflow: hidden;
    box-shadow: -1px 23px 25px -21px rgba(0, 0, 0, 0.75);

    .img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      background: white;

      &.default {
        background: white;
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 2;
      left: 2;
      width: 2px;
      height: 2px;
      background: #000;
    }
  }
}

.profil__content {
  width: 90%;
  margin: auto;

  .name {
    font-size: 25px;
  }

  .nbr__missions {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .study {
    display: flex;
    justify-content: center;

    & > p {
      margin: 10px;
    }
  }

  .description {
    margin-top: 15px;
    p {
      margin-top: 10px;
    }
  }
  .underline {
    position: relative;

    &::after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background: $yellow;
    }
  }

  .icon {
    margin-right: 10px;
  }

  .btn.btn-blue {
    display: block;
    margin: 20px auto;
  }

  .competences {
    text-align: center;
    margin-bottom: 20px;

    &__container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 600px;
      margin: 10px auto;

      .competence {
        background: $yellow;
        padding: 5px 10px;
        border-radius: 9999px;
        margin: 5px;
      }
    }
  }
}
.comments {
  background: $red;
  padding: 20px;

  h3 {
    text-align: center;
    color: white;
  }

  &__container {
    margin: 20px auto;
    max-width: 800px;
  }
}

.flex {
  display: flex;
}
.jutify-evenly {
  justify-content: space-evenly;
}
.capitalize {
  text-transform: capitalize;
}
.align-center {
  text-align: center;
}
.red {
  color: $red;
}
</style>
