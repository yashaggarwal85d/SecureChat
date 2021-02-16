import React, { Component } from "react";
import DarkChatScreen from "./DarkScreen/DarkChatScreen";
import LightChatScreen from "./LightScreen/LightChatScreen";

export default class MainTabScreen extends Component {
  renderDark() {
    return <DarkChatScreen {...this.props} />;
  }
  renderLight() {
    return <LightChatScreen {...this.props} />;
  }
  render() {
    if (this.props.DefaultTheme == "dark") return this.renderDark();
    else if (this.props.DefaultTheme == "light") return this.renderLight();
  }
}
