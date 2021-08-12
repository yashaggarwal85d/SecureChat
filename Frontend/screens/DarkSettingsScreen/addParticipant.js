import React, { Component } from 'react';
import { ListItem, Thumbnail, Body, Text, View, Right } from 'native-base';
import { FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { DarkTheme } from '../../appStyles';
class AddParticipantScreen extends Component {
  constructor(props) {
    super(props);
    const Allusers = this.getUsers();
    this.state = {
      users: Allusers,
      text: '',
      filteredUsers: Allusers,
    };
  }

  getUsers() {
    const { state } = this.props.navigation;
    const RoomMembers = this.props.rooms[state.params.roomInd].members;
    const Allusers = this.props.rooms.filter((room) => {
      return !room.isGroup && !room.dark;
    });

    var Users1 = [];
    var Users2 = [];
    for (const user of Allusers) {
      for (const member of user.members) {
        if (member.id !== this.props.user.id) {
          Users1.push(member.details);
        }
      }
    }
    for (const user of RoomMembers) {
      console.log(user.blocked);
      if (user.id !== this.props.user.id && !user.blocked) {
        Users2.push(user.details);
      }
    }
    const FinalUsers = Users1.filter(
      (a) => !Users2.some((b) => a._id === b._id)
    );
    return FinalUsers;
  }

  renderGridItem = (itemData) => {
    const { state } = this.props.navigation;
    return (
      <ListItem
        noBorder={true}
        style={DarkTheme.ListItemStyle}
        avatar
        onPress={async () => {
          await state.params.addMem(itemData.item._id);
          this.props.navigation.goBack();
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
    const { state } = this.props.navigation;
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
    rooms: state.rooms,
    user: state.user,
  };
};

export default connect(mapStateToProps)(AddParticipantScreen);
