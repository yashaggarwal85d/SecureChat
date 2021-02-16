import React, { Component } from "react";
import { Header, Title, Body } from "native-base";
import { LightTheme } from "../../appStyles";
import ChatScreenComponent from "./LightChatList";
import { fillData } from "../../store/actions/RoomActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import ActionButton from "../../components/FloatBar";

class LightChatScreen extends Component {
  constructor(props) {
    super(props);
    this.props.fillData();
  }
  render() {
    return (
      <>
        <Header style={LightTheme.HeaderContainer}>
          <Body>
            <Title style={LightTheme.appTitle}>Chats</Title>
          </Body>
        </Header>

        <ChatScreenComponent
          navigation={this.props.navigation}
          appStyles={LightTheme}
        />
        {/* <ActionButton /> */}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LightChatScreen);
