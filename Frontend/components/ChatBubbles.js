import React, { Component } from "react";
import { Text, View } from "native-base";
import { FlatList } from "react-native";
import moment from "moment";

class ChatBubble extends Component {
  constructor(props) {
    super(props);
    this.messages = null;
  }

  renderGridItem = (itemData) => {
    const time = moment(itemData.item.timestamp).format("h:mm");
    if (itemData.item.sender_id === this.props.userId) {
      return (
        <View style={this.props.appStyles.ChatBubbleView}>
          <Text style={this.props.appStyles.ChatBubbleText}>
            {itemData.item.message_body}
          </Text>
          <Text style={this.props.appStyles.ChatBubbleNote}>{time}</Text>
        </View>
      );
    } else {
      if (
        !this.messages[itemData.index + 1] ||
        (this.messages[itemData.index + 1].sender_id !==
          itemData.item.sender_id &&
          this.props.isGroup)
      ) {
        const name = this.props.members.find(
          (mem) => mem.id === itemData.item.sender_id
        ).details.name;
        return (
          <View style={this.props.appStyles.ChatBubbleLeftView}>
            <Text style={this.props.appStyles.ChatBubbleLeftViewName}>
              {name}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={this.props.appStyles.ChatBubbleLeftText}>
                {itemData.item.message_body}
              </Text>
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
              <Text style={this.props.appStyles.ChatBubbleLeftText}>
                {itemData.item.message_body}
              </Text>
              <Text style={this.props.appStyles.ChatBubbleLeftNote}>
                {time}
              </Text>
            </View>
          </View>
        );
      }
    }
  };
  render() {
    this.messages = this.props.messages.slice().reverse();
    return (
      <FlatList
        inverted
        keyExtractor={(item, index) => "key" + index}
        data={this.messages}
        renderItem={this.renderGridItem}
        numColumns={1}
        style={this.props.appStyles.ChatBubblesList}
      />
    );
  }
}

export default ChatBubble;
