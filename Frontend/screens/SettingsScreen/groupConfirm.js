import React, { Component } from 'react';
import { ListItem, Thumbnail, Body, Text, View, Right } from 'native-base';
import { FlatList, TextInput, TouchableOpacity } from 'react-native';
import { LightTheme } from '../../appStyles';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { CreateNewRoom } from '../../store/actions/RoomActions';
import { showMessage } from 'react-native-flash-message';

class GroupConfirmScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  renderGridItem = (itemData) => {
    return (
      <ListItem
        noBorder={true}
        selected={true}
        style={LightTheme.ListItemStyle}
        avatar
      >
        <Thumbnail source={{ uri: itemData.item.profile_pic }} />

        <Body>
          <Text numberOfLines={1} style={LightTheme.chatListTickName}>
            {itemData.item.name}
          </Text>
          <Text numberOfLines={1} style={LightTheme.chatListTickNote} note>
            {itemData.item.description}
          </Text>
        </Body>
        <Right>
          <MaterialIcons style={LightTheme.CheckIcon} name='check-circle' />
        </Right>
      </ListItem>
    );
  };

  setText = (text) => {
    this.setState({
      name: text,
    });
  };

  render() {
    const { state } = this.props.navigation;
    if (this.state.name)
      return (
        <View style={LightTheme.ChatInputViewContainer}>
          <View style={LightTheme.ChatInputView}>
            <TextInput
              value={this.state.text}
              onChangeText={(text) => this.setText(text)}
              style={LightTheme.ChatInput}
              placeholder='Group Name'
              placeholderTextColor='grey'
              underlineColorAndroid='transparent'
            ></TextInput>
          </View>

          <FlatList
            keyExtractor={(item) => item.id}
            data={state.params.members}
            renderItem={this.renderGridItem}
            numColumns={1}
            style={LightTheme.FlatListComponent}
          />
          <TouchableOpacity
            style={LightTheme.RightArrowContainer}
            onPress={async () => {
              var body = {
                name: this.state.name,
                description: 'Add a description',
                isDark: false,
                members: [],
              };
              state.params.members.forEach((member) => {
                var userId;
                member.members.forEach((mem) => {
                  if (mem.id !== this.props.user.id) userId = mem.details._id;
                });
                const id = {
                  id: userId,
                };
                body.members.push(id);
              });
              this.props.CreateNewRoom(body);
              showMessage({
                message: `Group Created`,
                description: 'Your group is created please wait',
                type: 'success',
                floating: true,
              });
              this.props.navigation.navigate('MainScreen');
            }}
          >
            <MaterialIcons style={LightTheme.RightArrow} name='arrow-forward' />
          </TouchableOpacity>
        </View>
      );
    else
      return (
        <View style={LightTheme.ChatInputViewContainer}>
          <View style={LightTheme.ChatInputView}>
            <TextInput
              value={this.state.text}
              onChangeText={(text) => this.setText(text)}
              style={LightTheme.ChatInput}
              placeholder='Group Name'
              placeholderTextColor='grey'
              underlineColorAndroid='transparent'
            ></TextInput>
          </View>

          <FlatList
            keyExtractor={(item) => item.id}
            data={state.params.members}
            renderItem={this.renderGridItem}
            numColumns={1}
            style={LightTheme.FlatListComponent}
          />
        </View>
      );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ CreateNewRoom }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms.filter((room) => !room.dark),
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupConfirmScreen);
