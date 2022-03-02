<template>
  <div class="modal modal__competences">
    <div class="modal__content">
      <div
        class="close__btn"
        @click="$emit('competencesModalVisible', false), (userCompetences = [])"
      >
        X
      </div>
      <!-- <div v-if="errors" class="errors">
        <div v-for="error in errors" :key="error">
          <p>{{ error }}</p>
        </div>
      </div> -->
      <p>Mes compétences</p>
      <div>
        <p v-if="userCompetences.length === 0">
          <em>Aucune compétences renseigné pour le moment</em>
        </p>
        <div class="tags__container">
          <div
            class="tag tag__user"
            v-for="competence in userCompetences"
            :key="competence.id"
          >
            <p>
              {{ competence.name }}
            </p>
            <!-- <span @click="removeCompetences(competence)">X</span> -->
            <font-awesome-icon
              @click="removeCompetences(competence)"
              class="icon"
              :icon="['far', 'times-circle']"
            ></font-awesome-icon>
          </div>
        </div>
      </div>
      <p>Ajouter des compétences</p>
      <div class="search">
        <input
          class="form__control form__control--input"
          type="text"
          v-model="search"
          @input="filterTags"
        />
        <div v-if="filteredTags < 1 && search.length > 3">
          <div @click="addNewTag" class="btn__add">
            <p>Ajouter</p>
          </div>
        </div>
        <ul v-if="filteredTags && search.length > 0" class="tags__list">
          <li
            class="tag"
            v-for="filteredTag in filteredTags"
            :key="filteredTag.id"
            @click="addCompetence(filteredTag)"
          >
            {{ filteredTag.name }}
          </li>
        </ul>
      </div>
      <div class="tags__container">
        <div
          class="tag tag__add"
          v-for="tag in tags"
          :key="tag.id"
          @click="addCompetence(tag)"
        >
          <p>{{ tag.name }}</p>
        </div>
      </div>
      <div>
        <button @click="save()" class="btn btn__send">Enregistrer</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["user"],

  data() {
    return {
      userCompetences: [],
      search: "",
      filteredTags: [],
      newTag: [],
    };
  },

  computed: {
    tags() {
      return this.$store.state.tags;
    },
  },

  methods: {
    addCompetence(tag) {
      let inArray = false;
      this.userCompetences.forEach((comp) => {
        if (tag._id === comp._id) {
          inArray = true;
        }
      });
      if (!inArray) {
        this.userCompetences.push(tag);
      }
    },

    removeCompetences(tag) {
      this.userCompetences = this.userCompetences.filter(
        (competence) => competence._id !== tag._id
      );
    },

    async save() {
      let newTags = [];
      await axios
        .post(`${process.env.VUE_APP_API_URL}/tags/studentAdd`, this.newTag, {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        })
        .then((res) => {
          newTags = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
      this.userCompetences = this.userCompetences.filter((comp) => comp._id);
      let userCompetences = this.userCompetences.concat(newTags);
      await axios
        .patch(
          `${process.env.VUE_APP_API_URL}/users/addCompetences/${this.user._id}`,
          userCompetences,
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          }
        )
        .then(() => {
          this.userCompetences = [];
          this.$store.dispatch("setUser", this.user._id);
          this.$store.dispatch("setMessage", {
            message: "Compétences modifiés",
            type: "success",
          });
          this.$emit("competencesModalVisible", false);
        });
    },

    addNewTag() {
      let arr = [];

      this.search.split(" ").forEach((word) => {
        word = word.charAt(0).toUpperCase() + word.slice(1);
        arr.push(word);
      });
      const tagName = arr.join(" ");
      const tag = {
        id: Date.now(),
        name: tagName,
      };
      let inArray = false;
      this.userCompetences.forEach((comp) => {
        if (tag.name === comp.name) {
          inArray = true;
        }
      });

      if (!inArray) {
        this.userCompetences.push(tag);
        this.newTag.push(tag);
        this.search = "";
      }
    },

    filterTags() {
      this.filteredTags = this.tags.filter((tag) => {
        return tag.name.toLowerCase().startsWith(this.search.toLowerCase());
      });
    },
  },

  mounted() {
    if (this.user.competences) {
      this.userCompetences = this.user.competences;
    }
  },
  created() {},
};
</script>

<style lang="scss">
.modal {
  &__competences {
    overflow-y: scroll;
    .modal__content {
      max-width: 600px;
      width: 60%;
      p {
        margin: 0;
      }

      em {
        font-size: 14px;
        font-style: italic;
      }
    }

    .search {
      position: relative;

      .btn__add {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 0 10px;
        background: $blue;
        border: 2px solid $blue;
        color: white;
        display: grid;
        place-items: center;
        transition: all 0.3s;
        cursor: pointer;

        &:hover {
          background: white;
          color: $blue;
        }
      }

      .form__control {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

      .tags__list {
        position: absolute;
        width: 100%;
        max-height: 200px;
        overflow-y: scroll;
        background: white;
        border: 1px solid rgba(122, 122, 122, 0.37);
        .tag {
          cursor: pointer;
          padding: 5px 10px;
          transition: all 0.3s;

          &:hover {
            background: $blue;
            color: white;
          }
        }
      }
    }

    .tags__container {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      justify-content: space-evenly;

      .tag {
        display: flex;
        align-items: center;
        padding: 5px 10px;
        border-radius: 9999px;
        background: $yellow;

        &__user {
          p {
            margin-right: 10px;
          }
          .icon {
            color: red;
            transition: all 0.3s;
            cursor: pointer;

            &:hover {
              transform: rotate(360deg) scale(1.1);
            }
          }
        }

        &__add {
          cursor: pointer;
        }
      }
    }

    .btn__send {
      cursor: pointer;
    }
  }
}
</style>
