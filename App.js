import React,{useState} from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import ChatsNavigator from './navigation/chatsNavigation';
import {createStore,combineReducers} from 'redux';
import ChatListReducer from './store/reducers/chatlist';
import GroupListReducer from './store/reducers/grouplist';
import {Provider} from 'react-redux';

const fetchFonts = () => {
  Font.loadAsync({
    'Roboto_medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Kamerik-Bold': require('./assets/fonts/Kamerik-Bold.ttf'),
    'Touche_Semibold': require('./assets/fonts/Touche-Semibold.ttf')
  });
};

const rootReducer = combineReducers({
  ChatList: ChatListReducer,
  GroupList: GroupListReducer,
});
const store = createStore(rootReducer);

export default function App() {
  const [fontloaded,setfontloaded] = useState(false);
  
  if(!fontloaded){
    return (
      <AppLoading
      startAsync={fetchFonts} 
      onFinish={() => setfontloaded(true)}
    />
    )
  }
  
  return (
    <Provider store={store}>
      <ChatsNavigator/>
    </Provider>
  );
}