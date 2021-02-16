import { FILL_DATA } from "../actions/RoomActions";

const RoomListInitialState = {
  rooms: [],
};

const RoomReducer = (state = RoomListInitialState, action) => {
  switch (action.type) {
    case FILL_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default RoomReducer;
