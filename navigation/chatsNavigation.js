import {createStackNavigator, Header} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import SettingsScreen from '../screens/Settings';
import MainApp from '../screens/MainScreen';
import PresentChatScreen from '../screens/Chats';

const ChatsNavigator = createStackNavigator({
    MainScreen: {
        screen: MainApp,
        navigationOptions: {
            headerShown: false
        }
    },
    Settings: SettingsScreen,
    ChatScreen:{
        
        screen: PresentChatScreen,
        navigationOptions: {
            headerShown: false
        }
    },
});

export default createAppContainer(ChatsNavigator);
