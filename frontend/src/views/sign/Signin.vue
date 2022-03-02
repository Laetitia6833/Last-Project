<template>
  <div class="signin__page">
    <div class="connect">
      <div class="title">
        <h1>Se connecter</h1>
        <signin-form />
      </div>
    </div>
  </div>
</template>

<script>
import SigninForm from "../../components/forms/SigninForm.vue";
// @ is an alias to /src

export default {
  name: "Signin",

  components: {
    SigninForm,
  },
};
</script>

<style lang="scss">
.signin__page {
  padding-top: 20px;
  min-height: 90vh;
  position: relative;

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  &::after {
    background-image: url("../../assets/bg/Tracé_4.png");
    z-index: -2;
  }
  &::before {
    background-image: url("../../assets/bg/Tracé_3.png");
    z-index: -1;
  }
  h1 {
    text-align: center;
    margin-bottom: 30px;
    color: white;
  }
}
</style>
