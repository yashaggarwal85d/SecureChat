const mongoose = require("mongoose");
const ProfilePicUrl =
  "https://www.nicepng.com/png/detail/131-1318812_avatar-group-icon.png";

const MemberPic =
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80";

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
