const mongoose = require('mongoose');
const DefaultImageBuffers = require('../DefaultImageBuffers');

const ProfilePicUrl = DefaultImageBuffers.defaultGroupPic;
const MemberPic = DefaultImageBuffers.defaultProfilePic;

const MessageSchema = mongoose.Schema({
  isPrompt: {
    type: Boolean,
    default: false,
  },
  isImage: {
    type: Boolean,
    default: false,
  },
  ImageData: {
    type: String,
    default: null,
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
      default: 'Hello there',
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

const PullMessageSchema = mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: false,
    },
    sender_id: {
      type: String,
      default: null,
    },
    membersApproved: [String],
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
  PullMessage: {
    type: PullMessageSchema,
    default: {
      active: false,
      sender_id: null,
      membersApproved: null,
    },
  },
});

module.exports = mongoose.model('room', RoomSchema);
