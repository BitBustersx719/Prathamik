import { config } from 'dotenv';
config();

import { Configuration, OpenAIApi } from 'openai';
import readline from 'readline';

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
  organization: process.env.CHATGPT_ORG
});

const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

userInterface.prompt();
userInterface.on('line', async input => {
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: input }],
  });
  console.log(res.data.choices[0].message.content);
  userInterface.prompt();
});