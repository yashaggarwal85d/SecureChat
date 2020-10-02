import { CHATLIST } from '../../data/ChatList';

const ChatInitialState ={
    chats: CHATLIST,
};

const ChatListReducer = (state = ChatInitialState, action) => {
    return state;
}

export default ChatListReducer;