import React from 'react';
import { InputToolbar } from 'react-native-gifted-chat';
import * as styles from '../../appStyles';
import { AntDesign,Entypo } from '@expo/vector-icons';
import * as color from '../../constants/colors';

const CustomInputToolbar = inputToolbarProps => (
  <InputToolbar
    {...inputToolbarProps}
    containerStyle={styles.CustomInputToolbarcontainer}
    primaryStyle={styles.CustomInputToolbarprimary}
  >
    <AntDesign name='arrowleft' size={25} color={color.dodgerblue} />
      
  </InputToolbar>
);

export default CustomInputToolbar;