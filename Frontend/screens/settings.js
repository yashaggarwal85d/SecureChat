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
} from "native-base";
import * as colors from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { logout } from "../store/actions/LoginActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

var BUTTONS = [
  { text: "Yes", icon: "open", iconColor: colors.red },
  { text: "Cancel", icon: "close", iconColor: colors.greencyan },
];

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: colors.greencyan }}>
                  <AntDesign
                    name='edit'
                    size={18}
                    style={{ color: colors.white }}
                  />
                </Button>
              </Left>
              <Body>
                <Text>Edit details</Text>
              </Body>
              <Right>
                <Icon active name='arrow-forward' />
              </Right>
            </ListItem>

            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: colors.black }}>
                  <AntDesign
                    name='key'
                    size={18}
                    style={{ color: colors.white }}
                  />
                </Button>
              </Left>
              <Body>
                <Text>Change Password</Text>
              </Body>
              <Right>
                <Icon active name='arrow-forward' />
              </Right>
            </ListItem>
            <ListItem icon>
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
                <Text>App Info</Text>
              </Body>
              <Right>
                <Icon active name='arrow-forward' />
              </Right>
            </ListItem>
            <Root>
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
                  <Text>Log Out</Text>
                </Body>
                <Right>
                  <Icon active name='arrow-forward' />
                </Right>
              </ListItem>
            </Root>
          </List>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logout }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    rooms: state.room.rooms,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
