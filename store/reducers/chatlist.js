import { CHATLIST } from '../../data/ChatList'

const initialState ={
    chats: CHATLIST,
};

const ChatListReducer = (state = initialState, action) => {
    return state;
}

export default ChatListReducer;