import React, { Component } from "react";
import { Header, Title, Body } from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import LightChatScreen from "./ChatList";
import { LightTheme } from "../../appStyles";
import ActionButton from "../../components/FloatBar";

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
        <ActionButton />
        {/* <Footer style={LightTheme.Footer}>
            <FooterTab style={LightTheme.FooterTab}>
                <Button style={this.state.chatButton} onPress={() => this.renderchat()}>
                    <MaterialCommunityIcons name='message'style={this.state.chatIcon}/>
                </Button>
                <Button style={this.state.groupButton} onPress={() => this.rendergroup()}>
                    <MaterialIcons name='group' style={this.state.groupIcon}/>
                </Button>
                <Button style={LightTheme.FooterTab}>
                    <MaterialIcons name='search' style={LightTheme.FooterIcons}/>
                </Button>
                <Button style={LightTheme.FooterTab}>
                    <MaterialIcons name='settings' style={LightTheme.FooterIcons}/>
                </Button>
            </FooterTab>
        </Footer> */}
      </>
    );
  }
}
