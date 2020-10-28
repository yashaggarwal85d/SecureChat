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
import { AntDesign,Entypo } from '@expo/vector-icons';
import * as color from '../constants/colors';

export default class ChatHeader extends Component {
  
  render() {
    return (
      <Header style={this.props.appStyles.headerBackgroundColor}>
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
          style={this.props.appStyles.HeaderImage}
        ></Image>
        
          <Body>
            <Title style={this.props.appStyles.appTitle}>{this.props.name}</Title>
          </Body>
          <Right>
            <Button icon transparent>
              <Entypo name="dots-three-vertical" size={25} color={color.dodgerblue} />
            </Button>
          </Right>
        </Header>
    );
  }
}