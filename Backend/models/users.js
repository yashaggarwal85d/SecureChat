const mongoose = require("mongoose");
const ProfilePicUrl =
  "https://firebasestorage.googleapis.com/v0/b/projectx2-82350.appspot.com/o/photo-1511367461989-f85a21fda167.jpg?alt=media&token=440a8317-9fa1-428f-bb3c-17f0189ed0e2";

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
