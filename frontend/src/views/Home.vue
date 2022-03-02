<template>
  <div class="home">
    <!-- <Navbar /> -->
    <div class="header">
      <div class="left">
        <div class="title">
          <h1>Vous avez besoin d'aide ?</h1>
          <p class="description">
            Trouver un étudiant pour vous aider dans vos tâches du quotidien
          </p>
        </div>
        <Searchbar />
      </div>
      <div class="right">
        <div class="image">
          <img src="../assets/images/student.jpg" alt="" />
        </div>
      </div>
    </div>
    <div class="content2">
      <h3 class="title2">
        Vous avez besoin d'aide ? Un étudiant peut vous aider !
      </h3>
      <div class="container">
        <div class="content">
          <div class="img">
            <img src="../../../Design/6671.png" />
          </div>
          <p>
            <span class="red">1.</span> Touvez un étudiant proche de chez vous
          </p>
        </div>
        <div class="content">
          <div class="img">
            <img src="../../../Design/3809181.png" />
          </div>
          <p>
            <span class="red">2.</span> Offrez lui la possibilité de faire un
            petit job
          </p>
        </div>
        <div class="content">
          <div class="img vertical">
            <img src="../../../Design/High_five.png" />
          </div>
          <p>
            <span class="red">3.</span> Soyez satisfait, vous vous êtes aidés
            mutuellement !
          </p>
        </div>
      </div>
      <div class="center">
        <button class="btn btn-blue" @click="$router.push('signup')">
          S'inscrire
        </button>
      </div>
    </div>
    <div class="content3">
      <!-- <div class="content-card"> -->
      <students />
      <!-- </div> -->
    </div>
    <div class="content4">
      <h3 class="title2">Vous cherchez à arrondir vos fins de mois ?</h3>
      <div class="container">
        <div class="content">
          <div class="img">
            <img src="../../../Design/register.png" />
          </div>
          <p>
            <span class="red">1.</span> Inscrivez-vous, remplissez votre profil
          </p>
        </div>
        <div class="content">
          <div class="img">
            <img src="../../../Design/3809181.png" />
          </div>
          <p><span class="red">2.</span> Mettez vos compétences à profit</p>
        </div>
        <div class="content">
          <div class="img vertical">
            <img src="../../../Design/High_five.png" />
          </div>
          <p>
            <span class="red">3.</span> Vos compétences vous permet de gagner de
            l'argent
          </p>
        </div>
      </div>
      <div class="center">
        <button class="btn btn-red" @click="$router.push('signup')">
          S'inscrire
        </button>
      </div>
    </div>

    <div class="back">
      <div class="content5">
        <comments />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Searchbar from "../components/Searchbar";
import Footer from "../components/Footer";
import Comments from "../components/Home/Comments/Comments.vue";
import Students from "../components/Home/Students/Students.vue";
export default {
  name: "Home",
  components: {
    Searchbar,
    Footer,
    Comments,
    Students,
  },

  props: ["user"],
};
</script>
<style scoped lang="scss">
.header {
  position: relative;
  min-height: 90vh;
  display: flex;
  width: 100%;

  &::after {
    content: "";
    display: block;
    position: absolute;
    background: #ff5959;
    clip-path: polygon(0 0, 100% 0, 100% 60%, 0% 100%);
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
  }

  .left {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;

    @media screen and (max-width: 780px) {
      width: 100%;
    }

    .title {
      color: white;
      margin-bottom: 20px;

      h1 {
        margin-bottom: 10px;
      }

      .description {
        font-size: 18px;
        line-height: 1.3;
      }
    }
  }

  .right {
    width: 30%;
    display: flex;
    justify-content: flex-end;

    @media screen and (max-width: 780px) {
      display: none;
    }

    .image {
      max-width: 500px;
      height: 100%;
      clip-path: circle(62% at 98% 50%);
    }
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
}
.home h3 {
  margin: auto;
  max-width: 80%;
}
.title {
  padding: 10px;
  width: 80%;
}
.title2 {
  text-align: center;
  margin-bottom: 10px;
}
.content2,
.content4 {
  margin: 50px 0;
  .container {
    width: 90%;
    gap: 20px;
    margin: 50px auto;
    display: flex;

    @media screen and(max-width: 790px) {
      flex-direction: column;

      .content {
        text-align: center;

        .img.vertical {
          img {
            object-fit: contain;
          }
        }
      }
    }

    .content {
      flex-basis: 0;
      flex-grow: 1;
      line-height: 1.2;

      p {
        max-width: 80%;
        margin: auto;
      }

      span {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
.img {
  padding: 10px;
  height: 300px;

  &.vertical {
    img {
      object-fit: cover;
    }
  }
}
.img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.content3 {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 80vh;
  &::before {
    content: "";
    display: block;
    position: absolute;
    background: $yellow;
    width: 100%;
    height: 100%;
    clip-path: polygon(0 87%, 0 0, 100% 23%, 100% 100%);

    z-index: -1;
  }
}
.content5 {
  display: flex;
  align-items: center;
  position: relative;
  min-height: 80vh;

  .comments__section {
    height: 100%;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url("../assets/bg/Section_bg-blue.png");
    background-size: 110% 100%;
    background-repeat: no-repeat;
    z-index: -1;
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url("../assets/bg/Section_bg-red.png");
    background-size: 110% 100%;
    background-repeat: no-repeat;
    z-index: -1;
  }
}

.center {
  display: flex;
  justify-content: center;
  margin: 10px;
}
.avis {
  padding-top: 20px;
}
</style>
