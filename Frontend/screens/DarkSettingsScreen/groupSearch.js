import React, { Component } from 'react';
import { ListItem, Thumbnail, Body, Text, View, Right } from 'native-base';
import { FlatList, TextInput, TouchableOpacity } from 'react-native';
import { DarkTheme } from '../../appStyles';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

class GroupSearchScreen extends Component {
  constructor(props) {
    super(props);
    const Allusers = this.getUsers();
    this.state = {
      users: Allusers,
      text: '',
      filteredUsers: Allusers,
      selectedUsers: 0,
    };
  }

  getUsers() {
    const users = this.props.rooms.filter((room) => {
      return !room.isGroup;
    });
    return users;
  }

  componentWillUnmount = () => {
    var filteruser = this.state.filteredUsers;
    filteruser.forEach((user) => {
      if (user.selected) user.selected = null;
    });
    this.setState({
      filteredUsers: filteruser,
      selectedUsers: 0,
    });
  };

  renderGridItem = (itemData) => {
    var filteruser = this.state.filteredUsers;
    if (filteruser[itemData.index].selected) {
      return (
        <ListItem
          noBorder={true}
          selected={true}
          style={DarkTheme.ListItemStyle}
          avatar
          onPress={() => {
            filteruser[itemData.index].selected = false;
            this.setState({
              filteredUsers: filteruser,
              selectedUsers: this.state.selectedUsers - 1,
            });
          }}
        >
          <Thumbnail source={{ uri: itemData.item.profile_pic }} />

          <Body>
            <Text numberOfLines={1} style={DarkTheme.chatListTickName}>
              {itemData.item.name}
            </Text>
            <Text numberOfLines={1} style={DarkTheme.chatListTickNote} note>
              {itemData.item.description}
            </Text>
          </Body>
          <Right>
            <MaterialIcons style={DarkTheme.CheckIcon} name='check-circle' />
          </Right>
        </ListItem>
      );
    } else {
      return (
        <ListItem
          noBorder={true}
          style={DarkTheme.ListItemStyle}
          avatar
          onPress={() => {
            filteruser[itemData.index].selected = true;
            this.setState({
              filteredUsers: filteruser,
              selectedUsers: this.state.selectedUsers + 1,
            });
          }}
        >
          <Thumbnail source={{ uri: itemData.item.profile_pic }} />

          <Body>
            <Text numberOfLines={1} style={DarkTheme.chatListName}>
              {itemData.item.name}
            </Text>
            <Text numberOfLines={1} style={DarkTheme.chatListNote} note>
              {itemData.item.description}
            </Text>
          </Body>
        </ListItem>
      );
    }
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
    if (this.state.selectedUsers > 1)
      return (
        <View style={DarkTheme.ChatInputViewContainer}>
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
            keyExtractor={(item) => item.id}
            data={this.state.filteredUsers}
            renderItem={this.renderGridItem}
            numColumns={1}
            style={DarkTheme.FlatListComponent}
          />
          <TouchableOpacity
            style={DarkTheme.RightArrowContainer}
            onPress={() => {
              const members = this.state.users.filter((user) => {
                return user.selected;
              });
              this.props.navigation.navigate({
                routeName: 'DarkGroupConfirmScreen',
                params: {
                  members: members,
                },
              });
            }}
          >
            <MaterialIcons style={DarkTheme.RightArrow} name='arrow-forward' />
          </TouchableOpacity>
        </View>
      );
    else
      return (
        <View style={DarkTheme.ChatInputViewContainer}>
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
            keyExtractor={(item) => item.id}
            data={this.state.filteredUsers}
            renderItem={this.renderGridItem}
            numColumns={1}
            style={DarkTheme.FlatListComponent}
          />
        </View>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms.filter((room) => !room.dark),
    user: state.user,
  };
};

export default connect(mapStateToProps)(GroupSearchScreen);
