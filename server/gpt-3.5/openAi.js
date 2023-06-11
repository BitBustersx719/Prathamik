import dotenv from 'dotenv';
dotenv.config();
import { Configuration, OpenAIApi } from 'openai';
const apiKey = process.env.CHATGPT_API_KEY;
const organization = process.env.CHATGPT_ORG;

const configuration = new Configuration({
  apiKey: apiKey,
  organization: organization
});

export const openai = new OpenAIApi(configuration);