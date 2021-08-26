import React from 'react';
import { Container } from 'native-base';
import ChatHeader from '../components/ChatHeader';
import ChatBubbles from '../components/ChatBubbles';
import ChatFooter from '../components/ChatFooter';
import PullMsg from '../components/PullMsg';
import { connect } from 'react-redux';
import {
  addMessage,
  updatelastMessageReadIndex,
} from '../store/actions/RoomActions';
import { updateActiveRoom } from '../store/actions/LoginActions';
import {
  socket,
  SendMessage,
  addPromptMessage,
  addImageMessage,
} from '../store/reducers/Socket';
import { bindActionCreators } from 'redux';
import { ImageBackground } from 'react-native';
import { ImageBg } from '../appStyles';
import { LightTheme, DarkTheme } from '../appStyles';
import { encrypt, encryptGroup } from '../store/Encryption';
class PresentChatScreen extends React.Component {
  constructor(props) {
    super(props);
    const room = this.getRoom();
    this.state = {
      roomInd: room.ind,
      secondUserPk: room.pk,
    };
  }

  componentWillUnmount = async () => {
    await this.props.updateActiveRoom(null);
  };

  getRoom = () => {
    const { state } = this.props.navigation;
    const OpenRoom = this.props.rooms.findIndex(
      (room) => room.id === state.params.id
    );
    var pk;
    for (const member of this.props.rooms[OpenRoom].members) {
      if (member.id != this.props.user.id) pk = member.details.pk;
    }
    return {
      ind: OpenRoom,
      pk: pk,
    };
  };

  updateState = async (message) => {
    await this.props.addMessage(
      this.props.rooms[this.state.roomInd].id,
      message,
      this.state.secondUserPk
    );
  };

  sendMessage(message) {
    if (this.props.rooms[this.state.roomInd].isGroup)
      message = encryptGroup(message, this.props.user.publicKey);
    else
      message = encrypt(
        message,
        this.state.secondUserPk,
        this.props.user.privateKey
      );
    SendMessage(
      this.props.rooms[this.state.roomInd].id,
      this.props.user.token,
      message,
      this.props.user.publicKey
    );
    const messageObject = {
      sender_id: this.props.user.id,
      message_body: message,
      timer: true,
      spk: this.props.user.publicKey,
    };
    this.updateState(messageObject);
  }

  updatePromptState = async (message) => {
    await this.props.addMessage(
      this.props.rooms[this.state.roomInd].id,
      message,
      this.state.secondUserPk
    );
  };

  sendPromptMessage(message) {
    // message = encrypt(message, this.props.user.publicKey);
    addPromptMessage(
      this.props.rooms[this.state.roomInd].id,
      this.props.user.token,
      message,
      this.props.user.publicKey
    );
    const messageObject = {
      isPrompt: true,
      sender_id: this.props.user.id,
      message_body: message,
      spk: this.props.user.publicKey,
      timer: true,
    };
    this.updatePromptState(messageObject);
  }

  updateImageState = async (message) => {
    await this.props.addMessage(
      this.props.rooms[this.state.roomInd].id,
      message,
      this.state.secondUserPk
    );
  };

  sendImageMessage(message) {
    if (this.props.rooms[this.state.roomInd].isGroup)
      message = encryptGroup(message, this.props.user.publicKey);
    else
      message = encrypt(
        message,
        this.state.secondUserPk,
        this.props.user.privateKey
      );
    addImageMessage(
      this.props.rooms[this.state.roomInd].id,
      this.props.user.token,
      message,
      this.props.user.publicKey
    );
    const messageObject = {
      isImage: true,
      sender_id: this.props.user.id,
      message_body: '📷 Image',
      timer: true,
      ImageData: message,
      spk: this.props.user.publicKey,
    };
    this.updateImageState(messageObject);
  }

  render() {
    var Theme = LightTheme;
    if (this.props.user.mode == 'dark') {
      Theme = DarkTheme;
    }

    var source = require(`../assets/Background.jpg`);
    if (this.props.rooms[this.state.roomInd].dark)
      source = require(`../assets/DarkBackground.jpg`);

    return (
      <Container style={Theme.ChatMainContainer}>
        <ImageBackground
          source={source}
          resizeMode='cover'
          style={ImageBg.ImageBack}
        >
          <ChatHeader
            navigation={this.props.navigation}
            roomInd={this.state.roomInd}
            onPromptSend={this.sendPromptMessage.bind(this)}
          />
          <PullMsg
            navigation={this.props.navigation}
            roomInd={this.state.roomInd}
          />
          <ChatBubbles
            navigation={this.props.navigation}
            roomInd={this.state.roomInd}
          />
          <ChatFooter
            navigation={this.props.navigation}
            roomInd={this.state.roomInd}
            onSend={this.sendMessage.bind(this)}
            onImageSend={this.sendImageMessage.bind(this)}
          />
        </ImageBackground>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { addMessage, updatelastMessageReadIndex, updateActiveRoom },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PresentChatScreen);
