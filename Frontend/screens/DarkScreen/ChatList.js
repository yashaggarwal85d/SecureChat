import React from "react";
import { useSelector } from "react-redux";
import ChatScreenComponent from "../../components/ChatListComponent";

const DarkChatScreen = (props) => {
  const Rooms = useSelector((state) => state.room.rooms);
  return <ChatScreenComponent {...props} CHATLIST={Rooms} />;
};

export default DarkChatScreen;
