import React, { Component } from 'react';
import { Header, Button, Body, Left, Text, Thumbnail } from 'native-base';
import Menu, { MenuItem } from 'react-native-material-menu';
import { MaterialIcons } from '@expo/vector-icons';
import * as colors from '../constants/colors';
import {
  socket,
  CheckOnline,
  PullMessagesFromBlockchain,
  PushMessagesToBlockchain,
} from '../store/reducers/Socket';

export default class ChatHeader extends Component {
  constructor(props) {
    super(props);
    var secondUser = null;
    if (
      !this.props.room.isGroup &&
      !(
        this.props.room.dark &&
        this.props.room.creator_id !== this.props.user.id
      )
    ) {
      this.props.room.members.forEach((member) => {
        if (this.props.user.id !== member.id) {
          secondUser = member.id;
          CheckOnline(this.props.user.token, secondUser);
        }
      });
    }
    this.state = {
      room: this.props.room,
      online: false,
      secondUser: secondUser,
    };
  }

  updateHeaderComponent = () => {
    this.setState({ room: this.props.room });
  };

  componentDidMount = () => {
    if (!this.state.room.isGroup) {
      socket.on('online', async (userId) => {
        if (userId === this.state.secondUser) this.setState({ online: true });
      });
      socket.on('offline', async (userId) => {
        if (userId === this.state.secondUser) this.setState({ online: false });
      });
    }
  };

  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  PullMessages = () => {
    PullMessagesFromBlockchain(this.state.room.id, this.props.user.id);
    this.hideMenu();
  };

  PushMessages = () => {
    PushMessagesToBlockchain(this.state.room.id, this.props.user.id);
    this.hideMenu();
  };

  render() {
    var note = (
      <Text numberOfLines={1} style={this.props.appStyles.ChatHeaderNote}>
        {this.state.room.description}
      </Text>
    );
    var button = <></>;
    if (this.state.online)
      note = (
        <Text
          numberOfLines={1}
          style={this.props.appStyles.ChatHeaderNoteOnline}
        >
          Online
        </Text>
      );
    if (this.state.room.isGroup)
      button = (
        <Button icon transparent>
          <Menu
            style={this.props.appStyles.ChatMoreButton}
            ref={this.setMenuRef}
            button={
              <MaterialIcons
                onPress={this.showMenu}
                name='more-vert'
                size={22}
                color={colors.grey}
              />
            }
          >
            <MenuItem
              textStyle={this.props.appStyles.ChatMoreButtonText}
              onPress={() => {
                this.props.navigation.navigate({
                  routeName: 'RoomSettingsScreen',
                  params: {
                    updateHeaderComponent:
                      this.updateHeaderComponent.bind(this),
                    room: this.state.room,
                    onPromptSend: this.props.onPromptSend,
                    appStyles: this.props.appStyles,
                  },
                });
              }}
            >
              Group info
            </MenuItem>
            <MenuItem
              textStyle={this.props.appStyles.ChatMoreButtonText}
              onPress={this.PullMessages}
            >
              Pull messages
            </MenuItem>
            <MenuItem
              textStyle={this.props.appStyles.ChatMoreButtonText}
              onPress={this.PushMessages}
            >
              Push messages
            </MenuItem>
          </Menu>
        </Button>
      );
    else
      button = (
        <Button icon transparent>
          <Menu
            style={this.props.appStyles.ChatMoreButton}
            ref={this.setMenuRef}
            button={
              <MaterialIcons
                onPress={this.showMenu}
                name='more-vert'
                size={22}
                color={colors.grey}
              />
            }
          >
            <MenuItem
              textStyle={this.props.appStyles.ChatMoreButtonText}
              onPress={this.PullMessages}
            >
              Pull messages
            </MenuItem>
            <MenuItem
              textStyle={this.props.appStyles.ChatMoreButtonText}
              onPress={this.PushMessages}
            >
              Push messages
            </MenuItem>
          </Menu>
        </Button>
      );
    return (
      <Header style={this.props.appStyles.ChatHeaderView}>
        <Left>
          <Button
            icon
            transparent
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <MaterialIcons name='arrow-back' size={22} color={colors.grey} />
          </Button>
        </Left>

        <Thumbnail
          style={this.props.appStyles.ChatHeaderImage}
          source={{ uri: this.state.room.profile_pic }}
        />

        <Body style={{ right: '70%' }}>
          <Text numberOfLines={1} style={this.props.appStyles.ChatHeaderTitle}>
            {this.state.room.name}
          </Text>
          {note}
        </Body>
        {button}
      </Header>
    );
  }
}
