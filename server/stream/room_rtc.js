// room_rtc.js
const AgoraRTC = require('agora-rtc-sdk-ng');
const asyncHandler = require('express-async-handler');

const agoraAppId = process.env.APP_ID; // Replace with your Agora App ID

function generateCode(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const joinStream = asyncHandler(async (req, res) => {
  const streamCode = req.body.streamCode;
  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  await client.join(agoraAppId, streamCode, null);

  const uid = generateCode(6); // Generate a random 6-character UID with alphabets
  res.json({ uid }); // Return the generated UID as JSON
});

const startStream = asyncHandler(async (req, res) => {
  const uid = generateCode(6); // Generate a random 6-character UID with alphabets
  const message = `Stream started with participant: ${uid}`;
  res.json({ message });
});

module.exports = {
  joinStream,
  startStream,
};
