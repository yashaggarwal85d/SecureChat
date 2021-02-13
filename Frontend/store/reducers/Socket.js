import io from "socket.io-client";
import { BASEAPI } from "../../constants/APIstore";

const socket = io(BASEAPI);

export function recievemessage() {
  socket.on("message", (message) => {
    return message;
  });
}
