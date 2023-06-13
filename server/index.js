require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const { handleUpgrade, handleWebSocketConnection } = require('./stream/streamrtc');
const { initializeSignalingServer} = require('./stream/streamrtc')
const routes = require('./Routes/routes');
const { handleInput } = require('./gpt-3.5/gptController/inputController.js');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001'
}));
app.post('/input', handleInput);

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
