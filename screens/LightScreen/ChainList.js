import React from 'react';
import {useSelector} from 'react-redux';
import ChainScreenComponent from '../../components/ChainListComponent';

const ChainList = props => {
    const ChatList = useSelector(state => state.ChatList.chats ); 
    return(
      <ChainScreenComponent
        {...props}
        CHATLIST={ChatList} 
      />
    );
}


export default ChainList;