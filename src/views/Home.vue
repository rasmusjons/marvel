<template>
  <div class="home">
    <character-card></character-card>
  </div>
</template>

<script>
import CharacterVue from "../components/Character.vue";

export default {
  name: "Home",
  components: {
    characterCard: CharacterVue
  }
};
</script>

<style></style>
