const express = require("express");
const User = require("../models/users");
const Room = require("../models/rooms");
const JWT = require("jsonwebtoken");

var ConnectedUsers = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("connectedUser", async (token) => {
      const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findById(verifiedId._id);
      if (!verifiedId || !user) {
        socket.emit("error", "Access Denied");
      } else ConnectedUsers[user._id] = socket.id;
    });
    socket.on("message", async (roomId, token, messageBody) => {
      const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
      if (!verifiedId) {
        socket.emit("error", "Access Denied");
      } else {
        const message = {
          sender_id: verifiedId._id,
          message_body: messageBody,
        };
        const UpdatedRoom = await Room.updateOne(
          { _id: roomId },
          {
            $push: {
              messages: message,
            },
          }
        );
        const room = await Room.findById(roomId);
        const RoomMembers = room.members;
        RoomMembers.forEach((mem) => {
          if (ConnectedUsers[mem.id]) {
            socket
              .to(ConnectedUsers[mem.id])
              .emit("recieveMessage", message, roomId);
          }
        });
      }
    });
  });
};
