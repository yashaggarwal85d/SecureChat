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

import { MaterialIcons } from "@expo/vector-icons";
import * as color from "../constants/colors";
import { socket, CheckOnline } from "../store/reducers/Socket";

export default class ChatHeader extends Component {
  constructor(props) {
    super(props);
    var secondUser = null;
    if (!this.props.room.isGroup) {
      this.props.room.members.forEach((member) => {
        if (this.props.user.id !== member.id) {
          secondUser = member.id;
          CheckOnline(this.props.user.token, secondUser);
        }
      });
    }
    this.state = {
      online: false,
      secondUser: secondUser,
    };
  }

  componentDidMount = () => {
    if (!this.props.room.isGroup) {
      socket.on("online", async (userId) => {
        if (userId === this.state.secondUser) this.setState({ online: true });
      });
      socket.on("offline", async (userId) => {
        if (userId === this.state.secondUser) this.setState({ online: false });
      });
    }
  };

  render() {
    var note = (
      <Text numberOfLines={1} style={this.props.appStyles.ChatHeaderNote}>
        {this.props.room.description}
      </Text>
    );
    var button = <></>;
    if (this.state.online)
      note = (
        <Text
          numberOfLines={1}
          style={this.props.appStyles.ChatHeaderNoteOnline}
        >
          Online
        </Text>
      );
    if (this.props.room.isGroup)
      button = (
        <Button
          icon
          transparent
          onPress={() => {
            this.props.navigation.navigate({
              routeName: "RoomSettingsScreen",
              params: {
                room: this.props.room,
              },
            });
          }}
        >
          <MaterialIcons name='more-vert' size={22} color={color.grey} />
        </Button>
      );
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
            <MaterialIcons name='arrow-back' size={22} color={color.grey} />
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
          {note}
        </Body>

        <Right>{button}</Right>
      </Header>
    );
  }
}
