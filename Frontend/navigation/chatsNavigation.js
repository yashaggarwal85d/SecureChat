import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainApp from "../screens/MainScreen";
import PresentChatScreen from "../screens/Chats";
import LoginScreen from "../screens/AuthScreen/LoginScreen";
import SignUpScreen from "../screens/AuthScreen/SignUpScreen";
import GroupSearchScreen from "../screens/SettingsScreen/groupSearch";
import GroupConfirmScreen from "../screens/SettingsScreen/groupConfirm";
import SettingsScreen from "../screens/SettingsScreen/settings";
import SearchScreen from "../screens/SettingsScreen/search";
import { LightTheme } from "../appStyles";

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

  GroupSearchScreen: {
    screen: GroupSearchScreen,
    navigationOptions: {
      headerTitle: "Create a Group",
      headerTitleStyle: LightTheme.ChatHeaderTitle,
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

  GroupConfirmScreen: {
    screen: GroupConfirmScreen,
    navigationOptions: {
      headerTitle: "Confirm details",
      headerTitleStyle: LightTheme.ChatHeaderTitle,
      animationEnabled: true,
      cardShadowEnabled: false,
      gestureDirection: "vertical",
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },

  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      headerTitle: "Settings",
      headerTitleStyle: LightTheme.ChatHeaderTitle,
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

  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      headerTitle: "Add User to chat",
      headerTitleStyle: LightTheme.ChatHeaderTitle,
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
