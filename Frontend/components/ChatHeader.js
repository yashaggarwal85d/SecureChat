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
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import { LightTheme, DarkTheme } from '../appStyles';

class ChatHeader extends Component {
  constructor(props) {
    super(props);
    var secondUser = null;
    if (
      !this.props.rooms[this.props.roomInd].isGroup &&
      !(
        this.props.rooms[this.props.roomInd].dark &&
        this.props.rooms[this.props.roomInd].creator_id !== this.props.user.id
      )
    ) {
      this.props.rooms[this.props.roomInd].members.forEach((member) => {
        if (this.props.user.id !== member.id) {
          secondUser = member.id;
          CheckOnline(this.props.user.token, secondUser);
        }
      });
    }
    this.state = {
      online: false,
      secondUser: secondUser,
    };
  }

  componentDidMount = () => {
    if (!this.props.rooms[this.props.roomInd].isGroup) {
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
    if (
      this.props.rooms[this.props.roomInd].PullMessage.active &&
      this.props.rooms[this.props.roomInd].PullMessage.membersApproved.indexOf(
        this.props.user.id
      ) !== -1
    ) {
      showMessage({
        message: 'Pull Messages',
        description: 'Pull message request already active',
        type: 'danger',
        floating: true,
      });
    } else {
      PullMessagesFromBlockchain(
        this.props.rooms[this.props.roomInd].id,
        this.props.user.token,
        true
      );
    }
    this.hideMenu();
  };

  PushMessages = () => {
    PushMessagesToBlockchain(
      this.props.rooms[this.props.roomInd].id,
      this.props.user.token
    );
    this.hideMenu();
  };

  render() {
    var Theme = LightTheme;
    if (this.props.user.mode == 'dark') {
      Theme = DarkTheme;
    }

    var note = (
      <Text numberOfLines={1} style={Theme.ChatHeaderNote}>
        {this.props.rooms[this.props.roomInd].description}
      </Text>
    );
    var button = <></>;
    if (this.state.online)
      note = (
        <Text numberOfLines={1} style={Theme.ChatHeaderNoteOnline}>
          Online
        </Text>
      );
    if (this.props.rooms[this.props.roomInd].isGroup)
      button = (
        <Button icon transparent>
          <Menu
            style={Theme.ChatMoreButton}
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
              textStyle={Theme.ChatMoreButtonText}
              onPress={() => {
                this.props.navigation.navigate({
                  routeName: 'RoomSettingsScreen',
                  params: {
                    room: this.props.rooms[this.props.roomInd],
                    onPromptSend: this.props.onPromptSend,
                    appStyles: Theme,
                  },
                });
              }}
            >
              Group info
            </MenuItem>
            <MenuItem
              textStyle={Theme.ChatMoreButtonText}
              onPress={this.PullMessages}
            >
              Pull messages
            </MenuItem>
            <MenuItem
              textStyle={Theme.ChatMoreButtonText}
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
            style={Theme.ChatMoreButton}
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
              textStyle={Theme.ChatMoreButtonText}
              onPress={this.PullMessages}
            >
              Pull messages
            </MenuItem>
            <MenuItem
              textStyle={Theme.ChatMoreButtonText}
              onPress={this.PushMessages}
            >
              Push messages
            </MenuItem>
          </Menu>
        </Button>
      );
    return (
      <Header style={Theme.ChatHeaderView}>
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
          style={Theme.ChatHeaderImage}
          source={{ uri: this.props.rooms[this.props.roomInd].profile_pic }}
        />

        <Body style={{ right: '70%' }}>
          <Text numberOfLines={1} style={Theme.ChatHeaderTitle}>
            {this.props.rooms[this.props.roomInd].name}
          </Text>
          {note}
        </Body>
        {button}
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
    user: state.user,
  };
};

export default connect(mapStateToProps)(ChatHeader);
