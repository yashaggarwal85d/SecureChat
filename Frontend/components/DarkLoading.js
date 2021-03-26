import React, { Component } from "react";
import LottieView from "lottie-react-native";

export default class LoadingScreen extends Component {
  render() {
    return (
      <LottieView
        source={require("../assets/loaders/8682-loading.json")}
        autoPlay
        loop
      />
    );
  }
}
