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

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
  organization: process.env.CHATGPT_ORG
});

const openai = new OpenAIApi(configuration);

app.post('/input', async (req, res) => {
  const input = req.body.input;

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: input }],
  });

  const output = response.data.choices[0].message.content;

  res.json({ output });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});