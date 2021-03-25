import React, { Component } from "react";
import { ListItem, Thumbnail, Body, Text, View } from "native-base";
import { FlatList, TextInput } from "react-native";
import { DarkTheme } from "../../appStyles";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { AllUsers } from "../../store/actions/LoginActions";
import { CreateNewRoom } from "../../store/actions/RoomActions";
import { bindActionCreators } from "redux";
import * as colors from "../../constants/colors";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      loaded: false,
      text: "",
      filteredUsers: null,
    };
    this.getUsers();
  }

  comparator = (a, b) => {
    for (const member of b.members) {
      if (member.details) {
        return member.details._id === a._id;
      }
    }
  };

  getUsers = async () => {
    const Allusers = await AllUsers(this.props.user.token);
    const CurrentUsers = this.props.rooms.filter((room) => {
      return !room.isGroup && room.creator_id === this.props.user.id;
    });
    const users = Allusers.filter(
      (a) => !CurrentUsers.some((b) => this.comparator(a, b))
    );
    this.setState({ users: users, loaded: true });
  };

  renderGridItem = (itemData) => {
    return (
      <ListItem
        noBorder={true}
        style={DarkTheme.ListItemStyle}
        avatar
        onPress={async () => {
          const body = {
            isDark: true,
            members: [
              {
                id: itemData.item._id,
              },
            ],
          };
          await this.props.CreateNewRoom(body);
          this.props.navigation.navigate("MainScreen");
        }}
      >
        <Thumbnail source={{ uri: itemData.item.profile_pic }} />

        <Body>
          <Text numberOfLines={1} style={DarkTheme.chatListName}>
            {itemData.item.name}
          </Text>
          <Text numberOfLines={1} style={DarkTheme.chatListNote} note>
            {itemData.item.status}
          </Text>
        </Body>
      </ListItem>
    );
  };

  setText = (text) => {
    this.setState({
      text: text,
      filteredUsers: this.state.users.filter((user) => {
        return user.name.toLowerCase().includes(text.toLowerCase());
      }),
    });
  };

  render() {
    if (this.state.loaded) {
      var data = this.state.users;
      if (this.state.text) data = this.state.filteredUsers;
      return (
        <View style={{ flex: 1, backgroundColor: colors.DarkWhite }}>
          <View style={DarkTheme.ChatInputView}>
            <MaterialIcons name='search' style={DarkTheme.ChatInputSmile} />
            <TextInput
              value={this.state.text}
              onChangeText={(text) => this.setText(text)}
              style={DarkTheme.ChatInput}
              placeholder='Search'
              placeholderTextColor='grey'
              underlineColorAndroid='transparent'
            ></TextInput>
          </View>
          <FlatList
            keyExtractor={(item) => item._id}
            data={data}
            renderItem={this.renderGridItem}
            numColumns={1}
            style={DarkTheme.FlatListComponent}
          />
        </View>
      );
    } else {
      return (
        <View style={DarkTheme.ChatInputView}>
          <MaterialIcons name='search' style={DarkTheme.ChatInputSmile} />
          <TextInput
            value={this.state.text}
            onChangeText={(text) => this.setText(text)}
            style={DarkTheme.ChatInput}
            placeholder='Search'
            placeholderTextColor='grey'
            underlineColorAndroid='transparent'
          ></TextInput>
        </View>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ CreateNewRoom }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    rooms: state.room.rooms.filter((room) => room.dark),
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
