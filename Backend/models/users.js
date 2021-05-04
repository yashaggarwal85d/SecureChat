const mongoose = require("mongoose");
const DefaultImageBuffers = require("../DefaultImageBuffers");

const ProfilePicUrl = DefaultImageBuffers.defaultProfilePic;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 100,
  },
  phone: {
    type: String,
    required: true,
    min: 13,
    max: 20,
  },
  password: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  rooms_id: [String],
  profile_pic: {
    type: String,
    default: ProfilePicUrl,
  },
  status: {
    type: String,
    default: "Hello there",
  },
  NotificationToken: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("user", UserSchema);
