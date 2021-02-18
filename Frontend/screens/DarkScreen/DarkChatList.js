import React, { Component } from "react";
import { ListItem, Thumbnail, Body, Right, Text, Badge } from "native-base";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { addMessage } from "../../store/actions/RoomActions";
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
    };
  }
  componentDidMount = () => {
    socket.on("recieveMessage", async (message, roomId) => {
      // console.log(message);
      await this.props.addMessage(roomId, message);
      this.setState({
        rooms: sorted(this.props.rooms),
      });
    });
  };

  renderGridItem = (itemData) => {
    const time = moment(itemData.item.lastTime).format("h:mm");
    if (itemData.item.isactive) {
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
              {time}
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
        data={this.state.rooms}
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
