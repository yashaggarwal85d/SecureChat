import {StyleSheet} from 'react-native';
import * as colors from './constants/colors';

export const LightTheme= StyleSheet.create({
  
  MainScreenContainer:{
    backgroundColor:colors.white,
  },
  HeaderContainer: {
    width: 57,
    height: 58,
  },
  appTitle: {
    textTransform: 'capitalize',
    fontWeight: 'bold', 
    fontFamily: 'Touche_Semibold',
    fontSize: 22,
    color: colors.black,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 250
  },
  HeadertabBarBackgroundColor:{
    backgroundColor:colors.ghostwhite,
  },
  HeaderIcon:{
    color:colors.dodgerblue,
    fontSize:25,
  },
  HeaderImage: {
    marginTop:8,
    marginRight:12,
    width: 41,
    height: 41,
    borderWidth: 0,
    borderColor: colors.dodgerblue,
    borderRadius: 1500,
  },
  ListItemStyle:{
    borderBottomWidth:1,
    borderBottomColor:colors.ghostwhite
  },
  headerBackgroundColor: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.ghostwhite,
  },
  // Tabs
  tabBarUnderLine: {
    height: 2,
    backgroundColor: colors.dodgerblue,
  },
  badge: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.dodgerblue,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    height: 24,
  },
  chatListName:{
    textTransform: 'capitalize',
    fontFamily: 'Touche_Semibold',
    fontWeight: '400', 
    fontSize: 18,
    color:colors.black,
  },
  chatListMessage:{
    fontFamily: 'Roboto_medium',
    color:colors.Shadow,
  },
  chatListMessageDetail:{
    fontFamily: 'Touche_Medium',
    color:colors.Shadow,
    fontSize:18,
  },
  chatListMessageComment:{
    fontFamily: 'Touche_Medium',
    color:colors.Shadow,
    fontSize:15,
  },
  chatListNote:{
    fontFamily: 'Roboto_medium',
    color:colors.grey,
  },
  listItemDivider: {
    fontFamily: 'Touche_Semibold',
    marginTop: 10, 
    height: 10
  },
  TrippleToggle:{
    position:'absolute',
    left:144,
    bottom: 20,
  },
  MessageIcon:{
    color:colors.grey,
    fontSize:20,
  },
  MessageIconNum:{
    color:colors.black,
    fontSize:15,
    paddingRight:50,
  },
  DetailMessageIcon:{
    color:colors.grey,
    fontSize:25,
    paddingRight:30,
    paddingLeft:30,
  },
  DetailView:{
    fontFamily: 'Roboto_medium',
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingBottom: 0
  },
  DetailViewName:{
    fontFamily: 'Touche_Medium',
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
    height: 56 
  },
  DetailViewNameText:{
    fontFamily: 'Touche_Medium',
    paddingLeft:5,
    fontWeight: "bold",
    fontSize: 20
  },
  DetailViewIcons:{
    flexDirection: "row",
    paddingTop:20,
    justifyContent: "flex-start",
    padding: 10,
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  DetailViewIconsText:{
    fontFamily: 'Touche_Medium',
    color: colors.grey,
    fontSize: 16,
    paddingRight: 20
  },
  DetailViewIconsTextNum:{
    fontFamily: 'Touche_Medium',
    fontWeight: "bold",
    fontSize: 16,
    paddingRight: 5 
  },

});

export const MediumTheme= StyleSheet.create({
  
  MainScreenContainer:{
    backgroundColor:colors.white,
  },
  HeaderContainer: {
    width: 57,
    height: 58,
  },
  appTitle: {
    textTransform: 'capitalize',
    fontWeight: 'bold', 
    fontFamily: 'Touche_Semibold',
    fontSize: 22,
    color: colors.black,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 250
  },
  HeadertabBarBackgroundColor:{
    backgroundColor:colors.ghostwhite,
  },
  HeaderIcon:{
    color:colors.dodgerblue,
    fontSize:25,
  },
  HeaderImage: {
    marginTop:8,
    marginRight:12,
    width: 41,
    height: 41,
    borderWidth: 0,
    borderColor: colors.dodgerblue,
    borderRadius: 1500,
  },
  ListItemStyle:{
    height:80,
    borderBottomWidth:1,
    borderBottomColor:colors.ghostwhite
  },
  headerBackgroundColor: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.ghostwhite,
  },
  // Tabs
  tabBarUnderLine: {
    height: 2,
    backgroundColor: colors.dodgerblue,
  },
  badge: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.dodgerblue,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    height: 24,
  },
  lastmessagetime: {
    fontFamily: 'Touche_Semibold',
    color: colors.dodgerblue,
  },
  badgeText: {
    fontFamily: 'Touche_Semibold',
    color: colors.ghostwhite,
    fontSize: 12,
    fontWeight:'bold',
  },
  tabsText: {
    fontFamily: 'Touche_Semibold',
    fontSize: 14, 
    fontWeight: 'bold', 
    color: colors.grey,
  },
  //Chat Screen
  chatListName:{
    textTransform: 'capitalize',
    fontFamily: 'Touche_Semibold',
    fontWeight: '400', 
    fontSize: 18,
    color:colors.black,
  },
  chatListNote:{
    fontFamily: 'Touche_Medium',
    color:colors.grey,
  },
  badgeChats: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.dodgerblue,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    height: 24,
    marginTop: 4,
  },
  badgeTextChats: {
    fontFamily: 'Touche_Semibold',
    color: colors.ghostwhite,
    fontSize: 12,
  },
  fabColor: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.dodgerblue,
  },
  // Status Screen
  listItemDivider: {
    fontFamily: 'Touche_Semibold',
    marginTop: 10, 
    height: 10
  },

  GiftedChatContainer: {
    backgroundColor:colors.white,
  },
  CustomMessageTextleft: {
      color:colors.black,
      fontFamily: 'Touche_Medium',
  },
  CustomMessageTextright: {
      color:colors.ghostwhite,
      fontFamily: 'Touche_Medium',
  },
  CustomBubblercontainer: {
    flex: 1
  },
  CustomBubblerright: {
    marginTop:10,
    marginVertical: 4,
    backgroundColor: colors.dodgerblue,
  },
  CustomBubblerleft: {
    marginTop:10,
    marginVertical: 4,
    backgroundColor: colors.ghostwhite,
  },
  CustomSendcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    //paddingHorizontal: 20,
  },
  CustomInputToolbarcontainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0,
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  CustomInputToolbarprimary: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.dodgerblue,
  },
  Bubble: {
    backgroundColor:colors.dodgerblue,
  },
  TrippleToggle:{
    position:'absolute',
    left:144,
    bottom: 20,
  },
  CustomTextinputStyle:{
    color:colors.black,
  },
});

export const DarkTheme = StyleSheet.create({
  
  MainScreenContainer:{
    backgroundColor:colors.BluishBlack,
  },
  HeaderContainer: {
    width: 57,
    height: 58,
  },
  appTitle: {
    textTransform: 'capitalize',
    fontWeight: 'bold', 
    fontFamily: 'Touche_Semibold',
    fontSize: 22,
    color: colors.ghostwhite,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 250
  },
  HeadertabBarBackgroundColor:{
    backgroundColor:colors.black,
  },
  HeaderIcon:{
    color:colors.ghostwhite,
    fontSize:25,
  },
  HeaderImage: {
    marginTop:8,
    marginRight:12,
    width: 41,
    height: 41,
    borderWidth: 0,
    borderColor: colors.black,
    borderRadius: 1500,
  },
  ListItemStyle:{
    height:80,
    borderBottomWidth:1,
    borderBottomColor:colors.black,
  },
  headerBackgroundColor: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.black,
  },
  // Tabs
  tabBarUnderLine: {
    height: 3,
    backgroundColor: colors.ghostwhite,
  },
  badge: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.ghostwhite,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    height: 24,
  },
  lastmessagetime: {
    fontFamily: 'Touche_Semibold',
    color: colors.ghostwhite,
  },
  badgeText: {
    fontFamily: 'Touche_Semibold',
    color: colors.black,
    fontSize: 12,
    fontWeight:'bold',
  },
  tabsText: {
    fontFamily: 'Touche_Semibold',
    fontSize: 14, 
    fontWeight: 'bold', 
    color: colors.grey,
  },
  //Chat Screen
  chatListName:{
    textTransform: 'capitalize',
    fontFamily: 'Touche_Semibold',
    fontWeight: '400', 
    fontSize: 18,
    color:colors.ghostwhite,
  },
  chatListNote:{
    fontFamily: 'Touche_Medium',
    color:colors.grey,
  },
  badgeChats: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.ghostwhite,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    height: 24,
    marginTop: 4,
  },
  badgeTextChats: {
    fontFamily: 'Touche_Semibold',
    fontWeight: 'bold',
    color: colors.black,
    fontSize: 12,
  },
  fabColor: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.black,
  },
  // Status Screen
  listItemDivider: {
    fontFamily: 'Touche_Semibold',
    marginTop: 10, 
    height: 10
  },
  GiftedChatContainer: {
    backgroundColor:colors.BluishBlack,
  },
  CustomMessageTextleft: {
    color:colors.white,
    fontFamily: 'Touche_Medium',
  },
  CustomMessageTextright: {
    color:colors.white,
    fontFamily: 'Touche_Medium',
  },
  CustomBubblercontainer: {
    flex: 1
  },
  CustomBubblerright: {
    marginVertical: 4,
    backgroundColor: colors.black,
  },
  CustomSendcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  CustomInputToolbarcontainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0,
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  CustomInputToolbarprimary: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.black,
  },
  Bubble: {
    backgroundColor:colors.black,
  },
  TrippleToggle:{
    position:'absolute',
    left:144,
    bottom: 20,
  },
  CustomTextinputStyle:{
    color:colors.white,
  },
});
