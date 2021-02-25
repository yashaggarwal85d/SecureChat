import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainApp from "../screens/MainScreen";
import PresentChatScreen from "../screens/Chats";
import LoginScreen from "../screens/AuthScreen/LoginScreen";
import SignUpScreen from "../screens/AuthScreen/SignUpScreen";
import LightChatHeader from "../screens/LightScreen/LightChatScreen";
import DarkChatHeader from "../screens/DarkScreen/DarkChatScreen";
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from "react-navigation-stack";

const ChatsNavigator = createStackNavigator({
  MainScreen: {
    screen: MainApp,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    },
  },
  LightChatScreen: {
    screen: LightChatHeader,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    },
  },
  DarkChatScreen: {
    screen: DarkChatHeader,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    },
  },

  ChatScreen: {
    screen: PresentChatScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: true,
      cardShadowEnabled: false,
      gestureDirection: "horizontal",
      transitionSpec: {
        open: TransitionSpecs.ScaleFromCenterAndroidSpec,
        close: TransitionSpecs.FadeOutToBottomAndroidSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
    },
  },
});

const AuthNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    },
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    },
  },
});

const MainNavigatorAuth = createSwitchNavigator({
  Auth: AuthNavigator,
  Chat: ChatsNavigator,
});

const MainNavigatorChat = createSwitchNavigator({
  Chat: ChatsNavigator,
  Auth: AuthNavigator,
});

export const AuthMainNavigator = createAppContainer(MainNavigatorAuth);
export const ChatMainNavigator = createAppContainer(MainNavigatorChat);
