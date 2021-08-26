const User = require('../models/users');
const Room = require('../models/rooms');
const JWT = require('jsonwebtoken');
const sendNotification = require('../validation/sendNotification');
const RandomUserNames = require('../constants/NamesList');
const DefaultImageBuffers = require('../constants/DefaultImageBuffers');
const axios = require('axios');
const API = require('../constants/APIstore');

var ConnectedUsers = {};

PushMsgBlockchain = async (room) => {
  try {
    const response = await axios({
      method: 'POST',
      url: API.PUSH,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: room._id,
        messages: room.messages,
      },
    }).then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};

PullMsgBlockchain = async (roomId) => {
  try {
    const response = await axios({
      method: 'POST',
      url: API.PULL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: roomId,
      },
    }).then((res) => res.data);
    return response;
  } catch (e) {
    console.log(e);
  }
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('connectedUser', async (token) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(verifiedId._id);
        if (!verifiedId || !user) {
          socket.emit('error', 'Access Denied');
        } else {
          ConnectedUsers[user._id] = socket.id;
          user.rooms_id.forEach(async (roomId) => {
            const room = await Room.findById(roomId);
            if (room.members.length === 2) {
              room.members.forEach((mem) => {
                if (ConnectedUsers[mem.id]) {
                  socket.to(ConnectedUsers[mem.id]).emit('online', user._id);
                }
              });
            }
          });
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });
    socket.on('checkOnline', async (token, userId) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        if (!verifiedId) {
          socket.emit('error', 'Access Denied');
        } else {
          if (ConnectedUsers[userId]) {
            socket.emit('online', userId);
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });
    socket.on('setPublickey', async (token, pk) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        if (!verifiedId) {
          socket.emit('error', 'Access Denied');
        } else {
          const updatedUser = await User.updateOne(
            {
              _id: verifiedId._id,
            },
            {
              $set: {
                pk: pk,
              },
            }
          );
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });
    socket.on('UpdatelastMessageReadIndex', async (roomId, token) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        if (!verifiedId) {
          socket.emit('error', 'Access Denied');
        } else {
          const room = await Room.findById(roomId);
          if (!room.name) {
            room.members.forEach((mem) => {
              if (ConnectedUsers[mem.id] && !mem.blocked) {
                socket
                  .to(ConnectedUsers[mem.id])
                  .emit('bluetick', roomId, verifiedId._id);
              }
            });
          }
          const MessageNum = room.messages.length;
          const UpdatedRoom = await Room.updateOne(
            { _id: roomId, 'members.id': verifiedId._id },
            {
              $set: {
                'members.$.lastMessageReadIndex': MessageNum,
              },
            }
          );
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });

    socket.on('message', async (roomId, token, messageBody, spk) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(verifiedId._id);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id && !member.blocked) {
            f = 1;
            break;
          }
        }
        if (!verifiedId && f) {
          socket.emit('error', 'Access Denied');
        } else {
          const message = {
            sender_id: verifiedId._id,
            message_body: messageBody,
            spk: spk,
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
          socket.emit('confirmSend', message, roomId);
          room.members.forEach(async (mem) => {
            if (ConnectedUsers[mem.id] && !mem.blocked) {
              socket
                .to(ConnectedUsers[mem.id])
                .emit('recieveMessage', message, roomId);
            }
            if (!room.isDark && mem.id != user._id) {
              const user2 = await User.findById(mem.id);
              const NotificationToken = user2.NotificationToken;
              if (NotificationToken)
                sendNotification(
                  NotificationToken,
                  `${user.name}`,
                  messageBody
                );
            }
          });
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });
    socket.on('addPrompt', async (roomId, token, messageBody, spk) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(verifiedId._id);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id && !member.blocked) {
            f = 1;
            break;
          }
        }
        if (!verifiedId && f) {
          socket.emit('error', 'Access Denied');
        } else {
          if (!room.isDark) {
            const message = {
              isPrompt: true,
              sender_id: verifiedId._id,
              message_body: messageBody,
              spk: spk,
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
            socket.emit('confirmSend', message, roomId);
            room.members.forEach(async (mem) => {
              if (ConnectedUsers[mem.id] && !mem.blocked) {
                socket
                  .to(ConnectedUsers[mem.id])
                  .emit('recieveMessage', message, roomId);
              }
              if (!room.isDark && mem.id != user._id) {
                const user2 = await User.findById(mem.id);
                const NotificationToken = user2.NotificationToken;
                if (NotificationToken)
                  sendNotification(
                    NotificationToken,
                    `${user.name}`,
                    messageBody
                  );
              }
            });
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });

    socket.on('addImage', async (roomId, token, ImageData, spk) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(verifiedId._id);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id && !member.blocked) {
            f = 1;
            break;
          }
        }
        if (!verifiedId && f) {
          socket.emit('error', 'Access Denied');
        } else {
          const message = {
            isImage: true,
            sender_id: verifiedId._id,
            message_body: '📷 Image',
            ImageData: ImageData,
            spk: spk,
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
          socket.emit('confirmSend', message, roomId);
          room.members.forEach(async (mem) => {
            if (ConnectedUsers[mem.id] && !mem.blocked) {
              socket
                .to(ConnectedUsers[mem.id])
                .emit('recieveMessage', message, roomId);
            }
            if (!room.isDark && mem.id != user._id) {
              const user2 = await User.findById(mem.id);
              const NotificationToken = user2.NotificationToken;
              if (NotificationToken)
                sendNotification(NotificationToken, `${user.name}`, '📷 Image');
            }
          });
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });

    socket.on('newGroup', async (token, roomId) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        if (!verifiedId) {
          socket.emit('error', 'Access Denied');
        } else {
          var room = await Room.findById(roomId);
          room.members.forEach((mem) => {
            if (ConnectedUsers[mem.id]) {
              socket.to(ConnectedUsers[mem.id]).emit('addRoom', room);
            }
          });
          if (room.isDark && room.creator_id === verifiedId._id) {
            for (var member of room.members) {
              const details = await User.findById(member.id);
              member['details'] = details;
            }
          }

          socket.emit('addRoom', room);
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });

    socket.on('leaveGroup', async (token, roomId) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id) {
            f = 1;
            break;
          }
        }

        if (!verifiedId && f) {
          socket.emit('error', 'Access Denied');
        } else {
          const UpdatedRoom = await Room.updateMany(
            {
              _id: roomId,
              'members.id': verifiedId._id,
            },
            {
              $set: {
                'members.$.blocked': true,
              },
            }
          );
          const NewRoom = await Room.findById(roomId);
          socket.emit('removeRoom', room.id, room.name);
          NewRoom.members.forEach((mem) => {
            if (ConnectedUsers[mem.id]) {
              socket
                .to(ConnectedUsers[mem.id])
                .emit('updateRoom', roomId, NewRoom.members);
            }
          });
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });

    socket.on('addMember', async (token, roomId, memberId) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id) {
            f = 1;
            break;
          }
        }
        if (!verifiedId && f) {
          socket.emit('error', 'Access Denied');
        } else {
          if (verifiedId._id === room.creator_id) {
            f = 0;
            for (const member of room.members) {
              if (member.id === memberId) {
                const UpdatedRoom = await Room.updateMany(
                  {
                    _id: roomId,
                    'members.id': memberId,
                  },
                  {
                    $set: {
                      'members.$.blocked': false,
                    },
                  }
                );
                f = 1;
                break;
              }
            }
            if (!f) {
              var userdetails;
              if (room.isDark) {
                var username =
                  RandomUserNames[
                    Math.floor(Math.random() * RandomUserNames.length)
                  ];
                userdetails = {
                  _id: memberId,
                  name: username,
                  profile_pic: DefaultImageBuffers.defaultProfilePic,
                  status: `hi, i am ${username}`,
                };
              } else {
                userdetails = await User.findById(memberId);
              }
              const updatedRoom = await Room.updateMany(
                {
                  _id: roomId,
                },
                {
                  $push: {
                    members: {
                      id: memberId,
                      details: userdetails,
                    },
                  },
                }
              );
              const UpdatedUser = await User.updateMany(
                {
                  _id: member_id,
                },
                {
                  $push: {
                    rooms_id: room._id,
                  },
                }
              );
            }
            const NewRoom = await Room.findById(roomId);
            socket.emit('updateRoom', roomId, NewRoom.members);
            NewRoom.members.forEach((mem) => {
              if (ConnectedUsers[mem.id]) {
                if (mem.id === memberId) {
                  socket.to(ConnectedUsers[mem.id]).emit('addRoom', NewRoom);
                } else {
                  socket
                    .to(ConnectedUsers[mem.id])
                    .emit('updateRoom', roomId, NewRoom.members);
                }
              }
            });
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });

    socket.on('removeMember', async (token, roomId, memberId) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id) {
            f = 1;
            break;
          }
        }

        if (!verifiedId && f) {
          socket.emit('error', 'Access Denied');
        } else {
          if (verifiedId._id === room.creator_id) {
            const UpdatedRoom = await Room.updateMany(
              {
                _id: roomId,
                'members.id': memberId,
              },
              {
                $set: {
                  'members.$.blocked': true,
                },
              }
            );
            const NewRoom = await Room.findById(roomId);
            socket.emit('updateRoom', roomId, NewRoom.members);
            room.members.forEach((mem) => {
              if (ConnectedUsers[mem.id]) {
                if (mem.id === memberId) {
                  socket
                    .to(ConnectedUsers[mem.id])
                    .emit('removeRoom', roomId, room.name);
                } else {
                  socket
                    .to(ConnectedUsers[mem.id])
                    .emit('updateRoom', roomId, NewRoom.members);
                }
              }
            });
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });

    socket.on('profile_pic', async (token, url) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        if (!verifiedId) {
          socket.emit('error', 'Access Denied');
        } else {
          const user = await User.findById(verifiedId._id);
          user.profile_pic = url;
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
            if (room.isDark) continue;
            const UpdatedRoom = await Room.updateMany(
              {
                _id: room._id,
                'members.id': user._id,
              },
              {
                $set: {
                  'members.$.details': user,
                },
              }
            );
            if (!room.name) {
              for (const member of room.members) {
                if (ConnectedUsers[member.id]) {
                  socket
                    .to(ConnectedUsers[member.id])
                    .emit('update_profile', roomid, url);
                }
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });

    socket.on('roomProfile_pic', async (token, roomId, url) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id) {
            f = 1;
            break;
          }
        }

        if (!verifiedId && f) {
          socket.emit('error', 'Access Denied');
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
                .emit('update_profile', roomId, url);
            }
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });

    socket.on('roomNameDesc', async (token, roomId, name, description) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id) {
            f = 1;
            break;
          }
        }

        if (!verifiedId && f) {
          socket.emit('error', 'Access Denied');
        } else {
          const UpdatedRoom = await Room.updateOne(
            { _id: roomId },
            {
              $set: {
                name: name,
                description: description,
              },
            }
          );
          for (const member of room.members) {
            if (ConnectedUsers[member.id]) {
              socket
                .to(ConnectedUsers[member.id])
                .emit('updateRoomInfo', roomId, name, description);
            }
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });

    socket.on(
      'registerForPushNotifications',
      async (token, NotificationToken) => {
        try {
          const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
          const UpdatedUser = await User.updateOne(
            { _id: verifiedId._id },
            {
              $set: {
                NotificationToken: NotificationToken,
              },
            }
          );
        } catch (e) {
          console.log(e);
          socket.emit('error', e);
        }
      }
    );

    socket.on('PushMessagesToBlockchain', async (roomId, token) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;
        for (const member of room.members) {
          if (member.id === verifiedId._id) {
            f = 1;
            break;
          }
        }

        if (!verifiedId && f) {
          socket.emit('error', 'Access Denied');
        } else {
          if (room.messages.length > 2) {
            PushMsgBlockchain(room); //Function to push messages to blockchain

            socket.emit('CallBack', 'Messages push is successful', 'success');
            const message = {
              isPrompt: true,
              sender_id: verifiedId._id,
              message_body:
                'All the previous messages are archived, pull the messages to see them',
            };
            var messagesFinal = [message];
            var members = room.members;
            for (var member of members) {
              member.lastMessageReadIndex = 0;
            }
            const UpdatedRoom = await Room.updateOne(
              { _id: roomId },
              {
                $set: {
                  messages: messagesFinal,
                  members: members,
                },
              }
            );
            socket.emit('ResetRoom', roomId, members, messagesFinal);
            room.members.forEach(async (mem) => {
              if (ConnectedUsers[mem.id] && !mem.blocked) {
                socket
                  .to(ConnectedUsers[mem.id])
                  .emit('ResetRoom', roomId, members, messagesFinal);
              }
              if (mem.id != verifiedId._id) {
                const user2 = await User.findById(mem.id);
                const NotificationToken = user2.NotificationToken;
                if (NotificationToken)
                  sendNotification(
                    NotificationToken,
                    'Messages pushed',
                    'All the previous messages are archived, pull the messages to see them'
                  );
              }
            });
          } else {
            socket.emit('CallBack', 'No messages to push', 'danger');
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });

    socket.on('PullMessagesFromBlockchain', async (roomId, token, status) => {
      try {
        const verifiedId = JWT.verify(token, process.env.TOKEN_SECRET);
        const room = await Room.findById(roomId);
        var f = 0;

        for (const member of room.members) {
          if (member.id === verifiedId._id) {
            f = 1;
            break;
          }
        }

        if (!verifiedId && f) {
          socket.emit('error', 'Access Denied');
        } else {
          var PullMsgObj;
          if (status) {
            if (room.PullMessage.active) {
              var obj = room.PullMessage;
              var arr = room.PullMessage.membersApproved;
              f = 0;
              for (const member of arr) {
                if (member === verifiedId._id) {
                  f = 1;
                  break;
                }
              }
              if (!f) {
                arr.push(verifiedId._id);
                obj.membersApproved = arr;
                socket.emit('PullMessages', roomId, obj);
                for (const member of room.members) {
                  if (ConnectedUsers[member.id]) {
                    socket
                      .to(ConnectedUsers[member.id])
                      .emit('PullMessages', roomId, obj);
                  }
                }
              }
              PullMsgObj = {
                active: true,
                sender_id: room.PullMessage.sender_id,
                membersApproved: arr,
              };
            } else {
              PullMsgObj = {
                active: true,
                sender_id: verifiedId._id,
                membersApproved: [verifiedId._id],
              };
              socket.emit('PullMessages', roomId, PullMsgObj);
              for (const member of room.members) {
                if (ConnectedUsers[member.id]) {
                  socket
                    .to(ConnectedUsers[member.id])
                    .emit('PullMessages', roomId, PullMsgObj);
                }
              }
            }
            if (
              room.PullMessage.membersApproved &&
              room.PullMessage.membersApproved.length == room.members.length
            ) {
              var BlockchainMessages = await PullMsgBlockchain(room._id);
              BlockchainMessages.shift();
              if (BlockchainMessages) {
                const message = {
                  isPrompt: true,
                  sender_id: verifiedId._id,
                  message_body: 'Archieved messages are pulled successfully',
                };
                var messagesFinal = BlockchainMessages.concat(room.messages);
                messagesFinal.push(message);
                var members = room.members;
                for (var member of members) {
                  member.lastMessageReadIndex += BlockchainMessages.length;
                }
                const UpdatedRoom = await Room.updateOne(
                  { _id: roomId },
                  {
                    $set: {
                      messages: messagesFinal,
                      members: members,
                    },
                  }
                );
                socket.emit('ResetRoom', roomId, members, messagesFinal);
                room.members.forEach(async (mem) => {
                  if (ConnectedUsers[mem.id] && !mem.blocked) {
                    socket
                      .to(ConnectedUsers[mem.id])
                      .emit('ResetRoom', roomId, members, messagesFinal);
                  }
                  if (!room.isDark && mem.id != verifiedId._id) {
                    const user2 = await User.findById(mem.id);
                    const NotificationToken = user2.NotificationToken;
                    if (NotificationToken)
                      sendNotification(
                        NotificationToken,
                        'Messages pushed',
                        'Archieved messages are pulled successfully'
                      );
                  }
                });
              }
              PullMsgObj = {
                active: false,
                sender_id: null,
                membersApproved: null,
              };
            }
          } else {
            PullMsgObj = {
              active: false,
              sender_id: null,
              membersApproved: null,
            };
            socket.emit('PullMessages', roomId, PullMsgObj);
            for (const member of room.members) {
              if (ConnectedUsers[member.id]) {
                socket
                  .to(ConnectedUsers[member.id])
                  .emit('PullMessages', roomId, PullMsgObj);
              }
            }

            const message = {
              isPrompt: true,
              sender_id: verifiedId._id,
              message_body: 'Pull request is declined',
            };
            const UpdatedRoom = await Room.updateOne(
              { _id: roomId },
              {
                $push: {
                  messages: message,
                },
              }
            );
            socket.emit('recieveMessage', message, roomId);
            room.members.forEach(async (mem) => {
              if (ConnectedUsers[mem.id] && !mem.blocked) {
                socket
                  .to(ConnectedUsers[mem.id])
                  .emit('recieveMessage', message, roomId);
              }
              if (!room.isDark && mem.id != verifiedId._id) {
                const user2 = await User.findById(mem.id);
                const NotificationToken = user2.NotificationToken;
                if (NotificationToken)
                  sendNotification(
                    NotificationToken,
                    'Messages pushed',
                    'Pull request is declined'
                  );
              }
            });
          }
          const UpdatedRoom = await Room.updateOne(
            { _id: roomId },
            {
              $set: {
                PullMessage: PullMsgObj,
              },
            }
          );
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });

    socket.on('logout', async () => {
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
                    socket.to(ConnectedUsers[mem.id]).emit('offline', key);
                  }
                });
              }
            });
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });
    socket.on('disconnect', async () => {
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
                    socket.to(ConnectedUsers[mem.id]).emit('offline', key);
                  }
                });
              }
            });
          }
        }
      } catch (e) {
        console.log(e);
        socket.emit('error', e);
      }
    });
  });
};
