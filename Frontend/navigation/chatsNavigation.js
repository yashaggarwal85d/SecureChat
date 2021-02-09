import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import MainApp from '../screens/MainScreen';
import PresentChatScreen from '../screens/Chats';
import LoginScreen from '../screens/AuthScreen/LoginScreen';
import SignUpScreen from '../screens/AuthScreen/SignUpScreen';
import FirstTimeLogin from '../screens/Intro';
import LightChatHeader from '../screens/LightScreen/Chats';
import DarkChatHeader from '../screens/DarkScreen/Chats';

const ChatsNavigator = createStackNavigator({
    MainScreen: {
        screen: MainApp,
        navigationOptions: {
            headerShown: false,
            animationEnabled: false,
        }
    },
    LightChatScreen:{
        screen: LightChatHeader,
        navigationOptions: {
            headerShown: false,
            animationEnabled: false,
        }
    },
    DarkChatScreen:{
        screen: DarkChatHeader,
        navigationOptions: {
            headerShown: false,
            animationEnabled: false,
        }
    },
    
    ChatScreen:{
        
        screen: PresentChatScreen,
        navigationOptions: {
            headerShown: false,
            animationEnabled: false,
        }
    },
});

const IntroNavigator = createStackNavigator({
    FirstTimeLogin:{
        screen:FirstTimeLogin,
        navigationOptions: {
            headerShown: false,
            animationEnabled: false,
        }
    },
});

const AuthNavigator = createStackNavigator({
    Login:{
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false,
            animationEnabled: false,
        }
    },
    SignUp:{
        screen: SignUpScreen,
        navigationOptions: {
            headerShown: false,
            animationEnabled: false,
        }
    },
});

const MainNavigator = createSwitchNavigator({
    Auth:AuthNavigator,
    Intro:IntroNavigator,
    Chat:ChatsNavigator,
});


export default createAppContainer(MainNavigator);
