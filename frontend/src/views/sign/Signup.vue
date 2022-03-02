<template>
  <div class="signup__container">
    <div class="btn__container">
      <button
        v-if="comp === 'StudentForm'"
        @click="componentTransition('UserForm')"
      >
        S'inscrire en tant que client
      </button>
      <button
        v-if="comp === 'UserForm'"
        @click="componentTransition('StudentForm')"
      >
        S'inscrire en tant qu'étudiant
      </button>
    </div>

    <transition name="slide" mode="out-in">
      <component @component-transition="componentTransition" :is="comp" />
    </transition>
  </div>
</template>

<script>
import UserForm from "../../components/forms/UserSignup.vue";
import StudentForm from "../../components/forms/StudentSignup.vue";
import ChooseForm from "../../components/forms/ChooseForm.vue";

export default {
  name: "Signup",
  components: {
    UserForm,
    StudentForm,
    ChooseForm,
  },
  data() {
    return {
      userform: false,
      studentform: false,
      comp: "ChooseForm",
    };
  },

  methods: {
    componentTransition(value) {
      this.comp = value;
    },
    tComp() {
      this.comp = StudentForm;
    },
  },
};
</script>

<style lang="scss">

.signup__container {
  padding-bottom: 20px;
  position: relative;

  &::after {
    content: "";
    display: block;
    background: $red;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    clip-path: circle(81.7% at 0 18%);
    z-index: -10;
  }

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
}

.btn__container {
  margin-bottom: 30px;
  margin-top: 20px;

  button {
    display: block;
    margin: auto;
    padding: 7px 15px;
    background: $blue;
    color: white;
    border: 2px solid $blue;
    letter-spacing: 1px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      background: transparent;
      border: 2px solid white;
    }
  }
}

.form {
  margin: auto;
}

// TRANSITION \\
.slide-enter-from {
  transform: translateX(-100px);
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
