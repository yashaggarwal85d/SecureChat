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
import RoomSettingsScreen from "../screens/SettingsScreen/roomSetting";
import { LightTheme, DarkTheme } from "../appStyles";
import AddParticipantScreen from "../screens/SettingsScreen/addParticipant";

import DarkAddParticipantScreen from "../screens/DarkSettingsScreen/addParticipant";
import DarkGroupSearchScreen from "../screens/DarkSettingsScreen/groupSearch";
import DarkGroupConfirmScreen from "../screens/DarkSettingsScreen/groupConfirm";
import DarkSearchScreen from "../screens/DarkSettingsScreen/search";

import {
  CardStyleInterpolators,
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
      gestureDirection: "vertical",
      transitionSpec: {
        open: TransitionSpecs.ScaleFromCenterAndroidSpec,
        close: TransitionSpecs.ScaleFromCenterAndroidSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    },
  },

  GroupSearchScreen: {
    screen: GroupSearchScreen,
    navigationOptions: {
      headerTitle: "Create a Group",
      headerStyle: LightTheme.ChatHeaderView,
      headerTitleStyle: LightTheme.ChatHeaderTitle,
      animationEnabled: true,
      cardShadowEnabled: false,
      gestureDirection: "horizontal",
      transitionSpec: {
        open: TransitionSpecs.ScaleFromCenterAndroidSpec,
        close: TransitionSpecs.FadeOutToBottomAndroidSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },

  GroupConfirmScreen: {
    screen: GroupConfirmScreen,
    navigationOptions: {
      headerTitle: "Confirm details",
      headerStyle: LightTheme.ChatHeaderView,
      headerTitleStyle: LightTheme.ChatHeaderTitle,
      animationEnabled: true,
      cardShadowEnabled: false,
      gestureDirection: "horizontal",
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
      headerStyle: LightTheme.ChatHeaderView,
      headerTitleStyle: LightTheme.ChatHeaderTitle,
      animationEnabled: true,
      cardShadowEnabled: false,
      gestureDirection: "horizontal",
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },

  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      headerTitle: "Add User to chat",
      headerStyle: LightTheme.ChatHeaderView,
      headerTitleStyle: LightTheme.ChatHeaderTitle,
      animationEnabled: true,
      cardShadowEnabled: false,
      gestureDirection: "horizontal",
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },

  RoomSettingsScreen: {
    screen: RoomSettingsScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: true,
      cardShadowEnabled: false,
      gestureDirection: "horizontal",
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },
  lightAddParticipantScreen: {
    screen: AddParticipantScreen,
    navigationOptions: {
      headerTitle: "Add participant",
      headerStyle: LightTheme.ChatHeaderView,
      headerTitleStyle: LightTheme.ChatHeaderTitle,
      animationEnabled: true,
      cardShadowEnabled: false,
      gestureDirection: "horizontal",
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },

  darkAddParticipantScreen: {
    screen: DarkAddParticipantScreen,
    navigationOptions: {
      headerTitle: "Add participant",
      headerStyle: DarkTheme.ChatHeaderView,
      headerTitleStyle: DarkTheme.ChatHeaderTitle,
      headerTintColor: "white",
      animationEnabled: true,
      cardShadowEnabled: false,
      gestureDirection: "horizontal",
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      cardStyle: { backgroundColor: "black" },
    },
  },
  DarkGroupSearchScreen: {
    screen: DarkGroupSearchScreen,
    navigationOptions: {
      headerTitle: "Create a Group",
      headerStyle: DarkTheme.ChatHeaderView,
      headerTitleStyle: DarkTheme.ChatHeaderTitle,
      headerTintColor: "white",
      animationEnabled: true,
      cardShadowEnabled: false,
      gestureDirection: "horizontal",
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      cardStyle: { backgroundColor: "black" },
    },
  },

  DarkGroupConfirmScreen: {
    screen: DarkGroupConfirmScreen,
    navigationOptions: {
      headerTitle: "Confirm details",
      headerStyle: DarkTheme.ChatHeaderView,
      headerTitleStyle: DarkTheme.ChatHeaderTitle,
      headerTintColor: "white",
      animationEnabled: true,
      cardShadowEnabled: false,
      gestureDirection: "horizontal",
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      cardStyle: { backgroundColor: "black" },
    },
  },

  DarkSearchScreen: {
    screen: DarkSearchScreen,
    navigationOptions: {
      headerTitle: "Add User to chat",
      headerStyle: DarkTheme.ChatHeaderView,
      headerTitleStyle: DarkTheme.ChatHeaderTitle,
      headerTintColor: "white",
      animationEnabled: true,
      cardShadowEnabled: false,
      gestureDirection: "horizontal",
      transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      cardStyle: { backgroundColor: "black" },
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
