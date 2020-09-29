import React from 'react';
import { MessageText } from 'react-native-gifted-chat';
import * as styles from '../../appStyles';

const CustomMessageText = messageTextProps => (
  <MessageText
    {...messageTextProps}
    textStyle={{
      left: styles.CustomMessageTextleft,
      right: styles.CustomMessageTextright
    }}
  />
);

export default CustomMessageText;