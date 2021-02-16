const { array, number } = require("@hapi/joi");
const mongoose = require("mongoose");
const ProfilePicUrl =
  "https://www.nicepng.com/png/detail/131-1318812_avatar-group-icon.png";

const MessageSchema = mongoose.Schema(
  {
    sender_id: {
      type: String,
      required: true,
    },
    message_body: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const membersSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    lastMessageReadIndex: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const RoomSchema = mongoose.Schema({
  name: {
    type: String,
    min: 5,
    max: 100,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  creator_id: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  members: [membersSchema],
  messages: [MessageSchema],
  profile_pic: {
    type: String,
    default: ProfilePicUrl,
  },
});

module.exports = mongoose.model("room", RoomSchema);
