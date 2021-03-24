const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Room = require("../models/rooms");
const AuthTokenVerification = require("./TokenVerify");
const { roomValidation } = require("../validation");
const RoomMemberVerification = require("./RoomMemberVerify");

router.get("/all", AuthTokenVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send("Access denied");
    }
    const user = await User.findById(req.user._id);
    const rooms_id = user.rooms_id;
    const rooms = [];

    for (const roomid of rooms_id) {
      const room = await Room.findById(roomid);
      if (room.name) {
        for (const member of room.members) {
          if (member.id === req.user._id && !member.blocked) {
            rooms.push(room);
          }
        }
      } else {
        rooms.push(room);
      }
    }
    res.json(rooms);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:RoomId", RoomMemberVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send("Access denied");
    }
    const room = await Room.findById(req.params.RoomId);
    res.json(room);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.patch("/update/:RoomId", RoomMemberVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send("Access denied");
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
      message: "successfully updated",
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/new", AuthTokenVerification, async (req, res) => {
  if (!req.user) {
    return res.status(400).send("Access denied");
  }
  try {
    const members = req.body.members;
    members.push({ id: req.user._id });
    var room_details;

    if (req.body.isDark)
      room_details = {
        name: req.body.name,
        description: req.body.description,
        creator_id: req.user._id,
        members: members,
        isDark: true,
      };
    else
      room_details = {
        name: req.body.name,
        description: req.body.description,
        creator_id: req.user._id,
        members: members,
        isDark: false,
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

router.patch(
  "/RemoveMember/:RoomId",
  RoomMemberVerification,
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).send("Access denied");
      }
      const room = await Room.findById(req.params.RoomId);
      if (req.user._id === room.creator_id) {
        const UpdatedRoom = await Room.updateMany(
          {
            _id: room._id,
            "members.id": req.body.member,
          },
          {
            $set: {
              "members.$.blocked": true,
            },
          }
        );
        res.json({
          message: "successfully updated",
        });
      } else {
        return res.status(400).send("Access denied");
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  }
);

router.patch("/AddMember/:RoomId", RoomMemberVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send("Access denied");
    }
    const room = await Room.findById(req.params.RoomId);
    if (req.user._id === room.creator_id) {
      const member_id = req.body.member;
      for (const member of room.members) {
        if (member.id === member_id) {
          const UpdatedRoom = await Room.updateMany(
            {
              _id: req.params.RoomId,
              "members.id": req.body.member,
            },
            {
              $set: {
                "members.$.blocked": false,
              },
            }
          );

          return res.json({
            message: "successfully updated",
          });
        }
      }
      const updatedRoom = await Room.updateMany(
        {
          _id: req.params.RoomId,
        },
        {
          $push: {
            members: {
              id: member_id,
            },
          },
        }
      );
      const UpdatedUser = await User.updateMany(
        {
          _id: member_id,
        },
        {
          $push: {
            rooms_id: room._id,
          },
        }
      );
      res.json({
        message: "successfully updated",
      });
    } else {
      return res.status(400).send("Access denied");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.patch("/leave/:RoomId", RoomMemberVerification, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send("Access denied");
    }
    const UpdatedRoom = await Room.updateMany(
      {
        _id: req.params.RoomId,
        "members.id": req.user._id,
      },
      {
        $set: {
          "members.$.blocked": true,
        },
      }
    );
    res.json({
      message: "successfully updated",
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
