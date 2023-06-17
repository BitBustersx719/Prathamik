const asyncHandler = require('express-async-handler');
const { generateParticipantId, participants } = require('./streamrtc');
const startStream = asyncHandler(async (req, res) => {
    const streamCode = generateParticipantId(); // Implement your logic to generate a stream code
    // Start the stream or perform any necessary actions
   console.log(streamCode)
    res.json({ streamCode });
    return streamCode
  });
const joinStream = asyncHandler(async (req, res) => {
  const { streamCode } = req.body;
  console.log({streamCode})
  const participantId = generateParticipantId();

  participants.set(participantId, streamCode);
  res.json({"Sucess":"Stream joined sucessfully",
               "participantId":participantId,})
});

const leaveStream = asyncHandler(async (req, res) => {
  const { participantId } = req.body;

  participants.delete(participantId);

  res.json({ message: 'Participant left successfully' });
});

module.exports = {
  joinStream,
  leaveStream,
  startStream
};
