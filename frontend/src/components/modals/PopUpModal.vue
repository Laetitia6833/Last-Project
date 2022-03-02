<template>
  <div
    class="pop_up_modal"
    :class="message.type === 'success' ? 'success' : 'error'"
  >
    <p>{{ message.message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: {
        message: null,
        type: null,
      },
    };
  },
  mounted() {
    if (this.$store.state.message.message !== null) {
      this.message = this.$store.state.message;
    }
    setTimeout(() => {
      this.$store.dispatch("setMessage", { message: null, type: null });
      this.message = this.$store.state.message;
    }, 2000);
  },
};
</script>

<style lang="scss">
.pop_up_modal {
  position: fixed;
  top: 0;
  width: 100%;
  text-align: center;
  padding: 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 10;

  &.success {
    background: rgba(0, 228, 0, 0.836);
    color: rgb(0, 83, 0);
    border-bottom: 10px solid rgb(0, 153, 0);
  }
  &.error {
    background: rgba(255, 64, 64, 0.678);
    color: rgb(160, 0, 0);
    border-bottom: 10px solid rgb(153, 0, 0);
  }
}

.slide-from-top-enter-active,
.slide-from-top-leave-active {
  transition: all 0.5s;
}

.slide-from-top-leave-to,
.slide-from-top-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
