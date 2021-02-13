import { StatusBar, Animated, View } from "react-native";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import MainNavigator from "./navigation/chatsNavigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import RoomReducer from "./store/reducers/Rooms";
import ThemeReducer from "./store/reducers/CurrentTheme";
import AuthReducer from "./store/reducers/Auth";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import io from "socket.io-client";
import { BASEAPI } from "./constants/APIstore";

const rootReducer = combineReducers({
  room: RoomReducer,
  CurrentTheme: ThemeReducer,
  user: AuthReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const socket = io(BASEAPI);

const fetchFonts = () => {
  return Font.loadAsync({
    Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
    "Kamerik-Bold": require("./assets/fonts/Kamerik-Bold.ttf"),
    Touche_Semibold: require("./assets/fonts/Touche-Semibold.ttf"),
    Touche_Medium: require("./assets/fonts/Touche_Medium.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  } else {
    return (
      <>
        <StatusBar hidden />
        <Provider store={store}>
          <MainNavigator />
        </Provider>
      </>
    );
  }
}
