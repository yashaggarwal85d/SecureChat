import React, { Component } from "react";
import { Header, Title, Body } from "native-base";
import LightChatScreen from "./ChatList";
import { LightTheme } from "../../appStyles";
// import ActionButton from "../../components/FloatBar";

export default class LightChatHeader extends Component {
  render() {
    return (
      <>
        <Header style={LightTheme.HeaderContainer}>
          <Body>
            <Title style={LightTheme.appTitle}>Chats</Title>
          </Body>
        </Header>

        <LightChatScreen
          navigation={this.props.navigation}
          appStyles={LightTheme}
        />
        {/* <ActionButton /> */}
      </>
    );
  }
}
