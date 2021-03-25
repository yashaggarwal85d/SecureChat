const express = require("express");
const User = require("../models/users");
const Room = require("../models/rooms");
const JWT = require("jsonwebtoken");

var ConnectedUsers = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("connectedUser", async (token) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(verifiedId._id);
        if (!verifiedId || !user) {
          socket.emit("error", "Access Denied");
        } else {
          ConnectedUsers[user._id] = socket.id;
          user.rooms_id.forEach(async (roomId) => {
            const room = await Room.findById(roomId);
            if (room.members.length === 2) {
              room.members.forEach((mem) => {
                if (ConnectedUsers[mem.id]) {
                  socket.to(ConnectedUsers[mem.id]).emit("online", user._id);
                }
              });
            }
          });
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });
    socket.on("checkOnline", async (token, userId) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        if (!verifiedId) {
          socket.emit("error", "Access Denied");
        } else {
          if (ConnectedUsers[userId]) {
            socket.emit("online", userId);
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });
    socket.on("UpdatelastMessageReadIndex", async (roomId, token) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        if (!verifiedId) {
          socket.emit("error", "Access Denied");
        } else {
          const room = await Room.findById(roomId);
          const MessageNum = room.messages.length;
          const UpdatedRoom = await Room.updateOne(
            { _id: roomId, "members.id": verifiedId._id },
            {
              $set: {
                "members.$.lastMessageReadIndex": MessageNum,
              },
            }
          );
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });
    socket.on("message", async (roomId, token, messageBody) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id && !member.blocked) f = 1;
        }
        if (!verifiedId && f) {
          socket.emit("error", "Access Denied");
        } else {
          const message = {
            sender_id: verifiedId._id,
            message_body: messageBody,
          };
          const room = await Room.findById(roomId);
          const UpdatedRoom = await Room.updateOne(
            { _id: roomId },
            {
              $push: {
                messages: message,
              },
            }
          );
          socket.emit("confirmSend", message, roomId);
          room.members.forEach((mem) => {
            if (ConnectedUsers[mem.id] && !mem.blocked) {
              socket
                .to(ConnectedUsers[mem.id])
                .emit("recieveMessage", message, roomId);
            }
          });
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });
    socket.on("addPrompt", async (roomId, token, messageBody) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id && !member.blocked) f = 1;
        }
        if (!verifiedId && f) {
          socket.emit("error", "Access Denied");
        } else {
          const message = {
            isPrompt: true,
            sender_id: verifiedId._id,
            message_body: messageBody,
          };
          const room = await Room.findById(roomId);
          const UpdatedRoom = await Room.updateOne(
            { _id: roomId },
            {
              $push: {
                messages: message,
              },
            }
          );
          socket.emit("confirmSend", message, roomId);
          room.members.forEach((mem) => {
            if (ConnectedUsers[mem.id] && !mem.blocked) {
              socket
                .to(ConnectedUsers[mem.id])
                .emit("recieveMessage", message, roomId);
            }
          });
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });

    socket.on("addImage", async (roomId, token, messageBody) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id && !member.blocked) f = 1;
        }
        if (!verifiedId && f) {
          socket.emit("error", "Access Denied");
        } else {
          const message = {
            isImage: true,
            sender_id: verifiedId._id,
            message_body: messageBody,
          };
          const room = await Room.findById(roomId);
          const UpdatedRoom = await Room.updateOne(
            { _id: roomId },
            {
              $push: {
                messages: message,
              },
            }
          );
          socket.emit("confirmSend", message, roomId);
          room.members.forEach((mem) => {
            if (ConnectedUsers[mem.id] && !mem.blocked) {
              socket
                .to(ConnectedUsers[mem.id])
                .emit("recieveMessage", message, roomId);
            }
          });
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });

    // socket.on("addFile", async (roomId, token, messageBody, FileName) => {
    //   try {
    //     const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
    //     const room = await Room.findById(roomId);
    //     var f = 0;
    //     for (const member of room.members) {
    //       if (member.id === verifiedId._id && !member.blocked) f = 1;
    //     }
    //     if (!verifiedId && f) {
    //       socket.emit("error", "Access Denied");
    //     } else {
    //       const message = {
    //         isFile: true,
    //         fileName: FileName,
    //         sender_id: verifiedId._id,
    //         message_body: messageBody,
    //       };
    //       const room = await Room.findById(roomId);
    //       const UpdatedRoom = await Room.updateOne(
    //         { _id: roomId },
    //         {
    //           $push: {
    //             messages: message,
    //           },
    //         }
    //       );
    //       socket.emit("confirmSend", message, roomId);
    //       room.members.forEach((mem) => {
    //         if (ConnectedUsers[mem.id] && !mem.blocked) {
    //           socket
    //             .to(ConnectedUsers[mem.id])
    //             .emit("recieveMessage", message, roomId);
    //         }
    //       });
    //     }
    //   } catch (e) {
    //     console.log(e);
    //     socket.emit("error", e);
    //   }
    // });

    socket.on("newGroup", async (token, roomId) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        if (!verifiedId) {
          socket.emit("error", "Access Denied");
        } else {
          const room = await Room.findById(roomId);
          socket.emit("addRoom", room);
          room.members.forEach((mem) => {
            if (ConnectedUsers[mem.id]) {
              socket.to(ConnectedUsers[mem.id]).emit("addRoom", room);
            }
          });
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });

    socket.on("leaveGroup", async (token, roomId) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id) f = 1;
        }

        if (!verifiedId && f) {
          socket.emit("error", "Access Denied");
        } else {
          room.members.forEach((mem) => {
            if (ConnectedUsers[mem.id]) {
              socket
                .to(ConnectedUsers[mem.id])
                .emit("updateRoom", roomId, room.members);
            }
          });
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });

    socket.on("addMember", async (token, roomId, memberId) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id) f = 1;
        }
        if (!verifiedId && f) {
          socket.emit("error", "Access Denied");
        } else {
          room.members.forEach((mem) => {
            if (ConnectedUsers[mem.id]) {
              if (mem.id === memberId) {
                socket.to(ConnectedUsers[mem.id]).emit("addRoom", room);
              } else {
                socket
                  .to(ConnectedUsers[mem.id])
                  .emit("updateRoom", roomId, room.members);
              }
            }
          });
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });

    socket.on("removeMember", async (token, roomId, memberId) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id) f = 1;
        }

        if (!verifiedId && f) {
          socket.emit("error", "Access Denied");
        } else {
          room.members.forEach((mem) => {
            if (ConnectedUsers[mem.id]) {
              if (mem.id === memberId) {
                socket
                  .to(ConnectedUsers[mem.id])
                  .emit("removeRoom", room.id, room.name);
              } else {
                socket
                  .to(ConnectedUsers[mem.id])
                  .emit("updateRoom", roomId, room.members);
              }
            }
          });
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });

    socket.on("profile_pic", async (token, url) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        if (!verifiedId) {
          socket.emit("error", "Access Denied");
        } else {
          const user = await User.findById(verifiedId._id);
          const UpdatedUser = await User.updateMany(
            {
              _id: user._id,
            },
            {
              $set: {
                profile_pic: url,
              },
            }
          );
          const rooms_id = user.rooms_id;

          for (const roomid of rooms_id) {
            const room = await Room.findById(roomid);
            if (!room.name) {
              for (const member of room.members) {
                if (ConnectedUsers[member.id]) {
                  socket
                    .to(ConnectedUsers[member.id])
                    .emit("update_profile", roomid, url);
                }
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });

    socket.on("roomProfile_pic", async (token, roomId, url) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id) f = 1;
        }

        if (!verifiedId && f) {
          socket.emit("error", "Access Denied");
        } else {
          const UpdatedRoom = await Room.updateOne(
            { _id: roomId },
            {
              $set: {
                profile_pic: url,
              },
            }
          );
          for (const member of room.members) {
            if (ConnectedUsers[member.id]) {
              socket
                .to(ConnectedUsers[member.id])
                .emit("update_profile", roomId, url);
            }
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });

    socket.on("logout", async () => {
      try {
        for (const key in ConnectedUsers) {
          if (ConnectedUsers[key] === socket.id) {
            delete ConnectedUsers[key];
            const user = await User.findById(key);
            user.rooms_id.forEach(async (roomId) => {
              const room = await Room.findById(roomId);
              if (room.members.length === 2) {
                room.members.forEach((mem) => {
                  if (ConnectedUsers[mem.id]) {
                    socket.to(ConnectedUsers[mem.id]).emit("offline", key);
                  }
                });
              }
            });
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });
    socket.on("disconnect", async () => {
      try {
        for (const key in ConnectedUsers) {
          if (ConnectedUsers[key] === socket.id) {
            delete ConnectedUsers[key];
            const user = await User.findById(key);
            user.rooms_id.forEach(async (roomId) => {
              const room = await Room.findById(roomId);
              if (room.members.length === 2) {
                room.members.forEach((mem) => {
                  if (ConnectedUsers[mem.id]) {
                    socket.to(ConnectedUsers[mem.id]).emit("offline", key);
                  }
                });
              }
            });
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit("error", e);
      }
    });
  });
};
