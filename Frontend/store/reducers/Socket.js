import io from "socket.io-client";
import { BASEAPI } from "../../constants/APIstore";

export const socket = io(BASEAPI);

export const JoinRooms = (token) => {
  return socket.emit("connectedUser", token);
};

export const SendMessage = (roomId, token, message) => {
  return socket.emit("message", roomId, token, message);
};

export const UpdatelastMessageReadIndex = (roomId, token) => {
  return socket.emit("UpdatelastMessageReadIndex", roomId, token);
};

export const CheckOnline = (token, userId) => {
  return socket.emit("checkOnline", token, userId);
};

export const promptGroup = (token, userId) => {
  return socket.emit("updateRooms", token, userId);
};

export const logoutSocket = () => {
  return socket.emit("logout");
};
