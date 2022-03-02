<template>
  <div class="notifications">
    <div class="notifications__count" v-if="notificationsCount > 0">
      <p>{{ notificationsCount }}</p>
    </div>
    <font-awesome-icon
      @click="
        (notificationsVisible = !notificationsVisible), notificationsSee()
      "
      class="icon"
      :icon="['far', 'bell']"
    ></font-awesome-icon>
    <div class="notifications-dropdown" v-if="notificationsVisible">
      <div
        v-for="notification in notifications"
        :key="notification"
        class="notification"
        :class="notification.seen ? 'seen' : ''"
      >
        <p
          v-if="
            notification.type === 'MISSION' && notification.status === 'NEW'
          "
        >
          Une nouvelle demande de mission
        </p>
        <p
          v-if="
            notification.type === 'MISSION' &&
            notification.status === 'ACCEPTED'
          "
        >
          Une des missions à été acceptée
        </p>
        <p
          v-if="
            notification.type === 'MISSION' && notification.status === 'REFUSED'
          "
        >
          Une des missions à été refusée
        </p>

        <p v-if="notification.type === 'MESSAGE'">Un nouveau message</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      notificationsVisible: false,
    };
  },
  computed: {
    notifications() {
      return this.$store.state.user.notifications.slice(-5).reverse();
    },
    notificationsCount() {
      return this.$store.getters.notificationsCount;
    },
  },

  methods: {
    notificationsSee() {
      axios
        .patch(
          `${process.env.VUE_APP_API_URL}/users/notificationsToSeen/${this.$store.state.user._id}`
        )
        .then(() => {
          if (!this.notificationsVisible) {
            this.$store.dispatch("setUser", this.$store.state.user._id);
          }
        });
    },
  },
};
</script>
<style lang="scss">
.notifications {
  margin-right: 10px;
  position: relative;
  z-index: 2;

  .icon {
    width: 25px;
    height: 25px;
    cursor: pointer;

    &:hover {
      animation: ring 0.5s;
    }
  }

  .notifications-dropdown {
    position: absolute;
    background: white;
    width: 200px;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10px);
    padding: 10px;
    border: 1px solid $blue;
  }

  &__count {
    background: $yellow;
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 9999px;
    display: grid;
    place-content: center;
    font-size: 14px;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  .notification {
    background: lightblue;
    &.seen {
      background: white;
    }
  }

  hr {
    border: none;
    border-bottom: 1px solid $blue;
  }
}

@keyframes ring {
  from {
    transform: rotate(0);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  to {
    transform: rotate(0);
  }
}
</style>
