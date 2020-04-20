<template>
  <div class="chat">
    <div class="chatContainer">
      <div class="chatlog">
        {{ Date() }}
        <p v-for="mess in messages" :key="mess.index">
          <strong> {{ mess.user }}: </strong> {{ mess.message }}
          {{ mess.charData }}
        </p>
      </div>

      <input class="nameField" v-model="user" placeholder="Pick a name" />
      <textarea
        class="chatBox"
        v-model="message"
        placeholder="Type you message.."
        @keyup.enter="sendMessage"
      />
      <button v-if="user === ''" :disabled="true">Pick a name</button>
      <button v-else @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  props: ["charData"],
  mounted() {
    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
    });
  },
  data() {
    return {
      user: "",
      message: "",
      messages: [],
      socket: io(process.env.PORT)
    };
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        user: this.user,
        message: this.message
      });
      this.message = "";
    },
    sendData() {
      const data = this.charData.toString();
      console.log("sendData -> data", data);

      this.socket.emit("SEND_MESSAGE", { charData: data });
    },
    scrollToEnd() {
      const container = document.querySelector(".chatlog");
      const scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    }
  },
  watch: {
    charData: function() {
      this.sendData();
    }
  },
  updated() {
    this.scrollToEnd();
  }
};
</script>

<style scoped>
.chatBox {
  margin-right: 10px !important;
  margin: 10px;
  max-height: 100px;
  padding: 5px;
  vertical-align: top;
  text-align: left;
  width: 98%;
  border: 0;
  resize: none;
  font-family: "Ubuntu Mono", monospace;
  box-shadow: 2px 2px 3px 1px #6a6a6a;
}

.nameField {
  margin-right: 10px !important;
  margin: 10px;
  padding: 5px;
  text-align: left;
  width: 98%;
  box-shadow: 2px 2px 3px 1px #6a6a6a;
  font-family: "Ubuntu Mono", monospace;
}

.chatlog {
  margin: 10px;
  width: 300px;
  min-height: 300px;
  max-height: 300px;
  overflow: scroll;
  background-color: white;
  margin-bottom: 20px;
  font-family: "Ubuntu Mono", monospace;
  width: 98%;
  box-shadow: 2px 2px 3px 1px #6a6a6a;
  text-shadow: 0 !important;
  color: black !important;
}
</style>
