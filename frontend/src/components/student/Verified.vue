<template>
  <div>
    <div class="box inProcess" v-if="inProcess !== null && !verified">
      <font-awesome-icon
        class="icon"
        :icon="['fas', 'clock']"
      ></font-awesome-icon>
      <p>En cours de vérification</p>
    </div>
    <div class="box verified" v-if="verified">
      <font-awesome-icon
        class="icon"
        :icon="['fas', 'check-circle']"
      ></font-awesome-icon>
      <p>Vérifié!!</p>
    </div>
    <div class="box notVerified" v-if="inProcess === null">
      <div>
        <font-awesome-icon
          class="icon"
          :icon="['fas', 'times-circle']"
        ></font-awesome-icon>
        <p>Vous devez envoyer un justificatif</p>
      </div>
      <button @click="$emit('sendFile', true)">Envoyer un justificatif</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["verified", "inProcess"],
};
</script>

<style lang="scss">
.verified__box {
  width: max-content;
  margin: auto;
}
.box {
  display: flex;
  width: max-content;
  padding: 10px 20px 10px 10px;
  border-radius: 5px;

  &.verified {
    background: rgb(118, 221, 0);
    color: rgb(0, 95, 0);
  }

  &.inProcess {
    background: rgb(255, 146, 21);
    color: rgb(168, 67, 0);
  }

  &.notVerified {
    display: block;
    background: rgb(255, 101, 101);
    color: rgb(163, 0, 0);

    & > div {
      display: flex;
    }

    button {
      display: block;
      margin: 10px auto 0 auto;
      border: 2px solid rgb(163, 0, 0);
      background: transparent;
      color: rgb(163, 0, 0);
      cursor: pointer;
      padding: 5px 10px;

      transition: all 0.3s;

      &:hover {
        background: rgb(163, 0, 0);
        color: white;
      }
    }
  }
  .icon {
    margin-right: 10px;
  }
}
</style>
