<template>
  <div>
    <p class="titlemessage">Discussion</p>
    <div class="messages__container">
      <div
        class="message"
        :class="message.from === this.$route.params.id ? 'current-user' : ''"
        v-for="message in messages"
        :key="message._id"
      >
        <p>{{ message.content }}</p>
      </div>
    </div>
    <div class="new__message">
      <input
        :disabled="missionDone"
        @keyup.enter="sendNewMessage"
        class="form__control form__control--input"
        v-model="newMessage"
      />
      <button
        :disabled="missionDone"
        :class="missionDone ? 'disabled' : ''"
        @click="sendNewMessage"
      >
        Envoyer
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["missionId", "from", "missionDone"],

  data() {
    return {
      messages: [],
      newMessage: "",
    };
  },

  methods: {
    sendNewMessage() {
      axios
        .post(
          `${process.env.VUE_APP_API_URL}/messages/sendMessage`,
          {
            to: this.from,
            content: this.newMessage,
            missionId: this.missionId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          }
        )
        .then((res) => {
          this.messages.push(res.data);
          this.newMessage = "";
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
  },

  mounted() {
    axios
      .get(
        `${process.env.VUE_APP_API_URL}/messages/getMissionMessages/${this.missionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      )
      .then((res) => {
        this.messages = res.data;
      })
      .catch((e) => {
        console.log(e.response);
      });
  },
};
</script>

<style lang="scss">
.titlemessage {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: $blue;
}
.messages__container {
  display: flex;
  flex-direction: column;
  background: #ecf8f8;
  box-shadow: 1px 3px 3px 0px rgb(0 0 0 / 30%);
  margin-bottom: 4px;
  p {
    margin: 0;
  }

  .message {
    width: max-content;
    background: $yellow;
    padding: 10px 15px;
    margin-bottom: 5px;
    margin-top: 3px;
    border-radius: 9999px;
    margin-right: 10px;
    margin-left: 10px;

    &.current-user {
      align-self: flex-end;
      background: $blue;
      color: white;
    }
  }
}

.new__message {
  display: flex;

  .form__control--input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  button {
    padding: 0 20px;
    border: none;
    background: $blue;
    color: white;
    cursor: pointer;

    &.disabled {
      background: lightgrey;
      cursor: not-allowed;
    }
  }
}
</style>
