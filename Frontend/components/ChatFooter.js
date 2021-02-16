import React, { Component } from "react";
import { View } from "native-base";
import { TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";

class ChatFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  handleSend() {
    if (this.state.message) {
      this.props.onSend(this.state.message);
      this.setState({ message: "" });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={this.props.appStyles.ChatKeyboardAvoidingView}
      >
        <View style={this.props.appStyles.ChatInputView}>
          <FontAwesome5
            name="smile"
            style={this.props.appStyles.ChatInputSmile}
          />
          <TextInput
            value={this.state.message}
            onChangeText={(text) => this.setState({ message: text })}
            style={this.props.appStyles.ChatInput}
            placeholder="Type a message"
            placeholderTextColor="grey"
            underlineColorAndroid="transparent"
          ></TextInput>
          <MaterialCommunityIcons
            name="attachment"
            style={this.props.appStyles.ChatInputFile}
          />
        </View>
        <TouchableOpacity
          style={this.props.appStyles.SendButtonView}
          onPress={() => this.handleSend()}
        >
          <MaterialCommunityIcons
            name="send"
            style={this.props.appStyles.SendButton}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default ChatFooter;
