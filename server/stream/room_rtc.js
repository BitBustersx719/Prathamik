const express = require('express');
const router = express.Router();
const AgoraRTC = require('agora-rtc-sdk-ng');

const agoraAppId = 'YOUR_AGORA_APP_ID'; // Replace with your Agora App ID

let streamCode = '';
let agoraClient;

router.post('/start', (req, res) => {
  streamCode = generateStreamCode();
  res.json({ streamCode });
});

router.post('/join', (req, res) => {
  const { joinCode } = req.body;
  if (joinCode === streamCode) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

const generateStreamCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const startAgoraStream = () => {
  agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  agoraClient.init(agoraAppId);

  agoraClient.on('user-published', async (user, mediaType) => {
    await agoraClient.subscribe(user, mediaType);
  });

  agoraClient.on('user-unpublished', user => {
    if (user.uid === 1) {
      agoraClient.remoteStreams.forEach(remoteStream => {
        remoteStream.stop();
      });
    }
  });
};

module.exports = { router, startAgoraStream };
