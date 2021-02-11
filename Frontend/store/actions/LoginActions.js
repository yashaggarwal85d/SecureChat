export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const UPDATE_ALERT = "UPDATE_ALERT";
export const UPDATE_ISAUTH = "UPDATE_ISAUTH";
export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_ID = "UPDATE_ID";
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
import * as API from "../../constants/APIstore";

export const updateIsAuth = (isauth) => {
  return {
    type: UPDATE_ISAUTH,
    payload: isauth,
  };
};

export const updateAlert = (alert) => {
  return {
    type: UPDATE_ALERT,
    payload: alert,
  };
};

export const updateId = (id) => {
  return {
    type: UPDATE_ID,
    payload: id,
  };
};

export const updatetoken = (token) => {
  return {
    type: UPDATE_TOKEN,
    payload: token,
  };
};

export const updateEmail = (email) => {
  return {
    type: UPDATE_EMAIL,
    payload: email,
  };
};

export const updateName = (name) => {
  return {
    type: UPDATE_NAME,
    payload: name,
  };
};

export const updatePassword = (password) => {
  return {
    type: UPDATE_PASSWORD,
    payload: password,
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const data = await fetch(API.LOGINAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then((res) => {
        return res.json();
      });
      var user = getState().user;
      if (data.user != null) {
        user.name = data.name;
        user.token = data.token;
        user.isauth = true;
        user.id = data.user;
        dispatch({ type: LOGIN, payload: user });
      } else if (data.message != null) {
        dispatch({ type: UPDATE_ALERT, payload: data.message });
      }
    } catch (e) {
      dispatch({ type: UPDATE_ALERT, payload: e });
    }
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { name, email, password } = getState().user;
      const data = await fetch(API.SIGNUPAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      }).then((res) => {
        return res.json();
      });
      if (!data.user) dispatch({ type: UPDATE_ALERT, payload: data.message });
      else alert("Account created successfully , Login to continue");
    } catch (e) {
      dispatch({ type: UPDATE_ALERT, payload: e });
    }
  };
};
