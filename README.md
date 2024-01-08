# What is Prathamik?

Prathamik is an online learning platform designed to empower teachers and provide a seamless experience for students. Prathamik is an education sector project that addresses critical challenges in access to quality education and personalized learning. It
incorporates advanced features such as real-time video calls, chat, whiteboard, IDE, and an AI bot for doubt resolution.

![prathamik](https://github.com/Subhrajit-Dutta/Prathamik/assets/98512995/0ae12d36-f281-4c78-84e6-08e91965197c)

## Tech Stack

Prathamik is built using the following technologies:

- [React.js](https://react.dev/)
- [Node.js](https://nodejs.org/en)
- [MongoDB](https://www.mongodb.com/)

## Local Development

This environment is fully on your computer and requires each dependency (for example MongoDB) to be installed and set up, but it gives you the most flexibility for customization.

#### Prerequisites

Before contributing or adding a new feature, please make sure you have already installed the following tools:

- [NodeJs](https://nodejs.org/en/download/) (Works with Node LTS version v18.16.1)
- [MongoDB](https://www.mongodb.com/home)
- Optional [NVM](https://github.com/nvm-sh/nvm): Switch Node version by using `nvm use` (on Windows, use `nvm use v18.16.1`). If this is not installed, run `nvm install v18.16.1`.

1. Clone the repository:

   ```bash
   git clone https://github.com/Subhrajit-Dutta/Prathamik.git
   ```

2. Go to the project folder:

   ```bash
   cd prathamik
   ```

3. Set up environment variables:

   - copy the `.env.example` file to `.env` and update any details required
   - Add the following variables and update their values accordingly:

     ```plaintext
     CHATGPT_API_KEY=your-api-key
     CHATGPT_ORG=your-api-key
     MONGO_URI=your-api-key
     ```

4. Run the server:

   ```bash
   cd server
   npm ci
   npm run dev
   ```
5. Start OCR:

   ```bash
   cd server/configApi
   python3 whiteboard.py
   ```

6. Run the client:

   ```bash
   cd client
   npm ci
   npm start
   ```

The application will be accessible at `http://localhost:3000/`.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix:
   ```plaintext
   git checkout -b feature/your-feature
   ```
3. Commit your changes and push the branch:
   ```plaintext
   git commit -m "Add your feature"
   git push origin feature/your-feature
   ```
4. Submit a pull request, explaining your changes and their benefits.
