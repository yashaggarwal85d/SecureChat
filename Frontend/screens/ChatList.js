import React, { Component } from "react";
import {
  Header,
  Title,
  ListItem,
  Thumbnail,
  Body,
  Right,
  Text,
  Badge,
} from "native-base";
import { FlatList } from "react-native";
import moment from "moment";

class ChatScreenComponent extends Component {
  constructor(props) {
    super(props);
  }

  renderGridItem = (itemData) => {
    const time = moment(itemData.item.lastTime).format("h:mm");
    const messagesCount =
      itemData.item.messages.length - itemData.item.lastMessageReadIndex;
    if (messagesCount && this.props.activeRoom !== itemData.item.id) {
      return (
        <ListItem
          noBorder={true}
          style={this.props.appStyles.ListItemStyle}
          avatar
          onPress={() => {
            this.props.navigation.navigate({
              routeName: "ChatScreen",
              params: {
                id: itemData.item.id,
                appStyles: this.props.appStyles,
                UpdateComponent: this.props.updateComponent.bind(this),
                UpdateActiveRoom: this.props.UpdateActiveRoom.bind(this),
              },
            });
            this.props.updatelastMessageReadIndex(itemData.item.id);
            this.props.UpdateActiveRoom(itemData.item.id);
          }}
        >
          <Thumbnail source={{ uri: itemData.item.profile_pic }} />

          <Body>
            <Text
              numberOfLines={1}
              style={this.props.appStyles.chatListActiveName}
            >
              {itemData.item.name}
            </Text>
            <Text
              numberOfLines={1}
              style={this.props.appStyles.chatListActiveNote}
              note
            >
              {itemData.item.lastMessage}
            </Text>
          </Body>
          <Right>
            <Text note style={this.props.appStyles.chatListActiveNote}>
              {time}
            </Text>
            <Badge style={this.props.appStyles.chatListBadge}>
              <Text style={this.props.appStyles.chatListBadgeText}>
                {messagesCount}
              </Text>
            </Badge>
          </Right>
        </ListItem>
      );
    } else {
      return (
        <ListItem
          noBorder={true}
          style={this.props.appStyles.ListItemStyle}
          avatar
          onPress={() => {
            this.props.navigation.navigate({
              routeName: "ChatScreen",
              params: {
                id: itemData.item.id,
                appStyles: this.props.appStyles,
                UpdateComponent: this.props.updateComponent.bind(this),
                UpdateActiveRoom: this.props.UpdateActiveRoom.bind(this),
              },
            });
            this.props.UpdateActiveRoom(itemData.item.id);
            this.props.updatelastMessageReadIndex(itemData.item.id);
          }}
        >
          <Thumbnail source={{ uri: itemData.item.profile_pic }} />

          <Body>
            <Text numberOfLines={1} style={this.props.appStyles.chatListName}>
              {itemData.item.name}
            </Text>
            <Text
              numberOfLines={1}
              style={this.props.appStyles.chatListNote}
              note
            >
              {itemData.item.lastMessage}
            </Text>
          </Body>
          <Right>
            <Text note style={this.props.appStyles.chatListNote}>
              {time}
            </Text>
          </Right>
        </ListItem>
      );
    }
  };

  render() {
    return (
      <>
        <Header style={this.props.appStyles.HeaderContainer}>
          <Body>
            <Title style={this.props.appStyles.appTitle}>Chats</Title>
          </Body>
        </Header>

        <FlatList
          keyExtractor={(item) => item.id}
          data={this.props.rooms}
          renderItem={this.renderGridItem}
          numColumns={1}
          style={this.props.appStyles.FlatListComponent}
        />
      </>
    );
  }
}

export default ChatScreenComponent;
