<template>
  <div id="app">
    <div class="bodyContainer">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>

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
