<template>
  <div class="modalMask">
    <div class="modalContainer" @click="$emit('closeModal')">
      <div class="modalContent" @click.stop>
        <button @click="$emit('closeModal')">X</button>
        <h2>{{ data.name }}</h2>
        <img :src="data.thumbnail.path + '/standard_xlarge.jpg'" />
        <p>{{ data.description }}</p>
        <h5 v-if="data.events.items.length != 0">
          Appears in these adventures:
        </h5>
        <b-table
          id="my-table"
          :items="data.events.items"
          :per-page="perPage"
          :current-page="currentPage"
          small
        ></b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      perPage: 5,
      currentPage: 1
    };
  }
};
</script>

<style scoped>
.modalContainer {
  display: table-cell;
  vertical-align: middle;
}

#my-table {
  color: #616161 !important;
}
.modalMask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modalContent {
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fefefe;
  color: #616161;
  min-width: 600px;
  height: 90%;
  opacity: 0.95;
  z-index: 99;
  overflow: scroll;
}

button {
  width: 30px;
  height: 30px;
  border: 0;
  box-shadow: 2px 2px 3px 1px #fa9900;
  background-color: #ab6600;
  font-family: "Press Start 2P", cursive;
  color: goldenrod;
  text-shadow: 3px 3px black;
  font-size: 12px;
  float: right;
}
</style>
