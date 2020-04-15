<template>
  <div id="app">
    <div class="bodyContainer">
      <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
      <!-- 
      <router-view /> -->
      <app-home></app-home>
    </div>
  </div>
</template>

<script>
import HomeVue from "./views/Home.vue";
export default {
  components: {
    appHome: HomeVue
  }
};
</script>

<style scoped>
.bodyContainer {
  background: url(assets/backg.jpg);
}
</style>
