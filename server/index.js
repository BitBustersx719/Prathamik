const dotenv = require('dotenv');
const express = require('express');
const routes = require('./Routes/routes.js');
const AgoraRTC = require('agora-rtc-sdk-ng');
const cors = require('cors');
const { handleInput } = require('./gpt-3.5/gptController/inputController.js');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3001',
  })
);
app.use('/api',routes)
app.post('/input', handleInput);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});