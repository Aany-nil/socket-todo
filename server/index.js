const dns = require("dns");
const dotenv = require("dotenv").config();
const express = require("express");
const dbConfig = require("./config/dbConfig");
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require("cors");
const PORT = process.env.PORT || 8000;
dns.setServers(["8.8.8.8", "1.1.1.1"])

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
dbConfig();
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
  io.emit("taskClient", allTask)
  })
  io.emit("taskClient", allTask)
  socket.on('disconnect', () => {
    console.log('user disconnected:' + socket.id);
  });
});


server.listen(PORT, () => {
    console.log("Server is running on:" + PORT)
})