import express from 'express'
const router= express.Router()
import {joinStream,startStream} from '../stream/room_rtc.js'
router.post('/start',startStream)
router.post('/join',joinStream)
export default router