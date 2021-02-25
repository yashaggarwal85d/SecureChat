import React, { Component } from "react";
import { View } from "native-base";
import { TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";

class ChatFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      icon: "attach-file",
    };
  }

  handleSend() {
    if (this.state.message) {
      this.setText(null);
      this.props.onSend(this.state.message);
    }
  }

  setText = (text) => {
    if (text) this.setState({ message: text, icon: "send" });
    else this.setState({ message: text, icon: "attach-file" });
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={this.props.appStyles.ChatKeyboardAvoidingView}
      >
        <View style={this.props.appStyles.ChatInputView}>
          <TextInput
            value={this.state.message}
            onChangeText={(text) => this.setText(text)}
            style={this.props.appStyles.ChatInput}
            placeholder='Type a message'
            placeholderTextColor='grey'
            underlineColorAndroid='transparent'
            multiline={true}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={this.props.appStyles.SendButtonView}
          onPress={() => this.handleSend()}
          activeOpacity={1}
        >
          <MaterialIcons
            name={this.state.icon}
            style={this.props.appStyles.SendButton}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default ChatFooter;
