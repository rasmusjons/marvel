<template>
  <div class="component">
    <br />
    <br />
    <h1 class="headline">
      Find your hero!
    </h1>
    <h2 class="subHeadline">
      Search for Marvel characters. Then share & discuss in the chat!
    </h2>

    <div class="sidebarButtonContainer">
      <button v-b-toggle.sidebar-1 class="startChatButton">Chat!</button>
    </div>
    <b-sidebar id="sidebar-1" title="Chat">
      <div class="px-3 py-2">
        <app-chat :charData="sendCharToChat"></app-chat>
      </div>
    </b-sidebar>

    <b-container class="container">
      <b-row class="text-center">
        <b-col md="12">
          <div class="searchArea">
            <input
              class="searchForm"
              v-model="search"
              placeholder="Find character..."
              @keyup.enter="getCharacters"
            />
            <button @click="getCharacters">
              Search
            </button>
          </div>
        </b-col>
      </b-row>
      <b-row class="characterCard">
        <b-col md="8">
          <!-- MODAL -->

          <app-modal
            v-if="modalVisible"
            :data="modalData"
            @closeModal="closeModal"
          ></app-modal>
          <div v-for="comic in comics" :key="comic.index" class="charCard">
            <h1 v-if="empty">Game Over! Try a different search</h1>
            <h1 class="charName" @click="openModal(comic)">{{ comic.name }}</h1>
            <img
              class="charImg"
              @click="openModal(comic)"
              :src="
                comic.thumbnail.path +
                  '/standard_xlarge.' +
                  comic.thumbnail.extension
              "
            />
            <br />
            <br />

            <button @click="openModal(comic)">More Info</button>

            <button
              @click="
                saveChar(
                  comic.name,
                  comic.description,
                  comic.thumbnail.path,
                  comic.id
                ),
                  doClick(comic.id)
              "
              :disabled="clickedButtons.includes(comic.id)"
            >
              Add to my list
            </button>
          </div>
        </b-col>

        <!-- MY SAVED CHAR -->
        <b-col md="4" class="savedChar">
          <h2>My list</h2>

          <div v-for="(myChar, index) in mySavedChar" :key="myChar.index">
            <h5>{{ myChar.name }}</h5>
            <button
              class="savedCharButton"
              @click="removeChar(index), removeClick(myChar.id)"
            >
              Remove
            </button>
            <button
              class="savedCharButton"
              @click="sendtoChat(myChar.name, myChar.description)"
            >
              Send to chat
            </button>
            <img :src="myChar.imageUrl + '/portrait_small.jpg'" />
            <p>{{ myChar.description }}</p>

            <img
              v-for="n in number"
              :key="n.index"
              class="bottleImage"
              src="../assets/bottle.png"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import md5 from "md5";
import axios from "axios";
import modal from "./Modal";
import ChatVue from "./Chat.vue";

export default {
  async beforeMount() {
    {
      // const publickey = "974dd323b12ad5c9b53f8222ae4ca7d6";
      // const privatekey = "1f48d54d91f6b1f1be25b199e58ee8de8698744d";
      // const ts = new Date().getTime();
      // const stringToHash = ts + privatekey + publickey;
      // const hash = md5(stringToHash);

      // const url =
      //   "http://gateway.marvel.com:443/v1/public/comics/1009215/comics?orderBy=focDate" +
      //   "&ts=" +
      //   ts +
      //   "&apikey=" +
      //   publickey +
      //   "&hash=" +
      //   hash;

      // console.log(url);
      this.getCharacters();
      this.eventsComputed();
    }
  },
  data() {
    return {
      modalVisible: false,
      modalData: null,
      active: false,
      comics: [],
      flatEvents: [],
      search: "",
      mySavedChar: [],
      clickedButtons: [],
      number: 10,
      empty: false,
      sendCharToChat: ""
    };
  },

  methods: {
    sendtoChat(...arg) {
      this.sendCharToChat = arg;
    },
    openModal(data) {
      this.modalVisible = true;
      this.modalData = data;
    },
    closeModal() {
      this.modalVisible = false;
    },
    doClick(id) {
      this.clickedButtons.push(id);
      if (!id) {
        return;
      }
    },
    removeClick(id) {
      const isId = element => element.id === id;
      const index = this.clickedButtons.findIndex(isId);
      this.clickedButtons.splice(index, 1);
      if (!id) {
        return;
      }
    },

    eventsComputed() {
      let events = [];
      this.comics.forEach(comic => {
        events.push(comic.events.items);
      });
      this.flatEvents = events.flat(2).map(event => ({ name: event.name }));
    },
    async getCharacters() {
      let options = "";

      if (this.search.length === 0) {
        options = "nameStartsWith=da";
      } else options = "nameStartsWith=" + this.search;
      console.log(options);
      const url =
        "https://gateway.marvel.com:443/v1/public/characters?" +
        options +
        "&limit=100&ts=rasmus&apikey=974dd323b12ad5c9b53f8222ae4ca7d6&hash=a457dc82c80b6cee46a52fed6fa0a99f";

      try {
        const response = await axios.get(url);

        if (response.data.data.results.length === 0) {
          this.empty = true;
          return;
        }
        this.comics = response.data.data.results;
        this.empty = false;

        console.log("SUCCESS!!", response);
      } catch (e) {
        console.log(e);
      }
    },
    saveChar(name, description, imageUrl, id) {
      this.mySavedChar.push({ name, description, imageUrl, id });
    },
    removeChar(index) {
      this.mySavedChar.splice(index, 1);
    }
  },
  computed: {
    rows() {
      let events = [];
      this.comics.forEach((comic, index) => {
        events.push(index);
      });
      return events.length;
    }
  },
  components: {
    appModal: modal,
    appChat: ChatVue
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap);

/*  HEADLINE */
.headline {
  margin: auto;
  font-size: 30px;
}
.subHeadline {
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
  margin-left: 20%;
  margin-right: 20%;
  text-shadow: 3px 3px black !important;
}

/* CHARACTTER AREA */
.container {
  text-align: left;
  font-family: "Press Start 2P";
}

.charCard {
  background-color: rgba(218, 165, 32, 0.235);
  margin-bottom: 20px;
  padding: 20px;
}

.charChard,
.charImg,
.charName {
  cursor: pointer;
}

.bottleImage {
  width: 20px;
  padding: 5px;
  margin: auto;
}

/* TABLE */

#my-table td:nth-child(1) {
  display: none;
}
#my-table th:nth-child(1) {
  display: none;
}

.b-table {
  color: rgb(201, 199, 199) !important;
}

/* MY LIST  */
.savedChar h2 {
  font-size: 23px !important;
  text-shadow: 3px 3px black !important;
}

.savedChar {
  background-color: rgba(218, 165, 32, 0.235);
  padding: 20px;
}

.savedCharButton {
  width: 100px;
  height: 40px;
  border: 0;
  box-shadow: 2px 2px 3px 1px #fa9900;
  background-color: #ab6600;
  font-family: "Press Start 2P", cursive;
  color: goldenrod;
  text-shadow: 3px 3px black;
  font-size: 12px !important;

  float: right;
}

/* FONT */

h1 {
  color: #ffcc33;
  text-shadow: 3px 3px black;
  font-size: 18px !important;
  line-height: 40px;
  font-weight: 300;
  letter-spacing: 0px;
  font-family: "Press Start 2P", cursive;
  border: 20px groove #ff9900;
  background-color: #8a4e23;
  width: fit-content;
  padding: 7px;
}

/* BUTTONS */
button {
  width: 150px;
  height: 50px;
  border: 0;
  box-shadow: 2px 2px 3px 1px #fa9900;
  background-color: #ab6600;
  transition: 0.05s;
  font-family: "Press Start 2P", cursive;
  color: goldenrod;
  text-shadow: 3px 3px black;
  font-size: 16px !important;
  font-weight: 100;
  margin: 10px !important;
}

button:active {
  transform: scale(0.9);
}
button:disabled {
  opacity: 0.7;
}

.startChatButton {
  background: url(../assets/smile.png);
  background-repeat: no-repeat;
  background-color: #ab6600;
  background-position: 95%;
  padding: 5px;
  width: 138px;
  height: 33px;
}

/* SEARCH  */

.searchArea {
  margin: 20px;
}

.searchForm {
  margin-right: 30px;
}

/* SIDEBAR */
.sidebarButtonContainer {
  text-align: right;
}

#sidebar-1 {
  background: url(../assets/backg.jpg);
  background-repeat: repeat;
  color: goldenrod !important;
  border-right: 1px solid goldenrod;
}

.close {
  width: 30px !important;
  height: 30px !important;
  box-shadow: 2px 2px 3px 1px #fa9900 !important;
  background-color: goldenrod !important;
  transition: 0.05s !important;
  font-family: "Press Start 2P", cursive !important;
  text-shadow: 3px 3px black !important;
  font-size: 20px !important;
  font-weight: 900 !important;
  font-weight: 100 !important;
  margin: 10px !important;
}
</style>
