import { StyleSheet } from "react-native";
import * as colors from "./constants/colors";

export const LightTheme = StyleSheet.create({
  appTitle: {
    textTransform: "capitalize",
    fontFamily: "Kamerik-Bold",
    fontSize: 30,
    color: colors.grey,
    left: 16,
  },
  HeaderIcon: {
    color: colors.grey,
    fontSize: 25,
    marginLeft: 18,
  },
  HeaderContainer: {
    backgroundColor: colors.white,
    paddingBottom: 45,
    paddingTop: 33,
    elevation: 50,
  },
  ListItemStyle: {
    padding: 6,
  },
  FlatListComponent: {
    backgroundColor: colors.white,
  },

  chatListName: {
    fontFamily: "Touche_Medium",
    fontSize: 18,
    textTransform: "capitalize",
    color: colors.grey,
  },
  chatListNote: {
    fontFamily: "Roboto_medium",
    color: colors.LightGrey,
    paddingLeft: 2.5,
  },
  chatListActiveName: {
    fontFamily: "Touche_Semibold",
    fontSize: 18,
    textTransform: "capitalize",
    color: colors.Shadow,
  },
  chatListActiveNote: {
    fontFamily: "Roboto_medium",
    color: colors.grey,
    paddingLeft: 2.5,
    fontWeight: "bold",
  },
  chatListBadge: {
    backgroundColor: colors.dodgerblue,
    height: 20,
    // width: 20,
    marginTop: 5,
  },
  chatListBadgeText: {
    fontFamily: "Roboto_medium",
    fontSize: 12,
  },
  ChatMainContainer: {
    backgroundColor: colors.white,
  },
  ChatKeyboardAvoidingView: {
    height: 47,
    width: "100%",
    flexDirection: "row",
    margin: 3,
    marginBottom: 7,
    backgroundColor: colors.white,
  },
  ChatInputView: {
    width: "80%",
    backgroundColor: colors.DarkWhite,
    borderRadius: 50,
    marginLeft: 5,
    fontSize: 20,
    flexDirection: "row",
  },
  ChatHeaderImage: {
    height: 45,
    width: 45,
    marginTop: 8,
  },
  ChatInputSmile: {
    fontSize: 26,
    marginLeft: 8,
    marginTop: 10,
    color: colors.grey,
  },
  ChatInputFile: {
    transform: [{ rotate: "60deg" }],
    fontSize: 26,
    right: 12,
    top: 3,
    color: colors.grey,
  },
  ChatInput: {
    padding: 10,
    width: "78%",
    fontFamily: "Roboto_medium",
    fontSize: 18,
    color: colors.grey,
    marginBottom: 2,
  },
  SendButtonView: {
    borderRadius: 500,
    width: "13%",
    marginLeft: 3,
    backgroundColor: colors.dodgerblue,
  },
  SendButton: {
    fontSize: 25,
    left: 12,
    top: 10,
    color: colors.white,
  },
  ChatHeaderView: {
    backgroundColor: colors.white,
  },
  ChatHeaderTitle: {
    color: colors.grey,
    fontFamily: "Touche_Medium",
    fontSize: 21,
    marginLeft: 10,
    textTransform: "capitalize",
  },
  ChatHeaderNote: {
    color: colors.LightGrey,
    fontFamily: "Touche_Medium",
    fontSize: 12,
    marginLeft: 12,
    textTransform: "capitalize",
  },

  ChatBubblesList: {
    backgroundColor: colors.white,
  },
  ChatBubbleView: {
    alignItems: "flex-end",
    alignContent: "flex-end",
    alignSelf: "flex-end",
    borderRadius: 20,
    padding: 14,
    marginRight: 14,
    maxWidth: "80%",
    marginTop: 3,
    backgroundColor: colors.BluishGrey,
    flexDirection: "row",
  },
  ChatBubbleText: {
    color: colors.dodgerblue,
    fontFamily: "Touche_Medium",
    fontSize: 14,
    marginBottom: 3,
    textAlign: "left",
    maxWidth: "92%",
  },
  ChatBubbleNote: {
    color: colors.MiddleGrey,
    fontSize: 10,
    alignSelf: "flex-end",
    marginLeft: 5,
    fontFamily: "Touche_Medium",
  },
  ChatBubbleLeftView: {
    alignItems: "flex-start",
    alignContent: "flex-start",
    alignSelf: "flex-start",
    maxWidth: "80%",
    borderRadius: 20,
    padding: 12,
    marginLeft: 14,
    marginTop: 3,
    backgroundColor: colors.DarkWhite,
    flexDirection: "column",
  },
  ChatBubbleLeftViewName: {
    fontFamily: "Touche_Medium",
    color: colors.dodgerblue,
    fontSize: 13,
    textTransform: "capitalize",
    marginBottom: 5,
  },
  ChatBubbleLeftText: {
    color: colors.grey,
    fontFamily: "Touche_Medium",
    fontSize: 14,
    marginBottom: 3,
    textAlign: "left",
    maxWidth: "92%",
  },
  ChatBubbleLeftNote: {
    color: colors.MiddleGrey,
    fontSize: 10,
    alignSelf: "flex-end",
    marginLeft: 5,
    fontFamily: "Touche_Medium",
  },
});

export const ToggleSwitchStyle = StyleSheet.create({
  Toggle: {
    position: "absolute",
    left: "63%",
    bottom: "90%",
  },
});

export const DarkTheme = StyleSheet.create({
  appTitle: {
    textTransform: "capitalize",
    fontFamily: "Kamerik-Bold",
    fontSize: 30,
    color: colors.white,
    left: 16,
  },
  HeaderIcon: {
    color: colors.white,
    fontSize: 25,
    marginLeft: 18,
  },
  HeaderContainer: {
    backgroundColor: colors.black,
    paddingBottom: 45,
    paddingTop: 33,
    elevation: 50,
  },
  Footer: {
    backgroundColor: colors.black,
  },
  FooterTab: {
    backgroundColor: colors.black,
  },
  FooterActiveTab: {
    backgroundColor: colors.black,
    borderBottomColor: colors.white,
    borderBottomWidth: 3,
  },
  FooterActiveIcons: {
    fontSize: 33,
    color: colors.white,
  },
  FooterIcons: {
    fontSize: 28,
    color: colors.LightGrey,
  },

  ListItemStyle: {
    padding: 6,
  },
  FlatListComponent: {
    backgroundColor: colors.black,
  },

  chatListName: {
    fontFamily: "Touche_Medium",
    fontSize: 18,
    textTransform: "capitalize",
    color: colors.LightGrey,
  },
  chatListNote: {
    fontFamily: "Roboto_medium",
    color: colors.grey,
    paddingLeft: 2.5,
  },
  chatListActiveName: {
    fontFamily: "Touche_Semibold",
    fontSize: 18,
    textTransform: "capitalize",
    color: colors.white,
  },
  chatListActiveNote: {
    fontFamily: "Roboto_medium",
    color: colors.white,
    paddingLeft: 2.5,
    fontWeight: "bold",
  },
  chatListBadge: {
    backgroundColor: colors.dodgerblue,
    height: 20,
    width: 20,
    marginTop: 5,
  },
  chatListBadgeText: {
    fontFamily: "Roboto_medium",
    fontSize: 12,
  },
  Toggle: {
    position: "absolute",
    left: "63%",
    bottom: "90%",
  },

  ChatMainContainer: {
    backgroundColor: colors.black,
  },
  ChatKeyboardAvoidingView: {
    height: 47,
    width: "100%",
    flexDirection: "row",
    margin: 3,
    marginBottom: 7,
    backgroundColor: colors.black,
  },
  ChatInputView: {
    width: "80%",
    backgroundColor: colors.grey,
    borderRadius: 50,
    marginLeft: 5,
    fontSize: 20,
    flexDirection: "row",
  },
  ChatHeaderImage: {
    height: 45,
    width: 45,
    marginTop: 8,
  },
  ChatInputSmile: {
    fontSize: 26,
    marginLeft: 8,
    marginTop: 10,
    color: colors.DarkWhite,
  },
  ChatInputFile: {
    transform: [{ rotate: "60deg" }],
    fontSize: 26,
    right: 12,
    top: 3,
    color: colors.DarkWhite,
  },
  ChatInput: {
    padding: 10,
    width: "78%",
    fontFamily: "Roboto_medium",
    fontSize: 18,
    color: colors.DarkWhite,
    marginBottom: 2,
  },
  SendButtonView: {
    borderRadius: 500,
    width: "13%",
    marginLeft: 3,
    backgroundColor: colors.dodgerblue,
  },
  SendButton: {
    fontSize: 25,
    left: 12,
    top: 10,
    color: colors.white,
  },

  ChatHeaderView: {
    backgroundColor: colors.black,
  },
  ChatHeaderTitle: {
    color: colors.white,
    fontFamily: "Touche_Medium",
    fontSize: 21,
    marginLeft: 10,
    textTransform: "capitalize",
  },
  ChatHeaderNote: {
    color: colors.grey,
    fontFamily: "Touche_Medium",
    fontSize: 12,
    marginLeft: 12,
    textTransform: "capitalize",
  },

  ChatBubblesList: {
    backgroundColor: colors.black,
  },
  ChatBubbleView: {
    alignItems: "flex-end",
    alignContent: "flex-end",
    alignSelf: "flex-end",
    maxWidth: "60%",
    borderRadius: 20,
    padding: 14,
    marginRight: 14,
    marginTop: 3,
    backgroundColor: colors.dodgerblue,
    flexDirection: "row",
  },
  ChatBubbleText: {
    color: colors.BluishGrey,
    fontFamily: "Touche_Medium",
    fontSize: 14,
    marginBottom: 3,
  },
  ChatBubbleNote: {
    color: colors.grey,
    fontSize: 10,
    alignSelf: "flex-end",
    marginLeft: 5,
    fontFamily: "Touche_Medium",
  },
  ChatBubbleLeftView: {
    alignItems: "flex-start",
    alignContent: "flex-start",
    alignSelf: "flex-start",
    maxWidth: "60%",
    borderRadius: 20,
    padding: 12,
    marginLeft: 14,
    marginTop: 3,
    backgroundColor: colors.grey,
    flexDirection: "row",
  },
  ChatBubbleLeftText: {
    color: colors.DarkWhite,
    fontFamily: "Touche_Medium",
    fontSize: 14,
    marginBottom: 3,
  },
  ChatBubbleLeftNote: {
    color: colors.MiddleGrey,
    fontSize: 10,
    alignSelf: "flex-end",
    marginLeft: 5,
    fontFamily: "Touche_Medium",
  },
});

export const AuthStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  Heading: {
    fontSize: 23,
    paddingBottom: 20,
    fontFamily: "Touche_Semibold",
    color: colors.white,
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 18,
    fontSize: 16,
    borderColor: colors.grey,
    borderWidth: 2,
    borderRadius: 20,
    textAlign: "left",
    color: colors.white,
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.Shadow,
    borderRadius: 5,
    width: "70%",
    margin: 25,
    marginBottom: 10,
    padding: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: colors.white,
    fontSize: 23,
    fontFamily: "Touche_Semibold",
  },
  TextButton: {
    fontFamily: "Touche_Semibold",
    fontSize: 15,
    color: colors.dodgerblue,
    backgroundColor: colors.black,
    paddingLeft: 5,
  },
  Text: {
    color: colors.white,
    fontFamily: "Touche_Semibold",
    fontSize: 15,
  },
  AlertText: {
    alignItems: "flex-start",
    color: colors.red,
  },
});
