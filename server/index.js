import { config } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

config();

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
  organization: process.env.CHATGPT_ORG
});

const openai = new OpenAIApi(configuration);

openai.createChatCompletion({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Hello, CHATGPT?' }],
})
  .then(res => {
    console.log(res.data.choices[0].message.content);
  })
  .catch(err => {
    console.error(err);
  });