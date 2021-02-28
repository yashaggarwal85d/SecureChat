import React, { Component } from "react";
import { View, Animated, TouchableWithoutFeedback, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FloatBarStyle } from "../appStyles";

export default class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      icon: "plus-circle",
    };
  }
  toggleOpen = () => {
    if (this._open) {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      this.setState({ icon: "plus-circle" });
    } else {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      this.setState({ icon: "close-circle" });
    }
    this._open = !this._open;
  };

  render() {
    const peopleInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -60],
    });
    const groupInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -50, -110],
    });

    const settingInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -100, -180],
    });

    const peopleStyle = {
      transform: [
        {
          translateY: peopleInterpolate,
        },
      ],
    };

    const groupStyle = {
      transform: [
        {
          translateY: groupInterpolate,
        },
      ],
    };

    const settingStyle = {
      transform: [
        {
          translateY: settingInterpolate,
        },
      ],
    };

    return (
      <View style={FloatBarStyle.container}>
        <Animated.View style={[FloatBarStyle.background]}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate("SettingsScreen")}
          >
            <Animated.View style={[FloatBarStyle.button0, settingStyle]}>
              <MaterialCommunityIcons
                style={FloatBarStyle.settings}
                name='settings'
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate("GroupSearchScreen")}
          >
            <Animated.View style={[FloatBarStyle.button, groupStyle]}>
              <MaterialCommunityIcons
                style={FloatBarStyle.group}
                name='account-multiple-plus'
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate("SearchScreen")}
          >
            <Animated.View style={[FloatBarStyle.button, peopleStyle]}>
              <MaterialCommunityIcons
                style={FloatBarStyle.account}
                name='account-plus'
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.toggleOpen()}>
            <Animated.View style={[FloatBarStyle.button2]}>
              <MaterialCommunityIcons
                style={FloatBarStyle.open}
                name={this.state.icon}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  }
}
