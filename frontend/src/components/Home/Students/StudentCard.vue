<template>
  <div class="student__card">
    <div class="image">
      <img
        v-if="student.profil_picture"
        :src="
          require(`../../../assets/uploads/profilPictures/${student.profil_picture}`)
        "
        alt=""
      />
      <img
        v-if="!student.profil_picture"
        src="../../../assets/images/student.png"
        alt=""
      />
    </div>
    <div class="content">
      <p class="header">{{ student.firstname }}</p>
      <p>Étudiant en : {{ student.study }}</p>
      <p class="nbr__missions">
        <span class="red">{{ doneMissionLenght }}</span> missions effectuées
      </p>
      <router-link
        class="btn btn-blue"
        :to="{ name: 'PublicProfil', params: { id: student._id } }"
        >Voir le profil</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["student"],

  data() {
    return {
      doneMissionLenght: 0,
    };
  },

  mounted() {
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/missions/doneMissions/${this.student._id}`
      )
      .then((res) => {
        this.doneMissionLenght = res.data.length;
      });
  },
};
</script>

<style lang="scss">
.student__card {
  border: 1px solid black;
  padding: 10px;
  display: flex;
  width: 400px;
  background: white;

  .image {
    margin-right: 20px;
    flex-shrink: 0;
    width: 130px;
    height: 130px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 9999px;
    }
  }

  .content {
    .header {
      font-size: 20px;
      color: $blue;
      margin-bottom: 20px;
    }

    .nbr__missions {
      margin-top: 10px;
      span {
        font-size: 20px;
      }
    }

    .btn {
      margin-top: 10px;
      display: block;
      width: max-content;
    }
  }
}
</style>
