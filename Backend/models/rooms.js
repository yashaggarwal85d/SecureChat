const mongoose = require("mongoose");
const ProfilePicUrl =
  "https://firebasestorage.googleapis.com/v0/b/projectx2-82350.appspot.com/o/imageedit_4_3895064561.png?alt=media&token=04122313-6fc6-4886-9bcf-cd0f7a79326f";

const MemberPic =
  "https://firebasestorage.googleapis.com/v0/b/projectx2-82350.appspot.com/o/photo-1511367461989-f85a21fda167.jpg?alt=media&token=440a8317-9fa1-428f-bb3c-17f0189ed0e2";

const MessageSchema = mongoose.Schema({
  isPrompt: {
    type: Boolean,
    default: false,
  },
  isImage: {
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

const detailsSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      min: 5,
      max: 100,
    },
    phone: {
      type: String,
      default: null,
    },
    profile_pic: {
      type: String,
      default: MemberPic,
    },
    status: {
      type: String,
      default: "Hello there",
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
    blocked: {
      type: Boolean,
      default: false,
    },
    details: detailsSchema,
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
  isDark: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("room", RoomSchema);
