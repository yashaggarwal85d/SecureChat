const { array } = require("@hapi/joi");
const mongoose = require("mongoose");
const ProfilePicUrl =
  "https://www.nicepng.com/png/detail/131-1318812_avatar-group-icon.png";

const MessageSchema = mongoose.Schema({
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
});

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
  members_id: [String],
  messages: [MessageSchema],
  profile_pic: {
    type: String,
    default: ProfilePicUrl,
  },
});

module.exports = mongoose.model("room", RoomSchema);
