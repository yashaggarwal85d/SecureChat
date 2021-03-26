import React, { Component } from "react";
import { Root, View, ActionSheet } from "native-base";
import { TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as colors from "../constants/colors";
// import * as DocumentPicker from "expo-document-picker";
import * as firebase from "firebase";
import moment from "moment";

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
    };
  }

  uploadImage = async (uri) => {
    this.props.updateLoader(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child(
        `rooms/images/${this.props.room.id}/${
          this.props.user.id
        }/${moment.now()}`
      );
    await ref.put(blob);
    const url = await ref.getDownloadURL();
    this.props.onImageSend(url);
  };

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
    if (!result.cancelled) {
      this.uploadImage(result.uri);
    }
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
    if (!result.cancelled) {
      this.uploadImage(result.uri);
    }
  }

  // async uploadDocument(result) {
  //   this.props.updateLoader(true);
  //   const uri = result.uri;
  //   const response = await fetch(uri);
  //   const blob = await response.blob();
  //   var ref = firebase
  //     .storage()
  //     .ref()
  //     .child(
  //       `rooms/files/${this.props.room.id}/${
  //         this.props.user.id
  //       }/${moment.now()}`
  //     );
  //   await ref.put(blob);
  //   const url = await ref.getDownloadURL();
  //   this.props.onFileSend(url, result.name);
  // }

  async handleSend() {
    if (this.state.message) {
      this.props.onSend(this.state.message.trim());
      this.setState({ message: null });
    }
    // else {
    //   const result = await DocumentPicker.getDocumentAsync();
    //   this.uploadDocument(result);
    // }
  }

  // setText = (text) => {
  //   if (text) this.setState({ message: text, icon: "send" });
  //   else this.setState({ message: text, icon: "attach-file" });
  // };

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
                style={this.props.appStyles.ChatInputCameraIcon}
                name='photo-camera'
              />
            </Root>
          </View>
          <TextInput
            value={this.state.message}
            onChangeText={(text) => this.setState({ message: text })}
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
          <MaterialIcons name='send' style={this.props.appStyles.SendButton} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default ChatFooter;
