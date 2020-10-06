import { createStackNavigator, Header } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import SettingsScreen from '../screens/Settings';
import MainApp from '../screens/MainScreen';
import PresentChatScreen from '../screens/Chats';
import AuthScreen from '../screens/AuthScreen/LoginScreen';
import ConfirmAuthScreen from '../screens/AuthScreen/ConfirmLoginScreen';

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

const AuthNavigator = createStackNavigator({
    Auth:{
        screen: AuthScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Confirm:{
        screen: ConfirmAuthScreen,
    }

});

const MainNavigator = createSwitchNavigator({
    Auth:AuthNavigator,
    Chat:ChatsNavigator
});

export default createAppContainer(MainNavigator);
