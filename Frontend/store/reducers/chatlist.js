import { CHATLIST } from '../../data/ChatList';

const ChatListInitialState ={
    chats: CHATLIST,
};

const ChatListReducer = (state = ChatListInitialState, action) => {
    return state;
}

export default ChatListReducer;