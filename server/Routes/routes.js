const express = require('express');
const router = express.Router();
const { io, participants } = require('../stream/streamrtc');

router.post('/join', (req, res) => {
  const { streamCode } = req.body;
  const participantId = generateParticipantId();

  participants.set(participantId, streamCode);

  res.json({ participantId });
});

router.post('/leave', (req, res) => {
  const { participantId } = req.body;

  participants.delete(participantId);

  res.json({ message: 'Participant left successfully'});
});

module.exports = router;
