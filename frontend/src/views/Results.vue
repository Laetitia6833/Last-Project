<template>
  <div>
    <!-- <search-bar /> -->
    <div class="results">
      <div>
        <div class="query" v-if="this.$route.query.location">
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'map-marker-alt']"
          ></font-awesome-icon>
          <p>{{ location.location_code }} - {{ location.location_nom }}</p>
        </div>
        <div class="query" v-if="this.$route.query.tag">
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'search']"
          ></font-awesome-icon>
          <p>{{ this.$route.query.tag }}</p>
        </div>
      </div>
      <p>
        Nous avons trouvé <span class="red">{{ nbrUsers }}</span> étudiants
      </p>
    </div>
    <div class="card__container">
      <card v-for="user in users" :key="user.id" :user="user" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import Card from "../components/Card.vue";

export default {
  name: "Results",
  components: {
    Card,
   
  },

  data() {
    return {
      location: "",
    };
  },

  computed: {
    users() {
      return this.$store.state.searchResults;
    },
    nbrUsers() {
      return this.$store.getters.getNumberOfResults;
    },
  },

  mounted() {
    this.$store.dispatch("getSearchResults", this.$route.query);
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/locations/byId/${this.$route.query.location}`
      )
      .then((res) => {
        this.location = res.data;
      });
  },
};
</script>
<style scoped lang="scss">
.results {
  border: 1px solid black;
  width: 300px;
  padding: 10px 15px;
  margin: 20px auto;
  border-radius: 5px;
  box-shadow: 0px 7px 11px -9px #000000;
  .red {
    color: $red;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  & > p {
    text-align: center;
  }

  .query {
    display: flex;

    .icon {
      margin-right: 10px;
    }
  }
}
.card__container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 20px;
  width: 90%;
  margin: 20px auto;
}
</style>
