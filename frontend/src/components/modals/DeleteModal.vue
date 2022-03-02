<template>
  <div class="delete__modal">
    <div class="content">
      <slot />
      {{ userToDelete }}
      <div class="btn__container">
        <button @click="deleteUser" class="btn btn__confirm">Oui</button>
        <button
          class="btn btn__delete"
          @click="$emit('deleteModalVisible', false)"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userToDelete"],
  name: "DeleteModal",

  methods: {
    deleteUser() {
      this.$emit("deleteUser");
    },
  },
};
</script>

<style lang="scss">
.delete__modal {
  background: rgba(87, 87, 87, 0.397);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;

  .content {
    background: white;
    border-radius: 10px;
    padding: 20px;
    display: grid;
    place-items: center;

    .btn__container {
      display: flex;
      margin: 0;
    }

    .btn {
      color: white;
      border: none;
      margin: 20px;

      &__confirm {
        background: rgb(2, 196, 2);
      }
      &__delete {
        background: $red;
      }
    }
  }
}
</style>
