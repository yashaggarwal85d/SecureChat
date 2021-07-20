import React, { Component } from 'react';
import * as colors from '../constants/colors';
import { StatusBar, Animated, View } from 'react-native';
import {
  ToggleSwitchStyle,
  ActionButtonStyle,
  LightTheme,
  DarkTheme,
} from '../appStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ToggleSwitch from '../components/ToggleSwitch';
import { connect } from 'react-redux';
import {
  JoinRooms,
  registerForPushNotifications,
} from '../store/reducers/Socket';
import {
  updateMode,
  CheckUserContacts,
  updateNotificationToken,
  updateActiveRoom,
} from '../store/actions/LoginActions';
import { bindActionCreators } from 'redux';
import {
  addMessage,
  fillData,
  addRoom,
  updateRoom,
  removeRoom,
  updateRoomProfile,
  CreateNewRoom,
  PullMessageState,
  ResetRoom,
  MarkRead,
} from '../store/actions/RoomActions';
import { socket } from '../store/reducers/Socket';
import ChatListScreen from './ChatList';
import ActionButton from '../components/FloatBar';
import DarkActionButton from '../components/FloatBarDark';
import { showMessage } from 'react-native-flash-message';
import * as Contacts from 'expo-contacts';
import * as Notifications from 'expo-notifications';

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

class MainApp extends Component {
  constructor(props) {
    super(props);

    if (this.props.user.mode == 'light') {
      this.SwitchToLight();
    } else if (this.props.user.mode == 'dark') {
      this.SwitchToDark();
    }
    this.props.updateActiveRoom(null);
    JoinRooms(this.props.user.token);
    this.processContacts();
    if (!this.props.user.NotificationToken)
      this.registerForPushNotificationsAsync();
  }

  comparator = (a, b) => {
    return a === b;
  };

  DefaultActiveIndex = () => {
    if (this.props.user.mode === 'light') return 0;
    else return 1;
  };

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      showMessage({
        message: 'Contacts permission denied',
        description: 'We need permissions to sync your contacts',
        type: 'danger',
        floating: true,
      });
    }
    try {
      let token = (await Notifications.getExpoPushTokenAsync()).data;
      registerForPushNotifications(this.props.user.token, token);
      this.props.updateNotificationToken(token);
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

  async processContacts() {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        var addedContacts = [];
        for (const room of this.props.rooms) {
          if (!room.isGroup && !room.isDark) {
            for (const member of room.members) {
              if (member.id !== this.props.user.id)
                addedContacts.push(member.details.phone);
            }
          }
        }

        var PhoneNumbers = [];
        for (var field of data) {
          const phnoArray = field.phoneNumbers;
          if (phnoArray)
            for (var Phone of phnoArray) {
              var pattern = new RegExp(/^\+(?:[0-9] ?){10,14}[0-9]$/);
              var PhoneNumber = Phone.number.replace(/ /g, '');
              if (PhoneNumber[0] != '+') {
                if (PhoneNumber[0] == 0) {
                  PhoneNumber = PhoneNumber.substring(1);
                }
                PhoneNumber =
                  this.props.user.phone.substring(
                    0,
                    this.props.user.phone.length - 10
                  ) + PhoneNumber;
              }
              if (
                pattern.test(PhoneNumber) &&
                PhoneNumber != this.props.user.phone
              ) {
                PhoneNumbers.push(PhoneNumber);
              }
            }
        }
        PhoneNumbers = PhoneNumbers.filter(
          (a) => !addedContacts.some((b) => this.comparator(a, b))
        );

        const contacts = await CheckUserContacts(
          this.props.user.token,
          PhoneNumbers
        );
        for (const contact of contacts) {
          await this.props.CreateNewRoom(contact);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount = () => {
    socket.on('recieveMessage', async (message, roomId) => {
      console.log(message);
      await this.props.addMessage(roomId, message);
    });
    socket.on('addRoom', async (room) => {
      await this.props.addRoom(room);
    });
    socket.on('updateRoom', async (roomId, members) => {
      await this.props.updateRoom(roomId, members);
    });
    socket.on('removeRoom', async (roomId, roomName) => {
      await this.props.removeRoom(roomId);
      showMessage({
        message: `You are no longer a participant of ${roomName}`,
        type: 'danger',
        floating: true,
      });
    });
    socket.on('update_profile', async (roomId, url) => {
      console.log('hey');
      await this.props.updateRoomProfile(roomId, url);
    });
    socket.on('CallBack', async (callback, type) => {
      showMessage({
        message: callback,
        type: type,
        floating: true,
      });
    });
    socket.on('PullMessages', async (roomId, obj) => {
      await this.props.PullMessageState(roomId, obj);
    });
    socket.on('ResetRoom', async (roomId, members, messages) => {
      await this.props.ResetRoom(roomId, members, messages);
    });
    socket.on('bluetick', async (roomId, userId) => {
      await this.props.MarkRead(roomId, userId);
    });
  };

  SwitchToLight() {
    showMessage({
      message: 'Private mode',
      description: 'You are visible to all',
      type: 'info',
      floating: true,
      color: colors.white,
      backgroundColor: colors.darkBlue,
    });
    setTimeout(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(colors.ghostwhite);
    });
  }

  SwitchToDark() {
    showMessage({
      message: 'Anonymous mode',
      description: 'You entered in anonymous mode',
      type: 'info',
      floating: true,
      color: colors.white,
      backgroundColor: colors.indigo,
    });
    setTimeout(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors.black);
    });
  }

  SwitchThemeFunction(currentTheme) {
    if (this.props.user.mode !== currentTheme) {
      this.props.updateMode(currentTheme);
      if (currentTheme == 'light') {
        this.SwitchToLight();
      } else if (currentTheme == 'dark') {
        this.SwitchToDark();
      }
    }
  }

  render() {
    var screen_div;
    var float_div;
    if (this.props.user.mode === 'light') {
      screen_div = <ChatListScreen navigation={this.props.navigation} />;
      float_div = <ActionButton navigation={this.props.navigation} />;
    } else if (this.props.user.mode === 'dark') {
      screen_div = <ChatListScreen navigation={this.props.navigation} />;
      float_div = <DarkActionButton navigation={this.props.navigation} />;
    }
    return (
      <>
        {screen_div}
        <View style={ToggleSwitchStyle.Toggle}>
          <ToggleSwitch
            onLeftState={() => this.SwitchThemeFunction('light')}
            onRightState={() => this.SwitchThemeFunction('dark')}
            AnimatedIcon={AnimatedIcon}
            defaultActiveIndex={this.DefaultActiveIndex()}
          />
        </View>
        <View style={ActionButtonStyle.Toggle}>{float_div}</View>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms,
    user: state.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addMessage,
      fillData,
      addRoom,
      updateRoom,
      removeRoom,
      updateRoomProfile,
      updateMode,
      CreateNewRoom,
      updateNotificationToken,
      PullMessageState,
      ResetRoom,
      MarkRead,
      updateActiveRoom,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
