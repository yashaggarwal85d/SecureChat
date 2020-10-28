import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import MainApp from '../screens/MainScreen';
import PresentChatScreen from '../screens/Chats';
import AuthScreen from '../screens/AuthScreen/LoginScreen';
import DetailScreen from '../screens/LightScreen/Details';

const ChatsNavigator = createStackNavigator({
    MainScreen: {
        screen: MainApp,
        navigationOptions: {
            headerShown: false
        }
    },
    ChatScreen:{
        
        screen: PresentChatScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    DetailsScreen:{
        screen: DetailScreen,
        navigationOptions: {
            headerTitle: "Post",
            headerStatusBarHeight:-10,
        }
    },
});

const AuthNavigator = createStackNavigator({
    Auth:{
        screen: AuthScreen,
        navigationOptions: {
            headerShown: false
        }
    }
});

const MainNavigator = createSwitchNavigator({
    Auth:AuthNavigator,
    Chat:ChatsNavigator
});

export default createAppContainer(MainNavigator);
