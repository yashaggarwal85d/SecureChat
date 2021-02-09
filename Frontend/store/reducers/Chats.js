import { CHATS } from '../../data/Chats';

const ChatInitialState ={
    chats: CHATS,
};

const ChatReducer = (state = ChatInitialState, action) => {
    return state;
}

export default ChatReducer;