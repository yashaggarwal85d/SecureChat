import {
  FILL_DATA,
  ADD_MESSAGE_ROOM,
  ADD_ROOM,
  DELETE_ROOM,
  LAST_MESSAGE_READ_INDEX,
  PULL_MESSAGE_STATE,
  UPDATE_NAME_DESC,
  UPDATE_MEMBERS_MESSAGES,
  UPDATE_MEMBERS,
  UPDATE_PROFILE_PIC,
  MARK_READ_MESSAGES,
} from '../../constants/Actions';
import { decrypt, decryptGroup } from '../Encryption';

function LastMessage(message, isGroup, pk, puk, userId) {
  console.log(message, isGroup, pk, puk, userId);
  if (message.isImage) return '📷 Image';
  else {
    if (isGroup) return decryptGroup(message.message_body, message.spk);
    else {
      if (message.sender_id === userId)
        return decrypt(message.message_body, puk, pk);
      else return decrypt(message.message_body, message.spk, pk);
    }
  }
}

function Read(members, userId, length) {
  var membersObj = members;
  for (var member of membersObj) {
    if (member.id === userId) member.lastMessageReadIndex = length;
  }
  return membersObj;
}

const RoomReducer = (rooms = [], action) => {
  switch (action.type) {
    case FILL_DATA:
      return action.payload;
    case ADD_ROOM:
      return [...rooms, action.payload];
    case ADD_MESSAGE_ROOM:
      return rooms.map((room) => {
        if (room.id === action.payload.id) {
          return {
            ...room,
            messages: [...room.messages, action.payload.message],
            lastMessage: LastMessage(
              action.payload.message,
              room.isGroup,
              action.payload.pk,
              action.payload.puk,
              action.payload.userId
            ),
            lastTime: action.payload.message.timestamp,
          };
        } else return room;
      });
    case DELETE_ROOM:
      return rooms.filter((room) => room.id !== action.payload.id);
    case LAST_MESSAGE_READ_INDEX:
      return rooms.map((room) => {
        if (room.id === action.payload.id) {
          return {
            ...room,
            lastMessageReadIndex: room.messages.length,
          };
        } else return room;
      });
    case PULL_MESSAGE_STATE:
      return rooms.map((room) => {
        if (room.id === action.payload.id) {
          return {
            ...room,
            PullMessage: action.payload.obj,
          };
        } else return room;
      });
    case UPDATE_NAME_DESC:
      return rooms.map((room) => {
        if (room.id === action.payload.id) {
          return {
            ...room,
            name: action.payload.name,
            description: action.payload.description,
          };
        } else return room;
      });
    case UPDATE_MEMBERS_MESSAGES:
      return rooms.map((room) => {
        if (room.id === action.payload.id) {
          return {
            ...room,
            messages: action.payload.messages,
            members: action.payload.members,
            lastMessage: LastMessage(
              room.messages.slice(-1)[0],
              room.isGroup,
              action.payload.pk,
              action.payload.puk,
              action.payload.userId
            ),
            lastTime: room.messages.slice(-1)[0].timestamp,
          };
        } else return room;
      });
    case UPDATE_MEMBERS:
      return rooms.map((room) => {
        if (room.id === action.payload.id) {
          return {
            ...room,
            members: action.payload.members,
          };
        } else return room;
      });
    case UPDATE_PROFILE_PIC:
      return rooms.map((room) => {
        if (room.id === action.payload.id) {
          return {
            ...room,
            profile_pic: action.payload.profile_pic,
          };
        } else return room;
      });
    case MARK_READ_MESSAGES:
      return rooms.map((room) => {
        if (room.id === action.payload.id) {
          return {
            ...room,
            members: Read(
              room.members,
              action.payload.userId,
              room.messages.length
            ),
          };
        } else return room;
      });
    default:
      return rooms;
  }
};

export default RoomReducer;
