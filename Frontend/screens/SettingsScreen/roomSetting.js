import React, { Component } from "react";
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
  ActionSheet,
  Root,
  Thumbnail,
  Form,
  View,
  Title,
  Badge,
} from "native-base";
import { FlatList } from "react-native";
import { TextInput, TouchableOpacity } from "react-native";
import * as colors from "../../constants/colors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  leaveRoom,
  updateNameDescription,
  AddMember,
  fillData,
  RemoveMember,
} from "../../store/actions/RoomActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { LightTheme, SettingForm } from "../../appStyles";
import * as ImagePicker from "expo-image-picker";

var BUTTONS = [
  { text: "Yes", icon: "remove", iconColor: colors.red },
  { text: "Cancel", icon: "close", iconColor: colors.greencyan },
];

var CameraButton = [
  { text: "Camera", icon: "camera", iconColor: colors.black },
  { text: "Gallery", icon: "photos", iconColor: colors.dodgerblue },
  { text: "Cancel", icon: "close", iconColor: colors.red },
];

class RoomSettingsScreen extends Component {
  constructor(props) {
    super(props);
    const { state } = this.props.navigation;
    const params = state.params;
    this.state = {
      name: params.room.name,
      status: params.room.description,
      changed: false,
      infoClicked: false,
      room: params.room,
    };
    this.getPermission();
  }

  async getPermission() {}

  async PickImageFromCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1.91, 1],
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
      aspect: [1.91, 1],
      quality: 1,
    });
    console.log(result);
  }

  renderGridItem = (itemData) => {
    var admin = <></>;
    var name = itemData.item.details.name;
    var removeMem = <></>;
    if (itemData.item.details._id === this.state.room.creator_id)
      admin = <Text style={LightTheme.ChatHeaderNoteOnline}>admin</Text>;
    if (this.props.user.id === this.state.room.creator_id) {
      removeMem = (
        <Root>
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
                    await this.props.RemoveMember(
                      this.state.room.id,
                      itemData.item.details._id
                    );
                    var newRoom = this.state.room;
                    var filteredMem = this.state.room.members.filter(
                      (member) => {
                        return !member.blocked;
                      }
                    );
                    newRoom.members = filteredMem;
                    var index = newRoom.members.findIndex(
                      (member) =>
                        member.details._id === itemData.item.details._id
                    );
                    newRoom.members[index].blocked = true;
                    this.setState({
                      room: newRoom,
                    });
                  }
                }
              )
            }
          >
            <Badge>
              <Text>Remove</Text>
            </Badge>
          </TouchableOpacity>
        </Root>
      );
    }

    if (itemData.item.details._id === this.props.user.id) {
      removeMem = <></>;
      name = "You";
    }
    return (
      <ListItem noBorder={true} style={{ padding: 6 }} avatar>
        <Thumbnail source={{ uri: itemData.item.details.profile_pic }} />

        <Body>
          <Text numberOfLines={1} style={SettingForm.memberListName}>
            {name}
          </Text>
          <Text numberOfLines={1} style={SettingForm.memberListNote} note>
            {itemData.item.details.status}
          </Text>
        </Body>
        <Right>
          {admin}
          {removeMem}
        </Right>
      </ListItem>
    );
  };

  addMem = async (user) => {
    await this.props.AddMember(this.state.room.id, user._id);
    var newRoom = this.state.room;
    const details = {
      details: user,
    };
    newRoom.members.push(details);
    this.setState({ room: newRoom });
  };

  render() {
    var button = <></>;
    var members = <></>;
    var infoArrow = <Icon active name='add' />;
    var addParticipant = <></>;
    if (this.props.user.id === this.state.room.creator_id) {
      addParticipant = (
        <ListItem
          noBorder={true}
          icon
          onPress={() =>
            this.props.navigation.navigate({
              routeName: "AddParticipantScreen",
              params: {
                members: this.state.room.members,
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
            <Text style={LightTheme.chatListName}>Add participants</Text>
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
            await this.props.updateNameDescription(
              this.state.room.id,
              this.state.name,
              this.state.status
            );
            this.setState({
              changed: false,
            });
          }}
        >
          <Text style={SettingForm.buttonText}>Save</Text>
        </TouchableOpacity>
      );

    if (this.state.infoClicked) {
      const filteredMembers = this.state.room.members.filter((member) => {
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
        <Header style={{ backgroundColor: colors.white }}>
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
          <Content>
            <List>
              <ListItem style={{ flexDirection: "column" }}>
                <Thumbnail
                  style={SettingForm.profile_pic}
                  source={{ uri: this.state.room.profile_pic }}
                />
                <TouchableOpacity style={SettingForm.cameraView}>
                  <Root>
                    <MaterialIcons
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
                      style={SettingForm.camera}
                      size={28}
                      name='photo-camera'
                    />
                  </Root>
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
                  <Text style={SettingForm.Text}>Description : </Text>
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
                  <Text style={LightTheme.chatListName}>Members</Text>
                </Body>
                <Right>{infoArrow}</Right>
              </ListItem>
              <>{members}</>
              {addParticipant}
              <Root>
                <ListItem
                  icon
                  noBorder={true}
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: 1,
                        title: `Are you sure you want to leave ${this.state.room.name} ?`,
                      },
                      async (buttonIndex) => {
                        if (buttonIndex === 0) {
                          await this.props.leaveRoom(this.state.room.id);
                          await this.props.fillData();
                          this.props.navigation.navigate("MainScreen");
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
                    <Text style={LightTheme.chatListName}>
                      Leave this group
                    </Text>
                  </Body>
                  <Right>
                    <Icon active name='arrow-forward' />
                  </Right>
                </ListItem>
              </Root>
            </List>
          </Content>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { leaveRoom, updateNameDescription, AddMember, fillData, RemoveMember },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    rooms: state.room.rooms,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomSettingsScreen);
