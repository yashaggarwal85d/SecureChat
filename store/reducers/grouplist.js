import { GROUPLIST } from '../../data/GroupList';

const GroupInitialState ={
    chats: GROUPLIST,
};

const GroupListReducer = (state = GroupInitialState, action) => {
    return state;
}

export default GroupListReducer;