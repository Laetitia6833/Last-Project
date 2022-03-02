<template>
  <div class="choose">
    <div @click="componentTransition('UserForm')">
      <!-- <div @click="(userform = true), (studentform = false)"> -->
      <p>Je veux aider un étudiant</p>
      <div class="img">
        <img src="../../assets/images/help-yellow.png" alt="" />
      </div>
    </div>
    <div
      @click="componentTransition('StudentForm'), $emit('comp', 'StudentForm')"
    >
      <!-- <div @click="(userform = false), (studentform = true)"> -->
      <p>Je suis étudiant</p>
      <div class="img">
        <img src="../../assets/images/student.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    componentTransition(value) {
      this.$emit("component-transition", value);
    },
  },
};
</script>

<style lang="scss">
.choose {
  width: 80%;
  margin: auto;
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  gap: 20px;
  font-size: 25px;
  cursor: pointer;
  text-align: center;

  & > div {
    height: 100%;

    &:hover {
      img {
        transform: scale(1.1);
      }
      p {
        transform: scale(0.9);
      }
    }

    p {
      margin-bottom: 20px;
      transition: all 0.3s;
    }
  }

  .img {
    max-width: 250px;
    max-height: 400px;
    margin: auto;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: all 0.3s;
    }
  }
}
</style>
