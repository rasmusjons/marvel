const path = require("path");
const serveStatic = require("serve-static");
const express = require("express");
const history = require("connect-history-api-fallback");
const http = require("http"); //för websocket ska fungera
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app); //för websockets ska fungera.
const io = socketio(server);

// Express server.
app.use(serveStatic(path.join(__dirname, "../dist")));

app.use(
  history({
    disableDotRule: true,
    verbose: true
  })
);

//io.on tar en "event" att lyssna efter och en callback som sedan ska ske.
io.on("connection", socket => {
  socket.on("SEND_MESSAGE", function(data) {
    console.log("server", data);
    io.emit("MESSAGE", data);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("App listening on port " + port);
});
