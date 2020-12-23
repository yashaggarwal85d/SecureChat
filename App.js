import React,{useState} from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import MainNavigator from './navigation/chatsNavigation';
import { createStore,combineReducers,applyMiddleware } from 'redux';
import ChatListReducer from './store/reducers/chatlist';
import GroupListReducer from './store/reducers/grouplist';
import ThemeReducer from './store/reducers/CurrentTheme';
import AuthReducer from './store/reducers/Auth';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  ChatList: ChatListReducer,
  GroupList: GroupListReducer,
  CurrentTheme: ThemeReducer,
  user: AuthReducer,
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