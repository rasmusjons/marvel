<template>
  <div id="app">
    <div class="bodyContainer">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap);
@import url("https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap");
* {
  font-family: "Press Start 2P", cursive;
  color: goldenrod;
}

#nav {
  text-align: center;
}
.bodyContainer {
  background: url(assets/backg.jpg);
  min-height: 1000px;
}
</style>
