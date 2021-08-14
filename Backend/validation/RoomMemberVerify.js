const JWT = require("jsonwebtoken");
const Room = require("../models/rooms");

module.exports = async function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
    req.user = verifiedId;
    const room = await Room.findById(req.params.RoomId);
    var f = 0;
    for (const member of room.members) {
      if (member.id === verifiedId._id) f = 1;
    }
    if (f) next();
    else return res.status(401).send("Access Denied");
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
