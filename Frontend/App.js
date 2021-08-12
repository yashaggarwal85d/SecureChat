import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import Navigation from './store/HandlePersist';
import { Root } from 'native-base';
import FlashMessage from 'react-native-flash-message';
import * as ScreenCapture from 'expo-screen-capture';
import { getIpAddressAsync, getNetworkStateAsync } from 'expo-network';
import { __handlePersistedRegistrationInfoAsync } from 'expo-notifications/build/DevicePushTokenAutoRegistration.fx';

const getip = async () => {
  const ip = await getIpAddressAsync();
  console.log(ip);
};

const fetchFonts = async () => {
  await ScreenCapture.preventScreenCaptureAsync();
  await getip();
  return Font.loadAsync({
    Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
    'Kamerik-Bold': require('./assets/fonts/Kamerik-Bold.ttf'),
    Touche_Semibold: require('./assets/fonts/Touche-Semibold.ttf'),
    Touche_Medium: require('./assets/fonts/Touche_Medium.ttf'),
    Touche_Bold: require('./assets/fonts/Touche_Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setappStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('foreground');
    }
    appState.current = nextAppState;
    setappStateVisible(appState.current);
    console.log(appState.current);
  };

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
        <StatusBar hidden translucent />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Root>
              <Navigation />
              <FlashMessage position='top' style={{ opacity: 0.95 }} />
            </Root>
          </PersistGate>
        </Provider>
      </>
    );
  }
}
