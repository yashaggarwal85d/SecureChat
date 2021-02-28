import React, { Component } from "react";
import { Header, Title, Body } from "native-base";
import { LightTheme } from "../../appStyles";
import ChatScreenComponent from "./LightChatList";
import ActionButton from "../../components/FloatBar";

class LightChatScreen extends Component {
  render() {
    return (
      <>
        <Header style={LightTheme.HeaderContainer}>
          <Body>
            <Title style={LightTheme.appTitle}>Chats</Title>
          </Body>
        </Header>

        <ChatScreenComponent navigation={this.props.navigation} />
        <ActionButton navigation={this.props.navigation} />
      </>
    );
  }
}

export default LightChatScreen;
