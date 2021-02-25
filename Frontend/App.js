import { StatusBar } from "react-native";
import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import Navigation from "./store/HandlePersist";

const fetchFonts = () => {
  return Font.loadAsync({
    Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
    "Kamerik-Bold": require("./assets/fonts/Kamerik-Bold.ttf"),
    Touche_Semibold: require("./assets/fonts/Touche-Semibold.ttf"),
    Touche_Medium: require("./assets/fonts/Touche_Medium.ttf"),
  });
};

const App = () => {
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
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
      </>
    );
  }
};

export default App;

//For web compatibility

// Install the react-native-keyboard-aware-scroll-view package into your node_modules with yarn on npm
// Navigate to native base/dist/src/basic and open Content.js
// Find var _reactNativeKeyboardAwareScrollView=require('@codler/react-native-keyboard-aware-scroll-view')
// Change this to var _reactNativeKeyboardAwareScrollView=require('react-native-keyboard-aware-scroll-view') (remove the @codler)
