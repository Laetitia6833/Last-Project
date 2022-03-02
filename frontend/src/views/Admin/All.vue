<template>
  <div>
    <h1>Tableau des utilisateurs</h1>
    <transition name="slide-from-top" appear>
      <success-modal
        :message="successMessage"
        :class="successMessage ? 'success' : 'error'"
        v-if="this.$store.state.message.message !== null"
      />
    </transition>
    <delete-modal
      v-if="deleteModalVisible"
      @deleteUser="deleteUser"
      @deleteModalVisible="deleteModalVisible = $event"
      :userToDelete="userToDelete"
    >
      <p>Etes vous sur de vouloir supprimer cet utilisateur?</p>
    </delete-modal>
    <div v-if="!users">loading</div>
    <div v-if="users" class="main__container">
      <div class="select">
        <div
          @click="sortUsers('USERS')"
          :class="activeUser === 'USERS' || search === 'USERS' ? 'active' : ''"
        >
          USERS
        </div>
        <div
          @click="sortUsers('ADMINS')"
          :class="
            activeUser === 'ADMINS' || search === 'ADMINS' ? 'active' : ''
          "
        >
          ADMINS
        </div>
        <div
          @click="sortUsers('STUDENTS')"
          :class="
            activeUser === 'STUDENTS' || search === 'STUDENTS' ? 'active' : ''
          "
        >
          STUDENTS
        </div>
        <div @click="sortUsers('')" :class="activeUser === '' ? 'active' : ''">
          ALL
        </div>
      </div>
      <div v-if="activeUser === 'STUDENTS'" class="select">
        <div
          @click="sortStudents()"
          :class="activeStudent === '' ? 'active' : ''"
        >
          Tous
        </div>
        <div
          @click="sortStudents('verified')"
          :class="activeStudent === 'verified' ? 'active' : ''"
        >
          Vérifiés
        </div>
        <div
          @click="sortStudents('unVerified')"
          :class="activeStudent === 'unVerified' ? 'active' : ''"
        >
          Non Vérifiés
        </div>
      </div>
      <div class="table__container">
        <table>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th v-if="this.activeUser === 'STUDENTS'" scope="col">
                Vérifier
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in displayUsers" :key="user.id">
              <td data-label="Nom">
                <p>{{ user.lastname }}</p>
                <p>{{ user.firstname }}</p>
              </td>
              <td data-label="Email">{{ user.email }}</td>
              <td data-label="Admin" class="admin">
                {{ user.roles }}
              </td>
              <td v-if="activeUser === 'STUDENTS'">
                {{ user.verified }}
                <div v-if="!user.verified">
                  <router-link
                    :to="{ name: 'VerifyUser', params: { userId: user._id } }"
                  >
                    Vérifier
                  </router-link>
                </div>
              </td>
              <td data-label="Actions">
                <div>
                  <router-link
                    :to="{ name: 'UpdateUser', params: { userId: user._id } }"
                    class="btn btn__update"
                  >
                    MODIFIER
                  </router-link>
                  <div @click="deleteModal(user._id)" class="btn btn__delete">
                    SUPPRIMER
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- PAGINATION -->
        <nav class="pagination">
          <ul>
            <li>
              <button v-if="page != 1" @click="page--">&larr;</button>
            </li>
            <li v-for="pageNumber in pages" :key="pageNumber.index">
              <button
                @click="page = pageNumber"
                :class="pageNumber === page ? 'active' : ''"
              >
                {{ pageNumber }}
              </button>
            </li>
            <li>
              <button v-if="page < pages.length" @click="page++">&rarr;</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DeleteModal from "../../components/modals/DeleteModal.vue";
import SuccessModal from "../../components/modals/PopUpModal.vue";

export default {
  components: {
    DeleteModal,
    SuccessModal,
  },
  data() {
    return {
      activeUser: "",
      activeStudent: "",
      usersCount: "",
      search: this.$route.query.search,
      users: [],
      page: 1,
      perPage: 20,
      userToDelete: null,
      deleteModalVisible: false,
      successMessage: null,
    };
  },
  computed: {
    pages() {
      let numberOfPages = Math.ceil(this.usersCount / this.perPage);
      let pages = [];
      for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
      }
      return pages;
    },
    displayUsers() {
      return this.paginate(this.users);
    },
  },

  methods: {
    sortUsers(value) {
      switch (value) {
        case "USERS":
          this.users = this.$store.getters.getUsers;
          this.activeUser = "USERS";
          this.usersCount = this.users.length;
          this.page = 1;
          break;
        case "ADMINS":
          this.users = this.$store.getters.getAdmins;
          this.activeUser = "ADMINS";
          this.usersCount = this.users.length;
          this.page = 1;
          break;
        case "STUDENTS":
          this.users = this.$store.getters.getStudents;
          this.activeUser = "STUDENTS";
          this.usersCount = this.users.length;
          this.page = 1;
          break;
        case "":
          this.users = this.$store.getters.allUsers;
          this.activeUser = "";
          this.usersCount = this.users.length;
          this.page = 1;
          break;
      }
    },
    sortStudents(value) {
      if (value === "verified") {
        this.users = this.$store.getters.getVerifiedStudents;
        this.activeStudent = "verified";
        this.usersCount = this.users.length;
        this.page = 1;
      } else if (value === "unVerified") {
        this.users = this.$store.getters.getUnVerifiedStudents;
        this.activeStudent = "unVerified";
        this.usersCount = this.users.length;
        this.page = 1;
      } else {
        this.users = this.$store.getters.getStudents;
        this.activeStudent = "";
        this.usersCount = this.users.length;
        this.page = 1;
      }
    },
    setPages() {
      let numberOfPages = Math.ceil(this.usersCount / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(users) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return users.slice(from, to);
    },
    deleteModal(userId) {
      this.userToDelete = userId;
      this.deleteModalVisible = true;
    },
    deleteUser() {
      
      axios
        .delete(`${process.env.VUE_APP_API_URL}/users/${this.userToDelete}`, {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        })
        .then((res) => {
          this.$store.dispatch("setMessage", {
            message: "Utilisateur supprimer",
            type: "error",
          });
          if (res.status === 200) {
            this.users = this.users.filter(
              (user) => user._id !== this.userToDelete
            );
            this.deleteModalVisible = false;
          }
        });
    },
  },

  mounted() {
    axios
      .get(`${process.env.VUE_APP_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then((res) => {
        this.users = res.data;
        this.usersCount = res.data.length;
      });
    // this.successMessage = this.$store.state.successMessage;
  },
};
</script>

<style lang="scss">
.main__container {
  width: 80%;
  margin: auto;
}
.select {
  display: flex;

  & > div {
    flex: 1;
    text-align: center;
    border: 1px solid black;
    padding: 10px;
    background: $blue;
    color: white;
    transition: all 0.3s;
    cursor: pointer;

    &.active {
      background: $red;
      color: white;
    }
  }
}

table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

td[data-label="Actions"] {
  .btn {
    cursor: pointer;
    max-width: 120px;
    margin: 5px auto;
    display: block;
    font-size: 14px;
    &__update {
      background: $blue;
      color: white;
    }
    &__delete {
      background: $red;
      color: white;
    }
  }
}

@media screen and (max-width: 650px) {
  table {
    border: 0;
  }
  .admin {
    display: flex;
    justify-content: space-between;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  table td[data-label="Actions"] {
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
    }
    .btn {
      height: 100%;
      display: grid;
      place-items: center;
      padding: 5px 10px;
      &:last-child {
        margin-left: 5px;
      }
    }
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}

.pagination {
  ul {
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;

    li {
      button {
        border-radius: 0;
        border: 1px solid black;
        background: transparent;
        padding: 5px 10px;
        cursor: pointer;

        &.active {
          background: $blue;
        }
      }
    }
  }
}
</style>
