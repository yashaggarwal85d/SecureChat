import React from 'react';
import { InputToolbar } from 'react-native-gifted-chat';
import { AntDesign,Entypo } from '@expo/vector-icons';
import * as color from '../../constants/colors';
import { LightTheme,DarkTheme, MediumTheme } from '../../appStyles';

const appStyles = LightTheme;
const CustomInputToolbar = inputToolbarProps => (
  <InputToolbar
    {...inputToolbarProps}
    containerStyle={appStyles.CustomInputToolbarcontainer}
    primaryStyle={appStyles.CustomInputToolbarprimary}
  >
    <AntDesign name='arrowleft' size={25} color={color.dodgerblue} />
      
  </InputToolbar>
);

export default CustomInputToolbar;