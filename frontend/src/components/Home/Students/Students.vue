<template>
  <div class="section__students">
    <h2>Les étudiants</h2>
    <div class="cards__container">
      <student-card
        v-for="student in students"
        :key="student._id"
        :student="student"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StudentCard from "./StudentCard.vue";

export default {
  components: {
    StudentCard,
  },

  data() {
    return {
      students: "",
    };
  },

  mounted() {
    axios.get(`${process.env.VUE_APP_API_URL}/users/getThree`).then((res) => {
      this.students = res.data;
    });
  },
};
</script>

<style lang="scss">
.section__students {
  padding-top: 50px;
  padding-bottom: 50px;
  width: 100%;
  h2 {
    text-align: center;
    font-size: 20px;
    margin-bottom: 50px;
    // color: white;
  }
  .cards__container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-evenly;
    max-width: 90%;
    margin: 20px auto 50px auto;

    @media screen and (max-width: 728px) {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
