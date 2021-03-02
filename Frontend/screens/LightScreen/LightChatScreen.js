import React, { Component } from "react";
import { Header, Title, Body } from "native-base";
import { LightTheme } from "../../appStyles";
import ChatScreenComponent from "./LightChatList";
import ActionButton from "../../components/FloatBar";
import { socket } from "../../store/reducers/Socket";
import { connect } from "react-redux";
import { fillData } from "../../store/actions/RoomActions";
import { bindActionCreators } from "redux";

class LightChatScreen extends Component {
  componentDidMount = async () => {
    socket.on("updateMembers", async () => {
      await this.props.fillData();
    });
  };

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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fillData }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    rooms: state.room.rooms,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LightChatScreen);
