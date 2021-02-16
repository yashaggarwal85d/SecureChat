import React, { Component } from "react";
import { ListItem, Thumbnail, Body, Right, Text, Badge } from "native-base";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { addMessage } from "../store/actions/RoomActions";
import { bindActionCreators } from "redux";
import { socket } from "../store/reducers/Socket";

class ChatScreenComponent extends Component {
  componentDidMount = () => {
    socket.on("recieveMessage", async (message, roomId) => {
      await this.props.addMessage(roomId, message);
    });
  };

  renderGridItem = (itemData) => {
    if (itemData.item.active) {
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
              },
            });
          }}
        >
          <Thumbnail source={{ uri: ProfilePicUrl }} />

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
              {itemData.item.lastTime}
            </Text>
            <Badge style={this.props.appStyles.chatListBadge}>
              <Text style={this.props.appStyles.chatListBadgeText}>1</Text>
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
              },
            });
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
              {itemData.item.lastTime}
            </Text>
          </Right>
        </ListItem>
      );
    }
  };
  render() {
    return (
      <FlatList
        keyExtractor={(item) => item.id}
        data={this.props.CHATLIST}
        renderItem={this.renderGridItem}
        numColumns={1}
        style={this.props.appStyles.FlatListComponent}
      />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreenComponent);
