import React, { Component } from "react";
import { Header, Title, Button, Body, Footer, FooterTab } from "native-base";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import DarkChatScreen from "./ChatList";
import { DarkTheme } from "../../appStyles";

export default class DarkChatHeader extends Component {
  render() {
    return (
      <>
        <Header style={DarkTheme.HeaderContainer}>
          <Body>
            <Title style={DarkTheme.appTitle}>Chats</Title>
          </Body>
        </Header>

        <DarkChatScreen
          navigation={this.props.navigation}
          appStyles={DarkTheme}
        />
      </>
    );
  }
}
