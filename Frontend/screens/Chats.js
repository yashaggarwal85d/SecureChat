import React from 'react';
import { Container } from 'native-base';
import ChatHeader from '../components/ChatHeader';
import ChatBubbles from '../components/ChatBubbles';
import ChatFooter from '../components/ChatFooter';
import PullMsg from '../components/PullMsg';
import { connect } from 'react-redux';
import { addMessage } from '../store/actions/RoomActions';
import {
  socket,
  SendMessage,
  addPromptMessage,
  addImageMessage,
} from '../store/reducers/Socket';
import { bindActionCreators } from 'redux';
import { ImageBackground } from 'react-native';
import { ImageBg } from '../appStyles';

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
    socket.on('recieveMessage', (message, roomId) => {
      if (roomId === this.state.room.id)
        this.setState({ room: this.getRoom() });
    });
    socket.on('PullMessages', (roomId, obj) => {
      if (roomId === this.state.room.id)
        this.setState({ room: this.getRoom() });
    });
    socket.on('removeRoom', async (roomId) => {
      if (roomId === this.state.room.id) {
        this.props.navigation.navigate('MainScreen');
      }
    });
    socket.on('ResetRoom', async (roomId, members, messages) => {
      if (roomId === this.state.room.id)
        this.setState({ room: this.getRoom() });
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
  };

  sendImageMessage(message) {
    addImageMessage(this.state.room.id, this.props.user.token, message);
    const messageObject = {
      isImage: true,
      sender_id: this.props.user.id,
      message_body: '📷 Image',
      timer: true,
      ImageData: message,
    };
    this.updateImageState(messageObject);
  }

  render() {
    var source = require(`../assets/Background.jpg`);
    if (this.state.room.dark) source = require(`../assets/DarkBackground.jpg`);
    const { state } = this.props.navigation;
    return (
      <Container style={state.params.appStyles.ChatMainContainer}>
        <ImageBackground
          source={source}
          resizeMode='cover'
          style={ImageBg.ImageBack}
        >
          <ChatHeader
            {...this.props}
            room={this.state.room}
            appStyles={state.params.appStyles}
            user={this.props.user}
            onPromptSend={this.sendPromptMessage.bind(this)}
          />
          <PullMsg
            {...this.props}
            room={this.state.room}
            PullMsg={this.state.room.PullMessage}
            appStyles={state.params.appStyles}
          />
          <ChatBubbles
            {...this.props}
            roomId={this.state.room.id}
            messages={this.state.room.messages}
            userId={this.props.user.id}
            appStyles={state.params.appStyles}
            isGroup={this.state.room.isGroup}
            members={this.state.room.members}
            dark={this.state.room.dark}
          />
          <ChatFooter
            {...this.props}
            room={this.state.room}
            onSend={this.sendMessage.bind(this)}
            onImageSend={this.sendImageMessage.bind(this)}
            appStyles={state.params.appStyles}
          />
        </ImageBackground>
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
