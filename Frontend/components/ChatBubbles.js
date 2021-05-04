import React, { Component } from "react";
import { Text, View, Left, Header, Button, Body } from "native-base";
import { FlatList, Image, TouchableOpacity, Modal } from "react-native";
import moment from "moment";
import { socket } from "../store/reducers/Socket";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import * as color from "../constants/colors";

class ChatBubble extends Component {
  constructor(props) {
    super(props);
    this.messages = null;
    this.state = {
      sent: false,
      visible: false,
      read: false,
    };
  }

  componentDidMount() {
    socket.on("disconnect", () => {
      this.setState({ sent: false });
    });
    socket.on("confirmSend", async (message, roomId) => {
      this.setState({ sent: true });
    });
    socket.on("bluetick", async (roomId) => {
      if (roomId === this.props.roomId) {
        this.setState({ read: true });
        this.markRead();
      }
    });
  }

  markRead() {
    for (var message of this.messages) {
      message.read = true;
    }
    this.setState({ read: false });
  }

  renderGridItem = (itemData) => {
    if (itemData.item.isPrompt) {
      return (
        <View style={this.props.appStyles.PromptMessageView}>
          <Text style={this.props.appStyles.PromptMessage}>
            {itemData.item.message_body}
          </Text>
        </View>
      );
    } else {
      const time = moment(itemData.item.timestamp).format("h:mm");
      if (itemData.item.sender_id === this.props.userId) {
        var icon = "clock-outline";
        var message_body = (
          <Text style={this.props.appStyles.ChatBubbleText}>
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
                  resizeMode: "contain",
                }}
                source={{
                  uri: itemData.item.ImageData,
                }}
              />
            </TouchableOpacity>
          );
        }

        if (itemData.item._id) {
          icon = "check-all";
        } else if (this.state.sent) {
          icon = "check-all";
          itemData.item._id = true;
          this.setState({ sent: false });
        }
        if (itemData.item.read) {
          return (
            <View style={this.props.appStyles.ChatBubbleView}>
              {message_body}
              <Text style={this.props.appStyles.ChatBubbleNote}>{time}</Text>
              <MaterialCommunityIcons
                name={icon}
                style={this.props.appStyles.ChatBubbleNoteIconBlue}
              />
            </View>
          );
        } else {
          return (
            <View style={this.props.appStyles.ChatBubbleView}>
              {message_body}
              <Text style={this.props.appStyles.ChatBubbleNote}>{time}</Text>
              <MaterialCommunityIcons
                name={icon}
                style={this.props.appStyles.ChatBubbleNoteIcon}
              />
            </View>
          );
        }
      } else {
        var message_body = (
          <Text style={this.props.appStyles.ChatBubbleLeftText}>
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
                  resizeMode: "contain",
                }}
                source={{
                  uri: itemData.item.ImageData,
                }}
              />
            </TouchableOpacity>
          );
        }

        if (
          (!this.messages[itemData.index + 1] ||
            this.messages[itemData.index + 1].sender_id !==
              itemData.item.sender_id ||
            this.messages[itemData.index + 1].isPrompt) &&
          this.props.isGroup
        ) {
          var name;
          const memIndex = this.props.members.findIndex(
            (mem) =>
              mem.id === itemData.item.sender_id ||
              mem.details._id === itemData.item.sender_id
          );
          name = this.props.members[memIndex].details.name;
          return (
            <View style={this.props.appStyles.ChatBubbleLeftView}>
              <Text style={this.props.appStyles.ChatBubbleLeftViewName}>
                {name}
              </Text>
              <View style={{ flexDirection: "row" }}>
                {message_body}
                <Text style={this.props.appStyles.ChatBubbleLeftNote}>
                  {time}
                </Text>
              </View>
            </View>
          );
        } else {
          return (
            <View style={this.props.appStyles.ChatBubbleLeftView}>
              <View style={{ flexDirection: "row" }}>
                {message_body}
                <Text style={this.props.appStyles.ChatBubbleLeftNote}>
                  {time}
                </Text>
              </View>
            </View>
          );
        }
      }
    }
  };
  render() {
    var readIndex = 0;
    if (this.props.dark) {
      this.messages = this.props.messages
        .filter((message) => !message.isPrompt)
        .slice()
        .reverse();
    } else if (!this.props.isGroup) {
      for (var member of this.props.members) {
        if (member.id !== this.props.userId)
          readIndex = member.lastMessageReadIndex;
      }

      this.messages = this.props.messages.slice();
      for (var message of this.messages) {
        if (readIndex !== 0) {
          message.read = true;
          readIndex--;
        }
      }
      this.messages.reverse();
    } else {
      this.messages = this.props.messages.slice().reverse();
    }
    const imagesObj = this.props.messages.filter((msg) => {
      return msg.isImage;
    });
    const indexInit = imagesObj.length - 1;
    const images = [];
    for (const img of imagesObj) {
      images.push({ url: img.ImageData });
    }
    return (
      <>
        <FlatList
          inverted
          keyExtractor={(item, index) => "key" + index}
          data={this.messages}
          renderItem={this.renderGridItem}
          numColumns={1}
          style={this.props.appStyles.ChatBubblesList}
        />
        <Modal visible={this.state.visible} transparent={true}>
          <Header style={this.props.appStyles.FlatListComponent}>
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
            backgroundColor={
              this.props.appStyles.FlatListComponent.backgroundColor
            }
            useNativeDriver={true}
            index={indexInit}
            imageUrls={images}
          />
        </Modal>
      </>
    );
  }
}

export default ChatBubble;
