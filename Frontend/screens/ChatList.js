import React, { Component } from 'react';
import {
  Header,
  Title,
  ListItem,
  Thumbnail,
  Body,
  Right,
  Text,
  Badge,
} from 'native-base';
import { FlatList, ImageBackground } from 'react-native';
import moment from 'moment';
import { ImageBg } from '../appStyles';
import { connect } from 'react-redux';
import { LightTheme, DarkTheme } from '../appStyles';
import { bindActionCreators } from 'redux';
import { updatelastMessageReadIndex } from '../store/actions/RoomActions';
import { updateActiveRoom } from '../store/actions/LoginActions';

function sorted(arr) {
  const sortedArray = arr.sort(function (a, b) {
    return moment(b.lastTime).unix() - moment(a.lastTime).unix();
  });
  return sortedArray;
}
class ChatScreenComponent extends Component {
  constructor(props) {
    super(props);
  }

  renderGridItem = (itemData) => {
    var Theme = LightTheme;
    if (this.props.user.mode == 'dark') {
      Theme = DarkTheme;
    }

    const time = moment(itemData.item.lastTime).format('h:mm');
    const messagesCount =
      itemData.item.messages.length - itemData.item.lastMessageReadIndex;
    if (messagesCount) {
      return (
        <ListItem
          noBorder={true}
          style={Theme.ListItemStyle}
          avatar
          onPress={() => {
            this.props.navigation.navigate({
              routeName: 'ChatScreen',
              params: {
                id: itemData.item.id,
              },
            });
            this.props.updatelastMessageReadIndex(itemData.item.id);
            this.props.updateActiveRoom(itemData.item.id);
          }}
        >
          <Thumbnail source={{ uri: itemData.item.profile_pic }} />

          <Body>
            <Text numberOfLines={1} style={Theme.chatListActiveName}>
              {itemData.item.name}
            </Text>
            <Text numberOfLines={1} style={Theme.chatListActiveNote} note>
              {itemData.item.lastMessage}
            </Text>
          </Body>
          <Right>
            <Text note style={Theme.chatListActiveNote}>
              {time}
            </Text>
            <Badge style={Theme.chatListBadge}>
              <Text style={Theme.chatListBadgeText}>{messagesCount}</Text>
            </Badge>
          </Right>
        </ListItem>
      );
    } else {
      return (
        <ListItem
          noBorder={true}
          style={Theme.ListItemStyle}
          avatar
          onPress={() => {
            this.props.navigation.navigate({
              routeName: 'ChatScreen',
              params: {
                id: itemData.item.id,
              },
            });
            this.props.updatelastMessageReadIndex(itemData.item.id);
            this.props.updateActiveRoom(itemData.item.id);
          }}
        >
          <Thumbnail source={{ uri: itemData.item.profile_pic }} />

          <Body>
            <Text numberOfLines={1} style={Theme.chatListName}>
              {itemData.item.name}
            </Text>
            <Text numberOfLines={1} style={Theme.chatListNote} note>
              {itemData.item.lastMessage}
            </Text>
          </Body>
          <Right>
            <Text note style={Theme.chatListNote}>
              {time}
            </Text>
          </Right>
        </ListItem>
      );
    }
  };

  render() {
    var source = require(`../assets/Background.jpg`);
    var Theme = LightTheme;
    var rooms = this.props.rooms.filter((room) => {
      if (room && !room.dark) return true;
      else return false;
    });
    if (this.props.user.mode == 'dark') {
      source = require(`../assets/DarkBackground.jpg`);
      Theme = DarkTheme;
      rooms = this.props.rooms.filter((room) => {
        if (room && room.dark) return true;
        else return false;
      });
    }

    return (
      <>
        <ImageBackground
          source={source}
          resizeMode='cover'
          style={ImageBg.ImageBack}
        >
          <Header style={Theme.HeaderContainer}>
            <Body>
              <Title style={Theme.appTitle}>Chats</Title>
            </Body>
          </Header>

          <FlatList
            keyExtractor={(item) => item.id}
            data={sorted(rooms)}
            renderItem={this.renderGridItem}
            numColumns={1}
            style={Theme.FlatListComponent}
          />
        </ImageBackground>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updatelastMessageReadIndex,
      updateActiveRoom,
    },
    dispatch
  );
};

function mapStateToProps(state) {
  return {
    rooms: state.rooms,
    user: state.user,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreenComponent);
