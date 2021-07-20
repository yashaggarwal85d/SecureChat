import React, { Component } from 'react';
import { Root, View, ActionSheet } from 'native-base';
import { TextInput, TouchableOpacity, ImageEditor } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as colors from '../constants/colors';
import { resizeFunc } from '../store/actions/LoginActions';
import { connect } from 'react-redux';
import { LightTheme, DarkTheme } from '../appStyles';

var CameraButton = [
  { text: 'Camera', icon: 'camera', iconColor: colors.black },
  { text: 'Gallery', icon: 'images', iconColor: colors.dodgerblue },
  { text: 'Cancel', icon: 'close', iconColor: colors.red },
];

class ChatFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  uploadImage = async (result) => {
    const data = await resizeFunc(result);
    this.props.onImageSend('data:image/png;base64,' + data);
  };

  async PickImageFromCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      this.uploadImage(result);
    }
  }

  async PickImageFromGallery() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    ImagePicker.MediaTypeOptions;
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      this.uploadImage(result);
    }
  }

  async handleSend() {
    if (this.state.message.trim()) {
      this.props.onSend(this.state.message.trim());
      this.setState({ message: null });
    }
  }

  render() {
    var Theme = LightTheme;
    if (this.props.user.mode == 'dark') {
      Theme = DarkTheme;
    }

    return (
      <KeyboardAvoidingView style={Theme.ChatKeyboardAvoidingView}>
        <View style={Theme.ChatInputView}>
          <View style={Theme.ChatInputCamera}>
            <Root>
              <MaterialIcons
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: CameraButton,
                      cancelButtonIndex: 2,
                      title: 'Send photo',
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
                style={Theme.ChatInputCameraIcon}
                name='photo-camera'
              />
            </Root>
          </View>
          <TextInput
            value={this.state.message}
            onChangeText={(text) => this.setState({ message: text })}
            style={Theme.ChatInput}
            placeholder='Type a message'
            placeholderTextColor='grey'
            underlineColorAndroid='transparent'
            multiline={true}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={Theme.SendButtonView}
          onPress={() => this.handleSend()}
          activeOpacity={1}
        >
          <MaterialIcons name='send' style={Theme.SendButton} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
    user: state.user,
  };
};

export default connect(mapStateToProps)(ChatFooter);
