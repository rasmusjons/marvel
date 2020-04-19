<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input v-model="user" />
    <input v-model="message" />
    <button @click="sendMessage">SEND MESSAGE</button>
    <h5 v-for="mess in messages" :key="mess.index">
      {{ mess.user }}: {{ mess.message }}
    </h5>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
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
      socket: io(process.env.PORT || 3000)
    };
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        user: this.user,
        message: this.message
      });
    }
  }
};
</script>
