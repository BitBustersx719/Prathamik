import dotenv from 'dotenv';
import express from 'express';
import routes from './Routes/routes.js';
import AgoraRTC from 'agora-rtc-sdk-ng';
import cors from 'cors';
import { handleInput } from './gpt-3.5/gptController/inputController.js';

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
