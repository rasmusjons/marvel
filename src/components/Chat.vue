<template>
  <div class="chat">
    <h1>Chat</h1>
    <input v-model="user" />
    <input v-model="message" />
    <button @click="sendMessage">SEND MESSAGE</button>
    <p v-for="mess in messages" :key="mess.index">
      {{ mess.user }}: {{ mess.message }} {{ mess.charData }}
    </p>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  props: ["charData"],
  mounted() {
    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
  },
  data() {
    return {
      user: "",
      message: "",
      messages: [],
      socket: io("localhost:3000")
    };
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        user: this.user,
        message: this.message
      });
    },
    sendData() {
      const data = this.charData.toString();
      console.log("sendData -> data", data);

      this.socket.emit("SEND_MESSAGE", { charData: data });
    }
  },
  watch: {
    charData: function() {
      this.sendData();
    }
  }
};
</script>
