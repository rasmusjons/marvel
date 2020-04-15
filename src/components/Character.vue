<template>
  <div class="component">
    <br />
    <br />
    <h1 class="headline">Find your hero!</h1>

    <b-container class="container">
      <b-row class="text-center">
        <b-col md="12">
          <div class="searchArea">
            <input
              class="searchForm"
              v-model="search"
              placeholder="Enter text..."
            />
            <button @click="getCharacters">Start</button>
          </div>
        </b-col>
      </b-row>
      <b-row class="characterCard">
        <b-col md="8">
          <div v-for="comic in comics" :key="comic.index" class="charCard">
            <h1 v-if="empty">Game Over! Try a different search</h1>
            <h1>{{ comic.name }}</h1>
            <p>{{ comic.description }}</p>
            <img :src="comic.thumbnail.path + '/standard_xlarge.jpg'" />

            <h5 v-if="comic.events.items.length != 0">
              Appears in these adventures:
            </h5>
            <b-table
              id="my-table"
              :items="comic.events.items"
              :per-page="perPage"
              :current-page="currentPage"
              small
            ></b-table>
            <button
              @click="
                saveChar(comic.name, comic.description, comic.thumbnail.path),
                  doVote(comic.id)
              "
              :disabled="clickedButtons.includes(comic.id)"
            >
              Add to my list
            </button>
          </div>
        </b-col>

        <b-col md="4" class="savedChar">
          <h1>My characters</h1>

          <div v-for="myChar in mySavedChar" :key="myChar.index">
            <h5>{{ myChar.name }}</h5>
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
      active: false,
      perPage: 5,
      currentPage: 1,
      comics: [],
      flatEvents: [],
      search: "",
      mySavedChar: [],
      clickedButtons: [],
      number: 10,
      empty: false
    };
  },

  methods: {
    doVote(id) {
      this.clickedButtons.push(id);
      console.log("doVote -> this.clickedButtons", this.clickedButtons);

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
        options = "nameStartsWith=x-";
      } else options = "nameStartsWith=" + this.search;
      console.log(options);
      const url =
        "https://gateway.marvel.com:443/v1/public/characters?" +
        options +
        "&limit=100&ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b";

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
    saveChar(name, description, imageUrl) {
      this.mySavedChar.push({ name, description, imageUrl });
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
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap);

.headline {
  margin: auto;

  font-size: 30px;
}
.container {
  text-align: left;
  color: rgb(201, 199, 199);
  font-family: "Press Start 2P";
}

/* .component {
  background: url(../assets/backg.jpg);
} */

#my-table td:nth-child(1) {
  display: none;
}
#my-table th:nth-child(1) {
  display: none;
}

.savedChar {
  background-color: rgba(218, 165, 32, 0.235);
}

.b-table {
  color: rgb(201, 199, 199) !important;
}

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

button {
  width: 150px;
  height: 50px;
  border: 0;
  margin-bottom: 60px;
  box-shadow: 2px 2px 3px 1px #fa9900;
  background-color: #ab6600;
  transition: 0.05s;
  margin: 20px;
  font-family: "Press Start 2P", cursive;
  color: goldenrod;
  text-shadow: 3px 3px black;
  font-size: 12px;

  font-weight: 100;
}

button:active {
  transform: scale(0.9);
}
button:disabled {
  opacity: 0.7;
}

.charCard {
  background: rgba(245, 245, 245, 0.1);
  margin-bottom: 20px;
  padding: 20px;
}

.bottleImage {
  width: 20px;
  padding: 5px;
  margin: auto;
}

.searchArea {
  margin: 20px;
}

.searchForm {
  margin-right: 30px;
}
</style>
