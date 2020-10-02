import React from 'react';
import { Send } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';
import * as colors from '../../constants/colors';
import { LightTheme,DarkTheme, MediumTheme } from '../../appStyles';

const appStyles = LightTheme;
const CustomSend = sendProps => (
  <Send
    {...sendProps}
    containerStyle={appStyles.CustomSendcontainer}
    >
    <MaterialIcons
      name='send'
      size={24}
      color={colors.dodgerblue}
    />
  </Send>
);

export default CustomSend;