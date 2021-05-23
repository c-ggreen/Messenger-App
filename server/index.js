// Calling all the necessary dependencies
// No import statements because this is for node
const express = require("express");
const socketio = require("socket.io");

// Built in node module
const http = require("http");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connect", (socket) => {
  console.log("User has joined!");

  socket.on('disconnect', ()=>{
      console.log('User has left.');
  })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
