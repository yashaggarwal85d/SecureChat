import React, { Component } from 'react';
import { Text, View, Left, Header, Button, Body } from 'native-base';
import { FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import moment from 'moment';
import { socket } from '../store/reducers/Socket';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';
import * as color from '../constants/colors';
import { connect } from 'react-redux';
import { LightTheme, DarkTheme } from '../appStyles';

class ChatBubble extends Component {
  constructor(props) {
    super(props);

    const memIndex = this.props.rooms[this.props.roomInd].members.findIndex(
      (mem) => mem.id !== this.props.user.id
    );
    this.state = {
      sent: false,
      visible: false,
      secondUserInd: memIndex,
    };
  }

  componentDidMount() {
    socket.on('disconnect', () => {
      this.setState({ sent: false });
    });
    socket.on('confirmSend', async (message, roomId) => {
      this.setState({ sent: true });
    });
  }

  renderGridItem = (itemData) => {
    var Theme = LightTheme;
    if (this.props.user.mode == 'dark') {
      Theme = DarkTheme;
    }

    if (itemData.item.isPrompt) {
      return (
        <View style={Theme.PromptMessageView}>
          <Text style={Theme.PromptMessage}>{itemData.item.message_body}</Text>
        </View>
      );
    } else {
      const time = moment(itemData.item.timestamp).format('h:mm');
      if (itemData.item.sender_id === this.props.user.id) {
        var icon = 'clock-outline';
        var message_body = (
          <Text style={Theme.ChatBubbleText}>{itemData.item.message_body}</Text>
        );
        if (itemData.item.isImage) {
          message_body = (
            <TouchableOpacity onPress={() => this.setState({ visible: true })}>
              <Image
                style={{
                  width: 200,
                  maxHeight: 400,
                  minHeight: 200,
                  resizeMode: 'contain',
                }}
                source={{
                  uri: itemData.item.ImageData,
                }}
              />
            </TouchableOpacity>
          );
        }

        if (itemData.item._id) {
          icon = 'check-all';
        } else if (this.state.sent) {
          icon = 'check-all';
          itemData.item._id = true;
          this.setState({ sent: false });
        }
        if (
          !this.props.rooms[this.props.roomInd].isGroup &&
          this.props.rooms[this.props.roomInd].members[this.state.secondUserInd]
            .lastMessageReadIndex >=
            this.props.rooms[this.props.roomInd].messages.length -
              itemData.index
        ) {
          return (
            <View style={Theme.ChatBubbleView}>
              {message_body}
              <Text style={Theme.ChatBubbleNote}>{time}</Text>
              <MaterialCommunityIcons
                name={icon}
                style={Theme.ChatBubbleNoteIconBlue}
              />
            </View>
          );
        } else {
          return (
            <View style={Theme.ChatBubbleView}>
              {message_body}
              <Text style={Theme.ChatBubbleNote}>{time}</Text>
              <MaterialCommunityIcons
                name={icon}
                style={Theme.ChatBubbleNoteIcon}
              />
            </View>
          );
        }
      } else {
        var message_body = (
          <Text style={Theme.ChatBubbleLeftText}>
            {itemData.item.message_body}
          </Text>
        );
        if (itemData.item.isImage) {
          message_body = (
            <TouchableOpacity onPress={() => this.setState({ visible: true })}>
              <Image
                style={{
                  width: 200,
                  maxHeight: 400,
                  minHeight: 200,
                  resizeMode: 'contain',
                }}
                source={{
                  uri: itemData.item.ImageData,
                }}
              />
            </TouchableOpacity>
          );
        }

        if (
          (!this.props.rooms[this.props.roomInd].messages.slice().reverse()[
            itemData.index + 1
          ] ||
            this.props.rooms[this.props.roomInd].messages.slice().reverse()[
              itemData.index + 1
            ].sender_id !== itemData.item.sender_id ||
            this.props.rooms[this.props.roomInd].messages.slice().reverse()[
              itemData.index + 1
            ].isPrompt) &&
          this.props.rooms[this.props.roomInd].isGroup
        ) {
          var name;
          const memIndex = this.props.rooms[
            this.props.roomInd
          ].members.findIndex(
            (mem) =>
              mem.id === itemData.item.sender_id ||
              mem.details._id === itemData.item.sender_id
          );
          name =
            this.props.rooms[this.props.roomInd].members[memIndex].details.name;
          return (
            <View style={Theme.ChatBubbleLeftView}>
              <Text style={Theme.ChatBubbleLeftViewName}>{name}</Text>
              <View style={{ flexDirection: 'row' }}>
                {message_body}
                <Text style={Theme.ChatBubbleLeftNote}>{time}</Text>
              </View>
            </View>
          );
        } else {
          return (
            <View style={Theme.ChatBubbleLeftView}>
              <View style={{ flexDirection: 'row' }}>
                {message_body}
                <Text style={Theme.ChatBubbleLeftNote}>{time}</Text>
              </View>
            </View>
          );
        }
      }
    }
  };
  render() {
    var Theme = LightTheme;
    if (this.props.user.mode == 'dark') {
      Theme = DarkTheme;
    }

    const imagesObj = this.props.rooms[this.props.roomInd].messages.filter(
      (msg) => {
        return msg.isImage;
      }
    );
    const indexInit = imagesObj.length - 1;
    const images = [];
    for (const img of imagesObj) {
      images.push({ url: img.ImageData });
    }
    return (
      <>
        <FlatList
          inverted
          keyExtractor={(item, index) => 'key' + index}
          data={this.props.rooms[this.props.roomInd].messages.slice().reverse()}
          renderItem={this.renderGridItem}
          numColumns={1}
          style={Theme.ChatBubblesList}
        />
        <Modal visible={this.state.visible} transparent={true}>
          <Header style={Theme.FlatListComponent}>
            <Left>
              <Button
                icon
                transparent
                onPress={() => {
                  this.setState({ visible: false });
                }}
              >
                <MaterialIcons color={color.grey} name='arrow-back' size={22} />
              </Button>
            </Left>
            <Body />
          </Header>
          <ImageViewer
            backgroundColor={Theme.FlatListComponent.backgroundColor}
            useNativeDriver={true}
            index={indexInit}
            imageUrls={images}
          />
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
    user: state.user,
  };
};

export default connect(mapStateToProps)(ChatBubble);
