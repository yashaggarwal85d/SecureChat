import io from "socket.io-client";
import { BASEAPI } from "../../constants/APIstore";

export const socket = io(BASEAPI);

export const JoinRooms = (token) => {
  return socket.emit("connectedUser", token);
};

export const SendMessage = (roomId, token, message) => {
  return socket.emit("message", roomId, token, message);
};
