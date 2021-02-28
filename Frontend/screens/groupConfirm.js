import React, { Component } from "react";
import { ListItem, Thumbnail, Body, Text, View, Right } from "native-base";
import { FlatList, TextInput } from "react-native";
import { LightTheme } from "../appStyles";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import * as colors from "../constants/colors";
import { bindActionCreators } from "redux";
import { addRoom } from "../store/actions/RoomActions";

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
        <View style={{ flex: 1, backgroundColor: colors.DarkWhite }}>
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
          <View style={LightTheme.RightArrowContainer}>
            <MaterialIcons
              style={LightTheme.RightArrow}
              name='arrow-forward'
              onPress={async () => {
                var body = {
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
                await this.props.addRoom(body);
                this.props.navigation.navigate("MainScreen");
              }}
            />
          </View>
        </View>
      );
    else
      return (
        <View style={{ flex: 1, backgroundColor: colors.DarkWhite }}>
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
  return bindActionCreators({ addRoom }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    rooms: state.room.rooms,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupConfirmScreen);
