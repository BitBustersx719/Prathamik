import { handleInput } from './gpt-3.5/gptController/inputController.js';
import { config } from 'dotenv';
config();

import cors from 'cors';

import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001'
}));

app.post('/input', handleInput);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});