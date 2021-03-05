const { array, number, bool, boolean } = require("@hapi/joi");
const mongoose = require("mongoose");
const ProfilePicUrl =
  "https://www.nicepng.com/png/detail/131-1318812_avatar-group-icon.png";

const MessageSchema = mongoose.Schema({
  isPrompt: {
    type: Boolean,
    default: false,
  },
  isImage: {
    type: Boolean,
    default: false,
  },
  isFile: {
    type: Boolean,
    default: false,
  },
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
    blocked: {
      type: Boolean,
      default: false,
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
