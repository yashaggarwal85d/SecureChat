import React, { Component } from "react";
import { Text, View } from "native-base";
import { FlatList } from "react-native";
import moment from "moment";

class ChatBubble extends Component {
  constructor(props) {
    super(props);
  }

  renderGridItem = (itemData) => {
    const time = moment(itemData.item.timestamp).format("h:mm");
    if (itemData.item.sender_id !== this.props.userId) {
      return (
        <View style={this.props.appStyles.ChatBubbleLeftView}>
          <Text style={this.props.appStyles.ChatBubbleLeftText}>
            {itemData.item.message_body}
          </Text>
          <Text style={this.props.appStyles.ChatBubbleLeftNote}>{time}</Text>
        </View>
      );
    } else {
      return (
        <View style={this.props.appStyles.ChatBubbleView}>
          <Text style={this.props.appStyles.ChatBubbleText}>
            {itemData.item.message_body}
          </Text>
          <Text style={this.props.appStyles.ChatBubbleNote}>{time}</Text>
        </View>
      );
    }
  };
  render() {
    const reverseMessages = this.props.messages.slice().reverse();
    return (
      <FlatList
        inverted
        keyExtractor={(item) => item._id}
        data={reverseMessages}
        renderItem={this.renderGridItem}
        numColumns={1}
        style={this.props.appStyles.ChatBubblesList}
      />
    );
  }
}

export default ChatBubble;
