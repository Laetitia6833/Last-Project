<template>
  <div class="content">
    <div v-if="user" class="studentProfil">
      <transition name="slide-from-top" appear>
        <pop-up-modal v-if="this.$store.state.message.message !== null" />
      </transition>
      <send-document-modal
        @sendDocumentModalVisible="sendDocumentModalVisible = $event"
        v-if="sendDocumentModalVisible"
        :user="user"
      />
      <update-profil-picture
        v-if="updateProfilPictureVisible"
        @updateProfilPictureVisible="updateProfilPictureVisible = $event"
        :user="user"
      />
      <add-competences-modal
        v-if="competencesModalVisible"
        @competencesModalVisible="competencesModalVisible = $event"
        :user="user"
      />

      <div class="profil__container">
        <!--{{ mq.current }}-->
        <div class="left">
          <div class="profil__picture">
            <div class="img" v-if="!user.profil_picture">
              <img src="../../assets/images/avatar-1.png" alt="" />
            </div>
            <div class="img" v-if="user.profil_picture">
              <img
                :src="
                  require(`../../assets/uploads/profilPictures/${user.profil_picture}`)
                "
                alt=""
              />
            </div>
            <button
              class="update__picture"
              @click="updateProfilPictureVisible = true"
            >
              Modifier ma photo de profil
            </button>
          </div>
          <div class="competences__container">
            <p class="title">Mes compétences</p>
            <div class="tags__container">
              <em v-if="!user.competences || user.competences.length === 0">
                Pas encore de compétences renseigné
              </em>
              <div
                class="tag"
                v-for="competence in user.competences"
                :key="competence.id"
              >
                {{ competence.name }}
              </div>
            </div>
            <button
              class="update__picture"
              @click="competencesModalVisible = true"
            >
              Ajouter des compétences
            </button>
          </div>
        </div>

        <div class="right">
          <div class="header">
            <verified
              class="verified__box"
              :verified="user.verified"
              :inProcess="user.file"
              @sendFile="sendDocumentModalVisible = true"
            />
          </div>
          <div class="infos">
            <div class="names">
              <div class="info">
                <font-awesome-icon
                  class="icon"
                  :icon="['fas', 'user']"
                ></font-awesome-icon>
                <p>{{ user.lastname }}</p>
              </div>
              <div class="info">
                <font-awesome-icon
                  class="icon"
                  :icon="['fas', 'user']"
                ></font-awesome-icon>
                <p>{{ user.firstname }}</p>
              </div>
            </div>
            <div class="email">
              <div class="info">
                <font-awesome-icon
                  class="icon"
                  :icon="['fas', 'at']"
                ></font-awesome-icon>
                <p>{{ user.email }}</p>
              </div>
            </div>
            <div class="study">
              <div class="info" v-if="user.school_name">
                <font-awesome-icon
                  class="icon"
                  :icon="['fas', 'university']"
                ></font-awesome-icon>
                <p>Vous étudiez à : {{ user.school_name }}</p>
              </div>
              <div class="info" v-if="!user.study">
                <font-awesome-icon
                  class="icon"
                  :icon="['fas', 'university']"
                ></font-awesome-icon>
                <p>Vous étudiez à : <em>Non renseigné</em></p>
              </div>
              <div class="info" v-if="user.study">
                <font-awesome-icon
                  class="icon"
                  :icon="['fas', 'user-graduate']"
                ></font-awesome-icon>
                <p>Vous étudiez : {{ user.study }}</p>
              </div>
              <div class="info" v-if="!user.study">
                <font-awesome-icon
                  class="icon"
                  :icon="['fas', 'user-graduate']"
                ></font-awesome-icon>
                <p>Vous étudiez : <em>Non renseigné</em></p>
              </div>
            </div>
            <div class="phone">
              <div class="info">
                <font-awesome-icon
                  class="icon"
                  :icon="['fas', 'phone-alt']"
                ></font-awesome-icon>
                <p v-if="user.phone_number">{{ user.phone_number }}</p>
                <em v-if="!user.phone_number">Non renseigné</em>
              </div>
            </div>
            <div class="location">
              <div class="info" v-if="location">
                <font-awesome-icon
                  class="icon"
                  :icon="['fas', 'map-marker-alt']"
                ></font-awesome-icon>
                <p>
                  {{ location.location_code }} - {{ location.location_nom }}
                </p>
              </div>
              <div class="info" v-if="!location">
                <font-awesome-icon
                  class="icon"
                  :icon="['fas', 'map-marker-alt']"
                ></font-awesome-icon>
                <p><em>Non renseigné</em></p>
              </div>
            </div>
            <div class="description">
              <p>Ma description :</p>
              <p v-if="!user.description"><em>Non renseigné</em></p>
              <p v-if="user.description">{{ user.description }}</p>
            </div>
          </div>
          <router-link class="btn btn__update" :to="{ name: 'StudentUpdate' }">
            Modifier/Ajouter des informations
          </router-link>
        </div>
      </div>
      <!-- <Comments /> -->
    </div>
    <div class="mission">
      <missions />
    </div>
    <div class="mission">
      <button class="btn btn-blue">
        <router-link class="btn btn__update" :to="{ name: 'Missions' }">
          Voir mes missions
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SendDocumentModal from "../../components/modals/SendDocument.vue";
import UpdateProfilPicture from "../../components/modals/UpdateProfilPicture.vue";
import AddCompetencesModal from "../../components/modals/AddCompetences.vue";
import Verified from "../../components/student/Verified.vue";
import PopUpModal from "../../components/modals/PopUpModal.vue";
import Missions from "../../components/student/profil/Missions.vue";

export default {
  name: "StudentProfil",
  components: {
    SendDocumentModal,
    AddCompetencesModal,
    PopUpModal,
    UpdateProfilPicture,
    Verified,
    Missions,
  },

  data() {
    return {
      errors: "",
      sendDocumentModalVisible: false,
      location: "",
      updateProfilPictureVisible: false,
      competencesModalVisible: false,
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    study() {
      return this.$store.state.user.study;
    },
  },

  methods: {
    updateProfilPicture() {},
  },

  mounted() {
    this.$store.dispatch("getTags");
  },

  created() {
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/locations/byUser/${this.$route.params.id}`
      )
      .then((res) => {
        this.location = res.data;
      });
  },
};
</script>

<style lang="scss" scoped>
.studentProfil {
  display: flex;
  padding-bottom: 20px;
}
.mission {
  display: flex;
  justify-content: center;
}
.profil__container {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .left {
    width: 30%;

    .img {
      width: 100%;
      height: 200px;
      &.default {
        background: white;
      }

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    .update__picture {
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      border: none;
      background: $blue;
      color: white;
      cursor: pointer;
      letter-spacing: 1px;
    }
  }

  .competences__container {
    .title {
      text-align: center;
      margin-top: 10px;
    }
    .tags__container {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      justify-content: space-evenly;
      margin-top: 10px;
      margin-bottom: 10px;

      .tag {
        display: flex;
        align-items: center;
        padding: 5px 10px;
        border-radius: 9999px;
        background: $yellow;
      }
      em {
        text-align: center;
        font-size: 14px;
        font-style: italic;
      }
    }
  }

  .right {
    padding-left: 30px;
    width: 70%;

    .infos {
      margin-top: 20px;

      .study {
        .info {
          margin-top: 5px;
        }
      }

      .description {
        p:first-child {
          margin-bottom: 5px;
        }
      }

      .info {
        display: flex;
        align-items: center;

        .icon {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }

      & > div {
        margin-top: 10px;
      }

      .names {
        display: flex;

        div:first-child {
          margin-right: 50px;
        }
      }
    }
    .btn__update {
      display: block;
      width: max-content;
      margin: 20px auto;
      padding-right: 15px;
      padding-left: 15px;
      background: $blue;
      color: white;
      border: 2px solid $blue;
      transition: all 0.3s;

      &:hover {
        background: transparent;
        color: $blue;
      }
    }

    em {
      font-style: italic;
    }
  }
}
</style>
