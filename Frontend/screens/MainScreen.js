import React, { Component } from "react";
import { Container } from "native-base";
import * as colors from "../constants/colors";
import { StatusBar, Animated, View } from "react-native";
import {
  ToggleSwitchStyle,
  ActionButtonStyle,
  LightTheme,
  DarkTheme,
} from "../appStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ToggleSwitch from "../components/ToggleSwitch";
import { connect } from "react-redux";
import {
  JoinRooms,
  registerForPushNotifications,
} from "../store/reducers/Socket";
import {
  updateMode,
  CheckUserContacts,
  updateNotificationToken,
} from "../store/actions/LoginActions";
import { bindActionCreators } from "redux";
import {
  addMessage,
  updatelastMessageReadIndex,
  fillData,
  addRoom,
  updateRoom,
  removeRoom,
  updateRoomProfile,
  CreateNewRoom,
} from "../store/actions/RoomActions";
import { socket } from "../store/reducers/Socket";
import ChatListScreen from "./ChatList";
import moment from "moment";
import ActionButton from "../components/FloatBar";
import DarkActionButton from "../components/FloatBarDark";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import * as Contacts from "expo-contacts";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

function sorted(arr) {
  const sortedArray = arr.sort(function (a, b) {
    return moment(b.lastTime).unix() - moment(a.lastTime).unix();
  });
  return sortedArray;
}

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

class MainApp extends Component {
  constructor(props) {
    super(props);
    var defaultActiveIndex;
    if (this.props.user.mode === "light") defaultActiveIndex = 0;
    else defaultActiveIndex = 1;
    this.state = {
      defaultActiveIndex: defaultActiveIndex,
      theme: this.props.user.mode,
      rooms: sorted(this.props.rooms),
      activeRoom: null,
    };

    this.SwitchThemeFunction(this.state.theme);
    JoinRooms(this.props.user.token);
    this.processContacts();
    if (!this.props.user.NotificationToken)
      this.registerForPushNotificationsAsync();
  }

  comparator = (a, b) => {
    return a === b;
  };

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      showMessage({
        message: "Contacts permission denied",
        description: "We need permissions to sync your contacts",
        type: "danger",
        floating: true,
      });
    }
    try {
      let token = await Notifications.getExpoPushTokenAsync();
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
      if (status === "granted") {
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
              var PhoneNumber = Phone.number.replace(/ /g, "");
              if (PhoneNumber[0] != "+") {
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
          // console.log(contact);
          await this.props.CreateNewRoom(contact);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

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

  filterRooms = (mode) => {
    if (mode === "dark") {
      const darkRooms = this.state.rooms.filter((room) => room.dark);
      return darkRooms;
    } else {
      const lightRooms = this.state.rooms.filter((room) => !room.dark);
      return lightRooms;
    }
  };

  componentDidMount = () => {
    socket.on("recieveMessage", (message, roomId) => {
      this.props.addMessage(roomId, message);
      this.updateComponent();
    });
    socket.on("addRoom", async (room) => {
      await this.props.addRoom(room);
      this.updateComponent();
    });
    socket.on("updateRoom", async (roomId, members) => {
      await this.props.updateRoom(roomId, members);
      this.updateComponent();
    });
    socket.on("removeRoom", async (roomId, roomName) => {
      await this.props.removeRoom(roomId);
      showMessage({
        message: `You are no longer a participant of ${roomName}`,
        type: "danger",
        floating: true,
      });
      this.updateComponent();
    });
    socket.on("update_profile", async (roomId, url) => {
      console.log("hey");
      await this.props.updateRoomProfile(roomId, url);
      this.updateComponent();
    });
    setTimeout(() => {
      StatusBar.setHidden(false);
    });
  };

  SwitchToLight() {
    showMessage({
      message: "Private mode",
      description: "You are visible to all",
      type: "info",
      floating: true,
      color: colors.white,
      backgroundColor: colors.darkBlue,
    });
    setTimeout(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor(colors.ghostwhite);
    });
  }

  SwitchToDark() {
    showMessage({
      message: "Anonymous mode",
      description: "You entered in anonymous mode",
      type: "info",
      floating: true,
      color: colors.white,
      backgroundColor: colors.indigo,
    });
    setTimeout(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor(colors.black);
    });
  }

  SwitchThemeFunction(currentTheme) {
    this.props.updateMode(currentTheme);
    this.setState({
      theme: currentTheme,
    });
    if (currentTheme == "light") {
      this.SwitchToLight();
    } else if (currentTheme == "dark") {
      this.SwitchToDark();
    }
  }

  render() {
    var screen_div;
    var float_div;
    if (this.state.theme === "light") {
      screen_div = (
        <ChatListScreen
          rooms={this.filterRooms("light")}
          activeRoom={this.state.activeRoom}
          appStyles={LightTheme}
          UpdateActiveRoom={this.UpdateActiveRoom.bind(this)}
          updateComponent={this.updateComponent.bind(this)}
          updatelastMessageReadIndex={this.props.updatelastMessageReadIndex}
          navigation={this.props.navigation}
        />
      );
      float_div = <ActionButton navigation={this.props.navigation} />;
    } else if (this.state.theme === "dark") {
      screen_div = (
        <ChatListScreen
          rooms={this.filterRooms("dark")}
          activeRoom={this.state.activeRoom}
          appStyles={DarkTheme}
          UpdateActiveRoom={this.UpdateActiveRoom.bind(this)}
          updateComponent={this.updateComponent.bind(this)}
          updatelastMessageReadIndex={this.props.updatelastMessageReadIndex}
          navigation={this.props.navigation}
        />
      );
      float_div = <DarkActionButton navigation={this.props.navigation} />;
    }
    return (
      <Container>
        <View>
          <FlashMessage position='top' />
        </View>
        {screen_div}
        <View style={ToggleSwitchStyle.Toggle}>
          <ToggleSwitch
            onLeftState={() => this.SwitchThemeFunction("light")}
            onRightState={() => this.SwitchThemeFunction("dark")}
            AnimatedIcon={AnimatedIcon}
            defaultActiveIndex={this.state.defaultActiveIndex}
          />
        </View>
        <View style={ActionButtonStyle.Toggle}>{float_div}</View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    rooms: state.room.rooms,
    user: state.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addMessage,
      updatelastMessageReadIndex,
      fillData,
      addRoom,
      updateRoom,
      removeRoom,
      updateRoomProfile,
      updateMode,
      CreateNewRoom,
      updateNotificationToken,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
