const dotenv = require("dotenv").config();
const express = require("express");
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 8000;

const app = express.json();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"]
  }
});

let allTask = [];

io.on('connection', (socket) => {
  console.log('a user connected' + socket.id);
  socket.on("task", (value) => {
    allTask.push(value)
  socket.emit("taskClient", allTask)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected:' + socket.id);
  });
});


server.listen(PORT, () => {
    console.log("Server is running on:" + PORT)
})