import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: {},
    tag: {},
    tags: [],
    isLogged: false,
    token: localStorage.accessToken,
    users: null,
    message: {
      message: null,
      type: null,
    },
    comment: null,
    comments: [],
    searchResults: [],
    locations: [],
    location: null,
    userLocation: null,
    studentMissions: null,
    notifications: 0,
    studentProfil: {},
  },

  mutations: {
    SET_IS_LOGGED(state, logged) {
      state.isLogged = logged;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },

    GET_TAGS(state, tags) {
      state.tags = tags;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_MESSAGE(state, data) {
      state.message = data;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    ADD_FAVOURITE(state, student) {
      state.user.favourites.push(student);
    },
    GET_COMMENT(state, comments) {
      state.comments = comments;
    },
    GET_3_COMMENTS(state, comments) {
      state.comments = comments;
    },
    ADD_COMMENT(state, content) {
      state.comment = content;
    },
    GET_ALL_TAGS(state, tags) {
      state.tags = tags;
    },
    GET_SEARCH_RESULTS(state, results) {
      state.searchResults = results;
    },
    GET_LOCATIONS(state, locations) {
      state.locations = locations;
    },
    GET_LOCATION(state, location) {
      state.location = location;
    },
    GET_USER_LOCATION(state, location) {
      state.userLocation = location;
    },
    GET_MISSIONS_BY_STUDENT(state, missions) {
      state.studentMissions = missions;
    },

    NOTIFICATIONS(state, notifications) {
      state.notifications = notifications;
    },
    STUDENT_PROFIL(state, student) {
      state.studentProfil = student;
    },
  },
  actions: {
    setIsLogged({ commit }, logged) {
      commit("SET_IS_LOGGED", logged);
    },
    logout({ commit }) {
      commit("SET_IS_LOGGED", false);
      commit("SET_TOKEN", null);
      localStorage.removeItem("accessToken");
    },

    async getAllTag({ commit }) {
      const res = await axios.get(`${process.env.VUE_APP_API_URL}/tags`);
      commit("GET_TAGS", res.data);
    },
    async getUsers({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        })
        .then((res) => {
          commit("SET_USERS", res.data);
        });
    },
    setMessage({ commit }, message, type) {
      commit("SET_MESSAGE", message, type);
    },

    async setUser({ commit }, id) {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/users/getUser/${id}`)
        .then((res) => {
          commit("SET_USER", res.data);
        });
    },
    async studentProfil({ commit }, id) {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/users/getUser/${id}`)
        .then((res) => {
          commit("STUDENT_PROFIL", res.data);
        });
    },
    async getComment({ commit }, studentId) {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/comments/${studentId}`)
        .then((res) => {
          commit("GET_COMMENT", res.data);
        });
    },
    async get3Comments({ commit }) {
      await axios.get(`${process.env.VUE_APP_API_URL}/comments`).then((res) => {
        commit("GET_3_COMMENTS", res.data);
      });
    },
    async addComment({ commit }, studentId) {
      await axios.post(`${process.env.VUE_APP_API_URL}/comments/${studentId}`);
      commit("ADD_COMMENT", studentId);
    },

    async getTags({ commit }) {
      await axios.get(`${process.env.VUE_APP_API_URL}/tags`).then((res) => {
        commit("GET_ALL_TAGS", res.data);
      });
    },

    async getSearchResults({ commit }, data) {
      await axios
        .post(`${process.env.VUE_APP_API_URL}/users/searchUsers`, data)
        .then((res) => {
          commit("GET_SEARCH_RESULTS", res.data);
        });
    },

    async getLocations({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_API_URL}/locations`)
        .then((res) => {
          commit("GET_LOCATIONS", res.data);
        });
    },

    async getLocation({ commit }, locationId) {
      axios
        .get(`${process.env.VUE_APP_API_URL}/locations/${locationId}`)
        .then((res) => {
          commit("GET_LOCATION", res.data);
        });
    },

    async getUserLocation({ commit }, userId) {
      axios
        .get(`${process.env.VUE_APP_API_URL}/locations/byUser/${userId}`)
        .then((res) => {
          commit("GET_USER_LOCATION", res.data);
        });
    },

    async studentOrUserMissions({ commit }, id) {
      axios
        .get(`${process.env.VUE_APP_API_URL}/missions/byStudentOrUser/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        })
        .then((res) => {
          commit("GET_MISSIONS_BY_STUDENT", res.data);
        });
    },

    async getNotifications({ commit }) {
      axios
        .get(`${process.env.VUE_APP_API_URL}/users/getNotifications`, {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        })
        .then((res) => {
          commit("NOTIFICATIONS", res.data);
        });
    },
  },

  getters: {
    isLogged: (state) => state.isLogged,

    allUsers: (state) => state.users,
    getUsers: (state) => state.users.filter((user) => user.roles === "USER"),
    getAdmins: (state) => state.users.filter((user) => user.roles === "ADMIN"),
    // getStudents: state => state.users.filter(user => user.roles === 'STUDENT'),
    getStudents: (state) =>
      state.users.filter((user) => user.roles === "STUDENT"),
    getVerifiedStudents: (state, getters) => {
      return getters.getStudents.filter((student) => student.verified);
    },
    getUnVerifiedStudents: (state, getters) => {
      return getters.getStudents.filter((student) => !student.verified);
    },
    getAllUsersLength: (state) => state.users.length,
    // getUsersLength: (state, getters) => getters.getUsers.length
    getStudentCompetences: (state) => state.user.competences,
    getStudentPendingMissions: (state) => {
      if (state.studentMissions) {
        return state.studentMissions.filter(
          (mission) => mission.seen === false
        );
      }
    },
    getStudentDoneMissions: (state) => {
      if (state.studentMissions) {
        return state.studentMissions.filter(
          (mission) => mission.done && mission.status === "DONE"
        );
      }
    },
    getStudentAcceptedMissions: (state) => {
      if (state.studentMissions) {
        return state.studentMissions.filter(
          (mission) => mission.accepted && !mission.done
        );
      }
    },
    getStudentWaitingMissions: (state) => {
      if (state.studentMissions) {
        return state.studentMissions.filter(
          (mission) => !mission.accepted && mission.seen && !mission.done
        );
      }
    },
    getNumberOfResults: (state) => {
      if (state.searchResults) {
        return state.searchResults.length;
      }
    },
    getDoneMissions: (state) => {
      if (state.studentMissions) {
        return state.studentMissions.filter((mission) => mission.done);
      }
    },
    getIncomingMissions: (state) => {
      if (state.studentMissions) {
        return state.studentMissions.filter(
          (mission) => !mission.done && mission.accepted
        );
      }
    },
    getNewMissions: (state) => {
      if (state.studentMissions) {
        return state.studentMissions.filter((mission) => !mission.seen);
      }
    },
    getPendingMissions: (state) => {
      if (state.studentMissions) {
        return state.studentMissions.filter(
          (mission) => mission.seen && !mission.accepted && !mission.done
        );
      }
    },
    getUserWaitingMissions: (state) => {
      if (state.studentMissions) {
        return state.studentMissions.filter(
          (mission) => !mission.accepted && !mission.done
        );
      }
    },

    notificationsCount: (state) => {
      if (state.user.notifications) {
        let arr = state.user.notifications.filter((notif) => {
          return !notif.seen;
        });
        return arr.length;
      }
    },
  },
  modules: {},
});
