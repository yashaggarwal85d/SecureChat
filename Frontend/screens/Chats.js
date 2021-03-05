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
    this.state = {
      room: this.getRoom(),
    };
  }

  componentWillUnmount = async () => {
    const { state } = this.props.navigation;
    state.params.UpdateActiveRoom(null);
  };

  getRoom = () => {
    const { state } = this.props.navigation;
    const OpenRoom = this.props.rooms.find(
      (room) => room.id === state.params.id
    );
    return OpenRoom;
  };

  componentDidMount = () => {
    socket.on("recieveMessage", (message, roomId) => {
      if (roomId === this.state.room.id)
        this.setState({ room: this.getRoom() });
    });
    socket.on("removeRoom", async (roomId) => {
      if (roomId === this.state.room.id) {
        this.props.navigation.navigate("MainScreen");
        alert(`you have been remove from ${this.state.room.name}`);
      }
    });
  };

  updateState = async (message) => {
    const { state } = this.props.navigation;
    await this.props.addMessage(this.state.room.id, message);
    this.setState({ room: this.getRoom() });
    state.params.UpdateComponent();
  };

  sendMessage(message) {
    SendMessage(this.state.room.id, this.props.user.token, message);
    const messageObject = {
      sender_id: this.props.user.id,
      message_body: message,
      timer: true,
    };
    this.updateState(messageObject);
  }

  updatePromptState = async (message) => {
    const { state } = this.props.navigation;
    await this.props.addMessage(this.state.room.id, message);
    this.setState({ room: this.getRoom() });
    state.params.UpdateComponent();
  };

  sendPromptMessage(message) {
    SendMessage(this.state.room.id, this.props.user.token, message);
    const messageObject = {
      sender_id: this.props.user.id,
      message_body: message,
      timer: true,
    };
    this.updatePromptState(messageObject);
  }

  updateImageState = async (message) => {
    const { state } = this.props.navigation;
    await this.props.addMessage(this.state.room.id, message);
    this.setState({ room: this.getRoom() });
    state.params.UpdateComponent();
  };

  sendImageMessage(message) {
    SendMessage(this.state.room.id, this.props.user.token, message);
    const messageObject = {
      sender_id: this.props.user.id,
      message_body: message,
      timer: true,
    };
    this.updateImageState(messageObject);
  }

  updateFileState = async (message) => {
    const { state } = this.props.navigation;
    await this.props.addMessage(this.state.room.id, message);
    this.setState({ room: this.getRoom() });
    state.params.UpdateComponent();
  };

  sendFileMessage(message) {
    SendMessage(this.state.room.id, this.props.user.token, message);
    const messageObject = {
      sender_id: this.props.user.id,
      message_body: message,
      timer: true,
    };
    this.updateFileState(messageObject);
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <Container style={state.params.appStyles.ChatMainContainer}>
        <ChatHeader
          {...this.props}
          room={this.state.room}
          appStyles={state.params.appStyles}
          user={this.props.user}
          onPromptSend={this.sendPromptMessage.bind(this)}
        />
        <ChatBubbles
          {...this.props}
          messages={this.state.room.messages}
          userId={this.props.user.id}
          appStyles={state.params.appStyles}
          isGroup={this.state.room.isGroup}
          members={this.state.room.members}
        />
        <ChatFooter
          {...this.props}
          onSend={this.sendMessage.bind(this)}
          onFileSend={this.sendFileMessage.bind(this)}
          onImageSend={this.sendImageMessage.bind(this)}
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
