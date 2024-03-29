import { StyleSheet } from 'react-native';
import * as colors from './constants/colors';

export const LightTheme = StyleSheet.create({
  appTitle: {
    textTransform: 'capitalize',
    fontFamily: 'Kamerik-Bold',
    fontSize: 30,
    color: colors.ghostwhite,
    left: 16,
    position: 'absolute',
  },
  HeaderIcon: {
    color: colors.grey,
    fontSize: 25,
    marginLeft: 18,
  },
  ChatMoreButton: {
    borderRadius: 10,
    opacity: 0.9,
    backgroundColor: colors.ghostwhite,
    borderColor: colors.LightGrey,
    borderWidth: 1,
    marginTop: 40,
  },
  ChatMoreButtonText: {
    fontFamily: 'Touche_Medium',
    fontSize: 18,
    textTransform: 'capitalize',
    color: colors.Shadow,
  },

  HeaderContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 45,
    paddingTop: 33,
    elevation: 50,
  },
  ListItemStyle: {
    padding: 6,
  },
  CheckIcon: {
    color: colors.greencyan,
    fontSize: 40,
  },
  FlatListComponent: {
    backgroundColor: colors.ghostwhite,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: '3%',
    opacity: 0.99,
    paddingTop: '3%',
  },
  chatListTickName: {
    fontFamily: 'Touche_Semibold',
    fontSize: 18,
    textTransform: 'capitalize',
    color: colors.dodgerblue,
  },

  chatListTickNote: {
    fontFamily: 'Touche_Medium',
    color: colors.MiddleGrey,
    fontWeight: 'bold',
    paddingLeft: 2.5,
  },
  RightArrowContainer: {
    width: 60,
    height: 60,
    // left: "70%",
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    top: '85%',
    borderRadius: 100,
    right: '10%',
    position: 'absolute',
    backgroundColor: colors.dodgerblue,
  },
  RightArrow: {
    fontSize: 40,
    color: colors.white,
    marginTop: 10,
  },

  chatListName: {
    fontFamily: 'Touche_Medium',
    fontSize: 18,
    textTransform: 'capitalize',
    color: colors.grey,
  },
  chatListNote: {
    fontFamily: 'Touche_Medium',
    color: colors.LightGrey,
    paddingLeft: 2.5,
  },
  chatListActiveName: {
    fontFamily: 'Touche_Semibold',
    fontSize: 18,
    textTransform: 'capitalize',
    color: colors.Shadow,
  },
  chatListActiveNote: {
    fontFamily: 'Touche_Medium',
    color: colors.grey,
    paddingLeft: 2.5,
    fontWeight: 'bold',
  },
  chatListBadge: {
    backgroundColor: colors.dodgerblue,
    height: 20,
    // width: 20,
    marginTop: 5,
  },
  chatListBadgeText: {
    fontFamily: 'Touche_Medium',
    fontSize: 12,
  },
  ChatMainContainer: {
    backgroundColor: colors.white,
  },
  ChatKeyboardAvoidingView: {
    height: 47,
    width: '100%',
    flexDirection: 'row',
    margin: 3,
    marginBottom: 7,
    backgroundColor: 'transparent',
  },
  ChatInputView: {
    width: '80%',
    backgroundColor: colors.DarkWhite,
    borderRadius: 50,
    marginLeft: 5,
    fontSize: 20,
    flexDirection: 'row',
  },
  ChatInputViewContainer: { flex: 1, backgroundColor: colors.DarkWhite },
  ChatHeaderImage: {
    right: '70%',
    height: 45,
    width: 45,
    marginTop: 8,
  },
  ChatInputCamera: {
    fontSize: 26,
    marginLeft: 12,
    marginTop: 10,
    color: colors.black,
  },
  ChatInputCameraIcon: {
    color: colors.black,
  },
  ChatInput: {
    padding: 10,
    width: '100%',
    fontFamily: 'Touche_Medium',
    fontSize: 18,
    color: colors.grey,
    marginBottom: 2,
  },
  SendButtonView: {
    borderRadius: 500,
    width: '13%',
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
    backgroundColor: colors.DarkWhite,
  },
  ChatHeaderTitle: {
    color: colors.grey,
    fontFamily: 'Touche_Medium',
    fontSize: 21,
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  ChatHeaderNote: {
    color: colors.LightGrey,
    fontFamily: 'Touche_Medium',
    fontSize: 12,
    marginLeft: 12,
    textTransform: 'capitalize',
  },
  ChatHeaderNoteOnline: {
    color: colors.greencyan,
    fontFamily: 'Touche_Semibold',
    fontSize: 12,
    marginLeft: 12,
    textTransform: 'capitalize',
  },
  ChatBubblesList: {
    backgroundColor: 'transparent',
  },
  ChatBubbleView: {
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    borderRadius: 20,
    padding: 14,
    marginRight: 14,
    maxWidth: '80%',
    marginTop: 3,
    backgroundColor: colors.BluishGrey,
    flexDirection: 'row',
  },
  ChatBubbleText: {
    color: colors.dodgerblue,
    fontFamily: 'Touche_Medium',
    fontSize: 14,
    marginBottom: 3,
    textAlign: 'left',
    maxWidth: '85%',
  },
  ChatBubbleNote: {
    color: colors.MiddleGrey,
    fontSize: 10,
    alignSelf: 'flex-end',
    marginLeft: 5,
    fontFamily: 'Touche_Medium',
  },
  ChatBubbleNoteIcon: {
    color: colors.MiddleGrey,
    fontSize: 15,
    alignSelf: 'flex-end',
    marginLeft: 5,
    fontFamily: 'Touche_Medium',
  },
  ChatBubbleNoteIconBlue: {
    color: colors.dodgerblue,
    fontSize: 16,
    alignSelf: 'flex-end',
    marginLeft: 5,
    fontFamily: 'Touche_Medium',
  },
  ChatBubbleLeftView: {
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    maxWidth: '80%',
    borderRadius: 20,
    padding: 12,
    marginLeft: 14,
    marginTop: 3,
    backgroundColor: colors.DarkWhite,
    flexDirection: 'column',
  },
  ChatBubbleLeftViewName: {
    fontFamily: 'Touche_Medium',
    color: colors.dodgerblue,
    fontSize: 13,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  ChatBubbleLeftText: {
    color: colors.grey,
    fontFamily: 'Touche_Medium',
    fontSize: 14,
    marginBottom: 3,
    textAlign: 'left',
    maxWidth: '92%',
  },
  ChatBubbleLeftNote: {
    color: colors.MiddleGrey,
    fontSize: 10,
    alignSelf: 'flex-end',
    marginLeft: 5,
    fontFamily: 'Touche_Medium',
  },
  ChatInputSmile: {
    fontSize: 26,
    marginLeft: 8,
    marginTop: 10,
    color: colors.grey,
  },
  PromptMessageView: {
    padding: 6,
    flex: 1,
    maxWidth: '80%',
    alignSelf: 'center',
  },
  PromptMessage: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.DarkWhite,
    color: colors.MiddleGrey,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Touche_Medium',
    fontSize: 12,
  },
  SettingsinputBox: {
    maxWidth: '90%',
    margin: 10,
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.dodgerblue,
    fontFamily: 'Touche_Medium',
  },
  SettingsText: {
    alignSelf: 'flex-start',
    color: colors.black,
    fontFamily: 'Touche_Semibold',
    fontSize: 15,
  },
  SettingsmemberListNote: {
    fontFamily: 'Touche_Medium',
    color: colors.LightGrey,
    paddingLeft: 2.5,
  },
  SettingsmemberListName: {
    fontFamily: 'Touche_Medium',
    fontSize: 18,
    textTransform: 'capitalize',
    color: colors.grey,
  },
  PullMsgView: {
    position: 'absolute',
    zIndex: 10,
    opacity: 0.9,
    top: '10%',
    left: '25%',
    borderRadius: 20,
    borderWidth: 2,
    padding: 10,
    backgroundColor: colors.darkBlue,
  },
  PullMsgHeading: {
    fontFamily: 'Touche_Medium',
    fontSize: 15,
    color: colors.white,
  },
  PullMsgMem: {
    fontFamily: 'Touche_Medium',
    fontSize: 15,
    left: 10,
    color: colors.white,
  },
  ConfirmationStyle: {
    fontFamily: 'Touche_Medium',
    backgroundColor: colors.white,
    color: colors.black,
  },
});

export const DarkTheme = StyleSheet.create({
  appTitle: {
    textTransform: 'capitalize',
    fontFamily: 'Kamerik-Bold',
    fontSize: 30,
    color: colors.white,
    left: 16,
    position: 'absolute',
  },
  HeaderIcon: {
    color: colors.white,
    fontSize: 25,
    marginLeft: 18,
  },
  ChatMoreButton: {
    borderRadius: 10,
    opacity: 0.9,
    backgroundColor: colors.black,
    borderColor: colors.grey,
    borderWidth: 1,
    marginTop: 44,
  },
  ChatMoreButtonText: {
    fontFamily: 'Touche_Medium',
    fontSize: 18,
    textTransform: 'capitalize',
    color: colors.LightGrey,
  },
  HeaderContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 45,
    paddingTop: 33,
    elevation: 50,
  },
  ListItemStyle: {
    padding: 6,
  },
  CheckIcon: {
    color: colors.greencyan,
    fontSize: 40,
  },
  FlatListComponent: {
    backgroundColor: colors.black,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: '3%',
    paddingTop: '3%',
    opacity: 0.99,
  },
  chatListTickName: {
    fontFamily: 'Touche_Semibold',
    fontSize: 18,
    textTransform: 'capitalize',
    color: colors.dodgerblue,
  },

  chatListTickNote: {
    fontFamily: 'Touche_Medium',
    color: colors.MiddleGrey,
    fontWeight: 'bold',
    paddingLeft: 2.5,
  },
  RightArrowContainer: {
    width: 60,
    height: 60,
    // left: "70%",
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    top: '85%',
    borderRadius: 100,
    right: '10%',
    position: 'absolute',
    backgroundColor: colors.dodgerblue,
  },
  RightArrow: {
    fontSize: 40,
    color: colors.white,
    marginTop: 10,
  },

  chatListName: {
    fontFamily: 'Touche_Medium',
    fontSize: 18,
    textTransform: 'capitalize',
    color: colors.LightGrey,
  },
  chatListNote: {
    fontFamily: 'Touche_Medium',
    color: colors.grey,
    paddingLeft: 2.5,
  },
  chatListActiveName: {
    fontFamily: 'Touche_Semibold',
    fontSize: 18,
    textTransform: 'capitalize',
    color: colors.DarkWhite,
  },
  chatListActiveNote: {
    fontFamily: 'Touche_Medium',
    color: colors.MiddleGrey,
    paddingLeft: 2.5,
    fontWeight: 'bold',
  },
  chatListBadge: {
    backgroundColor: colors.dodgerblue,
    height: 20,
    marginTop: 5,
  },
  chatListBadgeText: {
    fontFamily: 'Touche_Medium',
    fontSize: 12,
  },
  ChatMainContainer: {
    backgroundColor: colors.black,
  },
  ChatKeyboardAvoidingView: {
    height: 47,
    width: '100%',
    flexDirection: 'row',
    margin: 3,
    marginBottom: 7,
    backgroundColor: 'transparent',
  },
  ChatInputViewContainer: { flex: 1, backgroundColor: colors.Shadow },
  ChatInputView: {
    width: '80%',
    backgroundColor: colors.Shadow,
    borderRadius: 50,
    marginLeft: 5,
    fontSize: 20,
    flexDirection: 'row',
  },
  ChatHeaderImage: {
    right: '70%',
    height: 45,
    width: 45,
    marginTop: 8,
  },
  ChatInputCamera: {
    fontSize: 26,
    marginLeft: 12,
    marginTop: 10,
    color: colors.dodgerblue,
  },
  ChatInputCameraIcon: {
    color: colors.dodgerblue,
  },
  ChatInput: {
    padding: 10,
    width: '100%',
    fontFamily: 'Touche_Medium',
    fontSize: 18,
    color: colors.DarkWhite,
    marginBottom: 2,
  },
  SendButtonView: {
    borderRadius: 500,
    width: '13%',
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
    fontFamily: 'Touche_Medium',
    fontSize: 21,
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  ChatHeaderNote: {
    color: colors.grey,
    fontFamily: 'Touche_Medium',
    fontSize: 12,
    marginLeft: 12,
    textTransform: 'capitalize',
  },
  ChatHeaderNoteOnline: {
    color: colors.greencyan,
    fontFamily: 'Touche_Semibold',
    fontSize: 12,
    marginLeft: 12,
    textTransform: 'capitalize',
  },
  ChatBubblesList: {
    backgroundColor: 'transparent',
  },
  ChatBubbleView: {
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    borderRadius: 20,
    padding: 14,
    marginRight: 14,
    maxWidth: '80%',
    marginTop: 3,
    backgroundColor: colors.indigo,
    flexDirection: 'row',
  },
  ChatBubbleText: {
    color: colors.BluishGrey,
    fontFamily: 'Touche_Medium',
    fontSize: 14,
    marginBottom: 3,
    textAlign: 'left',
    maxWidth: '85%',
  },
  ChatBubbleNote: {
    color: colors.MiddleGrey,
    fontSize: 10,
    alignSelf: 'flex-end',
    marginLeft: 5,
    fontFamily: 'Touche_Medium',
  },
  ChatBubbleNoteIcon: {
    color: colors.MiddleGrey,
    fontSize: 15,
    alignSelf: 'flex-end',
    marginLeft: 5,
    fontFamily: 'Touche_Medium',
  },
  ChatBubbleNoteIconBlue: {
    color: colors.dodgerblue,
    fontSize: 16,
    alignSelf: 'flex-end',
    marginLeft: 5,
    fontFamily: 'Touche_Medium',
  },
  ChatBubbleLeftView: {
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    maxWidth: '80%',
    borderRadius: 20,
    padding: 12,
    marginLeft: 14,
    marginTop: 3,
    backgroundColor: colors.Shadow,
    flexDirection: 'column',
  },
  ChatBubbleLeftViewName: {
    fontFamily: 'Touche_Medium',
    color: colors.dodgerblue,
    fontSize: 13,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  ChatBubbleLeftText: {
    color: colors.MiddleGrey,
    fontFamily: 'Touche_Medium',
    fontSize: 14,
    marginBottom: 3,
    textAlign: 'left',
    maxWidth: '92%',
  },
  ChatBubbleLeftNote: {
    color: colors.grey,
    fontSize: 10,
    alignSelf: 'flex-end',
    marginLeft: 5,
    fontFamily: 'Touche_Medium',
  },
  ChatInputSmile: {
    fontSize: 26,
    marginLeft: 8,
    marginTop: 10,
    color: colors.dodgerblue,
  },
  PromptMessageView: {
    padding: 6,
    flex: 1,
    maxWidth: '80%',
    alignSelf: 'center',
  },
  PromptMessage: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.Shadow,
    color: colors.grey,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Touche_Medium',
    fontSize: 12,
  },
  SettingsinputBox: {
    maxWidth: '90%',
    margin: 10,
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 2,
    color: colors.LightGrey,
    borderBottomColor: colors.dodgerblue,
    fontFamily: 'Touche_Medium',
  },
  SettingsText: {
    alignSelf: 'flex-start',
    color: colors.DarkWhite,
    fontFamily: 'Touche_Semibold',
    fontSize: 15,
  },
  SettingsmemberListNote: {
    fontFamily: 'Touche_Medium',
    color: colors.grey,
    paddingLeft: 2.5,
  },
  SettingsmemberListName: {
    fontFamily: 'Touche_Medium',
    fontSize: 18,
    textTransform: 'capitalize',
    color: colors.DarkWhite,
  },
  PullMsgView: {
    position: 'absolute',
    zIndex: 10,
    opacity: 0.9,
    top: '10%',
    left: '25%',
    borderRadius: 20,
    borderWidth: 2,
    padding: 10,
    backgroundColor: colors.indigo,
  },
  PullMsgHeading: {
    fontFamily: 'Touche_Medium',
    fontSize: 15,
    color: colors.white,
  },
  PullMsgMem: {
    fontFamily: 'Touche_Medium',
    fontSize: 15,
    left: 10,
    color: colors.white,
  },
  ConfirmationStyle: {
    fontFamily: 'Touche_Medium',
    backgroundColor: colors.black,
    color: colors.white,
  },
});

export const ToggleSwitchStyle = StyleSheet.create({
  Toggle: {
    position: 'absolute',
    left: '63%',
    top: '2%',
  },
});

export const ActionButtonStyle = StyleSheet.create({
  Toggle: {
    position: 'absolute',
    left: '88%',
    bottom: '3%',
  },
});

export const ImageBg = StyleSheet.create({
  ImageBack: {
    width: '100%',
    height: '100%',
    opacity: 0.98,
    backgroundColor: 'black',
  },
});

export const AuthStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Heading: {
    fontSize: 23,
    paddingBottom: 20,
    fontFamily: 'Touche_Semibold',
    color: colors.white,
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 18,
    fontSize: 16,
    borderColor: colors.grey,
    borderWidth: 2,
    borderRadius: 20,
    textAlign: 'left',
    color: colors.white,
    fontFamily: 'Touche_Medium',
  },
  countryCodeButton: {
    padding: 8,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: colors.dodgerblue,
    color: colors.white,
  },
  countryCodeButtonText: { color: colors.white, fontFamily: 'Touche_Medium' },
  inputBoxText: {
    width: '85%',
    textAlign: 'left',
    color: colors.white,
    fontFamily: 'Touche_Medium',
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.Shadow,
    borderRadius: 5,
    width: '70%',
    margin: 25,
    marginBottom: 10,
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 23,
    fontFamily: 'Touche_Semibold',
  },
  TextButton: {
    fontFamily: 'Touche_Semibold',
    fontSize: 15,
    color: colors.dodgerblue,
    backgroundColor: colors.black,
    paddingLeft: 5,
  },
  Text: {
    color: colors.white,
    fontFamily: 'Touche_Semibold',
    fontSize: 15,
  },
  AlertText: {
    alignItems: 'flex-start',
    color: colors.red,
  },
});

export const SettingForm = StyleSheet.create({
  memberListNote: {
    fontFamily: 'Touche_Medium',
    color: colors.LightGrey,
    paddingLeft: 2.5,
  },
  memberListName: {
    fontFamily: 'Touche_Medium',
    fontSize: 18,
    textTransform: 'capitalize',
    color: colors.grey,
  },
  profile_pic: {
    padding: 75,
    borderRadius: 100,
  },
  info: {
    fontFamily: 'Touche_Medium',
    fontSize: 16,
    padding: 12,
  },
  cameraView: {
    position: 'absolute',
    left: '60%',
    top: '80%',
    backgroundColor: colors.dodgerblue,
    height: 60,
    width: 60,
    borderRadius: 100,
    alignItems: 'center',
  },
  camera: {
    marginTop: 15,
    color: colors.white,
  },
  inputBox: {
    maxWidth: '90%',
    margin: 10,
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.dodgerblue,
    fontFamily: 'Touche_Medium',
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.dodgerblue,
    borderRadius: 5,
    width: '30%',
    margin: 25,
    marginBottom: 10,
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 20,
    fontFamily: 'Touche_Semibold',
  },
  Text: {
    alignSelf: 'flex-start',
    color: colors.black,
    fontFamily: 'Touche_Semibold',
    fontSize: 15,
  },
});

export const FloatBarStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    right: '10%',
    alignItems: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    bottom: '10%',
  },
  button0: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    width: 54,
    backgroundColor: colors.Shadow,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    width: 54,
    backgroundColor: colors.Shadow,
  },
  button2: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    width: 54,
    height: '100%',
    backfaceVisibility: 'visible',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: 'transparent',
  },
  settings: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 60,
    color: colors.grey,
    backgroundColor: colors.Shadow,
    fontSize: 26,
    marginTop: 20,
  },
  account: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 60,
    fontSize: 26,
    backgroundColor: colors.Shadow,
    color: colors.grey,
  },
  group: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 60,
    fontSize: 26,
    backgroundColor: colors.Shadow,
    color: colors.grey,
  },
  open: {
    alignItems: 'center',
    alignSelf: 'center',
    height: '150%',
    fontSize: 55,
    color: colors.dodgerblue,
    backgroundColor: '#f1f3f5',
  },
});

export const DarkFloatBarStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    right: '10%',
    alignItems: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    bottom: '10%',
  },
  button0: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    width: 55,
    backgroundColor: colors.Shadow,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    width: 55,
    backgroundColor: colors.Shadow,
  },
  button2: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    width: 55,
    height: '100%',
    backfaceVisibility: 'visible',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: 'transparent',
  },
  settings: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 60,
    color: colors.grey,
    backgroundColor: colors.Shadow,
    fontSize: 26,
    marginTop: 20,
  },
  account: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 60,
    fontSize: 26,
    backgroundColor: colors.Shadow,
    color: colors.grey,
  },
  group: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 60,
    fontSize: 26,
    backgroundColor: colors.Shadow,
    color: colors.grey,
  },
  open: {
    alignItems: 'center',
    alignSelf: 'center',
    height: '150%',
    fontSize: 55,
    color: colors.dodgerblue,
    backgroundColor: colors.black,
  },
});
