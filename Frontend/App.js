import { StatusBar } from "react-native";
import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import Navigation from "./store/HandlePersist";
import { Root } from "native-base";
import FlashMessage from "react-native-flash-message";
import * as ScreenCapture from "expo-screen-capture";

const fetchFonts = async () => {
  await ScreenCapture.preventScreenCaptureAsync();
  return Font.loadAsync({
    Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
    "Kamerik-Bold": require("./assets/fonts/Kamerik-Bold.ttf"),
    Touche_Semibold: require("./assets/fonts/Touche-Semibold.ttf"),
    Touche_Medium: require("./assets/fonts/Touche_Medium.ttf"),
    Touche_Bold: require("./assets/fonts/Touche_Bold.ttf"),
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
            <Root>
              <Navigation />
              <FlashMessage position='top' />
            </Root>
          </PersistGate>
        </Provider>
      </>
    );
  }
};

export default App;
