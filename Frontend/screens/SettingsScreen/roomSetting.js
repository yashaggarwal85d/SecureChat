import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Thumbnail,
  Form,
  ActionSheet,
  Badge,
  View,
} from 'native-base';
import { FlatList } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import * as colors from '../../constants/colors';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {
  updateNameDescription,
  fillData,
  updateRoom,
  updateRoomProfile,
} from '../../store/actions/RoomActions';
import { resizeFunc } from '../../store/actions/LoginActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SettingForm } from '../../appStyles';
import * as ImagePicker from 'expo-image-picker';
import {
  updateRoomProfilePic,
  updateRoomNameDesc,
} from '../../store/reducers/Socket';
import { showMessage } from 'react-native-flash-message';
import { LightTheme, DarkTheme } from '../../appStyles';
import {
  promptMemberandAdd,
  promptMemberandRemove,
  promptMember,
} from '../../store/reducers/Socket';
var BUTTONS = [
  { text: 'Yes', icon: 'remove', iconColor: colors.red },
  { text: 'Cancel', icon: 'close', iconColor: colors.greencyan },
];

var CameraButton = [
  { text: 'Camera', icon: 'camera', iconColor: colors.black },
  { text: 'Gallery', icon: 'images', iconColor: colors.dodgerblue },
  { text: 'Cancel', icon: 'close', iconColor: colors.red },
];

class RoomSettingsScreen extends Component {
  constructor(props) {
    super(props);
    const { state } = this.props.navigation;
    const params = state.params;
    this.state = {
      name: this.props.rooms[params.roomInd].name,
      status: this.props.rooms[params.roomInd].description,
      changed: false,
      infoClicked: false,
      roomInd: params.roomInd,
      profile_pic: this.props.rooms[params.roomInd].profile_pic,
      visible: false,
    };
  }

  uploadImage = async (result) => {
    const { state } = this.props.navigation;
    const data = await resizeFunc(result);
    const url = 'data:image/png;base64,' + data;
    this.setState({ profile_pic: url });
    await this.props.updateRoomProfile(
      this.props.rooms[this.state.roomInd].id,
      url
    );
    await updateRoomProfilePic(
      this.props.user.token,
      this.props.rooms[this.state.roomInd].id,
      url
    );

    if (!this.props.rooms[this.state.roomInd].dark) {
      state.params.onPromptSend(
        `${this.props.user.name} updated the group icon`
      );
    }
  };

  async PickImageFromCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      showMessage({
        message: `Sorry, we need camera permissions to make this work!`,
        type: 'danger',
        floating: true,
      });
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1.91, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      this.uploadImage(result);
    }
  }

  async PickImageFromGallery() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      showMessage({
        message: `Sorry, we need camera roll permissions to make this work!`,
        type: 'danger',
        floating: true,
      });
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1.91, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      this.uploadImage(result);
    }
  }

  renderGridItem = (itemData) => {
    var Theme = LightTheme;
    if (this.props.user.mode == 'dark') {
      Theme = DarkTheme;
    }

    var admin = <></>;
    var name = itemData.item.details.name;
    var status = itemData.item.details.status;
    var removeMem = <></>;
    if (
      itemData.item.details._id ===
      this.props.rooms[this.state.roomInd].creator_id
    )
      admin = <Text style={Theme.ChatHeaderNoteOnline}>admin</Text>;
    if (
      this.props.user.id === this.props.rooms[this.state.roomInd].creator_id
    ) {
      removeMem = (
        <TouchableOpacity
          onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: 1,
                title: `Are you sure you want to remove ${name} from the group ?`,
              },
              async (buttonIndex) => {
                if (buttonIndex === 0) {
                  this.removeMem(
                    itemData.item.details._id,
                    itemData.item.details.name
                  );
                }
              }
            )
          }
        >
          <Badge>
            <Text>Remove</Text>
          </Badge>
        </TouchableOpacity>
      );
    }

    if (itemData.item.details._id === this.props.user.id) {
      removeMem = <></>;
      name = 'You';
      status = this.props.user.status;
    }
    return (
      <ListItem noBorder={true} style={{ padding: 6 }} avatar>
        <Thumbnail source={{ uri: itemData.item.details.profile_pic }} />

        <Body>
          <Text numberOfLines={1} style={Theme.SettingsmemberListName}>
            {name}
          </Text>
          <Text numberOfLines={1} style={Theme.SettingsmemberListNote} note>
            {status}
          </Text>
        </Body>
        <Right>
          {admin}
          {removeMem}
        </Right>
      </ListItem>
    );
  };

  addMem = async (userId, name) => {
    promptMemberandAdd(
      this.props.user.token,
      this.props.rooms[this.state.roomInd].id,
      userId
    );
    const { state } = this.props.navigation;
    if (!this.props.rooms[this.state.roomInd].dark) {
      state.params.onPromptSend(`${this.props.user.name} added ${name}`);
    }
  };

  removeMem = async (userId, name) => {
    promptMemberandRemove(
      this.props.user.token,
      this.props.rooms[this.state.roomInd].id,
      userId
    );
    const { state } = this.props.navigation;
    if (!this.props.rooms[this.state.roomInd].dark) {
      state.params.onPromptSend(`${this.props.user.name} removed ${name}`);
    }
  };

  leave = async () => {
    const { state } = this.props.navigation;
    if (!this.props.rooms[this.state.roomInd].dark) {
      state.params.onPromptSend(`${this.props.user.name} left`);
    }
    promptMember(
      this.props.user.token,
      this.props.rooms[this.state.roomInd].id
    );
    this.props.navigation.navigate('MainScreen');
  };

  render() {
    var Theme = LightTheme;
    if (this.props.user.mode == 'dark') {
      Theme = DarkTheme;
    }

    var button = <></>;
    var members = <></>;
    var infoArrow = <Icon active name='add' />;
    var addParticipant = <></>;
    var pic = (
      <Thumbnail
        style={SettingForm.profile_pic}
        source={{ uri: this.state.profile_pic }}
      />
    );
    var leaveButton = (
      <ListItem
        icon
        noBorder={true}
        onPress={() =>
          ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: 1,
              title: `Are you sure you want to leave ${this.state.name} ?`,
            },
            async (buttonIndex) => {
              if (buttonIndex === 0) {
                this.leave();
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
          <Text style={Theme.chatListName}>Leave this group</Text>
        </Body>
        <Right>
          <Icon active name='arrow-forward' />
        </Right>
      </ListItem>
    );
    var f = 0;
    for (const member of this.props.rooms[this.state.roomInd].members) {
      if (member.details._id === this.props.user.id) f = 1;
    }
    if (!f) {
      leaveButton = <></>;
    }
    if (
      this.props.user.id === this.props.rooms[this.state.roomInd].creator_id
    ) {
      addParticipant = (
        <ListItem
          noBorder={true}
          icon
          onPress={() =>
            this.props.navigation.navigate({
              routeName: `${this.props.user.mode}AddParticipantScreen`,
              params: {
                roomInd: this.state.roomInd,
                addMem: this.addMem.bind(this),
              },
            })
          }
        >
          <Left>
            <Button style={{ backgroundColor: colors.greencyan }}>
              <AntDesign
                name='plus'
                size={18}
                style={{ color: colors.white }}
              />
            </Button>
          </Left>
          <Body>
            <Text style={Theme.chatListName}>Add participants</Text>
          </Body>
          <Right>
            <Icon active name='arrow-forward' />
          </Right>
        </ListItem>
      );
    }
    if (this.state.changed)
      button = (
        <TouchableOpacity
          style={SettingForm.button}
          onPress={async () => {
            if (!this.state.name || !this.state.status) {
              showMessage({
                message: `Name or description cant be empty`,
                type: 'danger',
                floating: true,
              });
            } else {
              const { state } = this.props.navigation;
              await this.props.updateNameDescription(
                this.props.rooms[this.state.roomInd].id,
                this.state.name.trim(),
                this.state.status.trim()
              );
              updateRoomNameDesc(
                this.props.user.token,
                this.props.rooms[this.state.roomInd].id,
                this.state.name.trim(),
                this.state.status.trim()
              );
              this.setState({
                changed: false,
              });
              if (!this.props.rooms[this.state.roomInd].dark) {
                state.params.onPromptSend(
                  `${this.props.user.name} updated the group info`
                );
              }
            }
          }}
        >
          <Text style={SettingForm.buttonText}>Save</Text>
        </TouchableOpacity>
      );

    if (this.state.infoClicked) {
      const filteredMembers = this.props.rooms[
        this.state.roomInd
      ].members.filter((member) => {
        return !member.blocked;
      });
      members = (
        <FlatList
          keyExtractor={(item) => item.details._id}
          data={filteredMembers}
          renderItem={this.renderGridItem}
          numColumns={1}
        />
      );
      infoArrow = <Icon active name='remove' />;
    }
    return (
      <>
        <Header style={Theme.ChatHeaderView}>
          <Left>
            <Button
              icon
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <MaterialIcons name='arrow-back' size={22} color={colors.grey} />
            </Button>
          </Left>
          <Body></Body>
        </Header>
        <Container>
          <Content style={Theme.ChatHeaderView}>
            <List>
              <ListItem style={{ flexDirection: 'column' }}>
                {pic}
                <TouchableOpacity
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: CameraButton,
                        cancelButtonIndex: 2,
                        title: 'Profile Photo',
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
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Form>
                  <Text style={Theme.SettingsText}>Name : </Text>
                  <TextInput
                    numberOfLines={1}
                    style={Theme.SettingsinputBox}
                    value={this.state.name}
                    onChangeText={(text) =>
                      this.setState({
                        name: text,
                        changed: true,
                      })
                    }
                  />
                  <Text style={Theme.SettingsText}>Description : </Text>
                  <TextInput
                    multiline={true}
                    style={Theme.SettingsinputBox}
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
                  <Text style={Theme.chatListName}>Members</Text>
                </Body>
                <Right>{infoArrow}</Right>
              </ListItem>
              <>{members}</>
              {addParticipant}
              {leaveButton}
            </List>
          </Content>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateNameDescription,
      fillData,
      updateRoom,
      updateRoomProfile,
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomSettingsScreen);
