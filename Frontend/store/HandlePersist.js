import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  login,
  updateAlert,
} from "./actions/LoginActions";
import { fillData } from "./actions/RoomActions";
import {
  AuthMainNavigator,
  ChatMainNavigator,
} from "../navigation/chatsNavigation";
import React, { Component } from "react";
import { Text } from "react-native";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      Authstate: AuthMainNavigator,
    };
  }

  async loginUser() {
    await this.props.login();
    if (this.props.user.token) {
      await this.props.fillData();
      this.setState({ loaded: true, Authstate: ChatMainNavigator });
    } else this.setState({ loaded: true, Authstate: AuthMainNavigator });
  }

  async filldatafunc() {
    await this.props.fillData();
  }

  componentDidMount = async () => {
    if (
      !this.props.user ||
      !this.props.user.password ||
      !this.props.user.email
    ) {
      this.setState({ loaded: true, Authstate: AuthMainNavigator });
    } else if (this.props.user.token) {
      await this.props.fillData();
      this.setState({ loaded: true, Authstate: ChatMainNavigator });
    } else {
      this.loginUser();
    }
  };
  render() {
    if (this.state.loaded == false) return <Text>hey</Text>;
    else return <this.state.Authstate />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, updateAlert, fillData },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
