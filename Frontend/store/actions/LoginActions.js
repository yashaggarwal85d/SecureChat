import {
  LOGIN,
  UPDATE_ALERT,
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
import axios from 'axios';
import * as API from '../../constants/APIstore';
import { logoutSocket, setPublickey } from '../reducers/Socket';
import { showMessage } from 'react-native-flash-message';
import * as ImageManipulator from 'expo-image-manipulator';
import { cypherChain, cypherServer } from '../Encryption';

export const updateMode = (mode) => {
  return {
    type: SWITCH_MODE,
    payload: mode,
  };
};

export const updateActiveRoom = (roomId) => {
  return {
    type: UPDATE_ACTIVE_ROOM,
    payload: roomId,
  };
};

export const updateProfile = (profile_pic) => {
  return {
    type: UPDATE_PIC,
    payload: profile_pic,
  };
};

export const updateNotificationToken = (token) => {
  return {
    type: UPDATE_NOTTOKEN,
    payload: token,
  };
};

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

export const updatePhone = (phone) => {
  return {
    type: UPDATE_PHONE,
    payload: phone,
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

export const updateNameStatus = (name, status) => {
  return async (dispatch, getState) => {
    try {
      const user = getState().user;
      const data = await axios({
        method: 'PATCH',
        url: API.PATCHUSER,
        headers: {
          'auth-token': user.token,
          'Content-Type': 'application/json',
        },
        data: {
          name: name,
          status: status,
        },
      }).then((res) => res.data);
      const payload = {
        name: name,
        status: status,
      };
      dispatch({ type: UPDATE_NAME_STATUS, payload: payload });
    } catch (e) {
      showMessage({
        message: `Error`,
        description: `${e}`,
        type: 'danger',
        floating: true,
      });
      console.log(e);
    }
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    var user = getState().user;
    const serverPass = cypherServer(user.password);
    const chainPass = cypherChain(user.password);
    const data = await axios({
      method: 'POST',
      url: API.LOGINAPI,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phone: user.phone,
        password: serverPass,
      },
    })
      .then((res) => res.data)
      .then(async (data) => {
        const wallet = await axios({
          method: 'POST',
          url: API.GETWALLET,
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            token: data.user,
            password: chainPass,
          },
        }).then((res) => res.data);
        data.privateKey = wallet.privateKey;
        data.publicKey = wallet.publicKey;
        return data;
      })
      .then((data) => {
        user.name = data.name;
        user.token = data.token;
        user.isauth = true;
        user.id = data.user;
        user.profile_pic = data.profile_pic;
        user.status = data.status;
        user.publicKey = data.publicKey;
        user.privateKey = data.privateKey;
        dispatch({ type: LOGIN, payload: user });
      })
      .catch((e) => {
        try {
          dispatch({ type: UPDATE_ALERT, payload: e.response.data });
        } catch (e) {
          showMessage({
            message: `Error`,
            description: `${e}`,
            type: 'danger',
            floating: true,
          });
          console.log(e);
        }
      });
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    const { name, phone, password } = getState().user;
    const serverPass = cypherServer(password);
    const chainPass = cypherChain(password);
    console.log(serverPass, chainPass);
    const data = await axios({
      method: 'POST',
      url: API.SIGNUPAPI,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: name,
        phone: phone,
        password: serverPass,
      },
    })
      .then((res) => res.data)
      .then(async (data) => {
        const wallet = await axios({
          method: 'POST',
          url: API.NEWWALLET,
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            token: data.user,
            password: chainPass,
          },
        }).then((res) => res.data);
        setPublickey(data.token, wallet);
        return data;
      })
      .then((data) => {
        showMessage({
          message: 'Account created',
          description: 'Your account has been created, login to continue',
          type: 'success',
          floating: true,
        });
        dispatch({ type: UPDATE_ISAUTH, payload: true });
      })
      .catch((e) => {
        try {
          dispatch({ type: UPDATE_ALERT, payload: e.response.data });
        } catch (e) {
          showMessage({
            message: `Error`,
            description: `${e}`,
            type: 'danger',
            floating: true,
          });
          console.log(e);
        }
      });
  };
};

export const AllUsers = async (token) => {
  try {
    const data = await axios({
      method: 'GET',
      url: API.ALLUSERSAPI,
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.data);
    return data;
  } catch (e) {
    showMessage({
      message: `Error`,
      description: `${e}`,
      type: 'danger',
      floating: true,
    });
    console.log(e);
  }
};

export const CheckUserContacts = async (token, PhoneNumbers) => {
  try {
    const data = await axios({
      method: 'POST',
      url: API.CHECKUSERCONTACTS,
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
      },
      data: {
        PhoneNumbers: PhoneNumbers,
      },
    }).then((res) => res.data);
    if (data.success)
      showMessage({
        message: `Contacts Updated`,
        description: `${data.message}`,
        type: 'success',
        floating: true,
      });
    return data.contacts;
  } catch (e) {
    showMessage({
      message: `Error`,
      description: `${e}`,
      type: 'danger',
      floating: true,
    });
    console.log(e);
  }
};

export const resizeFunc = async (result) => {
  try {
    var actualHeight = result.height;
    var actualWidth = result.width;
    var maxHeight = 600;
    var maxWidth = 800;
    var imgRatio = actualWidth / actualHeight;
    var maxRatio = maxWidth / maxHeight;

    if (actualHeight > maxHeight || actualWidth > maxWidth) {
      if (imgRatio < maxRatio) {
        //adjust width according to maxHeight
        imgRatio = maxHeight / actualHeight;
        actualWidth = imgRatio * actualWidth;
        actualHeight = maxHeight;
      } else if (imgRatio > maxRatio) {
        //adjust height according to maxWidth
        imgRatio = maxWidth / actualWidth;
        actualHeight = imgRatio * actualHeight;
        actualWidth = maxWidth;
      } else {
        actualHeight = maxHeight;
        actualWidth = maxWidth;
      }
    }
    const manipResult = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { width: actualWidth, height: actualHeight } }],
      { compress: 0.5, base64: true, format: ImageManipulator.SaveFormat.PNG }
    );
    return manipResult.base64;
  } catch (e) {
    showMessage({
      message: `Error`,
      description: `${e}`,
      type: 'danger',
      floating: true,
    });
    console.log(e);
  }
};

export const logout = () => {
  return async (dispatch, getState) => {
    await logoutSocket();
    dispatch({ type: LOGOUT });
  };
};
