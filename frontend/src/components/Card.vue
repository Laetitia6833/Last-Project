<template>
  <div class="card">
    <div class="left">
      <div class="img">
        <img
          v-if="user.profil_picture"
          :src="
            require(`../assets/uploads/profilPictures/${user.profil_picture}`)
          "
          alt="photo de profil"
          class="img-student"
        />
        <img
          v-if="!user.profil_picture"
          src="../assets/images/avatar-1.png"
          alt="photo de profil par défaut"
          class="img-student"
        />
      </div>
    </div>
    <div class="content">
      <h3>{{ user.firstname }}</h3>

      <p>{{ user.school_name }}</p>
      <p>
        <span class="red">{{ missions.length }}</span> Missions effectuées
      </p>
      <div class="competences__container">
        <div
          class="btn-tag"
          v-for="competence in user.competences.slice(0, 4)"
          :key="competence._id"
        >
          {{ competence.name }}
        </div>
      </div>
      <router-link
        :to="{ name: 'PublicProfil', params: { id: user._id } }"
        class="btn btn-blue"
      >
        Voir le profil
      </router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["user"],
  data() {
    return {
      missions: "",
    };
  },
  mounted() {
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/missions/doneMissions/${this.user._id}`
      )
      .then((res) => {
        // console.log(res);
        this.missions = res.data;
      });
  },
};
</script>
<style scoped lang="scss">
.card {
  border: 1px solid black;
  // max-width: 300px;
  width: 400px;
  display: flex;
}

.left {
  // width: 30%;
  display: flex;
  align-items: center;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: $blue;
    position: absolute;
    clip-path: polygon(0 0, 48% 0, 75% 100%, 0% 100%);
    z-index: -1;
  }

  .img {
    width: 100px;
    height: 100px;
    border-radius: 9999px;
    clip-path: circle(50% at 50% 50%);
    margin-left: 20px;
    background: white;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}

.content {
  padding: 10px;
  display: flex;
  flex-direction: column;

  h3 {
    margin-bottom: 10px;
  }

  & > p {
    margin-bottom: 10px;
  }

  .red {
    color: $red;
    font-size: 18px;
  }

  .competences__container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 10px;
  }

  .btn {
    display: block;
    width: max-content;
    margin-top: auto;
    // margin-bottom: 15px;
    align-self: center;
  }
}
</style>
