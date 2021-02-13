import Room from "../../models/Rooms";
import * as API from "../../constants/APIstore";
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_DES = "UPDATE_DES";
export const UPDATE_LAST_MESSAGE = "UPDATE_LAST_MESSAGE";
export const UPDATE_LAST_TIME = "UPDATE_LAST_TIME";
export const UPDATE_IS_ACTIVE = "UPDATE_IS_ACTIVE";
export const UPDATE_MESSAGES = "UPDATE_MESSAGES";
export const ADD_ROOM = "ADD_ROOM";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const FILL_DATA = "FLL_DATA";
import axios from "axios";

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
        var roomName = null;
        if (!room.name) {
          for (const id of room.members_id) {
            if (id != user.id) {
              const user2 = await axios({
                method: "GET",
                url: API.USERBASEAPI + `/${id}`,
                headers: {
                  "auth-token": user.token,
                  "Content-Type": "application/json",
                },
              }).then((res) => res.data);
              roomName = user2.name;
            }
          }
        } else {
          roomName = room.name;
        }
        const NewRoom = new Room(room._id, roomName);
        rooms.push(NewRoom);
      }
      const roomState = {
        rooms: rooms,
      };
      dispatch({ type: FILL_DATA, payload: roomState });
    } catch (error) {
      alert(error);
    }
  };
};
