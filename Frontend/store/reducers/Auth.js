import {
  LOGIN,
  SIGNUP,
  UPDATE_ALERT,
  UPDATE_EMAIL,
  UPDATE_PHONE,
  UPDATE_NAME,
  UPDATE_PASSWORD,
  UPDATE_ISAUTH,
  UPDATE_TOKEN,
  UPDATE_ID,
  UPDATE_PIC,
  UPDATE_NOTTOKEN,
  SWITCH_MODE,
  LOGOUT,
  UPDATE_NAME_STATUS,
  UPDATE_ACTIVE_ROOM,
} from '../../constants/Actions';

const AuthInitialState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  password: '',
  isauth: false,
  token: '',
  alert: null,
  profile_pic: '',
  mode: 'light',
  NotificationToken: null,
  status: '',
  active_room: null,
  privateKey: null,
  publicKey: null,
};

const AuthReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case SIGNUP:
      return action.payload;
    case UPDATE_ID:
      return { ...state, id: action.payload };
    case UPDATE_ALERT:
      return { ...state, alert: action.payload };
    case UPDATE_ISAUTH:
      return { ...state, isauth: action.payload };
    case UPDATE_TOKEN:
      return { ...state, token: action.payload };
    case UPDATE_NAME:
      return { ...state, name: action.payload };
    case UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_PHONE:
      return { ...state, phone: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_PIC:
      return { ...state, profile_pic: action.payload };
    case UPDATE_NOTTOKEN:
      return { ...state, NotificationToken: action.payload };
    case UPDATE_NAME_STATUS:
      return {
        ...state,
        name: action.payload.name,
        status: action.payload.status,
      };
    case SWITCH_MODE:
      return { ...state, mode: action.payload };
    case UPDATE_ACTIVE_ROOM:
      return { ...state, active_room: action.payload };
    case LOGOUT:
      return AuthInitialState;

    default:
      return state;
  }
};

export default AuthReducer;
