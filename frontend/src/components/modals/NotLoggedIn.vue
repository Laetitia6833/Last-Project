<template>
  <div class="modal modal__not-logged">
    <div class="content">
      <div class="close__btn" @click="$emit('closeModal', false)">X</div>
      <slot />
      <button class="btn btn-blue">
        <router-link :to="{ path: '/signin' }">Se Connecter</router-link>
      </button>
      <p class="pmodal">Pas encore de compte ?</p>
      <button class="btn btn-red">
        <router-link :to="{ path: '/signup' }">S'inscrire</router-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style lang="scss">
.pmodal {
  margin-top: 10px;
}
.modal {
  z-index: 10;
  // &__not-logged {
  // }
  .content {
    background: white;
    border-radius: 10px;
    padding: 20px;
    display: grid;
    place-items: center;
    position: relative;

    .close__btn {
      margin-top: 0;
      background: red;
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      color: white;
      display: grid;
      place-items: center;
      border-radius: 9999px;
      transform: translate(50%, -50%);
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        transform: translate(50%, -50%) scale(1.2) rotate(360deg);
      }
    }
  }
}
</style>
