import React, { Component } from "react";
import {
  Header,
  Title,
  Button,
  Right,
  Body,
  Left,
  Text,
  Thumbnail,
} from "native-base";

import { Image } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as color from "../constants/colors";
import LightTheme from "../appStyles";

export default class ChatHeader extends Component {
  render() {
    return (
      <Header style={this.props.appStyles.ChatHeaderView}>
        <Left>
          <Button
            icon
            transparent
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={22} color={color.grey} />
          </Button>
        </Left>

        <Thumbnail
          style={this.props.appStyles.ChatHeaderImage}
          source={{ uri: this.props.room.profile_pic }}
        />

        <Body>
          <Title style={this.props.appStyles.ChatHeaderTitle}>
            {this.props.room.name}
          </Title>
          <Text style={this.props.appStyles.ChatHeaderNote}>Hey there !</Text>
        </Body>

        <Right>
          <Button icon transparent>
            <Entypo name="dots-three-vertical" size={22} color={color.grey} />
          </Button>
        </Right>
      </Header>
    );
  }
}
