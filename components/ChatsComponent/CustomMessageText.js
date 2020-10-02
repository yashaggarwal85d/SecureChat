import React from 'react';
import { MessageText } from 'react-native-gifted-chat';
import { LightTheme,DarkTheme, MediumTheme } from '../../appStyles';

const appStyles = LightTheme;
const CustomMessageText = messageTextProps => (
  <MessageText
    {...messageTextProps}
    textStyle={{
      left: appStyles.CustomMessageTextleft,
      right: appStyles.CustomMessageTextright
    }}
  />
);

export default CustomMessageText;