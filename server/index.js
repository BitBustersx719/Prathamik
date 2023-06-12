import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

import express from 'express';
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001'
}));

import http from 'http';
import { Server } from 'socket.io';

import { handleInput } from './gpt-3.5/gptController/inputController.js';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST']
  }
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_value", (data) => {
    socket.broadcast.emit("ide_value", data);
  });

  socket.on("send_file", (data) => {
    socket.broadcast.emit("ide_file", data);
  });
});

app.post('/input', handleInput);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});