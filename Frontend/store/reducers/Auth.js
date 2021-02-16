import {
  LOGIN,
  SIGNUP,
  UPDATE_ALERT,
  UPDATE_EMAIL,
  UPDATE_NAME,
  UPDATE_PASSWORD,
  UPDATE_ISAUTH,
  UPDATE_TOKEN,
  UPDATE_ID,
  UPDATE_PIC,
  SWITCH_MODE,
} from "../actions/LoginActions";

const AuthInitialState = {
  id: "",
  name: "",
  email: "",
  password: "",
  isauth: false,
  token: "",
  alert: null,
  profile_pic: "",
  mode: "light",
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
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_PIC:
      return { ...state, profile_pic: action.payload };
    case SWITCH_MODE:
      return { ...state, mode: action.payload };

    default:
      return state;
  }
};

export default AuthReducer;
