const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Room = require('../models/rooms');
const AuthTokenVerification = require('./TokenVerify');
const { roomValidation } = require('../validation');
const RoomMemberVerification = require('./RoomMemberVerify');
const RandomUserNames = require('../NamesList');

router.get('/all', AuthTokenVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send('Access denied');
    }
    const user = await User.findById(req.user._id);
    const rooms_id = user.rooms_id;
    const rooms = [];

    for (const roomid of rooms_id) {
      var room = await Room.findById(roomid);
      if (room.name) {
        for (const member of room.members) {
          if (member.id === req.user._id) {
            if (!member.blocked) rooms.push(room);
            break;
          }
        }
      } else {
        if (room.isDark && room.creator_id === req.user._id) {
          for (var member of room.members) {
            const details = await User.findById(member.id);
            member['details'] = details;
          }
        }
        rooms.push(room);
      }
    }
    res.json(rooms);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:RoomId', RoomMemberVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send('Access denied');
    }
    const room = await Room.findById(req.params.RoomId);
    res.json(room);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.patch('/update/:RoomId', RoomMemberVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send('Access denied');
    }
    const room = await Room.findById(req.params.RoomId);
    const UpdatedRoom = await Room.updateMany(
      {
        _id: req.params.RoomId,
      },
      {
        $set: {
          name: req.body.name || room.name,
          description: req.body.description || room.description,
          profile_pic: req.body.profile_pic || room.profile_pic,
        },
      }
    );
    res.json({
      message: 'successfully updated',
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post('/new', AuthTokenVerification, async (req, res) => {
  if (!req.user) {
    return res.status(400).send('Access denied');
  }
  try {
    const members = req.body.members;
    members.push({ id: req.user._id });
    var room_details;
    var isdark;

    if (req.body.isDark) {
      for (const member of members) {
        var username =
          RandomUserNames[Math.floor(Math.random() * RandomUserNames.length)];
        var user = await User.findById(member.id);
        member['details'] = {
          _id: member.id,
          name: username,
          status: `hi, i am ${username}`,
        };
      }
      isdark = true;
    } else {
      for (const member of members) {
        var user = await User.findById(member.id);
        member['details'] = user;
      }
      isdark = false;
    }

    room_details = {
      name: req.body.name,
      description: req.body.description,
      creator_id: req.user._id,
      members: members,
      isDark: isdark,
    };

    const { error } = roomValidation(room_details);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const room = new Room(room_details);
    const Savedroom = await room.save();

    for (const member of members) {
      const UpdatedUser = await User.updateMany(
        {
          _id: member.id,
        },
        {
          $push: {
            rooms_id: room._id,
          },
        }
      );
    }
    res.json({
      room: room,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
