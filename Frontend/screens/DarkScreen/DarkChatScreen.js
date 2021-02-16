import React, { Component } from "react";
import { Header, Title, Body } from "native-base";
import { DarkTheme } from "../../appStyles";
import ChatScreenComponent from "./DarkChatList";

export default class DarkChatHeader extends Component {
  render() {
    return (
      <>
        <Header style={DarkTheme.HeaderContainer}>
          <Body>
            <Title style={DarkTheme.appTitle}>Chats</Title>
          </Body>
        </Header>

        <ChatScreenComponent
          navigation={this.props.navigation}
          appStyles={DarkTheme}
        />
      </>
    );
  }
}
