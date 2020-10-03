import {StyleSheet} from 'react-native';
import * as colors from './constants/colors';

export const LightTheme= StyleSheet.create({
  
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
  addStatusIcon: {
    fontFamily: 'Touche_Semibold',
    color: colors.dodgerblue,
    alignSelf: 'flex-end',
    position: 'absolute',
    marginLeft: 40,
    bottom: -5,
    width: 20,
    fontSize: 20,
  },
  // Call Screen
  callIcon: {
    fontFamily: 'Touche_Semibold',
    marginRight: 10,
    fontSize: 18,
  },
  CustomMessageTextleft: {
      color:colors.black,
      fontFamily: 'Kamerik-Bold',
  },
  CustomMessageTextright: {
      color:colors.black,
      fontFamily: 'Kamerik-Bold',
  },
  CustomBubblercontainer: {
    flex: 1
  },
  CustomBubblerright: {
    marginVertical: 4,
    backgroundColor: colors.dodgerblue,
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
    left: 144,
    bottom: 20,
  }
});

export const MediumTheme= StyleSheet.create({
  
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
    width: 57,
    height: 58,
    backgroundColor: "rgba(15,15, 15,1)",
    borderWidth: 2,
    borderColor: "rgba(63,161,200,1)",
    borderRadius: 100
  },
  HeaderIcon:{
    color:colors.black,
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
  headerBackgroundColor: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.grey,
  },
  // Tabs
  tabBarUnderLine: {
    height: 2,
    backgroundColor: colors.black,
  },
  badge: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.black,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    height: 24,
  },
  lastmessagetime: {
    fontFamily: 'Touche_Semibold',
    color: colors.black,
  },
  badgeText: {
    fontFamily: 'Touche_Semibold',
    color: colors.grey,
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
  },
  badgeChats: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.black,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    height: 24,
    marginTop: 4,
  },
  badgeTextChats: {
    fontFamily: 'Touche_Semibold',
    color: colors.grey,
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
  addStatusIcon: {
    fontFamily: 'Touche_Semibold',
    color: colors.black,
    alignSelf: 'flex-end',
    position: 'absolute',
    marginLeft: 40,
    bottom: -5,
    width: 20,
    fontSize: 20,
  },
  // Call Screen
  callIcon: {
    fontFamily: 'Touche_Semibold',
    marginRight: 10,
    fontSize: 18,
  },
  CustomMessageTextleft: {
      color:colors.black,
      fontFamily: 'Kamerik-Bold',
  },
  CustomMessageTextright: {
      color:colors.black,
      fontFamily: 'Kamerik-Bold',
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
    borderColor: colors.black,
  },
  Bubble: {
    backgroundColor:colors.black,
  },
  TrippleToggle:{
    left: 144,
    bottom: 20,
  }
})
export const DarkTheme = StyleSheet.create({
  
  MainScreenContainer: {
    overflow:"hidden",
  },
  appTitle: {
    textTransform: 'capitalize',
    fontWeight: 'bold', 
    fontFamily: 'Touche_Semibold',
    fontSize: 22,
    color: colors.ghostwhite,
  },
  image: {
    marginTop:15,
    marginLeft:5,
    //marginRight:15,
    width: 41,
    height: 41,
    borderRadius: 250,
    borderColor: colors.black,
    borderWidth: 0,
    backgroundColor:colors.black,
  },
  HeaderIcon:{
    color:colors.black,
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
  headerBackgroundColor: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.black,
  },
  // Tabs
  tabBarUnderLine: {
    height: 2,
    backgroundColor: colors.black,
  },
  badge: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.black,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    height: 24,
  },
  lastmessagetime: {
    fontFamily: 'Touche_Semibold',
    color: colors.black,
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
  },
  badgeChats: {
    fontFamily: 'Touche_Semibold',
    backgroundColor: colors.black,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    height: 24,
    marginTop: 4,
  },
  badgeTextChats: {
    fontFamily: 'Touche_Semibold',
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
  addStatusIcon: {
    fontFamily: 'Touche_Semibold',
    color: colors.black,
    alignSelf: 'flex-end',
    position: 'absolute',
    marginLeft: 40,
    bottom: -5,
    width: 20,
    fontSize: 20,
  },
  // Call Screen
  callIcon: {
    fontFamily: 'Touche_Semibold',
    marginRight: 10,
    fontSize: 18,
  },
  CustomMessageTextleft: {
      color:colors.ghostwhite,
      fontFamily: 'Kamerik-Bold',
  },
  CustomMessageTextright: {
      color:colors.ghostwhite,
      fontFamily: 'Kamerik-Bold',
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
    borderColor: colors.black,
  },
  Bubble: {
    backgroundColor:colors.black,
  },
  TrippleToggle:{
    left: 144,
    bottom: 20,
  }
});