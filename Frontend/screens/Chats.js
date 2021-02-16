import React from "react";
import { Container } from "native-base";
import ChatHeader from "../components/ChatHeader";
import ChatBubbles from "../components/ChatBubbles";
import ChatFooter from "../components/ChatFooter";
import { connect } from "react-redux";
import { addMessage } from "../store/actions/RoomActions";
import { SendMessage } from "../store/reducers/Socket";
import { bindActionCreators } from "redux";
import { socket } from "../store/reducers/Socket";

class PresentChatScreen extends React.Component {
  constructor(props) {
    super(props);
    const { state } = this.props.navigation;
    const OpenRoom = this.props.rooms.find(
      (room) => room.id === state.params.id
    );
    this.state = {
      room: OpenRoom,
    };
  }

  componentDidMount = () => {
    socket.on("recieveMessage", async (message, roomId) => {
      const { state } = this.props.navigation;
      const OpenRoom = this.props.rooms.find(
        (room) => room.id === state.params.id
      );
      this.setState({ room: OpenRoom });
    });
  };

  updateState = async (message) => {
    const { state } = this.props.navigation;
    const OpenRoom = this.props.rooms.find(
      (room) => room.id === state.params.id
    );
    this.setState({ room: OpenRoom });

    await this.props.addMessage(this.state.room.id, message);
  };

  sendMessage(message) {
    SendMessage(this.state.room.id, this.props.user.token, message);
    const messageObject = {
      sender_id: this.props.user.id,
      message_body: message,
    };
    this.updateState(messageObject);
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <Container style={state.params.appStyles.ChatMainContainer}>
        <ChatHeader
          {...this.props}
          room={this.state.room}
          appStyles={state.params.appStyles}
        />
        <ChatBubbles
          {...this.props}
          messages={this.state.room.messages}
          userId={this.props.user.id}
          appStyles={state.params.appStyles}
        />
        <ChatFooter
          {...this.props}
          onSend={this.sendMessage.bind(this)}
          appStyles={state.params.appStyles}
        />
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addMessage }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    rooms: state.room.rooms,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PresentChatScreen);
