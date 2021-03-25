import React, { Component } from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Button,
  Icon,
  Body,
  Right,
  ActionSheet,
  Thumbnail,
  Form,
} from "native-base";
import { TextInput, TouchableOpacity, ProgressBarAndroid } from "react-native";
import * as colors from "../../constants/colors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  logout,
  updateNameStatus,
  updateProfile,
} from "../../store/actions/LoginActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SettingForm, LightTheme } from "../../appStyles";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { updateProfilePic } from "../../store/reducers/Socket";

var BUTTONS = [
  { text: "Yes", icon: "open", iconColor: colors.greencyan },
  { text: "Cancel", icon: "close", iconColor: colors.red },
];

var CameraButton = [
  { text: "Camera", icon: "camera", iconColor: colors.black },
  { text: "Gallery", icon: "photos", iconColor: colors.dodgerblue },
  { text: "Cancel", icon: "close", iconColor: colors.red },
];

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_pic: this.props.user.profile_pic,
      name: this.props.user.name,
      status: this.props.user.status,
      changed: false,
      infoClicked: false,
      loader: false,
    };
  }

  uploadImage = async (uri) => {
    this.setState({ loader: true });
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child(`images/${this.props.user.id}`);
    await ref.put(blob);
    const url = await ref.getDownloadURL();
    this.setState({ profile_pic: url });
    await this.props.updateProfile(url);
    await updateProfilePic(this.props.user.token, url);
    this.setState({ loader: false });
  };

  async PickImageFromCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1.91, 1],
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
      aspect: [1.91, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      this.uploadImage(result.uri);
    }
  }

  render() {
    var button = <></>;
    var info = <></>;
    var pic = (
      <Thumbnail
        style={SettingForm.profile_pic}
        source={{ uri: this.state.profile_pic }}
      />
    );
    if (this.state.loader) {
      pic = (
        <ProgressBarAndroid
          color={colors.dodgerblue}
          styleAttr='LargeInverse'
        />
      );
    }
    if (this.state.changed)
      button = (
        <TouchableOpacity
          style={SettingForm.button}
          onPress={async () => {
            await this.props.updateNameStatus(
              this.state.name,
              this.state.status
            );
            this.setState({
              name: this.props.user.name,
              status: this.props.user.status,
              changed: false,
            });
          }}
        >
          <Text style={SettingForm.buttonText}>Save</Text>
        </TouchableOpacity>
      );

    if (this.state.infoClicked) {
      info = (
        <ListItem noBorder={true}>
          <Text style={SettingForm.info}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            tincidunt fringilla feugiat. Proin tincidunt, ligula ac ornare
            lobortis, lectus arcu mollis justo, sed commodo purus magna eu
            lorem. Etiam ipsum est, bibendum ac pharetra in, ultrices eu quam.
            Quisque cursus vehicula ipsum nec pulvinar. Nullam eu tincidunt
            velit. Phasellus quis augue pretium orci elementum facilisis id non
            arcu. Sed a augue finibus, sollicitudin urna quis, pretium eros.
            Cras sed nisi non lorem gravida suscipit nec ut turpis. Phasellus
            aliquam tellus vel ante pulvinar varius. Proin vel nibh lectus.
            Etiam rhoncus tortor vel vulputate luctus. Nullam a risus eget urna
            pharetra ultricies a maximus metus. Phasellus tempor magna massa.
            Proin sit amet molestie orci, eget laoreet mi. Sed lacinia velit
            eget justo tincidunt aliquet.
          </Text>
        </ListItem>
      );
    }
    return (
      <Container>
        <Content>
          <List>
            <ListItem style={{ flexDirection: "column" }}>
              {pic}
              <TouchableOpacity
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: CameraButton,
                      cancelButtonIndex: 2,
                      title: "Profile Photo",
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
                style={SettingForm.cameraView}
              >
                <MaterialIcons
                  style={SettingForm.camera}
                  size={28}
                  name='photo-camera'
                />
              </TouchableOpacity>
            </ListItem>
            <ListItem
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Form>
                <Text style={SettingForm.Text}>Name : </Text>
                <TextInput
                  numberOfLines={1}
                  style={SettingForm.inputBox}
                  value={this.state.name}
                  onChangeText={(text) =>
                    this.setState({
                      name: text,
                      changed: true,
                    })
                  }
                />
                <Text style={SettingForm.Text}>Status : </Text>
                <TextInput
                  multiline={true}
                  style={SettingForm.inputBox}
                  value={this.state.status}
                  onChangeText={(text) =>
                    this.setState({
                      status: text,
                      changed: true,
                    })
                  }
                />
              </Form>
              {button}
            </ListItem>

            <ListItem
              icon
              noBorder={true}
              onPress={() => {
                if (this.state.infoClicked)
                  this.setState({ infoClicked: false });
                else this.setState({ infoClicked: true });
              }}
            >
              <Left>
                <Button style={{ backgroundColor: colors.dodgerblue }}>
                  <AntDesign
                    name='info'
                    size={18}
                    style={{ color: colors.white }}
                  />
                </Button>
              </Left>
              <Body>
                <Text style={LightTheme.chatListName}>App Info</Text>
              </Body>
              <Right>
                <Icon active name='arrow-forward' />
              </Right>
            </ListItem>
            {info}
            <ListItem
              icon
              onPress={() =>
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: 1,
                    title: "Are you sure you want to logout ?",
                  },
                  (buttonIndex) => {
                    if (buttonIndex === 0) {
                      this.props.logout();
                      this.props.navigation.navigate("Auth");
                    }
                  }
                )
              }
            >
              <Left>
                <Button style={{ backgroundColor: colors.red }}>
                  <AntDesign
                    name='logout'
                    size={18}
                    style={{ color: colors.white }}
                  />
                </Button>
              </Left>
              <Body>
                <Text style={LightTheme.chatListName}>Log Out</Text>
              </Body>
              <Right>
                <Icon active name='arrow-forward' />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { logout, updateNameStatus, updateProfile },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.room.rooms.filter((room) => !room.dark),
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
