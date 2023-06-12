const express = require('express');
const { joinStream, startStream } = require('../stream/room_rtc.js');

const router = express.Router();

router.post('/start', startStream);
router.post('/join', joinStream);

module.exports = router;