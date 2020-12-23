import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import MainApp from '../screens/MainScreen';
import PresentChatScreen from '../screens/Chats';
import LoginScreen from '../screens/AuthScreen/LoginScreen';
import SignUpScreen from '../screens/AuthScreen/SignUpScreen';
import DetailScreen from '../screens/LightScreen/Details';
import LightSettings from '../screens/LightScreen/settings';
import {createDrawerNavigator} from 'react-navigation-drawer';
import DrawerContent from '../screens/LightScreen/Drawer';

const ChatsNavigator = createStackNavigator({
    MainScreen: {
        screen: MainApp,
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
    DetailsScreen:{
        screen: DetailScreen,
        navigationOptions: {
            headerTitle: "Post",
            headerStatusBarHeight:-10,
            headerTitleStyle:{
                fontFamily:'Touche_Medium',
            },
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
    }
});

const MainNavigator = createSwitchNavigator({
    Auth:AuthNavigator,
    Chat:ChatsNavigator
});

const SettingsNavigator = createStackNavigator({
    Settings:{
        screen:LightSettings,
        navigationOptions: {
            animationEnabled: false,
        }
    },
})

const DrawerNavigator = createDrawerNavigator({
    Home:MainNavigator,
    Settings:SettingsNavigator,
},
{
    contentComponent: props =><DrawerContent {...props}/>,
    contentOptions:{
        labelStyle:{
            fontFamily:'Touche_Medium',
        }
    }
}
);

export default createAppContainer(DrawerNavigator);
