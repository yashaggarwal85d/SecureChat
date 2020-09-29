import {StyleSheet} from 'react-native';
import * as colors from './constants/colors';

export default StyleSheet.create({
  //Common Style
  appTitle: {
    textTransform: 'capitalize',
    fontWeight: 'bold', 
    fontFamily: 'Touche_Semibold',
    fontSize: 22,
    color: 'black',
  },
  image: {
    marginTop:15,
    marginLeft:5,
    //marginRight:15,
    width: 41,
    height: 41,
    borderWidth: 0,
    borderColor: colors.dodgerblue,
    borderRadius: 1500,
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
    color: 'grey',
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
    color: 'snow',
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
  
});