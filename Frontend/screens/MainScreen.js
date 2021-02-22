import React, { Component } from "react";
import { Container } from "native-base";
import * as colors from "../constants/colors";
import { StatusBar, Animated, View } from "react-native";
import { ToggleSwitchStyle } from "../appStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ToggleSwitch from "../components/ToggleSwitch";
import { connect } from "react-redux";
import MainTabScreen from "./Tabs";
import { JoinRooms } from "../store/reducers/Socket";
import { updateMode } from "../store/actions/LoginActions";
import { bindActionCreators } from "redux";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

class MainApp extends Component {
  constructor(props) {
    super(props);
    var defaultActiveIndex;
    if (this.props.user.mode === "light") {
      defaultActiveIndex = 0;
    } else {
      defaultActiveIndex = 1;
    }
    this.state = {
      defaultActiveIndex: defaultActiveIndex,
      theme: this.props.user.mode,
    };
    this.SwitchThemeFunction(this.state.theme);
    JoinRooms(this.props.user.token);
  }

  componentDidMount() {
    setTimeout(() => {
      StatusBar.setHidden(false);
    });
  }

  SwitchToLight() {
    setTimeout(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor(colors.white);
    });
  }
  SwitchToDark() {
    setTimeout(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor(colors.black);
    });
  }
  SwitchThemeFunction(currentTheme) {
    this.props.updateMode(currentTheme);
    this.setState({ theme: currentTheme });
    if (currentTheme == "light") {
      this.SwitchToLight();
    } else if (currentTheme == "dark") {
      this.SwitchToDark();
    }
  }

  render() {
    return (
      <Container>
        <MainTabScreen
          navigation={this.props.navigation}
          DefaultTheme={this.state.theme}
        />
        <View style={ToggleSwitchStyle.Toggle}>
          <ToggleSwitch
            onLeftState={() => this.SwitchThemeFunction("light")}
            onRightState={() => this.SwitchThemeFunction("dark")}
            AnimatedIcon={AnimatedIcon}
            defaultActiveIndex={this.state.defaultActiveIndex}
          />
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateMode }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
