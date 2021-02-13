import React, { Component } from "react";
import { Text, View } from "native-base";
import { useSelector } from "react-redux";
import { FlatList } from "react-native";

class ChatBubble extends Component {
  renderGridItem = (itemData) => {
    if (itemData.item.sender !== this.props.userId) {
      return (
        <View style={this.props.appStyles.ChatBubbleLeftView}>
          <Text style={this.props.appStyles.ChatBubbleLeftText}>
            {itemData.item.message}
          </Text>
          <Text style={this.props.appStyles.ChatBubbleLeftNote}>
            {itemData.item.time}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={this.props.appStyles.ChatBubbleView}>
          <Text style={this.props.appStyles.ChatBubbleText}>
            {itemData.item.message}
          </Text>
          <Text style={this.props.appStyles.ChatBubbleNote}>
            {itemData.item.time}
          </Text>
        </View>
      );
    }
  };
  render() {
    return (
      <FlatList
        keyExtractor={(item) => item.id}
        data={this.props.Chats}
        renderItem={this.renderGridItem}
        numColumns={1}
        style={this.props.appStyles.ChatBubblesList}
      />
    );
  }
}

const ChatBubbles = (props) => {
  // const Chats = useSelector(state => state.Chats.chats );
  return <ChatBubble {...props} Chats={[{ message: "hi", time: "6:30" }]} />;
};

export default ChatBubbles;
