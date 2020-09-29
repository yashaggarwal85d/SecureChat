import { GROUPLIST } from '../../data/GroupList'

const initialState ={
    chats: GROUPLIST,
};

const GroupListReducer = (state = initialState, action) => {
    return state;
}

export default GroupListReducer;