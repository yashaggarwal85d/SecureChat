import React,{useState,useEffect} from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import MainNavigator from './navigation/chatsNavigation';
import { createStore,combineReducers,applyMiddleware } from 'redux';
import ChatListReducer from './store/reducers/chatlist';
import ThemeReducer from './store/reducers/CurrentTheme';
import AuthReducer from './store/reducers/Auth';
import ChatReducer from './store/reducers/Chats'
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import io from 'socket.io-client';

const rootReducer = combineReducers({
  ChatList: ChatListReducer,
  CurrentTheme: ThemeReducer,
  user: AuthReducer,
  Chats:ChatReducer,
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'Roboto_medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Kamerik-Bold': require('./assets/fonts/Kamerik-Bold.ttf'),
    'Touche_Semibold': require('./assets/fonts/Touche-Semibold.ttf'),
    'Touche_Medium':require('./assets/fonts/Touche_Medium.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const socket = io("http://192.168.1.8:3000");
  });

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }
  return(

    <Provider store={store}>
      <MainNavigator/>
    </Provider>

  );
}