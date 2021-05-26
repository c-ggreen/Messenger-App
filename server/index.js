// Calling all the necessary dependencies
// No import statements because this is for node
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

// Built in node module
const http = require("http");

// Importing the user functions from users.js
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

// The Port that the server is running on
const PORT = process.env.PORT || 5000;

// Importing the router
const router = require("./router");

// Allows my server to be recognized by cors
corsOptions = {
  cors: true,
  origins: ["http://localhost:3000"],
};

// Setting the variable app equal to express so that I may write in node
const app = express();

// Initializes the server
const server = http.createServer(app);

// An instance of the socket.io with the server and cors as parameters, it makes the socket.io server work
const io = socketio(server, corsOptions);

// Calling the router
app.use(router);
app.use(cors());

// The socket.io that is responsible for when a connection is made to the server
io.on("connection", (socket) => {
  // The function that handles what happens on join, a name and room is pushed as an object
  socket.on("join", ({ name, room }, callback) => {
    console.log("we have a new connection");

    // Calling the addUser function and passing its parameters
    const { error, user } = addUser({ id: socket.id, name, room });

    // The callback responsible for error handling
    if (error) {
      return callback(error);
    }

    // A welcome message when the user joins the room
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    // Sends a message to everyone in a room that a user has joined the room
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });

    // Enables the user to join a room if there isn't an error
    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    // Calling the callback with nothing in its parameters just so that it executes in the client
    callback();
  });

  // Responsible for handling the messages a users sends
  socket.on("sendMessage", (message, callback) => {
    // Grabs the specific user
    const user = getUser(socket.id);

    // Emits the user and the user text to the room
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  // The function that occurs when a user disconnects from the server
  socket.on("disconnect", () => {
    // Removes the user based on the id
    const user = removeUser(socket.id);

    // Sends a message to the room that the user has left
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});



// Runs the server by specifying a port to run on
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
