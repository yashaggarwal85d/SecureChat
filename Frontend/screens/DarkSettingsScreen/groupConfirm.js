import React, { Component } from "react";
import { ListItem, Thumbnail, Body, Text, View, Right } from "native-base";
import { FlatList, TextInput } from "react-native";
import { DarkTheme } from "../../appStyles";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import * as colors from "../../constants/colors";
import { bindActionCreators } from "redux";
import { CreateNewRoom } from "../../store/actions/RoomActions";

class GroupConfirmScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  renderGridItem = (itemData) => {
    return (
      <ListItem
        noBorder={true}
        selected={true}
        style={DarkTheme.ListItemStyle}
        avatar
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
        <View style={{ flex: 1, backgroundColor: colors.DarkWhite }}>
          <View style={DarkTheme.ChatInputView}>
            <TextInput
              value={this.state.text}
              onChangeText={(text) => this.setText(text)}
              style={DarkTheme.ChatInput}
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
            style={DarkTheme.FlatListComponent}
          />
          <View style={DarkTheme.RightArrowContainer}>
            <MaterialIcons
              style={DarkTheme.RightArrow}
              name='arrow-forward'
              onPress={async () => {
                var body = {
                  isDark: true,
                  name: this.state.name,
                  description: "Add a description",
                  members: [],
                };
                state.params.members.forEach((member) => {
                  var userId;
                  member.members.forEach((mem) => {
                    if (mem.details) userId = mem.details._id;
                  });
                  const id = {
                    id: userId,
                  };
                  body.members.push(id);
                });
                await this.props.CreateNewRoom(body);
                this.props.navigation.navigate("MainScreen");
              }}
            />
          </View>
        </View>
      );
    else
      return (
        <View style={{ flex: 1, backgroundColor: colors.DarkWhite }}>
          <View style={DarkTheme.ChatInputView}>
            <TextInput
              value={this.state.text}
              onChangeText={(text) => this.setText(text)}
              style={DarkTheme.ChatInput}
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
            style={DarkTheme.FlatListComponent}
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
    rooms: state.room.rooms.filter((room) => room.dark),
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupConfirmScreen);
