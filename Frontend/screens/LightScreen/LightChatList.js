import React, { Component } from "react";
import { ListItem, Thumbnail, Body, Right, Text, Badge } from "native-base";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import {
  addMessage,
  updatelastMessageReadIndex,
  fillData,
} from "../../store/actions/RoomActions";
import { bindActionCreators } from "redux";
import { socket } from "../../store/reducers/Socket";
import moment from "moment";

function sorted(arr) {
  const sortedArray = arr.sort(function (a, b) {
    return moment(b.lastTime).unix() - moment(a.lastTime).unix();
  });
  return sortedArray;
}

class ChatScreenComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: sorted(this.props.rooms),
      refreshing: false,
      activeRoom: null,
    };
  }

  componentDidMount = () => {
    socket.on("recieveMessage", (message, roomId) => {
      this.props.addMessage(roomId, message);
      this.updateComponent();
    });
  };

  updateComponent = async () => {
    if (this.state.activeRoom)
      this.props.updatelastMessageReadIndex(this.state.activeRoom);
    this.setState({
      rooms: sorted(this.props.rooms),
    });
  };

  UpdateActiveRoom = (id) => {
    this.setState({
      activeRoom: id,
      rooms: sorted(this.props.rooms),
    });
  };

  renderGridItem = (itemData) => {
    const time = moment(itemData.item.lastTime).format("h:mm");
    const messagesCount =
      itemData.item.messages.length - itemData.item.lastMessageReadIndex;
    if (messagesCount && this.state.activeRoom !== itemData.item.id) {
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
                UpdateComponent: this.updateComponent.bind(this),
                UpdateActiveRoom: this.UpdateActiveRoom.bind(this),
              },
            });
            this.props.updatelastMessageReadIndex(itemData.item.id);
            this.UpdateActiveRoom(itemData.item.id);
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
                UpdateComponent: this.updateComponent.bind(this),
                UpdateActiveRoom: this.UpdateActiveRoom.bind(this),
              },
            });
            this.UpdateActiveRoom(itemData.item.id);
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
  handleRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.fillData();
    this.setState({
      rooms: sorted(this.props.rooms),
      refreshing: false,
    });
  };
  render() {
    return (
      <FlatList
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        keyExtractor={(item) => item.id}
        data={this.state.rooms}
        renderItem={this.renderGridItem}
        numColumns={1}
        style={this.props.appStyles.FlatListComponent}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { addMessage, updatelastMessageReadIndex, fillData },
    dispatch
  );
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
