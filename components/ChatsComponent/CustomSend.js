import React from 'react';
import { Send } from 'react-native-gifted-chat';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as colors from '../../constants/colors';
import { LightTheme,DarkTheme, MediumTheme } from '../../appStyles';

const appStyles = LightTheme;
const CustomSend = sendProps => (

  <Send
    {...sendProps}
    containerStyle={appStyles.CustomSendcontainer}
    >
    <MaterialCommunityIcons
      name='send-circle'
      size={50}
      color={colors.dodgerblue}
    />
  </Send>
  
);

export default CustomSend;