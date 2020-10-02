import React, {Component} from 'react';
import {
  Header,
  Title,
  Button,
  Right,
  Body,
  Left
} from 'native-base';

import { Image } from 'react-native';
import { LightTheme,DarkTheme, MediumTheme } from '../appStyles';
import { AntDesign,Entypo } from '@expo/vector-icons';
import * as color from '../constants/colors';

export default class ChatHeader extends Component {
  
  render() {
    const appStyles = LightTheme;
    return (
      <Header style={appStyles.headerBackgroundColor}>
        <Left>
          <Button icon transparent onPress={() => {
              this.props.navigation.goBack();
            }}>
            <AntDesign name='arrowleft' size={25} color={color.dodgerblue} />
          </Button>
            
        </Left>
        <Image
          source={{uri: this.props.ProfilePicUrl}}
          resizeMode="stretch"
          style={appStyles.HeaderImage}
        ></Image>
        
          <Body>
            <Title style={appStyles.appTitle}>{this.props.name}</Title>
          </Body>
          <Right>
            <Button icon transparent onPress={() => {
              this.props.navigation.navigate({routeName: 'Settings'});
            }}>
              <Entypo name="dots-three-vertical" size={25} color={color.dodgerblue} />
            </Button>
          </Right>
        </Header>
    );
  }
}