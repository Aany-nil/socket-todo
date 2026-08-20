const dns = require("dns");
const dotenv = require("dotenv").config();
const express = require("express");
const dbConfig = require("./config/dbConfig");
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require("cors");
const { getTask, createTask, updateTask, deleteTask } = require("./controller/taskController");

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


io.on('connection', async (socket) => {
  console.log('a user connected' + socket.id);
  
  const task = await getTask();
  socket.emit("taskClient", task);

  socket.on("task", async (title) => {
    await createTask(title);
    const validTask = await getTask();
    io.emit("taskClient", validTask)
  }); 

  socket.on("updateTask", async ({ id, isCompleted }) => {
    await updateTask(id, {isCompleted });
    const validTask = await getTask();
    io.emit("taskClient", validTask)
  });

  socket.on("deleteTask", async (id) => {
     await deleteTask(id);
     const validTask = await getTask();
     io.emit("taskClient", validTask)
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:' + socket.id);
  });
});


server.listen(PORT, () => {
    console.log("Server is running on:" + PORT)
})