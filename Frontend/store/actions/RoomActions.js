import Room from "../../models/Rooms";
import * as API from "../../constants/APIstore";
export const FILL_DATA = "FLL_DATA";
import axios from "axios";
import moment from "moment";
import {
  UpdatelastMessageReadIndex,
  promptGroup,
  promptMember,
  promptMemberandAdd,
  promptMemberandRemove,
} from "../reducers/Socket";
import { showMessage } from "react-native-flash-message";

export const addMessage = (roomId, message) => {
  return async (dispatch, getState) => {
    try {
      var newState = getState().room;
      const index = newState.rooms.findIndex((room) => room.id === roomId);
      if (index !== -1) {
        message = { ...message, timestamp: moment.now() };
        var room = newState.rooms[index];
        room.messages.push(message);
        const lastMessage = room.messages.slice(-1)[0];

        if (lastMessage.isImage) room.lastMessage = "Image";
        else room.lastMessage = lastMessage.message_body;

        room.lastTime = lastMessage.timestamp;
      }
    } catch (error) {
      showMessage({
        message: `Error`,
        description: `${error}`,
        type: "danger",
        floating: true,
      });
      console.log(error);
    }
  };
};

export const updatelastMessageReadIndex = (roomId) => {
  return async (dispatch, getState) => {
    try {
      if (roomId) {
        const user = getState().user;
        var newState = getState().room;
        const index = newState.rooms.findIndex((room) => room.id == roomId);
        if (index !== -1) {
          var room = newState.rooms[index];
          room.lastMessageReadIndex = room.messages.length;
          UpdatelastMessageReadIndex(roomId, user.token);
        }
      }
    } catch (error) {
      showMessage({
        message: `Error`,
        description: `${error}`,
        type: "danger",
        floating: true,
      });
      console.log(error);
    }
  };
};

export const fillData = () => {
  return async (dispatch, getState) => {
    try {
      var user = getState().user;
      const data = await axios({
        method: "GET",
        url: API.GETROOMS,
        headers: {
          "auth-token": user.token,
          "Content-Type": "application/json",
        },
      }).then((res) => res.data);
      if (data) {
        var rooms = [];
        for (const room of data) {
          if (room) {
            var roomName = null;
            var profile_pic = "";
            var description = "";
            var isGroup = false;
            if (room.isDark && room.creator_id !== user.id) {
              if (!room.name) {
                for (var member of room.members) {
                  if (member.id != user.id) {
                    const user2 = await axios({
                      method: "GET",
                      url:
                        "https://randomuser.me/api/?inc=name&nat=us,fr,au,ca,ch,dk,nl",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }).then((res) => res.data.results[0].name);
                    roomName = user2.first + " " + user2.last;
                    profile_pic =
                      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80";
                    description = `hi, i am ${roomName}`;
                    isGroup = false;
                    member["details"] = {
                      _id: member.id,
                      name: roomName,
                      profile_pic: profile_pic,
                      status: description,
                    };
                  }
                }
              } else {
                roomName = room.name;
                profile_pic = room.profile_pic;
                description = room.description;
                isGroup = true;
                for (var member of room.members) {
                  if (member.id === user.id) {
                    member["details"] = {
                      _id: user.id,
                      name: user.name,
                      profile_pic: user.profile_pic,
                      status: user.status,
                    };
                  } else {
                    const user2 = await axios({
                      method: "GET",
                      url:
                        "https://randomuser.me/api/?inc=name&nat=us,fr,au,ca,ch,dk,nl",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }).then((res) => res.data.results[0].name);
                    member["details"] = {
                      _id: member.id,
                      name: user2.first + " " + user2.last,
                      profile_pic:
                        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
                      status: `hi, i am ${user2.first + " " + user2.last}`,
                    };
                  }
                }
              }
            } else {
              if (!room.name) {
                for (var member of room.members) {
                  if (member.id != user.id) {
                    const user2 = await axios({
                      method: "GET",
                      url: API.USERBASEAPI + `/${member.id}`,
                      headers: {
                        "auth-token": user.token,
                        "Content-Type": "application/json",
                      },
                    }).then((res) => res.data);
                    delete user2.password;
                    member["details"] = user2;
                    roomName = user2.name;
                    profile_pic = user2.profile_pic;
                    description = user2.status;
                    isGroup = false;
                  }
                }
              } else {
                roomName = room.name;
                profile_pic = room.profile_pic;
                description = room.description;
                isGroup = true;
                for (var member of room.members) {
                  const user2 = await axios({
                    method: "GET",
                    url: API.USERBASEAPI + `/${member.id}`,
                    headers: {
                      "auth-token": user.token,
                      "Content-Type": "application/json",
                    },
                  }).then((res) => res.data);
                  delete user2.password;
                  member["details"] = user2;
                }
              }
            }
            const messages = room.messages;
            var lastMessage = description;
            var lastTime = room.create_date;
            if (messages[0]) {
              const messageObject = messages.slice(-1)[0];
              if (messageObject.isImage) lastMessage = "Image";
              else lastMessage = messageObject.message_body;

              lastTime = messages.slice(-1)[0].timestamp;
            }
            const readIndex = room.members.find((mem) => mem.id === user.id);
            const NewRoom = new Room(
              room._id,
              roomName,
              description,
              profile_pic,
              messages,
              room.members,
              readIndex.lastMessageReadIndex,
              isGroup,
              room.creator_id
            );
            NewRoom.updateLastMessage(lastMessage);
            NewRoom.updateLastTime(lastTime);
            NewRoom.updateDark(room.isDark);
            rooms.push(NewRoom);
          }
        }
        const roomState = {
          rooms: rooms,
        };
        dispatch({ type: FILL_DATA, payload: roomState });
      }
    } catch (error) {
      showMessage({
        message: `Error`,
        description: `${error}`,
        type: "danger",
        floating: true,
      });
      console.log(error);
    }
  };
};

export const updateNameDescription = (roomId, name, description) => {
  return async (dispatch, getState) => {
    try {
      var user = getState().user;
      const data = await axios({
        method: "PATCH",
        url: API.PATCHROOM + `/${roomId}`,
        headers: {
          "auth-token": user.token,
          "Content-Type": "application/json",
        },
        data: {
          name: name,
          description: description,
        },
      }).then((res) => res.data);
      var newState = getState().room;
      const index = newState.rooms.findIndex((room) => room.id === roomId);
      if (index !== -1) {
        var room = newState.rooms[index];
        room.name = name;
        room.description = description;
      }
    } catch (e) {
      showMessage({
        message: `Error`,
        description: `${e}`,
        type: "danger",
        floating: true,
      });
      console.log(e);
    }
  };
};

export const CreateNewRoom = (body) => {
  return async (dispatch, getState) => {
    try {
      var user = getState().user;
      const room = await axios({
        method: "POST",
        url: API.ADDNEWROOM,
        headers: {
          "auth-token": user.token,
          "Content-Type": "application/json",
        },
        data: body,
      }).then((res) => res.data.room);
      await promptGroup(user.token, room._id);
    } catch (e) {
      showMessage({
        message: `Error`,
        description: `${e}`,
        type: "danger",
        floating: true,
      });
      console.log(e);
    }
  };
};

export const leaveRoom = (roomId, roomName) => {
  return async (dispatch, getState) => {
    try {
      var user = getState().user;
      var rooms = getState().room.rooms;
      const data = await axios({
        method: "PATCH",
        url: API.LEAVEROOM + `/${roomId}`,
        headers: {
          "auth-token": user.token,
          "Content-Type": "application/json",
        },
      }).then((res) => res.data);
      promptMember(user.token, roomId);
      showMessage({
        message: `You left ${roomName}`,
        type: "danger",
        floating: true,
      });
      var newRooms = rooms.filter((room) => room.id !== roomId);
      const newState = {
        rooms: newRooms,
      };
      dispatch({ type: FILL_DATA, payload: newState });
    } catch (e) {
      showMessage({
        message: `Error`,
        description: `${e}`,
        type: "danger",
        floating: true,
      });
      console.log(e);
    }
  };
};

export const RemoveMember = (roomId, member) => {
  return async (dispatch, getState) => {
    try {
      var user = getState().user;
      const data = await axios({
        method: "PATCH",
        url: API.REMOVEMEMBER + `/${roomId}`,
        headers: {
          "auth-token": user.token,
          "Content-Type": "application/json",
        },
        data: {
          member: member,
        },
      }).then((res) => res.data);
      await promptMemberandRemove(user.token, roomId, member);
    } catch (e) {
      showMessage({
        message: `Error`,
        description: `${e}`,
        type: "danger",
        floating: true,
      });
      console.log(e);
    }
  };
};

export const AddMember = (roomId, member) => {
  return async (dispatch, getState) => {
    try {
      var user = getState().user;
      const data = await axios({
        method: "PATCH",
        url: API.ADDMEMBER + `/${roomId}`,
        headers: {
          "auth-token": user.token,
          "Content-Type": "application/json",
        },
        data: {
          member: member,
        },
      }).then((res) => res.data);
      await promptMemberandAdd(user.token, roomId, member);
    } catch (e) {
      showMessage({
        message: `Error`,
        description: `${e}`,
        type: "danger",
        floating: true,
      });
      console.log(e);
    }
  };
};

export const addRoom = (room) => {
  return async (dispatch, getState) => {
    try {
      var user = getState().user;
      var newState = getState().room;

      var roomName = null;
      var profile_pic = "";
      var description = "";
      var isGroup = false;
      if (room.isDark && room.creator_id !== user.id) {
        if (!room.name) {
          for (var member of room.members) {
            if (member.id != user.id) {
              const user2 = await axios({
                method: "GET",
                url:
                  "https://randomuser.me/api/?inc=name&nat=us,fr,au,ca,ch,dk,nl",
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((res) => res.data.results[0].name);
              roomName = user2.first + " " + user2.last;
              profile_pic =
                "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80";
              description = `hi, i am ${roomName}`;
              isGroup = false;
              member["details"] = {
                _id: member.id,
                name: roomName,
                profile_pic: profile_pic,
                status: description,
              };
            }
          }
        } else {
          roomName = room.name;
          profile_pic = room.profile_pic;
          description = room.description;
          isGroup = true;
          for (var member of room.members) {
            if (member.id === user.id) {
              member["details"] = {
                _id: user.id,
                name: user.name,
                profile_pic: user.profile_pic,
                status: user.status,
              };
            } else {
              const user2 = await axios({
                method: "GET",
                url:
                  "https://randomuser.me/api/?inc=name&nat=us,fr,au,ca,ch,dk,nl",
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((res) => res.data.results[0].name);
              member["details"] = {
                _id: member.id,
                name: user2.first + " " + user2.last,
                profile_pic:
                  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
                status: `hi, i am ${user2.first + " " + user2.last}`,
              };
            }
          }
        }
      } else {
        if (!room.name) {
          for (var member of room.members) {
            if (member.id != user.id) {
              const user2 = await axios({
                method: "GET",
                url: API.USERBASEAPI + `/${member.id}`,
                headers: {
                  "auth-token": user.token,
                  "Content-Type": "application/json",
                },
              }).then((res) => res.data);
              delete user2.password;
              member["details"] = user2;
              roomName = user2.name;
              profile_pic = user2.profile_pic;
              description = user2.status;
              isGroup = false;
            }
          }
        } else {
          roomName = room.name;
          profile_pic = room.profile_pic;
          description = room.description;
          isGroup = true;
          for (var member of room.members) {
            const user2 = await axios({
              method: "GET",
              url: API.USERBASEAPI + `/${member.id}`,
              headers: {
                "auth-token": user.token,
                "Content-Type": "application/json",
              },
            }).then((res) => res.data);
            delete user2.password;
            member["details"] = user2;
          }
        }
      }
      const messages = room.messages;
      var lastMessage = description;
      var lastTime = room.create_date;
      if (messages[0]) {
        const messageObject = messages.slice(-1)[0];
        if (messageObject.isImage) lastMessage = "Image";
        else lastMessage = messageObject.message_body;

        lastTime = messages.slice(-1)[0].timestamp;
      }
      const readIndex = room.members.find((mem) => mem.id === user.id);
      const NewRoom = new Room(
        room._id,
        roomName,
        description,
        profile_pic,
        messages,
        room.members,
        readIndex.lastMessageReadIndex,
        isGroup,
        room.creator_id
      );
      NewRoom.updateLastMessage(lastMessage);
      NewRoom.updateLastTime(lastTime);
      NewRoom.updateDark(room.isDark);
      newState.rooms.push(NewRoom);
      dispatch({ type: FILL_DATA, payload: newState });
    } catch (e) {
      showMessage({
        message: `Error`,
        description: `${e}`,
        type: "danger",
        floating: true,
      });
      console.log(e);
    }
  };
};

export const removeRoom = (roomId) => {
  return async (dispatch, getState) => {
    try {
      const rooms = getState().room.rooms;
      var newRooms = rooms.filter((room) => room.id !== roomId);
      var newState = {
        rooms: newRooms,
      };
      dispatch({ type: FILL_DATA, payload: newState });
    } catch (e) {
      showMessage({
        message: `Error`,
        description: `${e}`,
        type: "danger",
        floating: true,
      });
      console.log(e);
    }
  };
};

export const updateRoom = (roomId, members) => {
  return async (dispatch, getState) => {
    try {
      var user = getState().user;
      const rooms = getState().room.rooms;
      var roomMembers = members;
      for (var member of roomMembers) {
        const user2 = await axios({
          method: "GET",
          url: API.USERBASEAPI + `/${member.id}`,
          headers: {
            "auth-token": user.token,
            "Content-Type": "application/json",
          },
        }).then((res) => res.data);
        delete user2.password;
        member["details"] = user2;
      }
      const roomIndex = rooms.findIndex((room) => room.id === roomId);
      if (roomIndex != -1) {
        var newRooms = rooms;
        newRooms[roomIndex].members = roomMembers;
        const newState = {
          rooms: newRooms,
        };
        dispatch({ type: FILL_DATA, payload: newState });
      }
    } catch (e) {
      showMessage({
        message: `Error`,
        description: `${e}`,
        type: "danger",
        floating: true,
      });
      console.log(e);
    }
  };
};

export const updateRoomProfile = (roomId, url) => {
  return async (dispatch, getState) => {
    try {
      var newState = getState().room;
      const index = newState.rooms.findIndex((room) => room.id == roomId);
      if (index !== -1) {
        var room = newState.rooms[index];
        room.profile_pic = url;
      }
    } catch (e) {
      showMessage({
        message: `Error`,
        description: `${e}`,
        type: "danger",
        floating: true,
      });
      console.log(e);
    }
  };
};
