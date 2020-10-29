import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import MainApp from '../screens/MainScreen';
import PresentChatScreen from '../screens/Chats';
import AuthScreen from '../screens/AuthScreen/LoginScreen';
import DetailScreen from '../screens/LightScreen/Details';
import LightSettings from '../screens/LightScreen/settings';
import {createDrawerNavigator} from 'react-navigation-drawer';
import DrawerContent from '../screens/LightScreen/Drawer';

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
            headerTitleStyle:{
                fontFamily:'Touche_Medium',
            }
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

const SettingsNavigator = createStackNavigator({
    Settings:{
        screen:LightSettings,
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
