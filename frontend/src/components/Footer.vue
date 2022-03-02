<template>
  <div class="body">
    <div class="footer">
      <div class="container">
        <h3>Nous suivre</h3>
        <a href="https://www.facebook.com/codingac/" target="blank">
          <img src="https://img.icons8.com/color/40/000000/facebook.png"
        /></a>
        <a
          href="https://www.instagram.com/epitech.national/?hl=fr"
          target="blank"
        >
          <img
            src="https://img.icons8.com/color/40/000000/instagram-new--v2.png"
        /></a>
        <a
          href="https://twitter.com/EpitechMulhouse/status/1485598510531624961"
          target="blank"
        >
          <img src="https://img.icons8.com/fluency/40/000000/twitter.png"
        /></a>
      </div>
      <div class="container"></div>
      <div class="container">
        <h3>Nous contacter</h3>
        <p>E-mail: email@email.com</p>
        <p>Téléphone: 0606060606</p>
      </div>
    </div>
    <div class="bottom">
      <a href="https://icons8.com/icon/59780/facebook"
        >Facebook icon by Icons8</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background: #ffe26f;

  height: 100px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-top: 10px;
}
.container {
  text-align: center;
}
h3 {
  font-size: 15px;
  text-decoration: underline;
}
p {
  font-size: 15px;
}
.bottom {
  font-size: 12px;
  background: #ffe26f;
}
</style>
