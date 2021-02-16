import Room from "../../models/Rooms";
import * as API from "../../constants/APIstore";
export const FILL_DATA = "FLL_DATA";
import axios from "axios";
import moment from "moment";

export const addMessage = (roomId, message) => {
  return async (dispatch, getState) => {
    try {
      var newState = getState().room;
      const index = newState.rooms.findIndex((room) => room.id == roomId);
      message = { ...message, timestamp: moment.now() };
      var room = newState.rooms[index];
      room.messages.push(message);
      const lastMessage = room.messages.slice(-1)[0];
      room.lastMessage = lastMessage.message_body;
      room.lastTime = lastMessage.timestamp;
    } catch (error) {
      alert(error);
    }
  };
};

export const updateActive = (roomId) => {
  return async (dispatch, getState) => {
    try {
      var rooms = getState().room.rooms;
      const index = rooms.findIndex((r) => r.id === roomId);
      rooms[index].isactive = true;
    } catch (e) {
      alert(e);
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
      var rooms = [];
      for (const room of data) {
        if (room) {
          var roomName = null;
          var profile_pic = "";
          var description = "";
          if (!room.name) {
            for (const member of room.members) {
              if (member.id != user.id) {
                const user2 = await axios({
                  method: "GET",
                  url: API.USERBASEAPI + `/${member.id}`,
                  headers: {
                    "auth-token": user.token,
                    "Content-Type": "application/json",
                  },
                }).then((res) => res.data);
                roomName = user2.name;
                profile_pic = user2.profile_pic;
                description = user2.status;
              }
            }
          } else {
            roomName = room.name;
            profile_pic = room.profile_pic;
            description = room.description;
          }
          const messages = room.messages;
          var lastMessage = description;
          var lastTime = room.create_date;
          if (messages[0]) {
            lastMessage = messages.slice(-1)[0].message_body;
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
            readIndex.lastMessageReadIndex
          );
          NewRoom.updateLastMessage(lastMessage);
          NewRoom.updateLastTime(lastTime);
          rooms.push(NewRoom);
        }
      }
      console.log(rooms);
      const roomState = {
        rooms: rooms,
      };
      dispatch({ type: FILL_DATA, payload: roomState });
    } catch (error) {
      alert(error);
    }
  };
};
