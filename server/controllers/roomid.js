const roomidModel = require('../models/roomid');

async function createRoomId (req, res) {
    const roomid = req.body.roomid;
    const owner = req.body.owner;

    const newRoomId = new roomidModel({
        roomid: roomid,
        owner: owner,
    });

    try {
        await newRoomId.save();
        res.status(200).json({message: 'Room ID created!'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function verifyOwner (req,res) {
    const roomid = req.body.roomid;
    const owner = req.body.owner;

    const id = roomidModel.findOne({roomid: roomid});

    if (id.owner === owner) {
        res.status(200).json({meetingId: roomid , isAdmin: true});
    }

    else {
        res.status(200).json({meetingId: roomid , isAdmin: false});
    }
}

module.exports = {
    createRoomId,
    verifyOwner
}