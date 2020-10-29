import React from 'react';
import {useSelector} from 'react-redux';
import ChatScreenComponent from '../../components/ChatListComponent';

const MediumChatScreen = props => {
  const ChatList = useSelector(state => state.ChatList.chats ); 
  return(
    <ChatScreenComponent
      {...props}
      CHATLIST={ChatList}
    />
  );
}

export default MediumChatScreen;