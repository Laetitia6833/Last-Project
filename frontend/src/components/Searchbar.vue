<template>
  <div class="search">
    <div class="searchbar">
      <div class="error" v-if="error">
        <p>{{ error }}</p>
      </div>
      <select
        v-model="location"
        class="form__control form__control--select"
        @change="error = null"
      >
        <option
          v-for="location in locations"
          :key="location.location_id"
          :value="location.location_id"
        >
          {{ location.location_code }} - {{ location.location_nom }}
        </option>
      </select>

      <div class="search__tags">
        <input
          type="text"
          class="input-text"
          placeholder="Que recherchez-vous ?"
          v-model="searchTag"
          @input="filterTags"
        />
        <ul v-if="searchTag" class="tags__list">
          <li
            class="tag"
            v-for="filteredTag in filteredTags"
            :key="filteredTag.id"
            @click="(searchTag = filteredTag.name), (filteredTags = [])"
          >
            {{ filteredTag.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="tags">
      <button
        @click="searchTag = tag.name"
        class="btn-tag"
        v-for="tag in displayTags"
        :key="tag._id"
      >
        {{ tag.name }}
      </button>
    </div>
    <button @click="search" class="btn btn-blue submit">Rechercher</button>
  </div>
</template>

<script>
import { removeDiacritics } from "../helper";

export default {
  name: "Searchbar",
  data() {
    return {
      result: "",
      location: null,
      searchTag: null,
      filteredTags: [],
      error: null,
    };
  },

  computed: {
    tags() {
      return this.$store.state.tags;
    },
    displayTags() {
      return this.$store.state.tags.slice(0, 8);
    },
    locations() {
      return this.$store.state.locations;
    },
  },
  methods: {
    filterTags() {
      this.error = null;
      this.filteredTags = this.tags.filter((tag) => {
        return removeDiacritics(tag.name.toLowerCase()).startsWith(
          removeDiacritics(this.searchTag.toLowerCase())
        );
      });
    },

    search() {
      if (this.location && this.searchTag) {
        return this.$router.push({
          name: "Results",
          query: { location: this.location, tag: this.searchTag },
        });
      }

      if (this.location) {
        return this.$router.push({
          name: "Results",
          query: { location: this.location },
        });
      }

      if (this.searchTag) {
        return this.$router.push({
          name: "Results",
          query: { tag: this.searchTag },
        });
      }

      return (this.error = "Veuillez remplir au moins un champ");
    },
  },

  mounted() {
    this.$store.dispatch("getAllTag");
    this.$store.dispatch("getLocations");
  },
};
</script>
<style scoped lang="scss">
.search {
  background: white;
  width: 60%;
  max-width: 500px;
  border-radius: 15px;
  margin: 10px;
  padding: 20px;
  box-shadow: -1px 3px 3px 0px rgb(0 0 0 / 16%);
}

.search__tags {
  position: relative;
}

.search__tags .tags__list {
  position: absolute;
  background: white;
  border: 1px solid grey;
  border-radius: 5px;
  width: 100%;
}
.search__tags .tags__list li {
  padding: 10px;
  transition: all 0.3s;
}
.search__tags .tags__list li:hover {
  background: $blue;
  color: white;
}

input {
  padding: 5px 10px;
  height: 35px;
  margin-top: 10px;
  border-radius: 15px;
  border: 1px solid grey;
  width: 100%;
}

.tags {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 5px;
}

.btn-tag {
  font-size: 12px;
}

.search .btn-blue.submit {
  display: block;
  padding: 10px 15px;
  letter-spacing: 1px;
  margin: 20px auto 0 auto;
}

.form__control.form__control--select {
  padding: 5px 10px;
  height: 35px;
  margin-top: 10px;
  border-radius: 15px;
  border: 1px solid grey;
  width: 100%;
}

.form__control.form__control--select option {
  padding: 5px 10px;
}

.error {
  color: $red;
  font-size: 14px;
}
</style>
