import React, { Component } from "react";
import { Root, View, ActionSheet } from "native-base";
import { TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as colors from "../constants/colors";
import * as DocumentPicker from "expo-document-picker";
import * as firebase from "firebase";

var CameraButton = [
  { text: "Camera", icon: "camera", iconColor: colors.black },
  { text: "Gallery", icon: "photos", iconColor: colors.dodgerblue },
  { text: "Cancel", icon: "close", iconColor: colors.red },
];

class ChatFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      icon: "attach-file",
    };
  }

  async PickImageFromCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
  }

  async PickImageFromGallery() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
  }

  async handleSend() {
    if (this.state.message) {
      this.setText(null);
      this.props.onSend(this.state.message.trim());
    } else {
      const result = await DocumentPicker.getDocumentAsync();
      console.log(result);
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
          <View style={this.props.appStyles.ChatInputCamera}>
            <Root>
              <MaterialIcons
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: CameraButton,
                      cancelButtonIndex: 2,
                      title: "Send photo",
                    },
                    (buttonIndex) => {
                      if (buttonIndex === 0) {
                        this.PickImageFromCamera();
                      } else if (buttonIndex === 1) {
                        this.PickImageFromGallery();
                      }
                    }
                  )
                }
                size={26}
                name='photo-camera'
              />
            </Root>
          </View>
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
