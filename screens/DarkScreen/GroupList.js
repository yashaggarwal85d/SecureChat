import React from 'react';
import {useSelector} from 'react-redux';
import ChatScreenComponent from '../../components/ChatListComponent';

const DarkGroupScreen = props => {
  const GroupList = useSelector(state => state.GroupList.chats );
  return(
    <ChatScreenComponent
      {...props}
      CHATLIST={GroupList} 
    />
  );
}


export default DarkGroupScreen;