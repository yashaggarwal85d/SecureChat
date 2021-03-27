import React from "react";
import { Container } from "native-base";
import ChatHeader from "../components/ChatHeader";
import ChatBubbles from "../components/ChatBubbles";
import ChatFooter from "../components/ChatFooter";
import { connect } from "react-redux";
import { addMessage } from "../store/actions/RoomActions";
import {
  socket,
  SendMessage,
  addPromptMessage,
  addImageMessage,
} from "../store/reducers/Socket";
import { bindActionCreators } from "redux";
import { ProgressBarAndroid } from "react-native";
import * as colors from "../constants/colors";

class PresentChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: this.getRoom(),
      loader: false,
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
    addPromptMessage(this.state.room.id, this.props.user.token, message);
    const messageObject = {
      isPrompt: true,
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
    this.updateLoader(false);
  };

  sendImageMessage(message) {
    addImageMessage(this.state.room.id, this.props.user.token, message);
    const messageObject = {
      isImage: true,
      sender_id: this.props.user.id,
      message_body: message,
      timer: true,
    };
    this.updateImageState(messageObject);
  }

  // updateFileState = async (message) => {
  //   const { state } = this.props.navigation;
  //   await this.props.addMessage(this.state.room.id, message);
  //   this.setState({ room: this.getRoom() });
  //   state.params.UpdateComponent();
  //   this.updateLoader(false);
  // };

  // sendFileMessage(message, FileName) {
  //   addFileMessage(
  //     this.state.room.id,
  //     this.props.user.token,
  //     message,
  //     FileName
  //   );
  //   const messageObject = {
  //     isFile: true,
  //     fileName: FileName,
  //     sender_id: this.props.user.id,
  //     message_body: message,
  //     timer: true,
  //   };
  //   this.updateFileState(messageObject);
  // }

  updateLoader(loader) {
    this.setState({ loader: loader });
  }

  render() {
    const { state } = this.props.navigation;
    var progress = <></>;
    if (this.state.loader) {
      progress = (
        <ProgressBarAndroid color={colors.dodgerblue} styleAttr='Horizontal' />
      );
    }
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
          dark={this.state.room.dark}
        />
        {progress}
        <ChatFooter
          {...this.props}
          room={this.state.room}
          onSend={this.sendMessage.bind(this)}
          // onFileSend={this.sendFileMessage.bind(this)}
          onImageSend={this.sendImageMessage.bind(this)}
          updateLoader={this.updateLoader.bind(this)}
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
